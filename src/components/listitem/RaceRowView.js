/**
 * Created by lorne on 2017/3/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {
    strNotNull, getLoginUser,
    convertDate, YYYY_MM_DD, racesStatusImage,
    sellable, raceStatusConvert, FontSize
} from '../../utils/ComonHelper';
import {SellStatus} from '../../configs/Status';
import ImageLoad from '../ImageLoad';

export default class RaceRowView extends Component {



    render() {

        const {describable, race_id} = this.props.rowData;
        return (<TouchableOpacity
            disabled={!describable}
            activeOpacity={1}
            testID={'btn_races_' + race_id}
            onPress={() => this._itemClick(this.props.rowData)}>
            {this._itemRender()}
            <View style={this.props.isMoreRace ? styles.viewLine1 : styles.viewLine}/>
        </TouchableOpacity>)
    }


    _itemRender = () => {
        const {
            ticket_sellable
        } = this.props.rowData;
        if (this.props.isMoreRace) {
            return this._itemView();
        } else if (ticket_sellable)
            return (<Image
                style={styles.viewItem}
                source={Images.item_sale}>
                {this._itemView()}

            </Image>);
        else
            return this._itemView();
    };

    _itemView = () => {
        const {
            logo, name, begin_date, end_date, status,
            location, prize, ticket_status, ticket_sellable,
            min_price, describable
        } = this.props.rowData;
        return (<View
            style={this.props.isMoreRace ? styles.backMore : [styles.viewItem,
                {
                    backgroundColor: ticket_sellable ? 'transparent' : 'white'
                }]}>

            <ImageLoad
                defaultSource={Images.empty_image}
                style={styles.imgRace}
                source={{uri: logo}}/>
            <View style={{height: 102}}>
                <View style={{flex: 1}}>
                    <Text
                        style={[ticket_sellable ? styles.txtTitle1 : styles.txtTitle]}
                        numberOfLines={2}>{name}</Text>
                </View>


                <View style={styles.viewClock}>
                    <Image source={Images.home_adr}
                           style={styles.imgAdr}/>

                    <Text
                        numberOfLines={1}
                        style={[ticket_sellable ? styles.txtClock1 : styles.txtClock]}>{location}</Text>

                </View>

                <View style={styles.viewClock}>
                    <Image source={Images.home_clock}
                           style={styles.imgClock}/>

                    <Text style={[styles.txtClock]}>
                        {this._time(begin_date, end_date)}</Text>

                </View>

                {this._priceView(min_price, ticket_sellable)}

            </View>


            {this._ticketStatus(ticket_status, ticket_sellable, describable)}

            <View style={styles.raceStatus}>
                <Image
                    source={this._imgRaceStatus(status)}
                    style={status === 'go_ahead' ? styles.imgRaceStatus1 : styles.imgRaceStatus}/>

                <Text style={this._txtColorStatus(status)}>  {raceStatusConvert(status)}</Text>

            </View>


        </View>)
    };

    _priceView = (prize, ticket_sellable) => {
        if (ticket_sellable && strNotNull(prize))
            return <View style={[styles.viewClock, {marginTop: 3}]}>
                <Text style={[styles.lbPrice, {fontSize: FontSize.h13}]}>{I18n.t('prize')}</Text>
                <Text
                    numberOfLines={1}
                    style={[styles.txtPrice, {fontSize: FontSize.h13}]}> ¥{prize}</Text>

            </View>;

    };


    _ticketStatus = (ticket_status, ticket_sellable, describable) => {
        if (ticket_sellable && (ticket_status === SellStatus.selling
                || ticket_status === 'sold_out'))
            return (    <TouchableOpacity
                disabled={!ticket_status === SellStatus.selling}
                activeOpacity={1}
                onPress={() => this._buyTicket(this.props.rowData)}
                style={[styles.btnStatus, this._colorTicket(ticket_status)]}>
                <Text style={[styles.txtTicket,
                    this._colorTicketTxt(ticket_status)]}
                >{this._txtTicketStatus(ticket_status)}</Text>
            </TouchableOpacity>);
        else if (!describable) {
            return (<View style={styles.btnStatus}>
                <Text style={[styles.txtTicket, {marginLeft: 5, marginRight: 5}]}>{I18n.t('race_no_desc')}</Text>
            </View>)
        }
    };

    _txtTicketStatus = (status) => {
        switch (status) {
            case 'unsold':
                return I18n.t('ticket_unsold');
            case 'selling':
                return I18n.t('home_buy');
            case 'end':
                return I18n.t('ticket_end');
            case 'sold_out':
                return I18n.t('sold_out');
        }
    };


    _colorTicket = (ticket_status) => {
        return ticket_status === "selling" ? {borderColor: '#ed3445'} : {}
    };

    _colorTicketTxt = (ticket_status) => {
        return ticket_status === "selling" ? {color: '#ed3445'} : {}
    };

    _txtColorStatus = (status) => {
        return status === 'go_ahead' ? [styles.txtRaceStatus,
            {color: '#4e97f1'}] : styles.txtRaceStatus
    };

    _imgRaceStatus = (status) => {
        switch (status) {
            case 'unbegin':
                return Images.race_wait;
            case 'go_ahead':
                return Images.race_doing;
            case 'ended':
                return Images.race_end;
            case 'closed':
                return Images.race_unstart;
        }
    };

    _itemClick = (rowData) => {
        router.toRacesInfoPage(this.props, rowData.race_id, false);
    };

    describableView = (describable) => {
        if (describable)
            return ( <View style={{height: 42, width: 2, backgroundColor: '#B89A5D'}}/>)
    };

    _lineView = () => {
        const {rowID} = this.props;
        if (rowID !== '0')
            return (<View style={{height: 1, backgroundColor: '#1F2326', marginLeft: 82}}/>)
    }

    _time = (begin_date, end_date) => {
        let start = convertDate(begin_date, YYYY_MM_DD);
        let end = convertDate(end_date, YYYY_MM_DD);
        return start + "-" + end;
    };

    racesTimeView = (begin_date, end_date) => {
        let start = convertDate(begin_date, YYYY_MM_DD);
        let end = convertDate(end_date, YYYY_MM_DD);
        return ( <Text style={[Fonts.H12, {color: Colors.txt_666, marginTop: 3, marginBottom: 18}]}>
            {start + "-" + end}</Text>)

    };

    prizeView = (prize) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image style={{
                    height: 12, width: 12,
                    marginRight: 10
                }}
                       source={Images.home_prize}/>
                <Text style={{color: '#B89A5D', fontSize: 14}}>{I18n.t('prize') + prize}</Text>
            </View>
        )
    };

    orderedView = (rowData) => {

        const {ticket_sellable, ordered, ticket_status} = rowData;

        if (ordered || sellable(ticket_status))
            return (
                <TouchableOpacity
                    testID={"btn_races_" + rowData.race_id}
                    style={{height: 30, width: 60, alignItems: 'center', justifyContent: 'center'}}
                    activeOpacity={1}
                    onPress={() => this._buyTicket(rowData)}>
                    <Image style={{
                        height: 20, width: 40,
                        marginRight: 17, justifyContent: 'center'
                        , alignItems: 'center'
                    }}
                           source={Images.home_gold}>
                        <Text style={styles.txtBuy}>{I18n.t('home_buy')}</Text>
                    </Image>
                </TouchableOpacity>)

    };


    _buyTicket = (rowData) => {
        router.toChoiseTicketPage(this.props, rowData.race_id);
    };

    statusView = (status) => {
        return (<Image style={[{
            height: 16, width: 37,
            marginRight: 6, marginTop: 7
        }, ApplicationStyles.center]}
                       source={racesStatusImage(status)}/>)
    };


    followView = () => {
        return (<Image style={{
            height: 16, width: 37,
            marginRight: 6, marginTop: 7,
            marginBottom: 17
        }}
                       source={Images.home_follow}/>)
    };

    tabRaces = (followed, status) => {

        if (strNotNull(followed) || strNotNull(status))
            return (
                <View style={{flexDirection: 'row'}}>
                    {strNotNull(status) ? this.statusView(status) : null}
                    {followed ? this.followView() : null}

                </View>)
    };

    monthView = (start_time) => {

        let month = convertDate(start_time, 'MM月');
        let day = convertDate(start_time, 'DD日');

        return (
            <View style={{width: 82, alignItems: 'center'}}>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={[Fonts.H21, {color: '#999999'}]}>{day}</Text>
                    <Text style={[Fonts.H15, {color: '#666666'}]}>{month}</Text>
                </View>
            </View>)
    };
}

const styles = StyleSheet.create({
    txtBuy: {
        color: '#161718',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    txtOrder: {
        color: '#F8DA9E',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    viewItem: {
        height: 140,
        width: Metrics.screenWidth - 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    viewLine: {
        height: 8
    },
    imgRace: {
        height: 102,
        width: 72,
        marginLeft: 8,
        marginRight: 15
    },
    txtTitle: {
        color: '#333333',
        width: 220,
        marginBottom: 5,
        fontSize: 17
    },
    txtTitle1: {
        color: '#333333',
        width: 190,
        marginBottom: 5,
        fontSize: 17
    },
    imgClock: {
        height: 12,
        width: 12
    },
    imgAdr: {
        height: 14,
        width: 10
    },
    txtClock: {
        color: '#888888',
        marginLeft: 5,
        fontSize: 13
    },
    txtClock1: {
        color: '#888888',
        marginLeft: 5,
        width: 170,
        fontSize: 13
    },
    viewClock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    lbPrice: {
        color: Colors._333
    },
    txtPrice: {
        color: Colors._DF1,
    },
    btnStatus: {
        height: 32,
        minWidth: 52,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 3,
        right: 15,
        top: 55
    },
    txtTicket: {
        fontSize: Fonts.size.h14,
        color: '#cccccc',
        backgroundColor: 'transparent'
    },
    raceStatus: {
        position: 'absolute',
        zIndex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        right: 15,
        bottom: 20
    },
    imgRaceStatus: {
        height: 12,
        width: 12
    },
    imgRaceStatus1: {
        height: 12,
        width: 10
    },
    txtRaceStatus: {
        fontSize: Fonts.size.h9,
        color: '#cccccc',
        backgroundColor: 'transparent'
    },
    backMore: {
        marginLeft: 0,
        marginRight: 0,
        height: 140,
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    viewLine1: {
        height: 0.5
    },

})