/**
 * Created by lorne on 2017/8/25.
 */
import React from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from '../../components/NavigationBar';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {fetchPostVerifyCode, fetchPostVCode}from '../../actions/AccountAction';
import {checkPhone, strNotNull, showToast, checkMail} from '../../utils/ComonHelper';
import {BtnLong, BtnSoild, InputView, CountDownBtn} from '../../components';
import {postVCode, postVerifyCode} from '../../services/AccountDao';

class RegisterPage extends React.Component {


    state = {
        canNextDisable: true,
        mobile: '',
        vcode: ''
    };

    _inputMobileCodeView = () => {

        return (
            <View>
                {/*手机号*/}
                <InputView
                    testID="input_phone"
                    placeholder={I18n.t('please_input_phone')}
                    stateText={(text) => {
                        this.setState({
                            mobile: text,
                            canNextDisable: !(text.length > 0 && this.state.vcode.length > 0)
                        })
                    }}
                />
                {/*验证码*/}
                <View style={styles.input_view}>
                    <TextInput style={styles.input}
                               placeholderTextColor={Colors._BBBB}
                               underlineColorAndroid='transparent'
                               onChangeText={text => {
                                   this.setState({
                                       vcode: text,
                                       canNextDisable: !(text.length > 0 && this.state.mobile.length > 0)
                                   })
                               }}
                               testID="input_code"
                               placeholder={I18n.t('vcode')}/>

                    <CountDownBtn
                        frameStyle={{height: 60, width: 135, borderRadius: 0}}
                        beginText='获取验证码'
                        endText='再次获取验证码'
                        count={60}
                        pressAction={() => {
                            this._postVcode()
                        }}
                        changeWithCount={(count) => count + 's'}
                        id='register'
                        ref={(e) => {
                            this.countDownButton = e
                        }}
                    />
                </View>
            </View>
        )
    };

    _postVcode = () => {
        if (checkPhone(this.state.mobile)) {
            const body = {
                option_type: 'bind_wx_account',
                vcode_type: 'mobile',
                mobile: this.state.mobile
            };

            postVCode(body, data => {
                if (this.countDownButton)
                    this.countDownButton.startCountDown()
            }, err => {
            })
        }

    };

    _next = () => {
        const {mobile, vcode} = this.state;

        if (mobile.length > 1 && vcode.length > 1) {
            const body = {
                option_type: 'bind_wx_account',
                vcode_type: 'mobile',
                account: mobile,
                vcode: vcode
            };
            postVerifyCode(body, data => {
                const wx = {
                    access_token:this.props.params.access_token,
                    type: "mobile",
                    account: mobile,
                    code:vcode
                };
                router.toInputPwd(this.props,wx)
            }, err => {

            })
        }
        else
            showToast(`${I18n.t('fillWhole')}`);

    };

    render() {
        const {canNextDisable} = this.state;

        return (
            <View
                testID="page_phone_register"
                style={{flex: 1, backgroundColor: Colors.bg_f5}}>
                <TouchableOpacity
                    testID="btn_home_page"
                    onPress={() => this.props.router.popToTop()}/>
                <View style={{backgroundColor: Colors.bg_09}}>
                    <NavigationBar
                        router={this.props.router}
                        title={I18n.t('phone')}
                        leftBtnIcon={Images.sign_return}
                        leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                        leftBtnPress={() => this.props.router.pop()}/>
                </View>

                {this._inputMobileCodeView()}

                <Text style={{
                    color: Colors._AAA, fontSize: 12,
                    marginTop: 17, alignSelf: 'center'
                }}>
                    {I18n.t('chang_use_phone')}</Text>

                {/*下一步按钮*/}
                <BtnSoild
                    testID="btn_next"
                    onPress={this._next}
                    name={I18n.t('next')}
                    style={{
                        marginTop: 19,
                        backgroundColor: canNextDisable ? Colors._AAA : Colors.bg_09
                    }}
                    disabled={canNextDisable}
                    textStyle={{color: canNextDisable ? Colors.white : Colors.txt_E0C}}/>


                <View style={{flex: 1}}/>


            </View>

        )
    }

    _protocol = () => {
        this.setState({
            checkAgree: true
        })
    }
}

const styles = StyleSheet.create({
    input_view: {
        borderBottomColor: Colors._E5E5,
        borderBottomWidth: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth
    },
    input: {
        height: 50,
        color: Colors.txt_666,
        fontSize: 15, flex: 1, alignSelf: 'center',
        marginLeft: 20
    },
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
        fetchVerifyCode: (body) => dispatch(fetchPostVerifyCode(body)),
        fetchVCode: (body) => dispatch(fetchPostVCode(body))
    };
}


const mapStateToProps = state => ({
    loading: state.AccountState.loading,
    error: state.AccountState.error,
    hasData: state.AccountState.hasData,
    actionType: state.AccountState.actionType

});

export default connect(mapStateToProps, bindAction)(RegisterPage);