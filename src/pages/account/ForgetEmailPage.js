/**
 * Created by lorne on 2017/2/10.
 */
/**
 * Created by lorne on 2017/1/24.
 */
import React from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {CountDownText}from '../../components/countdown/CountDownText';
import {fetchPostVerifyCode, fetchPostVCode}from '../../actions/AccountAction';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import NavigationBar from '../../components/NavigationBar';
import {checkPhone, strNotNull, showToast, checkMail} from '../../utils/ComonHelper';
import {POST_VERIFY_CODE, POST_V_CODE} from '../../actions/ActionTypes';
import {BtnLong, BtnSoild} from '../../components';

class ForgetEmailPage extends React.Component {
    state = {
        mobile: '',
        vcode: '',
        getCodeDisable: false,
        canNextDisable: true,
        phoneClear: false,
        isEmailFind: true
    }

    componentWillReceiveProps(newProps) {
        const {mobile, vcode, isEmailFind} = this.state;
        if (this.props.loading != newProps.loading)
            if (newProps.actionType === POST_VERIFY_CODE
                && !newProps.loading && newProps.hasData && isEmailFind) {
                router.forgetEmailToPwdPage(this.props,
                    mobile, vcode);
            }
    }

    _sendCode = () => {

        const {mobile} = this.state;
        if (checkMail(mobile)) {
            this.countStart();
            const body = {
                option_type: 'reset_pwd',
                vcode_type: 'email',
                email: mobile
            };
            this.props.fetchVCode(body);

        }
    }

    countStart = () => {
        this.setState({
            getCodeDisable: true
        });
        this.countDownText.start();
    }


    _can_get_code = () => {
        console.log('_can_get_code')
        this.setState({
            getCodeDisable: false
        });
    };

    _clear = () => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        phoneClear:false
                    })
                    this._mobile.clear()
                }}
                style={{alignItems:'center',
                        justifyContent:'center',
                        height:50,width:50}}>

                <Image style={{height:13,width:13}}
                       source={Images.sign_close_gray}/>


            </TouchableOpacity>
        )
    }


    _inputMobileCodeView = () => {
        const {getCodeDisable, phoneClear} = this.state;
        return (
            <View>
                {/*手机号*/}
                <View style={styles.input_view}>
                    <TextInput style={styles.input}
                               placeholderTextColor={Colors._BBBB}
                               underlineColorAndroid='transparent'
                               onChangeText={text=>{
                                   this.setState({
                                       mobile:text,
                                       phoneClear:text.length>0
                                   })
                               }}
                               testID="input_email"
                               ref={ref=>this._mobile = ref}
                               placeholder={I18n.t('forget_ple_email')}/>
                    {phoneClear ? this._clear() : null}

                </View>
                {/*验证码*/}
                <View style={styles.input_view}>
                    <TextInput style={styles.input}
                               placeholderTextColor={Colors._BBBB}
                               underlineColorAndroid='transparent'
                               onChangeText={text=>{
                                   this.setState({
                                       vcode:text,
                                       canNextDisable:!(text.length>0)
                                   })
                               }}
                               testID="input_code"
                               placeholder={I18n.t('vcode')}/>

                    <TouchableOpacity
                        style={{alignItems:'center',
            justifyContent:'center',
            height:60,width:135,
            backgroundColor:getCodeDisable?Colors._BBBB:Colors.bg_09}}
                        onPress={this._sendCode}
                        testID="btn_get_code"
                        disabled={getCodeDisable}>

                        <CountDownText style={{color:getCodeDisable?Colors._747474:Colors.txt_E0C,
                                           fontSize:15}}
                                       countType='seconds' // 计时类型：seconds / date
                                       afterEnd={this._can_get_code} // 结束回调
                                       auto={false} // 自动开始
                                       timeLeft={60} // 正向计时 时间起点为0秒
                                       step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                                       startText={I18n.t('get_vcode')} // 开始的文本
                                       endText={I18n.t('get_vcode')} // 结束的文本
                                       ref={ref=>this.countDownText = ref}
                                       intervalText={(sec) => sec + 's'} // 定时的文本回调
                        />

                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    _next = () => {

        const {mobile, vcode} = this.state;
        if (checkMail(mobile)) {
            let body = {
                option_type: 'reset_pwd',
                vcode_type: 'email',
                account: mobile,
                vcode: vcode
            };
            this.props.fetchVerifyCode(body);
        }

    }

    render() {
        const {canNextDisable} = this.state;

        return (
            <View testID="page_email_problem" style={{flex:1,backgroundColor:Colors.bg_f5}}>
                <View style={{backgroundColor:Colors.bg_09}}>
                    <NavigationBar
                        title={I18n.t('forget_email')}
                        leftBtnIcon={Images.sign_return}
                        leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                        leftBtnPress={()=>router.pop()}/>
                </View>
                <View style={{flex:1}}>

                    { this._inputMobileCodeView()}


                    {/*下一步按钮*/}
                    <BtnSoild
                        testID="btn_next"
                        style={{marginTop:48,
                     backgroundColor: canNextDisable?Colors._AAA:Colors.bg_09}}
                        onPress={this._next}
                        disabled={canNextDisable}
                        name={I18n.t('next')}
                        textStyle={{ color:canNextDisable? Colors.white:Colors.txt_E0C}}/>


                    {/*使用邮箱注册*/}
                    <BtnLong
                        testID="login_do_code"
                        style={{marginTop:48}}
                        onPress={()=>{
                 this.countDownText.end();
                 router.pop();
                        }}
                        name={I18n.t('forge_ple_mobile')}/>

                </View>
            </View>

        )
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
        color: Colors.txt_666,
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

export default connect(mapStateToProps, bindAction)(ForgetEmailPage);