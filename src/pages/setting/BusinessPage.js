/**
 * Created by lorne on 2017/3/8.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, Button} from '../../components';
import {call} from '../../utils/ComonHelper';

export default class BusinessPage extends Component {

    render() {
        return (<View
            testID="page_business"
            style={ApplicationStyles.bg_black}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                title={I18n.t('business_cooperation')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>
            <View style={{backgroundColor:Colors.setting}}>
                <SetItemView name={I18n.t('business_cooperation')}
                             testID="btn_business_email"
                             rightText={I18n.t('phoebe_email')}
                />

                <View
                    style={{height:1,marginLeft:17,backgroundColor:Colors.bg_black}}/>

                <SetItemView
                    onPress={this._hotLine}
                    name={I18n.t('line')}
                    testID="btn_business_phone"
                    rightText={I18n.t('hot_phone')}
                />
            </View>
        </View>)
    }

    _hotLine = () => {
        Alert.alert(I18n.t('business_cooperation'), I18n.t('hot_phone'),
            [{
                text: I18n.t('cancel'), onPress: () => {
                }
            },
                {
                    text: I18n.t('call'), onPress: () => {
                    call(I18n.t('hot_phone'))
                }
                }])
    }

}