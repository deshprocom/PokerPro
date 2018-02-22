/**
 * Created by lorne on 2017/2/8.
 */
import React from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {fetchPostVerifyCode, fetchPostVCode}from '../../actions/AccountAction';
import {md5Pwd, strNotNull, showToast, checkMail, pwdVaild} from '../../utils/ComonHelper';
import {POST_REGISTER} from '../../actions/ActionTypes';
import {fetchPostRegister} from '../../actions/AccountAction';
import {fetchGetProfile} from '../../actions/PersonAction';
import {fetchGetRecentRaces} from '../../actions/RacesAction';
import BtnLong from '../../components/BtnLong';
import {NavigationBar, InputView, InputPwdView} from '../../components';

class EmailRegisterPage extends React.Component {

    state = {
        email: '',
        canNextDisable: true,
        checkAgree: true,
        password: ''
    }
    _toHome = (loginUser) => {
        const {user_id} = loginUser;
        const recentRaces = {
            user_id: user_id,
            number: 5
        };
        this.props._getRecentRaces(recentRaces);
        this.props._getProfile(user_id);

        router.popToTop();
    };

    shouldComponentUpdate(newProps) {

        if (this.props.loading != newProps.loading) {
            console.log(newProps.actionType, 'loading:' + newProps.loading + ' hasData:' + newProps.hasData)
            if (newProps.actionType === POST_REGISTER) {
                if (!newProps.loading && newProps.hasData) {
                    this._toHome(newProps.loginUser);
                    return false;
                }

            }
        }

        return true;


    }

    render() {
        const {canNextDisable, checkAgree} = this.state;
        return (
            <View
                testID="page_email_register"
                style={{flex: 1, backgroundColor: Colors.bg_f5}}>
                <TouchableOpacity
                    activeOpacity={1}
                    testID="btn_home_page"
                    onPress={() => router.popToTop()}/>
                <View style={{backgroundColor: Colors.bg_09}}>
                    <NavigationBar
                        title={I18n.t('title_email_register')}
                        leftBtnIcon={Images.sign_return}
                        leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                        leftBtnPress={() => router.pop()}/>
                </View>

                <InputView
                    testID="input_email"
                    placeholder={I18n.t('please_input_email')}
                    stateText={(text) => {
                        this.setState({
                            email: text,
                            canNextDisable: !(text.length > 0 && this.state.password.length > 0)
                        })
                    }}
                />
                <InputPwdView
                    testID="input_password"
                    placeholder={I18n.t('ple_new_pwd')}
                    stateText={(text) => {
                        this.setState({
                            password: text,
                            canNextDisable: !(text.length > 0 && this.state.email.length > 0)
                        })
                    }}/>
                <Text style={{
                    color: Colors._AAA, fontSize: 12,
                    marginTop: 17, alignSelf: 'center'
                }}>
                    {I18n.t('password_format')}</Text>

                {/*下一步按钮*/}
                <TouchableOpacity
                    activeOpacity={1}
                    testID="btn_complete"
                    style={{
                        marginTop: 19, alignSelf: 'center',
                        backgroundColor: canNextDisable ? Colors._AAA : Colors.bg_09,
                        height: 45,
                        justifyContent: 'center',
                        borderRadius: 5,
                        width: 336
                    }}
                    onPress={this._next}
                    disabled={canNextDisable}>

                    <Text style={{
                        alignSelf: 'center',
                        color: canNextDisable ? Colors.white : Colors.txt_E0C,
                        fontSize: 19
                    }}>
                        {I18n.t('complete')}</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: Colors._999,
                        alignSelf: 'flex-end',
                        marginTop: 29,
                        marginRight: 20
                    }}
                    transparent
                    testID="btn_have_account"
                    onPress={() => router.popToLogin()}>

                    <Text style={styles.text_problem}>{I18n.t('i_have_account')}</Text>

                </TouchableOpacity>

                {/*使用邮箱注册*/}
                <BtnLong
                    style={{marginTop: 35}}
                    testID="btn_switch_phone_register"
                    onPress={() => {
                       router.pop();
                    }}
                    name={I18n.t('phone_register')}/>

                <View style={{flex: 1}}/>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                    router.toProtocol(this.props, this._protocol)
                }}
                                  style={{marginBottom: 49}}>
                    <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Image style={{height: 12, width: 12, marginRight: 8}}
                               source={checkAgree ? Images.sign_choice_no : Images.sign_choice}/>
                        <Text
                            textDecorationLine="underline"
                            style={{color: Colors._333, fontSize: 12}}>
                            {I18n.t('protocol')}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    _protocol = () => {
        this.setState({
            checkAgree: true
        })
    };

    _next = () => {
        const {checkAgree, email, password} = this.state;
        if (checkAgree) {
            if (checkMail(email) && pwdVaild(password)) {
                const body = {
                    type: 'email',
                    email: email,
                    password: md5Pwd(password)
                };
                this.props._register(body);
            }

        }
        else
            showToast(I18n.t('need_agree'));
    };
}

const styles = StyleSheet.create({
    btn_sign_in: {
        alignSelf: 'center',
        backgroundColor: Colors.bg_09,
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        width: 336
    },
    text_other_sign: {
        fontSize: 14,
        color: Colors.txt_666,
        marginBottom: 48
    },
    btn_text_sign: {
        alignSelf: 'center',
        color: Colors.txt_E0C,
        fontSize: 19
    },
    text_problem: {
        fontSize: 14,
        color: Colors._999,
    },

})

function bindAction(dispatch) {
    return {
        _register: (body) => dispatch(fetchPostRegister(body)),
        _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
        _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    };
}

const mapStateToProps = state => ({
    loading: state.AccountState.loading,
    loginUser: state.AccountState.loginUser,
    error: state.AccountState.error,
    hasData: state.AccountState.hasData,
    actionType: state.AccountState.actionType

});

export default connect(mapStateToProps, bindAction)(EmailRegisterPage);