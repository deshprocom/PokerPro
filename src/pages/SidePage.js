/**
 * Created by lorne on 2017/1/3.
 */
import React from 'react';
import {
    StyleSheet, View, Text, Image,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {closeDrawer} from '../reducers/DrawerRedux';
import StorageKey from '../configs/StorageKey';
import {strNotNull, isEmptyObject, getLoginUser} from '../utils/ComonHelper';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {umengEvent} from '../utils/UmengEvent';

class SidePage extends React.Component {


    componentWillReceiveProps(newProps) {

    }


    view_ID = (profile) => {
        if (!isEmptyObject(profile) &&
            strNotNull(profile.user_name)) {
            return (  <View style={{marginTop:6}}>
                <Text style={{color:Colors._888,fontSize:11}}>ID: {profile.user_name}</Text>
            </View>)
        }
    }

    view_nick = (profile) => {
        if (!isEmptyObject(profile) &&
            strNotNull(profile.nick_name)) {
            return (
                <TouchableOpacity
                    testID="btn_nick"
                    activeOpacity={1}
                    onPress={()=>{
                           router.toPersonPage()
                           }
                        }
                >
                    <View style={{flexDirection:'row',alignItems:'center',
                    marginTop:10}}>
                        <View style={{width:26,height:14}}/>
                        <Text style={{color:Colors.txt_DDD,fontSize:16}}>{profile.nick_name}</Text>
                        <Image style={{height:14,width:14,marginLeft:12}}
                               source={Images.slide_edit}/>
                    </View>
                </TouchableOpacity>)
        } else {
            return (<TouchableOpacity
                onPress={
                    ()=>{

                        router.toLoginFirstPage()
                    }
                }
                activeOpacity={1}
                testID="btn_login">
                <Text style={{color:Colors.txt_DDD,fontSize:16}}>{I18n.t('log_register')}</Text>
            </TouchableOpacity>)
        }
    }

    _toSettingPage = () => {

        router.toSettingPage()

    }

    _toOrderListPage = () => {

        umengEvent('more_order');
        if (strNotNull(getLoginUser().user_id))
            router.toOrderListPage();
        else
            router.toLoginFirstPage()

    };

    _toBusinessPage = () => {
        umengEvent('more_business');
        router.toBusinessPage()

    }

    render() {
        const {profile} = this.props;

        return (
            <View
                testID="page_side"
                style={{flex:1,backgroundColor:Colors.bg_1B1C1D}}>
                {/*个人信息*/}
                <View style={{height:244,
               alignItems:'center',justifyContent:'center'}}>

                    {/*头像*/}
                    <TouchableOpacity
                        testID="btn_head"
                        activeOpacity={1}
                        onPress={()=>{

                           if(strNotNull(getLoginUser().user_id))
                              router.toPersonPage()
                           else
                               router.toLoginFirstPage()
                           }
                        }
                    >
                        <Image style={{height:100,width:100,
                            alignItems:'center',justifyContent:'center'}}
                               source={Images.home_def_harid}>
                            <Image style={{height:80,width:80,
                                borderRadius:40}}
                                   source={profile.avatar?{uri:profile.avatar}:Images.home_avatar}
                            />
                        </Image>
                    </TouchableOpacity>
                    {/*昵称*/}
                    {this.view_nick(profile)}

                    {/*ID*/}
                    {this.view_ID(profile)}


                </View>
                <TouchableOpacity
                    onPress={this._toOrderListPage}
                    testID="btn_order"
                    activeOpacity={1}
                    style={{height:44,flexDirection:'row',
                alignItems:'center'}}>
                    <Image style={{height:20,width:18,marginLeft:37,marginRight:24}}
                           source={Images.slide_order}/>

                    <Text style={{color:Colors.txt_C9B,fontSize:15}}>
                        {I18n.t('order')}
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this._toBusinessPage}
                    style={{height:44,flexDirection:'row',
                alignItems:'center'}}>
                    <Image style={{height:18,width:20,marginLeft:37,marginRight:22}}
                           source={Images.slid_business}/>

                    <Text style={{color:Colors.txt_C9B,fontSize:15}}>
                        {I18n.t('business_cooperation')}
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    testID="btn_setup"
                    activeOpacity={1}
                    onPress={this._toSettingPage}
                    style={{height:44,flexDirection:'row',
                alignItems:'center'}}>
                    <Image style={{height:20,width:21,marginLeft:37,marginRight:21}}
                           source={Images.slide_setting}/>

                    <Text style={{color:Colors.txt_C9B,fontSize:15}}>
                        {I18n.t('setting')}
                    </Text>

                </TouchableOpacity>

            </View>
        )
    }
}


function bindAction(dispatch) {
    return {
        _closeDrawer: () => dispatch(closeDrawer())
    };
}
const mapStateToProps = state => ({
    loading: state.HomeState.loading,
    error: state.HomeState.error,
    hasData: state.HomeState.hasData,
    profile: state.PersonState.profile,
    pageName: state.SideBarNavRedux.pageName
});

export default connect(mapStateToProps, bindAction)(SidePage);