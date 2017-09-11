/**
 * Created by lorne on 2017/8/25.
 */
import React, {Component, PureComponent} from 'react';
import {Text, TouchableOpacity, View, TextInput, StyleSheet, Image} from 'react-native';

import {Colors, Fonts, Images, Metrics, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import md5 from "react-native-md5";
import {NavigationBar} from '../../components';
import {pwdVaild, getDispatchAction} from '../../utils/ComonHelper';
import {postWxBind} from '../../services/AccountDao';
import {GET_RECENT_RACES, GET_PROFILE} from '../../actions/ActionTypes';

export default class InputPwd extends PureComponent {

    state = {
        password: '',
        pwdEye: true,
        checkAgree: true
    };

    render() {
        const {pwdEye, checkAgree} = this.state;

        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors._161}}
                title={I18n.t('input_pwd')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.input_view}>
                <TextInput
                    testID="input_password"
                    style={styles.input}
                    placeholderTextColor={Colors._BBBB}
                    underlineColorAndroid='transparent'
                    onChangeText={text => {
                        this.setState({
                            password: text,
                        })
                    }}
                    secureTextEntry={pwdEye}
                    placeholder={I18n.t('ple_new_pwd')}/>


                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            pwdEye: !pwdEye
                        })
                    }}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50, width: 50
                    }}>

                    <Image
                        style={{
                            width: 18, height: 10
                        }}
                        source={pwdEye ? Images.sign_eye : Images.sign_eye_open}/>


                </TouchableOpacity>
            </View>

            <Text style={{
                marginTop: 20, alignSelf: 'center',
                color: Colors._AAA, fontSize: 12
            }}>{I18n.t('password_format')}</Text>

            <TouchableOpacity
                activeOpacity={1}
                testID="btn_complete"
                style={{
                    marginTop: 35, alignSelf: 'center',
                    backgroundColor: Colors.bg_09,
                    height: 45,
                    justifyContent: 'center',
                    borderRadius: 5,
                    width: 336
                }}
                onPress={this._request_register}>
                <Text style={{
                    alignSelf: 'center',
                    color: Colors.txt_E0C,
                    fontSize: 19
                }}>{I18n.t('complete')}</Text>
            </TouchableOpacity>

            <View style={{flex: 1}}/>
            <TouchableOpacity
                onPress={() => {
                    router.toProtocol(this.props, this._protocol)
                }}
                style={{marginBottom: 49}}>
                <View style={{alignItems: 'flex-end', flexDirection: 'row', alignSelf: 'center'}}>
                    <Image style={{height: 12, width: 12, marginRight: 8}}
                           source={checkAgree ? Images.sign_choice_no : Images.sign_choice}/>
                    <Text
                        textDecorationLine="underline"
                        style={{color: Colors._333, fontSize: 12}}>
                        {I18n.t('protocol')}</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }

    _request_register = () => {
        const {password} = this.state;
        const {wx} = this.props.params;

        if (!pwdVaild(password)) {
            return;
        }
        let pwd = md5.hex_md5(password);

        wx['password'] = pwd;
        postWxBind(wx, data => {
            console.log('wx', data);
            const {user_id} = data;
            const recentRaces = {
                user_id: user_id,
                number: 8
            };

            getDispatchAction()[GET_RECENT_RACES](recentRaces);
            getDispatchAction()[GET_PROFILE](user_id);
            router.popToTop();
        }, err => {
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
});