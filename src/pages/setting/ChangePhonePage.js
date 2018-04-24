/**
 * Created by lorne on 2017/5/11.
 */

import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';

import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SecurityText, BtnLong} from '../../components';
import ModalPrompt from './ModalPrompt';
import {strNotNull} from '../../utils/ComonHelper';

export default class ChangePhonePage extends Component {

    state = {
        modalVisible: false
    };

    render() {
        return (<View
            testID="page_change_bind"
            style={ApplicationStyles.bg_black}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('changeTel')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.viewPhone}>
                <Text style={styles.txtPhone}>{I18n.t('presentTel')}</Text>
                <SecurityText
                    testID="txt_phone_security"
                    securityOptions={{
                        isSecurity: true,
                        startIndex: 3,
                        endIndex: 7,
                    }}
                    style={styles.txtPhone}>
                    {login_user.mobile}
                </SecurityText>
            </View>

            {/*<Text style={styles.txtTine}>{I18n.t('newTel')}</Text>*/}


            <ModalPrompt
                modalShow={this.modalShow}
                modalVisible={this.state.modalVisible}/>


            <View style={{flex: 1}}/>
            <BtnLong
                name={I18n.t('changeTel')}
                testID="btn_change_phone"
                onPress={this.modalShow}
                textStyle={styles.txtChange}
                style={styles.btnChange}/>


        </View>)
    }

    modalShow = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })

    }


}


const styles = StyleSheet.create({
    txtPhone: {
        fontSize: 16,
        color: Colors._999,
    },
    txtTine: {
        fontSize: 16,
        color: Colors._999,
        marginTop: 20,
        alignSelf: 'center',
        marginLeft: 17,
        marginRight: 17
    },
    btnChange: {
        height: 45,
        backgroundColor: Colors._161,
        borderRadius: 4,
        width: '70%',
        marginBottom: 240
    },
    txtChange: {
        fontSize: 19,
        color: Colors._F4E,
    },
    viewPhone: {
        marginTop: 146,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'

    }
});