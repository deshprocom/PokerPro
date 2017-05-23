/**
 * Created by lorne on 2017/1/21.
 */
import React, {PropTypes} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, KeyboardAvoidingView
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import NavigationBar from '../../components/NavigationBar';
import md5 from "react-native-md5";
import {checkLoginMail, strNotNull, showToast} from '../../utils/ComonHelper';
import Toast from 'react-native-root-toast';
import {fetchPostLogin}from '../../actions/AccountAction';
import {connect} from 'react-redux';
import {fetchGetProfile} from '../../actions/PersonAction';
import {fetchGetRecentRaces} from '../../actions/RacesAction';
import {POST_PHONE_LOGIN, POST_EMAIL_LOGIN} from '../../actions/ActionTypes'
import {closeDrawer} from '../../reducers/DrawerRedux';

class LoginFirstPage extends React.Component {


    state = {
        username: '',
        password: '',
        pwdEye: true
    };

    shouldComponentUpdate(newProps) {

        if (newProps.loading != this.props.loading)
            if ((newProps.actionType === POST_PHONE_LOGIN ||
                newProps.actionType === POST_EMAIL_LOGIN) && newProps.hasData) {
                console.log('LoginFirstPage', newProps.loginUser)
                const {user_id} = newProps.loginUser.data;
                const recentRaces = {
                    user_id: user_id,
                    number: 5
                };
                this.props._getRecentRaces(recentRaces);
                this.props._getProfile(user_id);
                this.props.closeDrawer();
                router.popToTop();
                return false;

            }
        return true;
    }

    doLogin = () => {
        const {username, password} = this.state;
        if (strNotNull(username) && strNotNull(password)) {
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
            if (!!this._toast_box) {
                Toast.hide(this._toast_box);
            }
            this._toast_box = showToast('请填写完整');
        }


    };

    render() {
        const {pwdEye} = this.state;

        return (
            <Image
                testID="page_login_account"
                style={{flex:1,width:Metrics.screenWidth}}
                source={Images.sign_bg}>
                <NavigationBar
                    router={this.props.router}
                    leftBtnIcon={Images.sign_close}
                    leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                    rightBtnText={I18n.t('register')}
                    btnTextStyle={{color:Colors.txt_E0C,
                        fontSize:16,marginRight:20}}
                    leftBtnPress={()=>this.props.router.popToTop()}
                    rightBtnPress={()=>this.props.router.toRegisterPage()}/>

                <Image style={{width:91,height:91,
                    marginTop:49,alignSelf:'center'}}
                       source={Images.sign_logo_poker}/>


                <KeyboardAvoidingView
                    style={{flex:1,marginTop:60}}>
                    <View style={styles.view_input}>
                        <Image style={{width:13,height:16}}
                               source={Images.sign_number}/>
                        <View style={{borderBottomColor:"#444444",borderBottomWidth:0.5,
                        flex:1,height:40,alignItems:'center',marginLeft: 15,flexDirection:'row'}}>
                            <TextInput style={styles.text_input}
                                       numberOfLines={1}
                                       placeholderTextColor={Colors.txt_666}
                                       underlineColorAndroid='transparent'
                                       onChangeText={text=>{
                                   this.setState({
                                       username:text.trim()
                                   })
                               }}
                                       testID="input_username"
                                       placeholder={I18n.t('phone_email')}/>
                        </View>
                    </View>

                    <View style={styles.view_input}>
                        <Image style={{width:12,height:15}} source={Images.sign_password}/>
                        <View style={{borderBottomColor:"#444444",borderBottomWidth:0.5,
                        flex:1,height:40,alignItems:'center',marginLeft: 15,flexDirection:'row'}}>
                            <TextInput style={styles.text_input}
                                       numberOfLines={1}
                                       placeholderTextColor={Colors.txt_666}
                                       onChangeText={text=>{
                                   this.setState({
                                       password:text
                                   })
                               }}
                                       underlineColorAndroid='transparent'
                                       secureTextEntry={pwdEye}
                                       testID="input_password"
                                       placeholder={I18n.t('password')}/>
                            <TouchableOpacity
                                testID="btn_eyes"
                                style={{height:30,marginRight:4,alignItems:'center',
                                justifyContent:'center'}}
                                onPress={()=>{
                            this.setState({
                                       pwdEye:!pwdEye
                                   })
                        }}>

                                <Image
                                    style={pwdEye?styles.close_eye:styles.open_eye}
                                    source={pwdEye?Images.sign_eye:Images.sign_eye_open}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*登录*/}
                    <TouchableOpacity
                        testID="btn_login"
                        style={[styles.btn_sign_in,{marginTop:43}]}
                        onPress={this.doLogin}>
                        <Text style={styles.btn_text_sign}>{I18n.t('sign_in')}</Text>

                    </TouchableOpacity>
                    {/*遇到问题*/}
                    <TouchableOpacity
                        style={{ borderBottomWidth:0.5,
        borderBottomColor:Colors._AAA,
        alignSelf: 'flex-end',
        marginTop: 36,
        marginRight: 66}}
                        transparent
                        testID="btn_problem"
                        onPress={()=>this.props.router.toForgetPage()}>

                        <Text style={styles.text_problem}>{I18n.t('problem_for_sign_in')}</Text>

                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    style={{marginBottom: 48,padding:5}}
                    testID="btn_switch_code_login"
                    onPress={()=>this.props.router.toLoginCodePage()}>
                    <Text style={styles.text_other_sign}>
                        {I18n.t('sign_in_whit_phone')}</Text>
                </TouchableOpacity>

            </Image>)
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
        color: Colors._222,
        fontSize: 19
    },
    btn_sign_in: {
        alignSelf: 'center',
        backgroundColor: '#E0BB75',
        height: 45,
        width: 245,
        justifyContent: 'center',
        borderRadius: 5
    },

    text_input: {
        color: Colors.white,
        flex: 1,
        fontSize: 14,
        marginLeft: 2
    },
    view_input: {
        marginLeft: 66,
        marginRight: 66,
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
    }

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