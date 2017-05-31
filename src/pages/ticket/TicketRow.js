/**
 * Created by lorne on 2017/5/31.
 */
import React from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import { convertDate, ticketStatusConvert} from '../../utils/ComonHelper';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import { ImageLoad} from '../../components';

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
            <View style={styles.itemView}>

                <ImageLoad
                    source={{uri:logo}}
                    style={styles.itemImg}/>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{name}</Text>
                    <Text style={styles.itemTime}>
                        {convertDate(begin_date, 'YYYY.MM.DD') + '-' + convertDate(end_date, 'YYYY.MM.DD')}</Text>
                    <Text style={styles.itemAddr}>地址:{location}</Text>

                    <View style={styles.itemTab}>
                        <Text style={styles.itemPrice}>{prize}</Text>

                        <View style={styles.itemStatus}>
                            <Text style={styles.StatusTxt}>{ticketStatusConvert(ticket_status)}</Text>
                        </View>


                    </View>


                </View>
            </View>
            <View style={styles.marginLine}/>

        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    itemImg: {
        width: 80,
        height: 104,
        marginLeft: 17,
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: 140
    },
    itemTitle: {
        height: 44,
        width: 260,
        color: '#444444',
        fontSize: 16,
        alignSelf: 'flex-start',
        lineHeight: 20
    },
    itemTime: {
        color: Colors._AAA,
        fontSize: 12,
        marginTop: 6
    },
    itemAddr: {
        color: Colors._AAA,
        fontSize: 12
    },
    itemPrice: {
        color: Colors._161817,
        fontSize: 16,
    },
    itemInfo: {
        marginLeft: 12,
        height: 104,
    },
    itemTab: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemStatus: {
        height: 21,
        width: 61,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginRight: 14

    },
    StatusTxt: {
        color: Colors.txt_666,
        fontSize: 12
    },
    marginLine: {
        height: 5,
    },


});