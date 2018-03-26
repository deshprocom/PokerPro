/**
 * Created by lorne on 2017/1/21.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, Metrics} from '../../Themes';
import NavigationBar from '../../components/NavigationBar';
import md5 from "react-native-md5";
import {
    checkLoginMail, strNotNull, showToast, userData,
    setUserData, loginWX, isWXAppInstalled
} from '../../utils/ComonHelper';
import {fetchPostLogin} from '../../actions/AccountAction';
import {connect} from 'react-redux';
import {fetchGetProfile} from '../../actions/PersonAction';
import {fetchGetRecentRaces} from '../../actions/RacesAction';
import {POST_PHONE_LOGIN, POST_EMAIL_LOGIN} from '../../actions/ActionTypes'
import {closeDrawer} from '../../reducers/DrawerRedux';
import {postWxAuth} from '../../services/AccountDao';
import StorageKey from '../../configs/StorageKey'

class LoginFirstPage extends Component {


    state = {
        username: userData,
        password: '',
        pwdEye: true,
        avatar: '',
        isInstall: false
    };

    shouldComponentUpdate(newProps) {

        if (newProps.loading != this.props.loading)
            if ((newProps.actionType === POST_PHONE_LOGIN ||
                    newProps.actionType === POST_EMAIL_LOGIN) && newProps.hasData) {
                console.log('LoginFirstPage', newProps.loginUser)
                const {user_id} = newProps.loginUser.data;
                this._success(user_id);
                return false;

            }
        return true;
    }

    componentDidMount() {
        storage.load({
            key: StorageKey.UserAvatar
        }).then(avatar => {
            this.setState({
                avatar: avatar
            })
        });
        isWXAppInstalled(isInstall => {
            this.setState({
                isInstall: isInstall
            })
        })


    }


    _success = (user_id) => {
        const recentRaces = {
            user_id: user_id,
            number: 8
        };
        this.props._getRecentRaces(recentRaces);
        this.props._getProfile(user_id);
        showToast(I18n.t('login_success'));
        global.router.pop();
    };

    doLogin = () => {
        const {username, password} = this.state;
        if (strNotNull(username) && strNotNull(password)) {
            setUserData(username);
            if (checkLoginMail(username)) {

                let body = {
                    type: 'email',
                    email: username,
                    password: md5.hex_md5(password)
                };
                this.props._fetchPostLogin(body);

            } else {
                let body = {
                    type: 'mobile',
                    mobile: username,
                    password: md5.hex_md5(password)
                };
                this.props._fetchPostLogin(body);
            }
        } else {

            showToast(I18n.t('fillWhole'));
        }


    };

    render() {
        const {pwdEye, avatar} = this.state;

        return (
            <View
                testID="page_login_account"
                style={{flex: 1, backgroundColor: 'white'}}>
                <NavigationBar
                    barStyle="dark-content"
                    leftBtnIcon={require('../../../source/login/login_x.png')}
                    leftImageStyle={{height: 14, width: 14, marginLeft: 20, marginRight: 20}}
                    rightBtnText={I18n.t('register')}
                    btnTextStyle={{
                        color: Colors._161,
                        fontSize: 16, marginRight: 20
                    }}
                    leftBtnPress={() => router.pop()}
                    rightBtnPress={() => router.toRegisterPage()}/>

                <View style={styles.viewAvatar}>
                    <Image style={{
                        width: 72, height: 72,
                        borderRadius: 36
                    }}
                           source={strNotNull(avatar) ? {uri: avatar} : Images.home_avatar}/>
                </View>


                <View
                    style={{flex: 1, marginTop: 50}}>
                    <View style={styles.view_input}>

                        <View style={{
                            borderBottomColor: Colors._CCC, borderBottomWidth: 0.5,
                            flex: 1, height: 40, alignItems: 'center', flexDirection: 'row'
                        }}>
                            <Image style={{width: 13, height: 16, marginRight: 17}}
                                   source={Images.sign_number}/>

                            <TextInput style={styles.text_input}
                                       numberOfLines={1}
                                       placeholderTextColor={Colors._CCC}
                                       underlineColorAndroid='transparent'
                                       onChangeText={text => {
                                           this.setState({
                                               username: text.trim()
                                           })
                                       }}
                                       defaultValue={userData}
                                       testID="input_username"
                                       placeholder={I18n.t('phone_email')}/>
                        </View>
                    </View>

                    <View style={styles.view_input}>

                        <View style={{
                            borderBottomColor: Colors._CCC, borderBottomWidth: 0.5,
                            flex: 1, height: 40, alignItems: 'center', flexDirection: 'row'
                        }}>
                            <Image style={{width: 13, height: 16, marginRight: 17}} source={Images.sign_password}/>
                            <TextInput style={styles.text_input}
                                       numberOfLines={1}
                                       placeholderTextColor={Colors._CCC}
                                       onChangeText={text => {
                                           this.setState({
                                               password: text
                                           })
                                       }}
                                       underlineColorAndroid='transparent'
                                       secureTextEntry={pwdEye}
                                       testID="input_password"
                                       placeholder={I18n.t('password')}/>
                            <TouchableOpacity
                                testID="btn_eyes"
                                style={{
                                    height: 30, marginRight: 4, alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => {
                                    this.setState({
                                        pwdEye: !pwdEye
                                    })
                                }}>

                                <Image
                                    style={pwdEye ? styles.close_eye : styles.open_eye}
                                    source={pwdEye ? Images.sign_eye : Images.sign_eye_open}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*登录*/}
                    <TouchableOpacity
                        activeOpacity={1}
                        testID="btn_login"
                        style={[styles.btn_sign_in, {marginTop: 43}]}
                        onPress={this.doLogin}>
                        <Text style={styles.btn_text_sign}>{I18n.t('sign_in')}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            marginTop: 20,
                            marginRight: 10
                        }}
                        transparent
                        testID="btn_problem"
                        onPress={() => router.toForgetPage()}>

                        <Text style={styles.text_problem}>{I18n.t('problem_for_sign_in')}</Text>

                    </TouchableOpacity>

                    <View style={{flex: 1}}/>

                    {this.wxLogin()}
                </View>


            </View>)
    }


    wxLogin = () => {
        return (<View style={{
            marginBottom: 50, flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-around'
        }}>
            {this.state.isInstall ? <TouchableOpacity
                onPress={() => {

                    loginWX(data => {
                        let body = {code: data.code};

                        postWxAuth(body, ret => {
                            const {type, info} = ret;
                            if (type === 'register')
                                router.toWxRegister(this.props, info.access_token);
                            else if (type === 'login') {
                                const {user_id} = info;
                                this._success(user_id);
                            }
                        }, err => {
                            alert(err)
                        })
                    }, err => {

                    })
                }}
                style={styles.rowView}>
                <Image style={{height: 18, width: 22}}
                       source={require('../../../source/buy/weixin.png')}/>
                <Text style={styles.txtMsg}>{I18n.t('wx_login')}</Text>
            </TouchableOpacity> : null}


            <TouchableOpacity
                onPress={() => router.toLoginCodePage()}
                style={styles.rowView}>
                <Image style={{height: 15, width: 20}}
                       source={require('../../../source/login/login_msg.png')}/>
                <Text style={styles.txtMsg}>{I18n.t('msg_login')}</Text>
            </TouchableOpacity>
        </View>)


    }
}

const styles = StyleSheet.create({
    text_other_sign: {
        alignSelf: 'center',
        fontSize: 14,
        color: Colors.txt_666
    },
    text_problem: {
        fontSize: 14,
        color: Colors._AAA,
    },
    btn_text_sign: {
        alignSelf: 'center',
        color: Colors._F4E,
        fontSize: 17
    },
    btn_sign_in: {
        alignSelf: 'center',
        backgroundColor: Colors._161,
        height: 50,
        justifyContent: 'center',
        borderRadius: 2,
        width: "90%"
    },

    text_input: {
        color: Colors._161,
        flex: 1,
        fontSize: 14,
        marginLeft: 2
    },
    view_input: {
        marginLeft: 28,
        marginRight: 28,
        flexDirection: 'row',
        alignItems: 'center',
    },
    open_eye: {
        width: 18,
        height: 18
    },
    close_eye: {
        width: 18,
        height: 9
    },
    rowView: {
        flexDirection: 'row', alignItems: 'center', height: 50
    },
    txtMsg: {
        fontSize: 14, color: Colors._AAA, marginLeft: 10
    },
    viewAvatar: {
        height: 82,
        width: 82,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 41,
        alignSelf: 'center',
        marginTop: 30
    },

});

function bindAction(dispatch) {
    return {
        _fetchPostLogin: (body) => dispatch(fetchPostLogin(body)),
        _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
        _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
        closeDrawer: () => dispatch(closeDrawer()),
    };
}

const mapStateToProps = state => ({
    loading: state.AccountState.loading,
    loginUser: state.AccountState.loginUser,
    error: state.AccountState.error,
    hasData: state.AccountState.hasData,
    actionType: state.AccountState.actionType

});

export default connect(mapStateToProps, bindAction)(LoginFirstPage);