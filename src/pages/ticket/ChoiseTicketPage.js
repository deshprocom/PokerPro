/**
 * Created by lorne on 2017/6/1.
 */

import React, {Component, PropTypes} from 'react';
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
import {getSelectRaceTicket} from '../../services/OrderDao';
import {subRaces} from '../../services/RacesDao';
import {isEmptyObject, convertDate, strNotNull} from '../../utils/ComonHelper';

const RACE_MAIN = 'RACE_MAIN',
    RACE_SIDE = 'RACE_SIDE',
    ONLY_TICKET = 'ONLY_TICKET',
    TICKETS = 'TICKETS';

export default class ChoiseTicketPage extends Component {

    state = {
        selectRace: '',
        selectTicket: '',
        selectRaceData: {},
        selectSub: {},
        sub_races: [],
        ticket: {}

    };

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this._fetchRaceTicket();
        })
    }

    _fetchRaceTicket = () => {
        const {race_id} = this.props.params;
        let body = {
            race_id: race_id
        };

        subRaces(body, data => {
            router.log('subRace', data)
            this.setState({
                sub_races: data.items
            })
        }, err => {

        });
        getSelectRaceTicket(body, (data) => {
            router.log('data', data);
            this.setState({
                selectRaceData: data
            })
        }, (err) => {

        })
    };


    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            {this.topBar()}

            {this.listTicketView()}

            {this.bottomBar()}

            <ActionSide
                ref={ref=>this.actionSide = ref}/>

        </View>)
    }

    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                barStyle="dark-content"
                title={I18n.t('selectTicket')}
                titleStyle={styles.barTitle}
                leftBtnIcon={Images.ic_back}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

        </View>)
    };

    showSubTicket = () => {
        const {sub_races} = this.state;
        this.actionSide.setData(sub_races);
        this.actionSide.show();

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
                    onPress={()=>{

                        this._selectRace(RACE_MAIN)
                    }}
                    style={this._selectedBg(selectRace === RACE_MAIN)}>
                    <Text style={this._selectTxt(selectRace === RACE_MAIN)}>{I18n.t('mainRace')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!this.btnSideDisabled()}
                    onPress={()=>{

                        this._selectRace(RACE_SIDE)
                    }}
                    style={[this._selectedBg(selectRace === RACE_SIDE),styles.marginLeft]}>
                    <Text style={this.btnSideDisabled()?
                        this._selectTxt(selectRace === RACE_SIDE):
                        styles.txtDisabled}>{I18n.t('sideRace')}</Text>
                </TouchableOpacity>
            </View>

        </View>)
    };

    btnSideDisabled = () => {
        const {sub_races} = this.state;
        return !isEmptyObject(sub_races) && sub_races.length > 0
    };


    ticketTypeView = () => {
        const {selectTicket} = this.state;

        return (<View style={styles.viewRace}>
            <Text style={styles.txtSelectRace}>{I18n.t('ticketType')}</Text>
            <View style={styles.viewMainSide}>

                <TouchableOpacity
                    disabled={!this._single_tickets()}
                    onPress={()=>{
                        this.listView.updateDataSource([]);
                        this._selectTicket(ONLY_TICKET)
                    }}
                    style={this._selectedBg(ONLY_TICKET === selectTicket)}>
                    <Text style={this._single_tickets()?this._selectTxt(ONLY_TICKET === selectTicket):
                     styles.txtDisabled}>{I18n.t('onlyRace')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!this._package_tickets()}
                    onPress={()=>{
                         this._selectTicket(TICKETS);
                         this.listView.updateDataSource(this._listTicket());

                    }}
                    style={[this._selectedBg(TICKETS === selectTicket),styles.marginLeft]}>
                    <Text style={this._package_tickets()?
                    this._selectTxt(TICKETS === selectTicket):
                    styles.txtDisabled}>{I18n.t('ticketBinds')}</Text>
                </TouchableOpacity>
            </View>
        </View>)
    };

    _single_tickets = () => {
        const {selectSub, selectRaceData, selectRace} = this.state;
        if (selectRace === RACE_MAIN) {
            let {single_tickets} = selectRaceData;
            return !isEmptyObject(single_tickets) && single_tickets.length > 0
        } else if (selectRace === RACE_SIDE) {
            let {single_tickets} = selectSub;
            return !isEmptyObject(single_tickets) && single_tickets.length > 0
        }
    };

    _package_tickets = () => {
        const {selectSub, selectRaceData, selectRace} = this.state;
        if (selectRace === RACE_MAIN) {
            let {package_tickets} = selectRaceData;
            return !isEmptyObject(package_tickets) && package_tickets.length > 0
        } else if (selectRace === RACE_SIDE) {
            let {package_tickets} = selectSub;
            return !isEmptyObject(package_tickets) && package_tickets.length > 0
        }


    };

    listTicketView = () => {
        const {selectRace} = this.state;
        return (<UltimateListView
            ref={(ref) => this.listView = ref}
            refreshable={false}
            firstLoader={false}
            onFetch={this.onFetch}
            legacyImplementation
            rowView={this.itemListView}
            headerView={()=>{
              return(<View>
            {this.titleView()}

            {this.raceTypeView()}

            {selectRace===RACE_SIDE?this.selectSideView():null}

            {strNotNull(selectRace)?this.ticketTypeView():null}

            <View style={{height:10}}/>


</View>)
            }}
            separator={() => {
            return <View style={styles.separator}/>
        }}
            emptyView={()=>{
                    return this.props.error? <LoadErrorView/>: <View/>;
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
            onPress={()=>{
               this.showSubTicket();
            }}
            style={styles.viewSide}>
            <View style={{flex:1}}/>
            <Text style={this._txtSub()}>{this._selectSub()}</Text>
            <View style={{flex:1}}>
                <Image
                    resizeMode={'contain'}
                    style={styles.imgDown}
                    source={this.selectSubImg()}/>
            </View>
        </TouchableOpacity>)
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

        const {logo, original_price, price, ticket_class, title} = rowData;

        return (<TouchableOpacity
            activeOpacity={1}
            onPress={()=>{
                this.setState({
                    ticket:rowData
                })
            }}
            style={this._selectItemStyle(rowData)}>
            <ImageLoad
                source={{uri:logo}}
                style={styles.itemImg}/>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={2}
                    style={styles.txtItemTitle}>{title}</Text>

                <Text style={[styles.txtLabel,styles.top8]}>{this._date()}</Text>
                <Text style={styles.txtLabel}>{I18n.t('location')}: {this._location()}</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.txtPrice}>{price}</Text>

                    <View style={{flex:1}}/>

                    <TouchableOpacity
                        onPress={()=>this._toTicketInfo(rowData)}
                        style={styles.btnInfo}>
                        <Text style={styles.btnTxt}>{I18n.t('lookDetail')}</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </TouchableOpacity>)
    };

    _toTicketInfo = (rowData) => {
        const {selectRace, selectSub, selectRaceData} = this.state;
        const {id} = rowData;
        if (selectRace === RACE_MAIN && id) {
            const {race_id} = selectRaceData.race;
            router.toTicketInfoPage(this.props, race_id, id)
        } else if (selectRace === RACE_SIDE && id) {
            const {race_id} = selectSub.race;
            router.toTicketInfoPage(this.props, race_id, id)
        }


    };

    onFetch = (page = 1, startFetch, abortFetch) => {

    };


    _btnOkStyle = () => {
        const {ticket} = this.state;
        return !isEmptyObject(ticket) ?
            styles.viewBtnOk : [styles.viewBtnOk, styles.btnDisable]


    };

    _btnOkDisabled = () => {
        const {ticket} = this.state;
        return isEmptyObject(ticket)
    };

    bottomBar = () => {

        return (<View style={styles.viewBottom}>
            <Text style={styles.txtMoney}>{I18n.t('price')}: </Text>
            <Text style={styles.txtMoneyNum}>{this._prize()}</Text>
            <View style={{flex:1}}/>
            <TouchableOpacity
                onPress={this._toBuy}
                disabled={this._btnOkDisabled()}
                style={this._btnOkStyle()}>
                <Text style={styles.txtBtnOk}>{I18n.t('selectOk')}</Text>

            </TouchableOpacity>

        </View>)
    };

    _toBuy = () => {
        const {selectRace, selectSub, selectRaceData, ticket} = this.state;
        const {id} = ticket;
        if (selectRace === RACE_MAIN && id) {
            const {race_id} = selectRaceData.race;
            router.toBuyTicketPage(this.props, race_id, id)
        } else if (selectRace === RACE_SIDE && id) {
            const {race_id} = selectSub.race;
            router.toBuyTicketPage(this.props, race_id, id)
        }


    };

    _prize = () => {
        const {selectRaceData, ticket, selectSub, selectRace} = this.state;

        if (!isEmptyObject(ticket)) {
            return ticket.price
        } else if (selectRace === RACE_MAIN && !isEmptyObject(selectRaceData)) {
            return selectRaceData.race.ticket_price
        } else if (selectRace === RACE_SIDE && !isEmptyObject(selectSub)) {
            return selectSub.race.ticket_price
        } else if (!isEmptyObject(selectRaceData)) {
            return selectRaceData.race.ticket_price
        }


    };

    _selectedBg = (select) => {
        return select ? styles.viewSelected : styles.viewSelect;
    };

    _selectTxt = (select) => {
        return select ? styles.txtSelected : styles.txtSelect;
    };

    _selectRace = (race) => {
        this.listView.updateDataSource([]);
        this.setState({
            selectRace: race,
            selectTicket: '',
            ticket: {}
        })
    };

    _selectTicket = (ticket) => {

        if (ticket === ONLY_TICKET) {
            this._onlyTicket()
        } else
            this.setState({
                selectTicket: ticket,
                ticket: {}
            })
    };

    _listTicket = () => {
        let {selectRace, selectRaceData, selectSub} = this.state;
        if (selectRace === RACE_MAIN) {
            return selectRaceData.package_tickets
        } else if (selectRace === RACE_SIDE) {
            return selectSub.package_tickets
        }
    };

    _onlyTicket = () => {
        let {selectRace, selectRaceData, selectSub} = this.state;
        let ticket;
        if (selectRace === RACE_MAIN
            && selectRaceData.single_tickets.length > 0) {
            ticket = selectRaceData.single_tickets[0]
        } else if (selectSub.single_tickets.length > 0) {
            ticket = selectSub.single_tickets[0]
        }
        this.setState({
            selectTicket: ONLY_TICKET,
            ticket: ticket
        })

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
    }
});