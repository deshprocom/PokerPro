import React, {Component} from 'react';
import {
    AppRegistry, TouchableOpacity,
    StyleSheet,
    Text, Image,
    View
} from 'react-native';
import {Images, Colors} from '../../Themes';
import {styles} from './Styles';
import {strNotNull, isEmptyObject, getLoginUser, getUserData} from '../../utils/ComonHelper';
import {umengEvent} from '../../utils/UmengEvent';
import I18n from 'react-native-i18n';
import JpushHelp from '../../services/JpushHelper';
import {connect} from 'react-redux';
import {FETCHING, GET_RECENT_RACES} from '../../actions/ActionTypes';


class Personal extends Component {

    shouldComponentUpdate(newProps) {
        if (newProps.actionType === GET_RECENT_RACES && newProps.fetching === FETCHING) {
            this.forceUpdate()
        }
        return false

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
        if (isEmptyObject(login_user))
            return Images.home_avatar;
        else if (strNotNull(login_user.avatar))
            return {uri: login_user.avatar}
        else
            return Images.home_avatar;
    };

    _signature = () => {
        if (login_user.signature && strNotNull(login_user.signature))
            return login_user.signature;
        else
            return I18n.t('ple_sign')

    };

    renderPerson = () => {
        return (<View
            style={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', opacity: 0.7}}
        >
            <View style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                marginTop: 48,
                backgroundColor: '#000000',
                opacity: 0.3,
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
                }}>{login_user.nick_name ? login_user.nick_name : ''}</Text>
            <Text style={{
                fontSize: 13,
                color: '#888888'
            }}>{this._signature()}</Text>
            <Text style={{
                fontSize: 12,
                fontFamily: 'PingFangSC-Regular',
                color: '#888888',
                marginBottom: 12
            }}>ID:{login_user.user_name ? login_user.user_name : ''}</Text>
        </View>)
    }

}

const bindAction = dispatch => ({});

const mapStateToProps = state => ({
    loading: state.HomeState.loading,
    fetching: state.HomeState.fetching,
    hasData: state.HomeState.hasData,
    actionType: state.HomeState.actionType,
    listRaces: state.HomeState.listRaces,

});

export default connect(mapStateToProps, bindAction)(Personal);
