/**
 * Created by lorne on 2017/8/22.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, SecurityText} from '../../components';
import {checkPhone, checkLoginMail, showToast, strNotNull} from '../../utils/ComonHelper';
import {postSuggest} from '../../services/AccountDao';

export default class Suggest extends Component {


    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title={I18n.t('suggest')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.inputView}>
                <TextInput
                    onChangeText={ret => this.content = ret}
                    multiline={true}
                    style={styles.input}
                    placeholderTextColor={Colors._AAA}
                    placeholder={I18n.t('suggest_input')}/>
            </View>

            <TextInput
                onChangeText={ret => this.contact = ret}
                style={styles.inputPhone}
                placeholderTextColor={Colors._AAA}
                placeholder={I18n.t('suggest_contact')}/>

            <TouchableOpacity
                onPress={this._submit}
                activeOpacity={0.6}
                style={styles.btnSubmit}>
                <Text style={styles.submit}>{I18n.t('submit')}</Text>
            </TouchableOpacity>
        </View>)
    }

    _submit = () => {

        if (strNotNull(this.contact) && strNotNull(this.content)) {
            if (checkLoginMail(this.contact) || checkPhone(this.contact)) {
                const body = {
                    content: this.content,
                    contact: this.contact
                };
                postSuggest(body, data => {
                    Alert.alert('', I18n.t('suggest_ok'), [{
                        text: `${I18n.t('alert_sure')}`, onPress: () => {
                            router.pop()
                        }
                    }])
                }, err => {

                })
            }


        } else
            showToast(I18n.t('fillWhole'))
    }


}


const styles = StyleSheet.create({
    input: {
        color: Colors._333,
        fontSize: 15,
        height: 100,
        margin: 10
    },
    inputView: {
        height: 120,
        backgroundColor: 'white',
        margin: 10
    },
    btnSubmit: {
        backgroundColor: Colors._161,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 35
    },
    submit: {
        color: Colors._F4E,
        fontSize: 17
    },
    inputPhone: {
        height: 50,
        color: Colors._333,
        fontSize: 15,
        backgroundColor: 'white',
        margin: 10,
        paddingLeft: 10
    }
});