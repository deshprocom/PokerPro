/**
 * Created by lorne on 2017/2/20.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {convertDate, YYYY_MM_DD, isEmptyObject, moneyFormat} from '../../utils/ComonHelper'
import {Verified, OrderStatus} from '../../configs/Status';

export default class RaceInfoView extends Component {

    static propTypes = {
        raceInfo: PropTypes.object,
        router: PropTypes.object,
        disabled: PropTypes.bool,
        orderInfo: PropTypes.object

    };


    _ticket_price = (ticket) => {
        if (!isEmptyObject(ticket))
            return (<View style={styles.viewPrice}>
                <Text style={styles.lbPrice}>金额:</Text>
                <Text style={styles.txtPrice}>  {ticket.price}</Text>

            </View>);

    };

    _orderName = () => {
        const {ticket} = this.props;
        if (!isEmptyObject(ticket))
            return (   <Text testID="txt_races_title"
                             style={{fontSize:15,color:Colors.txt_444}}
                             numberOfLines={2}>{ticket.title}</Text>)
    };

    raceView = () => {
        const {raceInfo, ticket} = this.props;
        if (!isEmptyObject(raceInfo))
            return (  <View style={{height:115,flex:1}}>

                {this._orderName()}

                <Text testID="txt_races_period"
                      style={{fontSize:12,color:Colors._888,
                            marginTop:15}}
                      numberOfLines={1}>{convertDate(raceInfo.begin_date, YYYY_MM_DD)
                + '-' + convertDate(raceInfo.end_date, YYYY_MM_DD)}</Text>
                <Text testID="txt_races_address"
                      style={{fontSize:12,color:Colors._888,
                            marginTop:4,marginBottom:19}}
                      numberOfLines={1}>{raceInfo.location}</Text>
                {this._ticket_price(ticket)}

            </View>)


    }

    logoUrl = () => {
        const {raceInfo} = this.props;
        if (!isEmptyObject(raceInfo))
            return raceInfo.logo;
    };

    _btnClick = () => {
        const {ticket, raceInfo} = this.props;
        if (!isEmptyObject(ticket)) {
            const {ticket_class, id} = ticket;
            if (ticket_class === 'package_ticket')
                router.toTicketInfoPage(this.props, raceInfo.race_id, id)
            else
                router.toRacesInfoPage(this.props, raceInfo.race_id, true)
        }
    };

    render() {
        const {raceInfo, disabled} = this.props;
        return (  <TouchableOpacity
            disabled={disabled}
            testID="btn_race_detail"
            onPress={this._btnClick}
            activeOpacity={1}
            style={{height:149,width:Metrics.screenWidth,
                    flexDirection:'row',alignItems:'center',
                    backgroundColor:Colors.white}}>
            <Image style={{height:115,width:81,
                        marginLeft:17,marginRight:13}}
                   source={{uri:this.logoUrl()}}
            />

            {/*赛事详情*/}
            {this.raceView()}

            {disabled ? null : <View style={{flexDirection:'row',alignItems:'center',
                        height:149,justifyContent:'center',width:45}}>
                    <Image style={{height:20,width:11}}
                           source={Images.ticket_arrow}/>

                </View>}

            {this._realNameStatus()}

        </TouchableOpacity>)
    }

    _realNameStatus = () => {
        const {orderInfo} = this.props;
        if (!isEmptyObject(orderInfo) && orderInfo.status === OrderStatus.unpaid
            && !isEmptyObject(user_extra)) {
            if (user_extra.status === Verified.FAILED)
                return (<Image
                    testID="im_failed"
                    style={{height:51,width:58,position:'absolute',top:47,right:17}}
                    source={Images.user_real_failed}/>);
            else if (user_extra.status === Verified.PENDING) {
                return (<Image
                    testID="im_pending"
                    style={{height:51,width:58,position:'absolute',top:47,right:17}}
                    source={Images.user_real_pending}/>)
            }
        }
    }
}

const styles = StyleSheet.create({
    viewPrice: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lbPrice: {
        fontSize: Fonts.size.h12,
        color: Colors._888,
    },
    txtPrice: {
        fontSize: Fonts.size.h15,
        color: '#DF1D0F',
    }
});