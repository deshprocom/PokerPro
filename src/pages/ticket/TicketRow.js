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

            <Image source={Images.item_sale}
            resizeMode="cover"
            style={styles.bg_img}>
                <View style={styles.itemView}>
                    <ImageLoad defaultSource={Images.empty_ticket}
                       source={{uri:logo}}
                       style={styles.itemImg}/>
                    {/*<Image*/}
                        {/*defaultSource={Images.empty_ticket}*/}
                        {/*source={{uri:logo}}*/}
                        {/*style={styles.itemImg}/>*/}
                    <View style={styles.itemInfo}>
                        <Text
                            numberOfLines={1}
                            style={styles.itemTitle}>{name}</Text>

                        <View style={styles.viewLocation}>
                            <Image source={Images.race_location}
                                   style={styles.img_ico}/>
                            <Text style={styles.itemAddr}>{I18n.t('location')}:{location}</Text>
                        </View>

                        <View style={styles.view_time}>
                            <Image source={Images.home_clock}
                            style={{width: 10, height: 10}}/>
                            <Text style={styles.itemTime}>
                                {convertDate(begin_date, 'YYYY.MM.DD') + '-' + convertDate(end_date, 'YYYY.MM.DD')}</Text>
                        </View>

                        <View style={styles.price_view}>
                            <Text style={{color: '#454545', fontSize: 13}}>奖池：</Text>
                            <Text style={[styles.itemPrice,{fontSize: 13}]}>{prize}</Text>
                        </View>

                        <View style={sellStyle(ticket_status)}>
                            <Text style={sellTxt(ticket_status)}>{ticketStatusConvert(ticket_status)}</Text>
                        </View>

                        {/*<View style={styles.status_view}>*/}
                            {/*<Image source={Images.race_doing}*/}
                                {/*style={{width: 8, height: 9, alignItems: 'center', marginRight: 5}}/>*/}
                            {/*<Text style={sellTxt(ticket_status)}>{ticketStatusConvert(ticket_status)}</Text>*/}
                        {/*</View>*/}
                    </View>
                </View>
            </Image>

        </TouchableOpacity>
    )
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
        marginTop: 12
    },
    itemImg: {
        width: 67,
        height: 95,
        marginLeft: 12,
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16
    },
    bg_img: {
        backgroundColor: 'transparent',
        height: 127,
        marginLeft: '1%',
        marginRight: '1%',
        width: '98%'
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
        alignItems: 'center',
        marginLeft: 5
    },
    itemAddr: {
        color: '#999999',
        fontSize: 14,
        marginLeft: 5
    },
    itemPrice: {
        color: '#DAA647',
        fontSize: 13
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
        top: 30,
        right: 6
    },
    sellTxt: {
        color: '#ED3445',
        fontSize: 12
    }
    // status_view: {
    //     position: 'absolute',
    //     bottom: 0,
    //     right: '4%',
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // }

});