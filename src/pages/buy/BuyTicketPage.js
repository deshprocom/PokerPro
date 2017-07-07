/**
 * Created by lorne on 2017/2/16.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, InputView, ImageLoad, SecurityText} from '../../components';
import {fetchRaceNewOrder, fetchBuyTicket} from '../../actions/TicketOrderAction'
import {
    isEmptyObject, showToast, checkMail, moneyFormat,
    convertDate, YYYY_MM_DD, getLoginUser, strNotNull
} from '../../utils/ComonHelper';
import Communications from 'react-native-communications';
import {fetchGetCertification} from '../../actions/AccountAction';
import {GET_CERTIFICATION, POST_BUY_TICKET, GET_RACE_NEW_ORDER, POST_CERTIFICATION} from '../../actions/ActionTypes';
import NameRealView from './NameRealView';
import {fetchRacesInfo, fetchGetRecentRaces} from '../../actions/RacesAction';
import StorageKey from '../../configs/StorageKey';
import {getBuyRaceTicket, postOrderTicket} from '../../services/OrderDao';
import {umengEvent} from '../../utils/UmengEvent';


const E_TICKET = 'e_ticket',
    ENTITY = 'entity';

class BuyTicketPage extends Component {

    state = {
        knowRed: false,
        isEntity: 'e_ticket',
        email: '',
        isNameReal: false,
        raceTicketData: {},
        ordered: false,
        race: {},
        tickets: {},
        shipping_address: {}
    };

    componentWillReceiveProps(newProps) {

        if (newProps.hasData) {

            if (newProps.actionType === GET_CERTIFICATION || POST_CERTIFICATION) {

                this.setState({
                    isNameReal: true
                });

            }

        }
    }


    componentDidMount() {
        umengEvent('ticket_buy_info');
        InteractionManager.runAfterInteractions(() => {
            this.refreshPage();
        })


    }

    refreshPage = () => {
        // this.props._getRaceNewOrder(this.props.params.race_id);
        const {race_id, ticket_id} = this.props.params;

        const body = {
            race_id: race_id,
            ticket_id: ticket_id
        };
        getBuyRaceTicket(body, data => {
            const {tickets, ordered, race, recent_email, shipping_address} = data;
            this.setState({
                tickets: tickets,
                ordered: ordered,
                race: race,
                shipping_address: shipping_address,
                email: recent_email
            })
        }, err => {
            showToast("获取赛票数据失败！")
        });

        this.props._getCertification();
        this.tagBuyKnow();

    };

    eTicketNum = (ticket_info) => {
        if (!isEmptyObject(ticket_info))
            return ticket_info.e_ticket_number - ticket_info.e_ticket_sold_number;
    };

    btnBuyKnow = () => {
        umengEvent('ticket_buy_know');
        storage.save({
            key: StorageKey.BuyKnow,
            rowData: false
        });
        this.setState({
            knowRed: false
        });
        this.props.router.toBuyKnownPage();
    };

    tagBuyKnow = () => {
        storage.load({key: StorageKey.BuyKnow})
            .then(ret => {
                this.setState({
                    knowRed: false
                })
            }).catch(err => {
            this.setState({
                knowRed: true
            })
        })
    };

    _btnService = () => {
        umengEvent("ticket_buy_hotline");
        Alert.alert(I18n.t('hot_line'), I18n.t('hot_phone') + '\n' + I18n.t('work_time'),
            [{
                text: I18n.t('cancel'), onPress: () => {
                }
            },
                {
                    text: I18n.t('call'), onPress: () => {
                    Communications.phonecall(I18n.t('hot_phone'), false)
                }
                }])

    };


    _postOrderOk = () => {
        Alert.alert('购票成功', '工作人员将及时与您联系，请保持手机畅通');


        const {user_id} = getLoginUser();
        if (strNotNull(user_id)) {
            const body = {
                user_id: user_id,
                race_id: this.props.params.race_id
            };
            this.props._getRacesInfo(body);

            const recentRaces = {
                user_id: user_id,
                number: 5
            };
            this.props._getRecentRaces(recentRaces);
            this.refreshPage();

            router.toOrderListPage();
        }
    };

    _saveBuyEmail = () => {
        let {email} = this.state;
        if (strNotNull(email))
            storage.save({
                key: StorageKey.BuyEmail,
                rawData: email
            });
    };

    _btnBuyTicket = () => {

        umengEvent('ticket_buy_contain');
        let {isEntity, email, isNameReal} = this.state;
        if (isNameReal) {
            if (isEntity === ENTITY) {
                showToast('实体票暂不开放');
                return;
            }

            if (checkMail(email)) {
                this._saveBuyEmail();
                const {race_id, ticket_id} = this.props.params;
                let param = {
                    race_id: race_id,
                    ticket_id: ticket_id
                };
                let body = {
                    ticket_type: 'e_ticket',
                    email: email
                };
                postOrderTicket(param, body, data => {
                    this._postOrderOk();
                }, err => {
                    showToast(err)
                });
            }

        } else {
            showToast('请先进行实名认证')
        }

    };

    ticketPrice = (race) => {
        if (!isEmptyObject(race))
            return race.ticket_price;
    };

    _location = () => {

        const {race} = this.state;
        if (!isEmptyObject(race)) {
            const {location} = race;
            return location;
        }
    };

    _date = () => {
        const {race} = this.state;
        if (!isEmptyObject(race)) {
            const {end_date, begin_date} = race;
            return convertDate(begin_date, 'YYYY.MM.DD') + "-" + convertDate(end_date, 'YYYY.MM.DD')
        }
    };

    itemListView = (rowData) => {

        const {logo, original_price, price, ticket_class, title} = rowData;

        return (<TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                const {race_id, ticket_id} = this.props.params;
                if (ticket_class === 'single_ticket')
                    router.toRacesInfoPage(this.props, race_id, false);
                else
                    router.toTicketInfoPage(this.props, race_id, ticket_id)
            }}
            style={styles.itemView}>
            <ImageLoad
                source={{uri: logo}}
                style={styles.itemImg}/>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={2}
                    style={styles.txtItemTitle}>{title}</Text>

                <Text style={[styles.txtLabel, styles.top8]}>{this._date()}</Text>
                <Text style={styles.txtLabel}>地址: {this._location()}</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.txtPrice}>{price}</Text>

                    <View style={{flex: 1}}/>

                </View>


            </View>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center', width: 45, flex: 0.15
            }}>
                <Image style={{height: 20, width: 11}}
                       source={Images.ticket_arrow}/>

            </View>

        </TouchableOpacity>)
    };

    _entityView = () => {

        const {isEntity} = this.state;
        return (   <TouchableOpacity
            onPress={() => {
                this.setState({
                    isEntity: ENTITY
                })
            }}
            activeOpacity={1}
            testID="btn_entity_ticket"
            style={isEntity == ENTITY ? styles.ticketSelect : styles.ticketUnSelect}>
            <Text
                style={{
                    fontSize: 15,
                    color: isEntity == ENTITY ? Colors.txt_F28 : Colors._AAA
                }}>{I18n.t('ticket_paper')}</Text>
        </TouchableOpacity>)
    };


    render() {
        const {user_extra} = this.props;
        const {race, tickets, ordered} = this.state;
        const {ticket_info, price} = tickets;
        const {isEntity, knowRed, email} = this.state;

        return (
            <View
                testID="page_buy_ticket"
                style={{flex: 1, backgroundColor: Colors.bg_f5}}>
                <NavigationBar
                    refreshPage={this.refreshPage}
                    toolbarStyle={{backgroundColor: Colors.bg_09}}
                    title={I18n.t('buy_ticket')}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <ScrollView
                    style={{marginBottom: 62}}>
                    {/*赛事简介*/}
                    <View style={{height: 7}}/>

                    {this.itemListView(tickets)}


                    {/*安全*/}
                    <View style={{
                        flex: 1, height: 40, backgroundColor: Colors.white,
                        flexDirection: 'row', marginTop: 1
                    }}>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                height: 17, width: 15,
                                marginLeft: 18, marginRight: 9
                            }}
                                   source={Images.ticket_security}/>
                            <Text style={{fontSize: 14, color: Colors._999}}>{I18n.t('money_safe')}</Text>

                        </View>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                height: 17, width: 15,
                                marginLeft: 18, marginRight: 9
                            }}
                                   source={Images.ticket_security}/>
                            <Text style={{fontSize: 14, color: Colors._999}}>{I18n.t('real_ticket')}</Text>

                        </View>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image style={{
                                height: 17, width: 15,
                                marginLeft: 18, marginRight: 9
                            }}
                                   source={Images.ticket_security}/>
                            <Text style={{fontSize: 14, color: Colors._999}}>{I18n.t('guarantee')}</Text>

                        </View>


                    </View>
                    {/*购票须知*/}
                    <TouchableOpacity
                        testID="btn_buy_notice"
                        onPress={this.btnBuyKnow}
                        activeOpacity={1}
                        style={{
                            flex: 1, flexDirection: 'row', height: 40,
                            backgroundColor: Colors.white, alignItems: 'center',
                            marginTop: 8, justifyContent: 'space-between'
                        }}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{
                                height: 16, width: 16, marginLeft: 18,
                                marginRight: 12
                            }}
                                   source={Images.ticket_prompt}/>
                            <Text style={{fontSize: 14, color: Colors._999}}>{I18n.t('ticket_prompt')}</Text>
                        </View>
                        {knowRed ? <View style={{
                            width: 10, height: 10, backgroundColor: '#FF5252',
                            borderRadius: 5, marginRight: 16
                        }}/> : null}


                    </TouchableOpacity>
                    {/*票务类型*/}
                    <View style={{
                        height: 96, flex: 1,
                        backgroundColor: Colors.white, marginTop: 6
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 18, marginTop: 18}}>
                            <Text style={{fontSize: 15, color: Colors.txt_666}}>
                                {I18n.t('ticket_type')}</Text>
                            <Text style={{fontSize: 14, color: Colors.txt_FF3, marginLeft: 18}}>
                                (剩余{this.eTicketNum(ticket_info)}张)</Text>
                        </View>
                        <View
                            style={{height: 66, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isEntity: E_TICKET
                                    })
                                }}
                                activeOpacity={1}
                                testID="btn_e_ticket"
                                style={[isEntity == ENTITY ? styles.ticketUnSelect : styles.ticketSelect,
                                    {marginRight: 20, marginLeft: 18}]}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: isEntity == ENTITY ? Colors._AAA : Colors.txt_F28
                                    }}>{I18n.t('ticket_web')}</Text>
                            </TouchableOpacity>

                            {this._entityView()}


                        </View>
                    </View>
                    {/*电子邮件*/}

                    {/*收货地址*/}

                    {isEntity == ENTITY ? this._addrView() : this._emailViwe(email)}

                    <NameRealView user_extra={user_extra}
                                  router={router}/>


                    <View style={{height: 20, flex: 1}}/>


                </ScrollView>
                <View
                    style={{
                        height: 62,
                        width: Metrics.screenWidth,
                        backgroundColor: Colors.white,
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        shadowColor: 'rgb(0,0,0)',
                        shadowOffset: {height: 2, width: 1},
                        shadowOpacity: 0.25,
                        shadowRadius: 3
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 19, alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 14, color: Colors.txt_666}}>票价:</Text>
                        <Text style={{fontSize: 12, color: Colors.txt_FF9, marginLeft: 10}}>¥</Text>
                        <Text style={{fontSize: 18, color: Colors.txt_FF9}}
                              testID="txt_ticket_price">
                            {price}
                        </Text>
                    </View>
                    <View style={{height: 41, width: 1, backgroundColor: Colors.txt_DDD}}/>
                    <TouchableOpacity
                        onPress={this._btnService}
                        testID="btn_service"
                        activeOpacity={1}
                        style={{width: 77, height: 62, alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{width: 25, height: 21}}
                               source={Images.prompt_service}/>
                        <Text style={{fontSize: 12, color: Colors.txt_666}}>客服</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={ordered}
                        onPress={this._btnBuyTicket}
                        testID="btn_buy_ticket"
                        activeOpacity={1}
                        style={{
                            width: 103, height: 62, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: ordered ? Colors._999 : Colors.bg_09
                        }}>
                        <Text style={{fontSize: 18, color: ordered ? Colors.white : Colors.txt_E0C}}>购票下单</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }

    _emailViwe = (email) => {
        return (  <View
            style={{
                height: 44, alignItems: 'center', flexDirection: 'row',
                marginTop: 10, backgroundColor: Colors.white
            }}>

            <Text style={{fontSize: 15, color: Colors.txt_666, marginLeft: 18}}>{I18n.t('email')}:</Text>
            <InputView
                testIDClear="btn_clear_email"
                testID="input_email"
                inputValue={email}
                stateText={text => {
                    this.setState({
                        email: text
                    })
                }}
                inputView={{
                    height: 44, borderBottomColor: Colors.white,
                    borderBottomWidth: 1, flex: 1
                }}
                inputText={{height: 44, fontSize: 14, marginLeft: 9}}
                placeholder={I18n.t('send_ticket_email')}/>


        </View>)
    };

    _selectAdr = (address) => {
        console.log('adr:', address);
        this.setState({
            shipping_address: address
        })
    };

    _addrView = () => {
        const {shipping_address} = this.state;
        const {address, address_detail, consignee, mobile} = shipping_address;

        if (isEmptyObject(shipping_address))
            return (  <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    router.toAdrListPage(this.props, this._selectAdr, {});
                }}
                style={{height: 89, flex: 1, marginTop: 10, backgroundColor: Colors.white}}>
                <View style={{height: 44, flex: 1, alignItems: 'center', flexDirection: 'row'}}>

                    <Text style={{
                        fontSize: 15, color: Colors.txt_666, marginLeft: 18,
                        marginRight: 9
                    }}>{I18n.t('shopping_addr')}:</Text>
                    <Text style={{fontSize: 14, color: Colors._AAA, flex: 1}}>{I18n.t('shopping_addr_desc')}</Text>

                </View>
                <View style={{
                    height: 44, flex: 1, alignItems: 'center', flexDirection: 'row',
                    justifyContent: 'space-between', marginLeft: 18
                }}>
                    <Text style={{fontSize: 12, color: Colors._AAA}}>{I18n.t('no_addr_tip')}</Text>
                    <Image style={{width: 11, height: 20, marginRight: 17}}
                           source={Images.ticket_arrow}/>
                </View>
            </TouchableOpacity>);
        else
            return (<TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    router.toAdrListPage(this.props, this._selectAdr,shipping_address);
                }}
                style={styles.viewAdr}>
                <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>

                    <Text style={{
                        fontSize: 15, color: Colors.txt_666, marginLeft: 18,
                        marginRight: 9
                    }}>{I18n.t('shopping_addr')}:</Text>
                    <Text style={{fontSize: 14, color: Colors._AAA, flex: 1}}>{I18n.t('shopping_addr_desc')}</Text>

                </View>
                <View style={styles.viewAdrInfo}>
                    <View>

                        <View style={styles.ViewRow}>
                            <Text style={styles.txtAdrInfo}>{consignee}    </Text>
                            <SecurityText
                                testID="txt_phone_security"
                                securityOptions={{
                                    isSecurity: true,
                                    startIndex: 3,
                                    endIndex: 7,
                                }}
                                style={styles.txtAdrInfo}>
                                {mobile}
                            </SecurityText>
                        </View>

                        <Text
                            numberOfLines={2}
                            style={styles.txtAdrInfo}>{address + '\n' + address_detail}</Text>

                    </View>
                    <Image style={{width: 11, height: 20, marginRight: 17}}
                           source={Images.ticket_arrow}/>
                </View>
            </TouchableOpacity>)
    }


}


const styles = StyleSheet.create({
    ticketSelect: {
        height: 30, width: 91, borderRadius: 5, borderWidth: 1, borderColor: Colors.txt_F28,
        alignItems: 'center', justifyContent: 'center'
    },
    ticketUnSelect: {
        height: 30, width: 91, borderRadius: 5, backgroundColor: '#E5E5E5',
        alignItems: 'center', justifyContent: 'center'
    },
    itemView: {
        flexDirection: 'row',
        paddingLeft: 17,
        backgroundColor: 'white'
    },
    itemImg: {
        height: 104,
        width: 80,
        marginTop: 16,
        marginBottom: 20
    },
    itemContent: {
        flex: 1,
        marginTop: 16,
        marginLeft: 13,
        marginRight: 10
    },
    txtItemTitle: {
        fontSize: 16,
        color: '#444444',
        lineHeight: 20
    },
    txtLabel: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    top8: {
        marginTop: 8,
        marginBottom: 3
    },
    separator: {
        height: 4
    },
    txtPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors._161817,
    },
    viewInfo: {
        marginTop: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewAdr: {
        height: 128,
        backgroundColor: 'white',
        flex: 1,
        marginTop: 10,
    },
    viewAdrInfo: {
        height: 44, flex: 1, alignItems: 'center', flexDirection: 'row',
        justifyContent: 'space-between', marginLeft: 18
    },
    txtAdrInfo: {
        fontSize: 14,
        color: '#666666',
        marginTop: 8
    },
    ViewRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }

});

const headerStyle = {
    height: 35, justifyContent: 'center',
    alignItems: 'center', backgroundColor: Colors.bg_f5
};

const bindAction = dispatch => ({
    _getRaceNewOrder: (body) => dispatch(fetchRaceNewOrder(body)),
    _postBuyTicket: (race_id, body) => dispatch(fetchBuyTicket(race_id, body)),
    _getCertification: () => dispatch(fetchGetCertification()),
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _getRacesInfo: (body) => dispatch(fetchRacesInfo(body))
});

const mapStateToProps = state => ({
    loading: state.TicketOrderState.loading,
    error: state.TicketOrderState.error,
    hasData: state.TicketOrderState.hasData,
    actionType: state.TicketOrderState.actionType,
    race_ticket_addr: state.TicketOrderState.race_ticket_addr,
    user_extra: state.TicketOrderState.user_extra
});

export default connect(mapStateToProps, bindAction)(BuyTicketPage);