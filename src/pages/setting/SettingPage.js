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
import {NavigationBar, SetItemView, Button} from '../../components';
import {
    clearLoginUser, getLoginUser, strNotNull,
    isLoginUser, share
} from '../../utils/ComonHelper';
import {fetchGetRecentRaces, _getProfileOk} from '../../actions/RacesAction';
import {umengEvent} from '../../utils/UmengEvent';


class SettingPage extends Component {

    _languageView = () => {
        return ( <SetItemView name='语言（简体中文）'
                              styles={{marginTop:10}}/>)
    };

    _likeView = () => {
        return (
            <SetItemView name='喜欢扑客吗？支持一下'/>)
    };

    _noticeView = () => {
        return (<View>
            <SetItemView name='赛事到来通知提醒'
                         rightType="SWITCH_BTN"/>

            <View
                style={{height:1,marginLeft:17,backgroundColor:Colors.bg_black}}/>

            <SetItemView name='系统通知'
                         rightType="SWITCH_BTN"/>
            <View
                style={{height:1,marginLeft:17,backgroundColor:Colors.bg_black}}/>
        </View>)
    };


    render() {

        return (<View
            testID="page_setting"
            style={ApplicationStyles.bg_black}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={this.props.router}
                title={I18n.t('setting')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>this.props.router.pop()}/>
            <SetItemView
                testID="btn_account_security"
                onPress={()=>{

                    umengEvent('setting_security');
                    if(isLoginUser())
                        this.props.router.toSecurityPage();
                    else
                        this.props.router.toLoginFirstPage();
                }}
                name={I18n.t('account_security')}
                styles={{marginTop:5}}/>


            <View style={{backgroundColor:Colors.setting,marginTop:10}}>
                <SetItemView
                    onPress={()=>this.props.router.toBusinessPage()}
                    testID="btn_business_cooperation"
                    name={I18n.t('business_cooperation')}/>
                <View
                    style={{height:1,marginLeft:17,backgroundColor:Colors.bg_black}}/>
                <SetItemView
                    onPress={()=>{
                        umengEvent('setting_recommend');
                        share("分享扑客给好友","http://www.deshpro.com")
                    }}
                    testID="btn_share"
                    name='推荐扑客给我的德州圈好友'/>


            </View>
            <View style={{backgroundColor:Colors.setting,marginTop:10}}>

                <SetItemView name='关于'
                             onPress={()=>router.toAboutPage()}/>
            </View>


            <View style={{flex:1}}/>

            {this._exitView()}

        </View>)
    }

    _exitView = () => {
        if (strNotNull(getLoginUser().user_id)) {
            return ( <Button
                testID="btn_exit"
                onPress={this._exitApp}
                style={{width:Metrics.screenWidth,height:59,
            justifyContent:'center',backgroundColor:'#212325'}}
                textStyle={[{color:Colors._AAA},Fonts.H17]}>
                {I18n.t('exit_login')}
            </Button>)
        }
    }

    _exitApp = () => {
        Alert.alert(I18n.t('tint'), I18n.t('exit_tine'), [
            {
                text: I18n.t('cancel'), onPress: () => {
            }
            },
            {
                text: I18n.t('certain'), onPress: () => {
                clearLoginUser();
                const recentRaces = {
                    number: 5
                };
                this.props._getRecentRaces(recentRaces);
                this.props._getProfileNull();

                this.props.router.toLoginFirstPage()

            }
            }
        ]);


    }
}

const bindAction = dispatch => ({
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _getProfileNull: () => dispatch(_getProfileOk({}))
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(SettingPage);