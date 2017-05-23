/**
 * Created by lorne on 2017/2/20.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';

export default class BuyKnowPage extends Component {

    render() {
        return (<View testID="page_ticket_notice"
                      style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={this.props.router}
                title={I18n.t('buy_ticket')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>this.props.router.pop()}/>
            <ScrollView>

                <View style={{flexDirection:'row',alignItems:'center',height:66}}>
                    <Image style={{height:18,width:16,marginLeft:18,
                    marginRight:11}}
                           source={Images.ticket_security2}/>
                    <Text style={{fontSize:Fonts.h15,color:Colors.txt_444}}>{I18n.t('ticket_prompt')}</Text>

                </View>
                <View style={{marginLeft:18,marginRight:18}}>
                    <Text style={{fontSize:Fonts.h14,color:Colors._888,textAlign:'justify'}}>
                        1.购买赛事票，赛事当天凭需购票人身份证件登记入场，请务必正确填写参赛的身份证件。
                        {'\n\n'}
                        2.本赛事所有票务暂支持线下付款，订单成功后我们将在及时与您取得联系，请您耐心等待！
                        {'\n\n'}
                        3.本赛事暂不支持在线选座，购票后将随机配票。
                        {'\n\n'}
                        4.本赛事所有订单付款成功后不支持调整和退换，请付款前确保订单地址、身份信息、邮件地址正确，感谢您对扑客的支持！
                        {'\n\n'}
                        5.实体票支付成功后我们将在1-5个工作日内陆续为您配送，请您耐心等待！
                        {'\n\n'}
                        6.电子票支付成功后，我们将赛票信息发送到您预留的邮箱，请及时查收。如若邮箱收不到信息，请及时与客服人员取得联系！
                        {'\n\n'}
                        7.客服服务热线：XXXXXXXXXXX；服务时间：10：30-19:30
                    </Text>

                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:37,marginBottom:10}}>
                    <Image style={{height:18,width:16,marginLeft:18,
                    marginRight:11}}
                           source={Images.ticket_security2}/>
                    <Text style={{fontSize:Fonts.h15,color:Colors.txt_444}}>{I18n.t('e_ticket_buy')}</Text>

                </View>
                <Image
                    resizeMode='contain'
                    style={{height:250,width:Metrics.screenWidth-60,
                    alignSelf:'center'}}
                    source={Images.e_ticket_buy}/>

                <View style={{flexDirection:'row',alignItems:'center',marginTop:37,marginBottom:10}}>
                    <Image style={{height:18,width:16,marginLeft:18,
                    marginRight:11}}
                           source={Images.ticket_security2}/>
                    <Text style={{fontSize:Fonts.h15,color:Colors.txt_444}}>{I18n.t('entity_ticket_buy')}</Text>

                </View>
                <Image
                    resizeMode='contain'
                    style={{height:250,width:Metrics.screenWidth-60,
                    alignSelf:'center'}}
                    source={Images.entity_ticket_buy}/>
                <View style={{height:40}}/>

            </ScrollView>


        </View>)
    }
}
