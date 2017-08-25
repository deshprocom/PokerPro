/**
 * Created by lorne on 2017/8/25.
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
import {checkLoginMail, strNotNull, showToast, userData, setUserData, loginWX} from '../../utils/ComonHelper';
import {fetchPostLogin}from '../../actions/AccountAction';
import {connect} from 'react-redux';
import {fetchGetProfile} from '../../actions/PersonAction';
import {fetchGetRecentRaces} from '../../actions/RacesAction';
import {POST_PHONE_LOGIN, POST_EMAIL_LOGIN} from '../../actions/ActionTypes'
import {closeDrawer} from '../../reducers/DrawerRedux';


export default class Login extends Component {

    render() {

    }

    header = () => {
        return(<NavigationBar
            rightBtnText={I18n.t('register')}
            leftBtnIcon={require('../../../source/login/login_x.png')}
            leftImageStyle={{
                height: 14, width: 14,
                marginLeft: 20, marginRight: 20
            }}
            leftBtnPress={() => router.pop()}/>)
    }
}