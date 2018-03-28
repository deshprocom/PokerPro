/**
 * Created by lorne on 2017/6/1.
 */

import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, Platform, InteractionManager,
    Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView, NavigationBar, ImageLoad, ActionSide} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {getSelectRaceTicket, getUnpaidOrder} from '../../services/OrderDao';
import {subRaces} from '../../services/RacesDao';
import {isEmptyObject, convertDate, strNotNull, uShareChoiseTicket} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';

const RACE_MAIN = 'RACE_MAIN',
    RACE_SIDE = 'RACE_SIDE',
    ONLY_TICKET = 'ONLY_TICKET',
    TICKETS = 'TICKETS';

export default class ChoiseTicketPage extends Component {

    state = {
        selectRace: '',
        selectRaceData: {},
        selectSub: {},
        sub_races: [],
        ticket: {}

    };

    componentDidMount() {
        this._fetchRaceTicket();
    }

    _fetchRaceTicket = () => {
        const {race_id} = this.props.params;
        let body = {
            race_id: race_id,
            type: 'tradable'
        };

        subRaces(body, data => {

            this.setState({
                sub_races: data.items
            })
        }, err => {

        });
        getSelectRaceTicket(body, (data) => {

            this.setState({
                selectRaceData: data,
                selectRace: data.tickets.length > 0 ? RACE_MAIN : ''
            });
            if (this.listView && data.tickets.length > 0)
                this.listView.updateDataSource(data.tickets);
        }, (err) => {

        })
    };

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            {this.topBar()}

            {this.listTicketView()}

            {this.bottomBar()}

            <ActionSide
                getSubTicket={this._getSubTicket}
                ref={ref => this.actionSide = ref}/>

        </View>)
    }


    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('selectTicket')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{
                    height: 19, width: 11,
                    marginLeft: 20, marginRight: 20
                }}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.share}
                rightImageStyle={{height:22,width:22,resizeMode:'contain',marginRight:25}}
                rightBtnPress={() => {
                    const {race, tickets} = this.state.selectRaceData;

                    if (!isEmptyObject(race) && !isEmptyObject(tickets)) {
                        const {name, location,logo, race_id,begin_date,end_date} = race;
                        let time=convertDate(begin_date, 'YYYY.MM.DD') + "-" + convertDate(end_date, 'YYYY.MM.DD');
                        uShareChoiseTicket(name, I18n.t('address') + location , time, logo, race_id)
                    }

                }}/>

        </View>)
    };

    showSubTicket = () => {
        const {sub_races} = this.state;
        this.actionSide.setData(sub_races);
        this.actionSide.show();

    };

    _getSubTicket = (item) => {

        const {race_id} = item;
        let body = {
            race_id: race_id
        };
        getSelectRaceTicket(body, (data) => {
            console.log('subData', data);
            this.setState({
                selectSub: data
            });
            this.listView.updateDataSource(this._listTicket(RACE_SIDE));
        })

    };

    titleView = () => {

        return (<View style={styles.viewTitle}>
            {this.titleTxtView()}
        </View>)

    };

    titleTxtView = () => {
        const {race} = this.state.selectRaceData;
        if (!isEmptyObject(race)) {
            const {location, name} = race;
            return ( <Text style={styles.txtTitle}>[{location}]{name}</Text>)
        }


    };

    _selectSub = () => {
        const {race} = this.state.selectSub;
        if (isEmptyObject(race))
            return I18n.t('pleaseSelectRace');
        else
            return race.name
    };


    raceTypeView = () => {
        const {selectRace} = this.state;
        return (<View style={styles.viewRace}>
            <Text style={styles.txtSelectRace}>{I18n.t('selectRace')}</Text>
            <View style={styles.viewMainSide}>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this._selectRace(RACE_MAIN);
                        umengEvent('ticket_main')
                    }}
                    style={this._selectedBg(selectRace === RACE_MAIN)}>
                    <Text style={this._selectTxt(selectRace === RACE_MAIN)}>{I18n.t('mainRace')}</Text>
                </TouchableOpacity>
                {this.btnSideDisabled() ? <TouchableOpacity
                    activeOpacity={1}
                    disabled={!this.btnSideDisabled()}
                    onPress={() => {
                        umengEvent('ticket_side');
                        this._selectRace(RACE_SIDE);
                        this.showSubTicket();
                    }}
                    style={[this._selectedBg(selectRace === RACE_SIDE), styles.marginLeft]}>
                    <Text style={this.btnSideDisabled() ?
                        this._selectTxt(selectRace === RACE_SIDE) :
                        styles.txtDisabled}>{I18n.t('sideRace')}</Text>
                </TouchableOpacity> : null}

            </View>

        </View>)
    };

    btnSideDisabled = () => {
        const {sub_races} = this.state;
        return !isEmptyObject(sub_races) && sub_races.length > 0
    };


    listTicketView = () => {
        const {selectRace} = this.state;
        return (<UltimateListView
            style={styles.margin}
            ref={(ref) => this.listView = ref}
            refreshable={false}
            firstLoader={false}
            onFetch={this.onFetch}
            legacyImplementation
            item={this.itemListView}
            headerView={() => {
                return (<View>
                    {this.titleView()}

                    {this.raceTypeView()}

                    {selectRace === RACE_SIDE ? this.selectSideView() : null}


                    <View style={{height: 10}}/>


                </View>)
            }}
            separator={() => {
                return <View style={styles.separator}/>
            }}
            emptyView={() => {
                return this.props.error ? <LoadErrorView/> : <View/>;
            }}
        />)
    };

    selectSubImg = () => {
        const {selectSub} = this.state;
        return isEmptyObject(selectSub) ? Images.down_triangle : Images.up_triangle
    };

    _txtSub = () => {
        const {selectSub} = this.state;

        return isEmptyObject(selectSub) ? styles.lbSelect : styles.txtSub
    };

    selectSideView = () => {
        return (<TouchableOpacity
            onPress={() => {
                this.showSubTicket();
            }}
            style={styles.viewSide}>
            <View style={{flex: 1}}/>
            <Text style={this._txtSub()}>{this._selectSub()}</Text>
            <View style={{flex: 1}}>
                <Image
                    resizeMode={'contain'}
                    style={styles.imgDown}
                    source={this.selectSubImg()}/>
            </View>
        </TouchableOpacity>)
    };

    _logo = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;
        return isEmptyObject(race) ? '' : race.logo;
    };

    _location = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;
        if (!isEmptyObject(race)) {
            const {location} = race;
            return location;
        }
    };

    _date = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;
        if (!isEmptyObject(race)) {
            const {end_date, begin_date} = race;
            return convertDate(begin_date, 'YYYY.MM.DD') + "-" + convertDate(end_date, 'YYYY.MM.DD')
        }
    };

    _selectItemStyle = (rowData) => {
        const {ticket} = this.state;
        return rowData.id !== ticket.id ? styles.itemView : styles.selectMain

    };

    itemListView = (rowData) => {

        const {original_price, price, ticket_info, title} = rowData;


        return (<TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                this.setState({
                    ticket: rowData
                })
            }}
            style={this._selectItemStyle(rowData)}>
            <ImageLoad
                source={{uri: this._logo()}}
                style={styles.itemImg}/>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={2}
                    style={styles.txtItemTitle}>{title}</Text>

                <Text style={styles.txtLabel}>{this._date()}</Text>
                <Text style={styles.txtLabel}>{I18n.t('location')}: {this._location()}</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.txtPrice}>¥{price}</Text>
                    <View style={styles.viewNum}>
                        <Text style={styles.lbNum}> ({I18n.t('surplus')}</Text>
                        <Text style={styles.txtNum}>{this._ticketNum(ticket_info)}</Text>
                        <Text style={styles.lbNum}>{I18n.t('spread')})</Text>
                    </View>

                    <View style={{flex: 1}}/>

                    <TouchableOpacity
                        onPress={() => this._toTicketInfo(rowData)}
                        style={styles.btnInfo}>
                        <Text style={styles.btnTxt}>{I18n.t('lookDetail')}</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </TouchableOpacity>)
    };

    _ticketNum = (ticket_info) => {
        if (!isEmptyObject(ticket_info)) {
            const {e_ticket_number, e_ticket_sold_number, entity_ticket_number, entity_ticket_sold_number} = ticket_info;
            return e_ticket_number + entity_ticket_number - e_ticket_sold_number - entity_ticket_sold_number;
        }

    };

    _toTicketInfo = (rowData) => {
        const {selectRace, selectSub, selectRaceData} = this.state;
        const {id, ticket_class} = rowData;
        if (selectRace === RACE_MAIN && id) {
            const {race_id} = selectRaceData.race;
            if (ticket_class === "single_ticket")
                router.toRacesInfoPage(this.props, race_id, false);
            else
                router.toTicketInfoPage(this.props, race_id, id)
        } else if (selectRace === RACE_SIDE && id) {
            const {race_id} = selectSub.race;
            if (ticket_class === "single_ticket")
                router.toRacesInfoPage(this.props, race_id, false);
            else
                router.toTicketInfoPage(this.props, race_id, id)
        }

    };


    onFetch = (page = 1, startFetch, abortFetch) => {

    };


    _btnOkStyle = () => {
        const {ticket} = this.state;
        let num = this._ticketNum(ticket.ticket_info);
        return ticket.status === "selling" && num > 0 ?
            styles.viewBtnOk : [styles.viewBtnOk, styles.btnDisable]


    };

    _btnOkDisabled = () => {
        const {ticket} = this.state;
        let num = this._ticketNum(ticket.ticket_info);
        return !(ticket.status === "selling" && num > 0 );
    };

    bottomBar = () => {

        return (<View style={styles.viewBottom}>
            <Text style={styles.txtMoney}>{I18n.t('price')}: </Text>
            <Text style={styles.txtMoneyNum}> ¥{this._prize()}</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                onPress={this._toBuy}
                disabled={this._btnOkDisabled()}
                style={this._btnOkStyle()}>
                <Text style={styles.txtBtnOk}>{this._txtTicketStatus()}</Text>

            </TouchableOpacity>

        </View>)
    };

    _txtTicketStatus = () => {
        const {ticket} = this.state;
        if (isEmptyObject(ticket))
            return I18n.t('selectOk');
        else
            return this._txtTicketBuy(ticket.status)

    };

    _txtTicketBuy = (status) => {
        switch (status) {
            case 'unsold':
                return I18n.t('ticket_unsold');
            case 'selling':
                return I18n.t('selectOk');
            case 'end':
                return I18n.t('ticket_end');
            case 'sold_out':
                return I18n.t('ticket_sold_out');
        }
    };

    _toBuy = () => {

        if (isEmptyObject(global.login_user)) {
            router.toLoginFirstPage()
        } else {
            umengEvent('ticket_contain');
            const {selectRace, selectSub, selectRaceData, ticket} = this.state;
            const {id} = ticket;
            let raceId = '';
            if (selectRace === RACE_MAIN && id) {
                const {race_id} = selectRaceData.race;
                raceId = race_id;
            } else if (selectRace === RACE_SIDE && id) {
                const {race_id} = selectSub.race;
                raceId = race_id;
            }

            const body = {
                race_id: raceId,
                ticket_id: id
            };

            getUnpaidOrder(body, data => {
                if (strNotNull(data.order_number))
                    router.toOrderInfoPage(this.props, data.order_number)
                else
                    router.toBuyTicketPage(this.props, raceId, id)

            }, err => {
                router.toBuyTicketPage(this.props, raceId, id)
            })
        }


    };

    _prize = () => {
        const {selectRaceData, ticket, selectRace, selectSub} = this.state;

        if (!isEmptyObject(ticket)) {
            return ticket.price
        } else if (selectRace === RACE_MAIN && !isEmptyObject(selectRaceData)) {
            const {max_price, min_price} = selectRaceData;
            if (strNotNull(max_price) && strNotNull(min_price))
                return min_price + '-' +
                    max_price;
        } else if (selectRace === RACE_SIDE && !isEmptyObject(selectSub)) {
            const {max_price, min_price} = selectSub;
            if (strNotNull(max_price) && strNotNull(min_price))
                return min_price + '-' +
                    max_price;
        }
    };

    _selectedBg = (select) => {
        return select ? styles.viewSelected : styles.viewSelect;
    };

    _selectTxt = (select) => {
        return select ? styles.txtSelected : styles.txtSelect;
    };

    _selectRace = (race) => {

        this.setState({
            selectRace: race,
            ticket: {}
        });
        if (race !== this.state.selectRace)
            this.listView.updateDataSource(this._listTicket(race));
    };

    _listTicket = (selectRace) => {
        let {selectRaceData, selectSub} = this.state;
        if (selectRace === RACE_MAIN) {
            const {tickets} = selectRaceData;
            return tickets;
        } else if (selectRace === RACE_SIDE && !isEmptyObject(selectSub)) {
            const {tickets} = selectSub;
            return tickets;
        }
    };


}


const styles = StyleSheet.create({
    topView: {
        backgroundColor: 'rgba(255,255,255,0.98)'
    },
    viewTitle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: 5
    },
    txtTitle: {
        fontSize: 16,
        color: '#444444',
        marginLeft: 17
    },
    barTitle: {
        fontSize: 18,
        color: Colors._161817
    },
    viewRace: {
        height: 100,
        paddingLeft: 17,
        backgroundColor: 'white',
        marginTop: 5
    },
    txtSelectRace: {
        fontSize: 15,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 13,
        marginBottom: 13
    },
    viewMainSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewSelected: {
        height: 36,
        width: 94,
        backgroundColor: '#000000',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSelected: {
        fontSize: 15,
        color: '#E4D57F'
    },
    viewSelect: {
        height: 36,
        width: 94,
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSelect: {
        fontSize: 15,
        color: '#444444'
    },
    txtDisabled: {
        fontSize: 15,
        color: '#AAAAAA'
    },
    marginLeft: {
        marginLeft: 20
    },
    itemView: {
        flexDirection: 'row',
        paddingLeft: 17,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white'
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
        lineHeight: 20,
        height: 45
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
    viewBottom: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    },
    txtMoney: {
        fontSize: 14,
        color: Colors._161817,
        fontWeight: 'bold',
        marginTop: 3
    },
    txtMoneyNum: {
        fontSize: 20,
        color: '#DF1D0F',
        fontWeight: 'bold',
    },
    viewBtnOk: {
        width: 92,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DF1D0F'
    },
    txtBtnOk: {
        fontSize: 18,
        color: 'white'
    },
    viewInfo: {
        marginTop: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnInfo: {
        height: 25,
        width: 66,
        borderRadius: 2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DDDDDD',
        marginRight: 7
    },
    btnTxt: {
        fontSize: 12,
        color: '#666666',
        fontWeight: 'bold',
    },
    viewSide: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    lbSelect: {
        color: '#CCCCCC',
        fontSize: 15,
    },
    imgDown: {
        width: 16,
        height: 10,
        alignSelf: 'flex-end',
        marginRight: 35
    },
    btnDisable: {
        backgroundColor: '#cccccc'
    },
    txtSub: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444444'
    },
    selectMain: {
        borderWidth: 2,
        borderColor: '#FF8888',
        flexDirection: 'row',
        paddingLeft: 17,
        backgroundColor: 'white'
    },
    margin: {
        marginBottom: 60
    },
    viewNum: {
        flexDirection: 'row'
    },
    lbNum: {
        fontSize: 14,
        color: '#666666'
    },
    txtNum: {
        fontSize: 14,
        color: '#DF1D0F'
    },
    imgShare: {
        height: 22,
        width: 23,
        marginRight: 24.8
    }

});