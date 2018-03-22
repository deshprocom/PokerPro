/**
 * Created by lorne on 2017/5/31.
 */
import React from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import I18n from 'react-native-i18n';
import {convertDate, ticketStatusConvert, FontSize, strNotNull} from '../../utils/ComonHelper';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ImageLoad} from '../../components';

export const itemListView = (item, index) => {
    const {
        begin_date, logo, describable, end_date,
        followed, location, name, ordered, prize, race_id,
        status, ticket_status, ticket_sellable,
        min_price
    } = item;
    return (
        <TouchableOpacity
            testID={'btn_ticket_row_' + index}
            onPress={() =>
                router.toRacesInfoPage(this.props, race_id, false)}
            disabled={!describable}
            activeOpacity={1}>
            <View style={styles.marginLine}/>

            <Image source={Images.item_sale}
                   resizeMode="cover"
                   style={styles.bg_img}/>


            <View style={styles.itemView}>
                <ImageLoad defaultSource={Images.empty_ticket}
                           source={{uri: logo}}
                           style={styles.itemImg}/>
                <View style={styles.itemInfo}>
                    <Text
                        numberOfLines={2}
                        style={[styles.itemTitle]}>{name}</Text>

                    <View style={styles.viewLocation}>
                        <Image source={Images.home_adr}
                               style={styles.img_ico}/>
                        <Text numberOfLines={1}
                              style={styles.itemAddr}>{location}</Text>
                    </View>

                    <View style={styles.view_time}>
                        <Image source={Images.home_clock}
                               style={{width: 10, height: 10}}/>
                        <Text style={[styles.itemTime]}>
                            {convertDate(begin_date, 'YYYY.MM.DD') + '-' + convertDate(end_date, 'YYYY.MM.DD')}</Text>
                    </View>

                    {this.prizeView(min_price)}

                </View>
                {ticket_sellable ? <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this._buyTicket(item)}
                    style={sellStyle(ticket_status)}>
                    <Text style={sellTxt(ticket_status)}>{this._txtTicketStatus(ticket_status)}</Text>
                </TouchableOpacity> : null}
            </View>

        </TouchableOpacity>
    )
};


_buyTicket = (rowData) => {
    router.toChoiseTicketPage(this.props, rowData.race_id);
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
            return I18n.t('ticket_sold_out');
    }
};


prizeView = (prize) => {
    if (strNotNull(prize))
        return <View style={styles.price_view}>
            <Text style={{color: '#454545', fontSize: 13}}>{I18n.t('prize')}</Text>
            <Text numberOfLines={1}
                  style={[styles.itemPrice]}> ¥{prize}</Text>
        </View>
};

function sellStyle(status) {
    return status === 'selling' ? styles.itemSell : [styles.itemSell, {borderColor: Colors._CCC}]
}

function sellTxt(status) {
    return status === 'selling' ? styles.sellTxt : styles.statusTxt
}

const styles = StyleSheet.create({
    img_ico: {
        width: 9,
        height: 13
    },
    viewLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    view_time: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    price_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    itemImg: {
        width: 67,
        height: 95,
        marginLeft: 12
    },
    itemView: {
        height: 140,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    bg_img: {
        backgroundColor: 'transparent',
        height: 140,
        marginLeft: '1%',
        marginRight: '1%',
        width: '98%'
    },
    itemTitle: {
        width: 200,
        color: '#161718',
        alignSelf: 'flex-start',
        marginRight: 70,
        fontSize: 17
    },
    itemTime: {
        color: '#999999',
        alignItems: 'center',
        marginLeft: 5,
        fontSize: 14
    },
    itemAddr: {
        color: '#999999',
        fontSize: 14,
        marginLeft: 5,
        width: 180,

    },
    itemPrice: {
        color: Colors._DF1,
        fontSize: 13,
        width: 120,
    },
    itemInfo: {
        marginLeft: 12,
        // height: 95,
    },
    itemTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    statusTxt: {
        color: Colors._CCC,
        fontSize: 12
    },
    marginLine: {
        height: 5,
    },
    itemSell: {
        height: 32,
        width: 53,
        borderWidth: 1,
        borderColor: '#ED3445',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        top: 53,
        right: 10
    },
    sellTxt: {
        color: '#ED3445',
        fontSize: 12
    }

});