import React, {Component} from 'react';
import {
    AppRegistry,TouchableOpacity,
    StyleSheet,
    Text, Image,
    View
} from 'react-native';
import {Images,Colors} from '../../Themes';
import {styles} from './Styles';
import {init} from '../../services/ConfigDao';
import {strNotNull, isEmptyObject, getLoginUser,getUserData} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';
import {getMainBanners} from '../../services/NewsDao';
import I18n from 'react-native-i18n';


export default class Personal extends Component {

    componentDidMount() {
        console.log(global.login_user)

    }
    render() {

        return (
            <View>

                <TouchableOpacity style={{backgroundColor:'red',alignItems:'center',justifyContent:'center',opacity:0.7}} onPress={()=>{
                    if (!isEmptyObject(login_user)){
                             router.toPersonPage()
                    }else{
                        router.toLoginFirstPage()
                    }
                           }
                        }>
                    <View style={{width:88,height:88,borderRadius:44,marginTop:48,backgroundColor:'#000000',opacity:0.3,alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:77,height:77,borderRadius:39,backgroundColor:'#FFE9AD',alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:74,height:74,borderRadius:37}} source={Images.pukes}/>
                        </View>
                    </View>
                    <Text style={{fontSize:17,fontFamily:'PingFangSC-Regular',color:'#888888',fontWeight:'bold'}}>Deshpro</Text>
                    <Text style={{fontSize:15,fontFamily:'PingFangSC-Regular',color:'#888888'}}>{I18n.t('ple_sign')}</Text>
                    <Text style={{fontSize:12,fontFamily:'PingFangSC-Regular',color:'#888888',marginBottom:12}}>ID:111111111</Text>
                </TouchableOpacity>

                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.personalView} onPress={() => {
                        umengEvent('more_order');
                        if (strNotNull(getLoginUser().user_id))
                            router.toOrderListPage();
                        else
                            router.toLoginFirstPage()
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width:18,height:22}} source={Images.order}/>
                            <Text style={styles.personalText}>{I18n.t('order')}</Text>
                            <Image style={styles.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personalView,{marginTop:1}]} onPress={() => {
                        umengEvent('home_notification');
                        if (isEmptyObject(login_user)) {
                            router.toLoginFirstPage()
                        } else {
                            this.setState({
                                badge: false
                            });
                            JpushHelp.iosSetBadge(0);
                            router.toMessageCenter()
                        }
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width:18,height:22}} source={Images.speaker}/>
                            <Text style={styles.personalText}>{I18n.t('message')}</Text>
                            <Image style={styles.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personalView,{marginTop:1}]} onPress={() => {
                        umengEvent('more_business');
                        router.toBusinessPage()
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width:21,height:20}} source={Images.business}/>
                            <Text style={styles.personalText}>{I18n.t('business_cooperation')}</Text>
                            <Image style={styles.personalImgBusiness} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personalView,{marginTop:10}]} onPress={() => {
                        router.toSettingPage()
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width:23,height:23}} source={Images.settings}/>
                            <Text style={styles.personalText}>{I18n.t('setting')}</Text>
                            <Image style={styles.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}
