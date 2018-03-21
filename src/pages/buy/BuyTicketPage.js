/**
 * Created by lorne on 2017/2/16.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, Alert,
    StyleSheet, Image, Text, ScrollView, Platform,
    InteractionManager, TextInput
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, InputView, ImageLoad, SecurityText} from '../../components';
import {
    isEmptyObject, showToast, checkMail, moneyFormat,
    convertDate, YYYY_MM_DD, getLoginUser, strNotNull
} from '../../utils/ComonHelper';
import Communications from 'react-native-communications';
import NameRealView from './NameRealView';
import StorageKey from '../../configs/StorageKey';
import {getBuyRaceTicket, postOrderTicket, getUnpaidOrder, postInvite} from '../../services/OrderDao';
import {umengEvent} from '../../utils/UmengEvent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PayModal from './PayModal';
import {CouponType} from '../../configs/Status';
import Discount from '../comm/Discount';
import {get_discount} from '../../services/CrowdDao';


const E_TICKET = 'e_ticket',
    ENTITY = 'entity';

export default class BuyTicketPage extends Component {

    state = {
        knowRed: false,
        isEntity: 'e_ticket',
        email: '',
        raceTicketData: {},
        ordered: false,
        race: {},
        tickets: {},
        shipping_address: {},
        order_number: '',
        inviteCode: '',
        invitePrice: {},
        discount: {},
        handle_value: false
    };


    componentDidMount() {

        this.pokercion = 0;

        umengEvent('ticket_buy_info');
        get_discount(discount => {
            this.setState({discount})
        }, err => {

        })
        storage.load({
            key: StorageKey.BuyEmail
        }).then(email => {
            this.setState({email: email})

        });

        InteractionManager.runAfterInteractions(() => {
            this.refreshPage();

            const {race_id, ticket_id} = this.props.params;
            const body = {
                race_id: race_id,
                ticket_id: ticket_id
            };

            getUnpaidOrder(body, data => {

                if (strNotNull(data.order_number))
                    this.setState({
                        order_number: data.order_number
                    })
            }, err => {

            })
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
            const {e_ticket_number, e_ticket_sold_number, entity_ticket_number, entity_ticket_sold_number} = tickets.ticket_info;

            let e_num = e_ticket_number - e_ticket_sold_number;
            let entity_num = entity_ticket_number - entity_ticket_sold_number;

            let type = E_TICKET;
            if (e_num === 0) {
                type = ENTITY;
            } else if (entity_num === 0) {
                type = E_TICKET;
            }

            this.setState({
                tickets: tickets,
                ordered: ordered,
                race: race,
                shipping_address: isEmptyObject(shipping_address) ? {} : shipping_address,
                isEntity: type
            })
        }, err => {
            showToast(`${I18n.t('data_fail')}`)
        });


        this.tagBuyKnow();

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
        router.toBuyKnownPage();
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


    discounted = (price) => {
        const {discount} = this.state;


        let available = price * discount.discount * 100
        if (available > discount.total_poker_coins) {
            available = discount.total_poker_coins
        }
        this.pokercion = available;

        let discount_num = price * 100 - available;

        return discount_num / 100
    }

    _postOrderOk = (order_number) => {
        // Alert.alert(`${I18n.t('buy_success')}`, `${I18n.t('keep_phone')}`);
        this.setState({
            order_number: order_number
        });
        const {tickets, handle_value} = this.state;

        if (this.payModal) {

            const data = {
                order_number: order_number,
                price: handle_value ? this.discounted(tickets.unformatted_price) : tickets.price
            };
            this.payModal.setPayUrl(data);
            this.payModal.toggle();
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

        let verified = this.realName.getVerified();
        console.log('RealName', verified);
        umengEvent('ticket_buy_contain');
        let {isEntity, email, shipping_address, order_number, inviteCode, handle_value} = this.state;
        if (!isEmptyObject(verified)) {
            if (isEntity === ENTITY) {
                if (isEmptyObject(shipping_address)) {
                    showToast(`${I18n.t('add_adr')}`);
                    return;
                }
                const {race_id, ticket_id} = this.props.params;
                let param = {
                    race_id: race_id,
                    ticket_id: ticket_id
                };
                let body = {
                    ticket_type: 'entity_ticket',
                    mobile: shipping_address.mobile,
                    consignee: shipping_address.consignee,
                    address: shipping_address.address + shipping_address.address_detail,
                    invite_code: inviteCode,
                    cert_id: verified.id,
                    deduction: handle_value,
                    deduction_numbers: this.pokercion
                };

                if (this.payModal && !isEmptyObject(this.payModal.getPayUrl())) {
                    this.payModal.toggle()
                } else if (strNotNull(order_number)) {
                    this._postOrderOk(order_number);

                } else {

                    postOrderTicket(param, body, data => {
                        this._postOrderOk(data.order_number);
                    }, err => {
                        showToast(err)
                    });
                }


            } else if (checkMail(email)) {
                this._saveBuyEmail();
                const {race_id, ticket_id} = this.props.params;
                let param = {
                    race_id: race_id,
                    ticket_id: ticket_id
                };
                let body = {
                    ticket_type: 'e_ticket',
                    email: email,
                    invite_code: inviteCode,
                    cert_id: verified.id,
                    deduction: handle_value,
                    deduction_numbers: this.pokercion
                };
                if (this.payModal && !isEmptyObject(this.payModal.getPayUrl())) {
                    this.payModal.toggle()
                } else if (strNotNull(order_number)) {
                    this._postOrderOk(order_number);
                } else {

                    postOrderTicket(param, body, data => {
                        this._postOrderOk(data.order_number);
                    }, err => {
                        showToast(err)
                    });
                }

            }

        }
        else {
            showToast(I18n.t('ple_ren_zhen'))
        }

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
                    router.toTicketInfoPage(this.props, race_id, ticket_id, true)
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
                <Text style={styles.txtLabel}>{I18n.t('location')} {this._location()}</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.txtPrice}>¥{price}</Text>

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
        return (<TouchableOpacity
            onPress={() => {
                this.setState({
                    isEntity: ENTITY
                })
            }}
            activeOpacity={1}
            testID="btn_entity_ticket"
            style={{alignItems: 'center', justifyContent: 'center', marginLeft: 35}}>
            <Image style={{height: 44, width: 44}}
                   source={isEntity === ENTITY ? Images.selected_entity : Images.select_entity}/>

            <Text
                style={{
                    fontSize: 15,
                    marginTop: 12,
                    color: isEntity === ENTITY ? Colors._DF1 : Colors._999
                }}>{I18n.t('ticket_paper')}</Text>
        </TouchableOpacity>)
    };


    sendTypeView = () => {
        let {tickets, isEntity} = this.state;

        if (isEmptyObject(tickets))
            return;
        const {e_ticket_number, e_ticket_sold_number, entity_ticket_number, entity_ticket_sold_number} = tickets.ticket_info;

        let e_num = e_ticket_number - e_ticket_sold_number;
        let entity_num = entity_ticket_number - entity_ticket_sold_number;


        return (<View style={{
            height: 140,
            backgroundColor: Colors.white,
            marginTop: 8
        }}>
            <View style={{height: 35}}>
                <Text style={{
                    fontSize: 15, color: Colors._333, fontWeight: 'bold',
                    marginLeft: 17, marginTop: 10, marginBottom: 10
                }}>
                    {I18n.t('buy_send')}</Text>
                <View style={{marginLeft: 18, marginRight: 18, height: 1, backgroundColor: Colors._ECE}}/>
            </View>
            <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {e_num > 0 ? <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isEntity: E_TICKET
                        })
                    }}
                    activeOpacity={1}
                    style={{alignItems: 'center', justifyContent: 'center', marginLeft: 35}}
                    testID="btn_e_ticket">
                    <Image style={{height: 44, width: 44}}
                           source={isEntity === E_TICKET ? Images.selected_e_ticket : Images.select_e_ticket}/>
                    <Text
                        style={{
                            fontSize: 15,
                            marginTop: 12,
                            color: isEntity === E_TICKET ? Colors._DF1 : Colors._999
                        }}>{I18n.t('ticket_web')}</Text>
                </TouchableOpacity> : null}

                {entity_num > 0 ? this._entityView() : null}

            </View>
        </View>)
    }


    render() {

        const {race, tickets, ordered, isEntity, knowRed, email, order, discount, handle_value} = this.state;
        const {ticket_info, price, unformatted_price} = tickets;

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
                <KeyboardAwareScrollView
                    style={{marginBottom: 62}}>
                    {/*赛事简介*/}

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
                    {this.sendTypeView()}


                    {/*收货地址*/}

                    {isEntity === ENTITY ? this._addrView() : this._emailViwe(email)}

                    {race.required_id_type ? <NameRealView
                        required_id_type={race.required_id_type}
                        ref={o => this.realName = o}
                    /> : null}

                    {this._inviteCode()}


                    {this._priceView()}

                    {!isEmptyObject(discount) && price ? <Discount
                        discount={discount}
                        handle_value={handle_value => {
                            this.setState({handle_value})
                        }}
                        count={price.replace(/[,]/g, '')}/> : null}

                    <View style={{height: 68, flex: 1}}>
                        <Text style={{
                            color: Colors._AAA,
                            fontSize: 14,
                            marginLeft: 18,
                            marginTop: 12
                        }}>{I18n.t('buy_pay_after')}</Text>

                    </View>


                </KeyboardAwareScrollView>
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
                        <Text style={{fontSize: 14, color: Colors.txt_666}}>{I18n.t('ticket_price')} </Text>

                        <Text style={{fontSize: 18, color: Colors._DF1}}
                              testID="txt_ticket_price">
                            ¥{handle_value ? this.discounted(unformatted_price) : price}
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
                        <Text style={{fontSize: 12, color: Colors.txt_666}}>{I18n.t('customer_service')}</Text>
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
                        <Text style={{
                            fontSize: 18,
                            color: ordered ? Colors.white : Colors.txt_E0C
                        }}>{I18n.t('xia_dan')}</Text>
                    </TouchableOpacity>


                </View>

                <PayModal
                    invitePrice={this._isDiscount() ? this.couponPrice(unformatted_price) : ''}
                    toOrder={true}
                    ref={ref => this.payModal = ref}/>
            </View>
        )
    }


    _inviteCode = () => {
        return (<View style={{
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: 'white', marginTop: 8
        }}>
            <Text style={{
                marginLeft: 18, fontSize: 14,
                color: Colors._333, marginRight: 8
            }}>{I18n.t('buy_invite')}</Text>
            <TextInput
                style={{height: 50, flex: 1, fontSize: 14}}
                placeholder={I18n.t('buy_invite_placeholder')}
                onChangeText={(inviteCode) => {
                    this.setState({inviteCode});
                    postInvite({invite_code: inviteCode}, data => {
                        this.setState({
                            invitePrice: data.invite_code
                        })
                    }, err => {
                        this.setState({
                            invitePrice: {}
                        })
                    })
                }}
            />
        </View>)
    };

    _priceView = () => {
        const {tickets, handle_value} = this.state;
        if (isEmptyObject(tickets))
            return;
        const {original_price, price, unformatted_price} = tickets;
        return (<View style={{backgroundColor: 'white', marginTop: 8}}>
            <View style={{height: 35}}>
                <Text style={{
                    fontSize: 15, color: Colors._333, fontWeight: 'bold',
                    marginLeft: 18, marginTop: 10, marginBottom: 10
                }}>
                    {I18n.t('buy_pay')}</Text>
                <View style={{marginLeft: 18, marginRight: 18, height: 1, backgroundColor: Colors._ECE}}/>
            </View>

            <View style={styles.viewPrice}>
                <Text style={styles.txtPrice1}>{I18n.t('order_price')}</Text>

                <Text
                    style={{
                        color: Colors._AAA,
                        fontSize: 14,
                        marginRight: 18,
                        textDecorationLine: 'line-through'
                    }}>{original_price}</Text>

            </View>

            <View style={styles.viewPrice1}>
                <Text style={styles.txtPrice1}>{I18n.t('order_pay')}</Text>

                <Text
                    style={{
                        color: Colors._DF1, fontSize: 14, marginRight: 17,
                        textDecorationLine: this._isDiscount() ? 'line-through' : 'none'
                    }}>{price}</Text>

            </View>
            {this._isDiscount() ?
                <View style={{marginLeft: 18, marginRight: 18, height: 1, backgroundColor: Colors._ECE}}/> : null}

            {this._invitePrice(unformatted_price)}

        </View>)
    };

    _isDiscount = () => {
        const {invitePrice} = this.state;
        return !isEmptyObject(invitePrice) && invitePrice.coupon_type !== CouponType.no_discount;
    };

    _invitePrice = (price) => {
        const {invitePrice} = this.state;
        if (isEmptyObject(invitePrice))
            return;
        if (invitePrice.coupon_type === CouponType.no_discount)
            return;

        return <View style={styles.viewPrice1}>
            <Text style={styles.txtPrice1}>{I18n.t('discount')}</Text>

            <Text
                style={{
                    color: Colors._DF1,
                    fontSize: 14,
                    marginRight: 17
                }}>{this.couponPrice(price)}</Text>

        </View>
    };

    couponPrice = (price) => {
        const {invitePrice} = this.state;
        if (invitePrice.coupon_type === CouponType.rebate) {
            let discount = Number.parseFloat(price) * Number.parseFloat(invitePrice.coupon_number / 100);
            return discount
        } else if (invitePrice.coupon_type === CouponType.reduce) {
            let discount = Number.parseFloat(price) - Number.parseFloat(invitePrice.coupon_number);
            return discount
        }


    };


    _emailViwe = (email) => {
        return (<View
            style={{
                height: 44, alignItems: 'center', flexDirection: 'row',
                marginTop: 8, backgroundColor: Colors.white
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


        if (isEmptyObject(shipping_address))
            return (<TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    router.toAdrListPage(this.props, this._selectAdr, {});
                }}
                style={{height: 89, flex: 1, marginTop: 8, backgroundColor: Colors.white}}>
                <View style={{height: 44, alignItems: 'center', flexDirection: 'row'}}>

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
        else {
            const {address, address_detail, consignee, mobile} = shipping_address;
            return (<TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    router.toAdrListPage(this.props, this._selectAdr, shipping_address);
                }}
                style={styles.viewAdr}>

                <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 14}}>

                    <Text style={{
                        fontSize: 15, color: Colors.txt_666, marginLeft: 18,
                        marginRight: 9
                    }}>{I18n.t('shopping_addr')}:</Text>
                    <Text style={{fontSize: 14, color: Colors._AAA}}>{I18n.t('shopping_addr_desc')}</Text>

                </View>

                <View style={styles.viewAdrInfo}>
                    <View style={{flex: 1}}>
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
                            style={styles.txtAdrInfo}>{address + address_detail}</Text>

                    </View>
                    <Image style={{width: 11, height: 20, marginRight: 17}}
                           source={Images.ticket_arrow}/>
                </View>
            </TouchableOpacity>)
        }

    }


}


const styles = StyleSheet.create({
    ticketSelect: {
        height: 35, width: 91, borderRadius: 5, borderWidth: 1, borderColor: Colors.txt_F28,
        alignItems: 'center', justifyContent: 'center',
    },
    ticketUnSelect: {
        height: 35, width: 91, borderRadius: 5, backgroundColor: '#E5E5E5',
        alignItems: 'center', justifyContent: 'center',
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
        marginTop: 8
    },
    viewAdrInfo: {
        alignItems: 'center', flexDirection: 'row',
        justifyContent: 'space-between', marginLeft: 18,
        marginTop: 15
    },
    txtAdrInfo: {
        fontSize: 14,
        color: '#666666',
        marginTop: 8
    },
    ViewRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewPrice: {
        flexDirection: 'row', justifyContent: 'space-between',
        height: 40, alignItems: 'center'
    },
    viewPrice1: {
        flexDirection: 'row', justifyContent: 'space-between',
        height: 40, alignItems: 'center'
    },
    txtPrice1: {color: Colors._333, fontSize: 14, marginLeft: 18}


});



