/**
 * Created by lorne on 2017/5/31.
 */
import React from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import {convertDate, ticketStatusConvert} from '../../utils/ComonHelper';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ImageLoad} from '../../components';

export const itemListView = (item, index) => {
    const {
        begin_date, logo, describable, end_date,
        followed, location, name, ordered, prize, race_id,
        status, ticket_status, ticket_sellable
    } = item;
    return (
        <TouchableOpacity
            testID={'btn_ticket_row_'+index}
            onPress={()=>
                router.toRacesInfoPage(this.props, race_id, false)}
            disabled={!describable}
            activeOpacity={1}>
            <View style={styles.marginLine}/>
            <View style={styles.itemView}>

                <Image
                    defaultSource={Images.empty_ticket}
                    source={{uri:logo}}
                    style={styles.itemImg}/>
                <View style={styles.itemInfo}>
                    <Text
                        numberOfLines={1}
                        style={styles.itemTitle}>{name}</Text>
                    <Text style={styles.itemTime}>
                        {convertDate(begin_date, 'YYYY.MM.DD') + '-' + convertDate(end_date, 'YYYY.MM.DD')}</Text>
                    <Text style={styles.itemAddr}>地址:{location}</Text>

                    <Text style={styles.itemPrice}>{prize}</Text>

                    <View style={sellStyle(ticket_status)}>
                        <Text style={sellTxt(ticket_status)}>{ticketStatusConvert(ticket_status)}</Text>
                    </View>


                </View>
            </View>


        </TouchableOpacity>
    )
};

function sellStyle(status) {
    return status === 'selling' ? styles.itemSell : [styles.itemSell, {backgroundColor: '#DDDDDD'}]
}

function sellTxt(status) {
    return status === 'selling' ? styles.sellTxt : styles.statusTxt
}

const styles = StyleSheet.create({
    itemImg: {
        width: 67,
        height: 95,
        marginLeft: 12,
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingTop: 16,
        paddingBottom: 16
    },
    itemTitle: {
        width: 270,
        color: '#161718',
        fontSize: 17,
        alignSelf: 'flex-start'
    },
    itemTime: {
        color: '#999999',
        fontSize: 14,
        marginTop: 19
    },
    itemAddr: {
        color: '#999999',
        fontSize: 14
    },
    itemPrice: {
        color: Colors.txt_price,
        fontSize: 16,
        marginTop: 4
    },
    itemInfo: {
        marginLeft: 12,
        height: 95,
    },
    itemTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    statusTxt: {
        color: Colors.txt_666,
        fontSize: 12
    },
    marginLine: {
        height: 5,
    },
    itemSell: {
        height: 30,
        width: 62,
        backgroundColor: '#F6F2C1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    sellTxt: {
        color: '#B3935E',
        fontSize: 12
    }


});