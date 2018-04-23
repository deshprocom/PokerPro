import React, {Component} from 'react';
import {
    TouchableOpacity, ScrollView,
    StyleSheet, Platform,
    Text, Image,
    View, Animated, findNodeHandle, Linking
} from 'react-native';
import {Images, Colors, Metrics} from '../../Themes';
import {strNotNull, isEmptyObject, getLoginUser, getUserData, getDispatchAction} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';
import I18n from 'react-native-i18n';
import JpushHelp from '../../services/JpushHelper';
import {connect} from 'react-redux';
import {FETCH_SUCCESS, GET_PROFILE, GET_UNREAND_MSG} from '../../actions/ActionTypes';


class Personal extends Component {

    state = {
        viewRef: 0
    };


    componentWillReceiveProps(newProps) {
        if (newProps.actionType === GET_PROFILE && newProps.hasData
            && isEmptyObject(newProps.unread)) {
            this._unReadMsg()
        }

        if (newProps.actionType1 === 'SWITCH_LANGUAGE') {
            this.forceUpdate()
        }
    }

    _unReadMsg = () => {
        if (!isEmptyObject(global.login_user))
            getDispatchAction()[GET_UNREAND_MSG]()
    };


    render() {

        return (
            <View style={{flex: 1}}>
                {this.readerMe()}

                {this.renderItem()}


            </View>
        )
    }


    renderItem = () => {
        return <ScrollView>
            <View style={stylesP.orderView}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        umengEvent('more_order');
                        if (strNotNull(getLoginUser().user_id))
                            global.router.toOrderListPage();
                        else
                            global.router.toLoginFirstPage()
                    }}
                    style={stylesP.btnOrder}>
                    <Image style={stylesP.imgOrder1}
                           source={Images.ticket_order}/>
                    <Text style={stylesP.txtProfile1}>{I18n.t('ticket_order')}</Text>
                </TouchableOpacity>
                <View style={{width: 1, backgroundColor: Colors._ECE, marginBottom: 5, marginTop: 5}}/>
                <TouchableOpacity style={stylesP.btnOrder}
                                  activeOpacity={1}
                                  onPress={() => {
                                      if (strNotNull(getLoginUser().user_id))
                                          global.router.toMallOrderPage();
                                      else
                                          global.router.toLoginFirstPage();
                                  }}>
                    <Image style={stylesP.imgOrder2}
                           source={Images.mall_order}/>
                    <Text style={stylesP.txtProfile1}>{I18n.t('mall_order')}</Text>
                </TouchableOpacity>

            </View>

            <View style={{height: 10, backgroundColor: '#ECECEE', flex: 1}}/>
            {this._item(stylesP.item_view, Images.social.mine_moment, stylesP.img_dy,
                I18n.t('person_dynamic'), () => {
                    if (isEmptyObject(login_user)) {
                        router.toLoginFirstPage()
                    } else {
                        router.toPersonDynamic()
                    }

                })}

            <View style={{height: 3, width: '100%'}}/>
            {this._item(stylesP.item_view, Images.crowd, stylesP.img_dy,
                I18n.t('sponsored'), () => {
                    if (isEmptyObject(global.login_user))
                        global.router.toLoginFirstPage()
                    else
                        global.router.toRecordList()

                })}
            <View style={{height: 1, marginLeft: 69}}/>
            {this._item(stylesP.item_view, Images.poker_P, stylesP.img_dy,
                I18n.t('my_coins'), () => {
                    if (isEmptyObject(global.login_user))
                        global.router.toLoginFirstPage()
                    else
                        global.router.toPokerB()

                })}

            <View style={{height: 10, width: '100%'}}/>

            {this._item(stylesP.item_view, Images.business, {width: 21, height: 22, marginLeft: 20},
                I18n.t('business_cooperation'), () => {
                    umengEvent('more_business');
                    router.toBusinessPage()

                })}
            <View style={{height: 1, marginLeft: 69}}/>
            {this._item(stylesP.item_view, Images.settings, {width: 23, height: 23, marginLeft: 20},
                I18n.t('setting'), () => {
                    router.toSettingPage()

                })}

            <View style={{height: 50}}/>
        </ScrollView>
    };

    visitChat = () => {
    };

    _item = (itemStyle, img, imgStyle, title, onPress) => {
        const {profile} = this.props;
        return <TouchableOpacity
            activeOpacity={1}
            style={itemStyle} onPress={onPress}>
            <Image style={imgStyle} source={img}/>
            <Text style={stylesP.personalText}>{title}</Text>
            <View style={{flex: 1}}/>
            {title === I18n.t('my_coins') ? <Text
                    style={{
                        fontSize: 16,
                        color: '#AAAAAA',
                        marginRight: 12,
                        lineHeight: 22
                    }}>{(profile.total_poker_coins === '0.0' || profile.total_poker_coins === '0') ? '0.00' : profile.total_poker_coins}</Text>
                : null}
            <Image style={stylesP.personalImg} source={Images.is}/>
        </TouchableOpacity>
    };


    _avatar = () => {
        const {profile} = this.props;
        if (isEmptyObject(profile))
            return Images.home_avatar;
        else if (strNotNull(profile.avatar))
            return {uri: profile.avatar}
        else
            return Images.home_avatar;
    };

    _signature = () => {
        const {profile} = this.props;
        if (profile.signature && strNotNull(profile.signature))
            return profile.signature;
        else
            return I18n.t('ple_sign')
    };


    readerMe = () => {
        const {profile} = this.props;
        const {following_count, follower_count} = profile;
        return <View style={stylesP.meView}>


            <View style={{
                height: Metrics.navBarHeight,
                width: '100%',
                paddingTop: Metrics.statusBarHeight,
                flexDirection: 'row-reverse'
            }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 44
                    }}
                    onPress={this.toMessagePage}>
                    <Image
                        source={this._imgNotice()}
                        style={{
                            height: 22,
                            width: 21,
                            marginRight: 20
                        }}/>

                </TouchableOpacity>

            </View>


            <TouchableOpacity
                activeOpacity={1}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                    if (!isEmptyObject(login_user))
                        router.toPersonPage();
                    else
                        router.toLoginFirstPage()

                }}>
                <View
                    style={stylesP.personRadius2}>
                    <Image style={{width: 72, height: 72, borderRadius: 36}} source={this._avatar()}/>
                </View>

                <View style={{marginLeft: 20}}>

                    <Text
                        style={stylesP.personSignature2}>{profile.nick_name ? profile.nick_name : I18n.t('log_register')}</Text>
                    <Text style={stylesP.personSignature}>{this._signature()}</Text>

                    <View style={{
                        backgroundColor: '#434343', height: 1,
                        width: Metrics.reallySize(248),
                        marginTop: 18
                    }}/>

                    {/*关注与粉丝*/}
                    <View style={{height: 49, flexDirection: 'row', alignItems: 'center'}}>

                        <TouchableOpacity
                            style={{padding: 10}}
                            onPress={() => {
                                if (isEmptyObject(login_user))
                                    router.toLoginFirstPage()
                                else
                                    router.toSocialContact({
                                        type: 0,
                                        following_count: following_count,
                                        follower_count: follower_count
                                    })
                            }}>
                            <Text style={{
                                color: Colors._CCC,
                                fontSize: 14
                            }}>{`${I18n.t('social.follow')}   ${following_count ? following_count : 0}`}</Text>

                        </TouchableOpacity>
                        <View
                            style={{
                                height: 12,
                                width: 1,
                                backgroundColor: '#979797',
                                marginLeft: 28,
                                marginRight: 28
                            }}/>

                        <TouchableOpacity
                            style={{padding: 10}}
                            onPress={() => {
                                if (isEmptyObject(login_user))
                                    router.toLoginFirstPage()
                                else
                                    router.toSocialContact({
                                        type: 1,
                                        following_count: following_count,
                                        follower_count: follower_count
                                    })
                            }}>
                            <Text style={{
                                color: Colors._CCC,
                                fontSize: 14
                            }}>{`${I18n.t('stalwart')}   ${follower_count ? follower_count : 0}`}</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginRight: 17}}/>
                {/*<Image style={{marginRight: 17, width: 8, height: 15}} source={Images.rightImg}/>*/}
            </TouchableOpacity>


        </View>


    };


    toMessagePage = () => {
        umengEvent('home_notification');
        if (isEmptyObject(login_user)) {
            router.toLoginFirstPage()
        } else {

            JpushHelp.iosSetBadge(0);
            router.toMessageCenter()
        }

    };

    _imgNotice = () => {
        if (!isEmptyObject(this.props.unread)) {
            return this.props.unread.unread_count > 0 ? Images.search_notice2 : Images.search_notice;
        } else
            return Images.search_notice;
    }

}

const stylesP = StyleSheet.create({
    img_dy: {
        width: 23,
        height: 23,
        marginLeft: 20
    },
    item_view: {
        backgroundColor: 'white',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',

    },
    blurImg: {
        height: 260,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blur: {
        height: 260,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
    },
    personalView: {
        backgroundColor: '#ffffff'
    },
    personalView2: {
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13,
        marginBottom: 13,
    },
    personalViewBusiness: {
        flexDirection: 'row',
    },
    personalView2Img: {
        width: 18,
        height: 22,
        marginLeft: 20
    },
    personalText: {
        fontSize: 16,
        color: '#444444',
        marginLeft: 30
    },
    personalImg: {
        width: 8,
        height: 15,
        marginRight: 18
    },

    personRadius: {
        width: 88,
        height: 88,
        borderRadius: 44,
        marginTop: 30,
        backgroundColor: 'rgba(0,0,0,0.23)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    personRadius2: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        marginBottom: 54
    },
    personID: {
        fontSize: 12,
        color: '#eeeeee',
        marginBottom: 12,
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    personSignature: {
        fontSize: 13,
        color: Colors._888,
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    personSignature2: {
        fontSize: 17,
        color: Colors._CCC,
        fontWeight: 'bold',
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    textLine: {
        height: 1,
        width: 67,
        backgroundColor: '#ffffff',

    },
    msgImg: {
        height: 22,
        width: 21,
        marginLeft: 20
    },
    meView: {
        backgroundColor: '#090909',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderView: {flexDirection: 'row', height: 82, width: '100%', backgroundColor: 'white'},
    btnOrder: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    imgOrder1: {height: 25, width: 25},
    imgOrder2: {height: 27, width: 30},
    txtProfile1: {
        fontSize: 14,
        color: Colors.txt_444,
        marginTop: 8
    },
    personDynamic: {
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13,
        marginBottom: 13,
    }


});

const bindAction = dispatch => ({});

const mapStateToProps = state => ({
    loading: state.PersonState.loading,
    profile: state.PersonState.profile,
    error: state.PersonState.error,
    hasData: state.PersonState.hasData,
    actionType: state.PersonState.actionType,
    unread: state.AccountState.unread,
    actionType1: state.AccountState.actionType

});

export default connect(mapStateToProps, bindAction)(Personal);
