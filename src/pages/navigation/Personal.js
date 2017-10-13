import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet, Platform,
    Text, Image,
    View, Animated, findNodeHandle
} from 'react-native';
import {Images, Colors, Metrics} from '../../Themes';
import {strNotNull, isEmptyObject, getLoginUser, getUserData} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';
import I18n from 'react-native-i18n';
import JpushHelp from '../../services/JpushHelper';
import {connect} from 'react-redux';
import {FETCHING, GET_PROFILE} from '../../actions/ActionTypes';
import {BlurView} from 'react-native-blur';
import {fetchGetProfile} from '../../actions/PersonAction';

class Personal extends Component {

    state = {
        viewRef: 0,
    };

    componentDidMount() {
        if (!isEmptyObject(login_user)) {
            this.props._getProfile(login_user.user_id);
        }
    }

    render() {

        return (
            <View>

                {this.renderPerson()}

                <View>
                    <TouchableOpacity style={stylesP.personalView} onPress={() => {
                        umengEvent('more_order');
                        if (strNotNull(getLoginUser().user_id))
                            router.toOrderListPage();
                        else
                            router.toLoginFirstPage()
                    }}>

                        <View style={stylesP.personalView2}>
                            <Image style={stylesP.personalView2Img} source={Images.order}/>

                            <Text style={stylesP.personalText}>{I18n.t('order')}</Text>
                            <View style={{flex:1}}/>
                            <Image style={stylesP.personalImg} source={Images.is}/>


                        </View>
                    </TouchableOpacity>

                    <View style={stylesP.textLine}/>

                    <TouchableOpacity style={stylesP.personalView} onPress={() => {
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
                        <View style={stylesP.personalView2}>
                            <Image style={stylesP.personalView2Img} source={Images.speaker}/>
                            <Text style={stylesP.personalText}>{I18n.t('message')}</Text>
                            <View style={{flex:1}}/>

                            <Image style={stylesP.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>

                    <View style={stylesP.textLine}/>

                    <TouchableOpacity style={stylesP.personalView} onPress={() => {
                        umengEvent('more_business');
                        router.toBusinessPage()
                    }}>
                        <View style={[stylesP.personalView2]}>
                            <Image style={{width: 21, height: 22,marginLeft:20}} source={Images.business}/>
                            <Text style={stylesP.personalText}>{I18n.t('business_cooperation')}</Text>
                            <View style={{flex:1}}/>

                            <Image style={stylesP.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylesP.personalView, {marginTop: 10}]} onPress={() => {
                        router.toSettingPage()
                    }}>
                        <View style={stylesP.personalView2}>
                            <Image style={{width: 23, height: 23,marginLeft:20}} source={Images.settings}/>
                            <Text style={stylesP.personalText}>{I18n.t('setting')}</Text>
                            <View style={{flex:1}}/>

                            <Image style={stylesP.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


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

    _username = () => {
        const {profile} = this.props;
        return profile.user_name ?
            <Text style={stylesP.personID}>ID:{profile.user_name ? profile.user_name : ''}</Text> : null;

    };

    imageLoaded = () => {
        this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    };

    renderPerson = () => {
        let props = Platform.OS === 'ios' ? {
                blurType: "light",
                blurAmount: 18
            } : {
                viewRef: this.state.viewRef,
                downsampleFactor: 10,
                overlayColor: 'rgba(255,255,255,.4)'
            };

        const {profile} = this.props;
        return (<Animated.Image
            ref={'backgroundImage'}
            style={stylesP.blurImg}
            source={Images.home_bg}
            onLoadEnd={this.imageLoaded}
        >
            <BlurView {...props} style={stylesP.blur}/>
            <View style={stylesP.personRadius}>
                <TouchableOpacity
                    onPress={() => {
                        if (!isEmptyObject(login_user))
                            router.toPersonPage()
                        else
                            router.toLoginFirstPage()

                    }}
                    style={stylesP.personRadius2}>
                    <Image style={{width: 74, height: 74, borderRadius: 37}} source={this._avatar()}/>
                </TouchableOpacity>
            </View>
            <Text
                style={stylesP.personSignature2}>{profile.nick_name ? profile.nick_name : ''}</Text>
            <Text style={stylesP.personSignature}>{this._signature()}</Text>

            {this._username()}

        </Animated.Image>)
    }

}

const stylesP = StyleSheet.create({
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
        marginLeft:20
    },
    personalText: {
        fontSize: 16,
        color: '#444444',
        marginLeft:30
    },
    personalImg: {
        width: 8,
        height: 15,
        marginRight:18
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
        width: 77,
        height: 77,
        borderRadius: 39,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center'
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
        color: '#eeeeee',
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    personSignature2: {
        fontSize: 17,
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 8,
        backgroundColor: 'transparent'
    },
    textLine: {
        height: 1,
        width: 67,
        backgroundColor:'#ffffff',

    },


});

const bindAction = dispatch => ({
    _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
});

const mapStateToProps = state => ({
    loading: state.PersonState.loading,
    profile: state.PersonState.profile,
    error: state.PersonState.error,
    hasData: state.PersonState.hasData,
    actionType: state.PersonState.actionType,

});

export default connect(mapStateToProps, bindAction)(Personal);
