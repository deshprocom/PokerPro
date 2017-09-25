/**
 * Created by lorne on 2017/2/28.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, SecurityText} from '../../components';
import {getLoginUser, strNotNull} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';

export default class SecurityPage extends Component {


    _moblie = () => {
        const {mobile} = getLoginUser();
        if (strNotNull(mobile))
            return mobile;
        else
            return ''

    }

    render() {

        return (<View style={ApplicationStyles.bg_black}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                title={I18n.t('account_security')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

            <View style={{backgroundColor:Colors.setting}}>


                <SetItemView
                    onPress={this._toBindPage}
                    name={I18n.t('phone_num')}
                    testID="btn_phone_num"
                    rightText={this._moblie()}
                    securityOptions={{
                        isSecurity: true,
                        startIndex: 3,
                        endIndex: 7,
                    }}
                />
                <View
                    style={{height:1,marginLeft:17,backgroundColor:Colors.bg_black}}/>
                <SetItemView
                    onPress={()=>{
                        umengEvent('setting_modify_pwd');
                        router.toModifyPwdPage()
                    }}
                    name={I18n.t('modify')}
                    testID="btn_change_password"
                />

            </View>


        </View>)
    }

    _mailCerfitication = () => {
        return ( <SetItemView name={I18n.t('mail')}
                              testID="btn_email_cer"
                              rightText={I18n.t('un_approve')}
        />)
    };

    _toBindPage = () => {
        umengEvent('setting_mobile');
        if (strNotNull(login_user.mobile)) {
            router.toChangePhonePage()
        } else {
            router.toBindingPhonePage();
        }
    }
}