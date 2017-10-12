import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet, Platform,
    Text, Image,
    View, Animated, findNodeHandle
} from 'react-native';
import {Images, Colors} from '../../Themes';
import {styles} from './Styles';
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

                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.personalView} onPress={() => {
                        umengEvent('more_order');
                        if (strNotNull(getLoginUser().user_id))
                            router.toOrderListPage();
                        else
                            router.toLoginFirstPage()
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width: 18, height: 22}} source={Images.order}/>
                            <Text style={styles.personalText}>{I18n.t('order')}</Text>
                            <Image style={styles.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personalView, {marginTop: 1}]} onPress={() => {
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
                            <Image style={{width: 18, height: 22}} source={Images.speaker}/>
                            <Text style={styles.personalText}>{I18n.t('message')}</Text>
                            <Image style={styles.personalImg} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personalView, {marginTop: 1}]} onPress={() => {
                        umengEvent('more_business');
                        router.toBusinessPage()
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width: 21, height: 20}} source={Images.business}/>
                            <Text style={styles.personalText}>{I18n.t('business_cooperation')}</Text>
                            <Image style={styles.personalImgBusiness} source={Images.is}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.personalView, {marginTop: 10}]} onPress={() => {
                        router.toSettingPage()
                    }}>
                        <View style={styles.personalView2}>
                            <Image style={{width: 23, height: 23}} source={Images.settings}/>
                            <Text style={styles.personalText}>{I18n.t('setting')}</Text>
                            <Image style={styles.personalImg} source={Images.is}/>
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
            <Text style={{
                fontSize: 12,
                color: '#888888',
                marginBottom: 12
            }}>ID:{profile.user_name ? profile.user_name : ''}</Text> : null;

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
            overlayColor: 'rgba(255,255,255,.1)'
        };

        const {profile} = this.props;
        return (<Animated.Image
            ref={'backgroundImage'}
            style={stylesL.blurImg}
            source={this._avatar()}
            onLoadEnd={this.imageLoaded}
        >
            <BlurView {...props} style={stylesL.blur}/>
            <View style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                marginTop: 30,
                backgroundColor: 'rgba(0,0,0,0.23)',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (!isEmptyObject(login_user))
                            router.toPersonPage()
                        else
                            router.toLoginFirstPage()

                    }}
                    style={{
                        width: 77,
                        height: 77,
                        borderRadius: 39,
                        backgroundColor: '#FFE9AD',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Image style={{width: 74, height: 74, borderRadius: 37}} source={this._avatar()}/>
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: 17,
                    color: '#888888',
                    fontWeight: 'bold'
                }}>{profile.nick_name ? profile.nick_name : ''}</Text>
            <Text style={{
                fontSize: 13,
                color: '#888888'
            }}>{this._signature()}</Text>

            {this._username()}

        </Animated.Image>)
    }

}

const stylesL = StyleSheet.create({
    blurImg: {
        height: 260,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blur: {
        height: 260,
        width: '100%',
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
    }

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
