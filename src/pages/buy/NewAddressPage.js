/**
 * Created by lorne on 2017/7/6.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {fetchAddress} from '../../actions/OrderAction';
import {strNotNull, showToast, checkPhone} from '../../utils/ComonHelper';
import {postAddress} from '../../services/OrderDao';

export default class NewAddress extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                refreshPage={this.refreshPage}
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                rightBtnPress={this._postAdr}
                title={I18n.t('add_new_adr')}
                rightBtnText={I18n.t('save')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.view1}>
                <View style={styles.inputView}>
                    <Text style={styles.lbAdr}>收货人: </Text>
                    <TextInput style={styles.input}
                               onChangeText={txt => {
                                   this.receiver = txt;
                               }}/>
                </View>
                <View style={styles.line}/>
                <View style={styles.inputView}>
                    <Text style={styles.lbAdr}>联系电话: </Text>
                    <TextInput style={styles.input}
                               onChangeText={txt => {
                                   this.phoneNum = txt;
                               }}/>
                </View>
                <View style={styles.line}/>
                <View style={styles.inputView}>
                    <Text style={styles.lbAdr}>所在地:</Text>
                    <TextInput style={styles.input}
                               onChangeText={txt => {
                                   this.receiverAdr1 = txt;
                               }}/>
                </View>
                <View style={styles.line}/>
                <View style={styles.inputAdrView}>
                    <TextInput
                        numberOfLines={2}
                        multiline={true}
                        style={styles.inputAdr}
                        placeholder={'请输入详细地址，不少于5个字'}
                        placeholderTextColor={'#AAAAAA'}
                        onChangeText={txt => {
                            this.receiverAdr2 = txt;
                        }}/>
                </View>

            </View>

            <View style={styles.view2}>
                <Text style={styles.lbDefault}>设默认地址: </Text>

                <Text style={styles.lbRemark}>注：每次下单时会使用该地址（电子票下单除外）</Text>

            </View>


        </View>)
    }


    _postAdr = () => {
        if (!checkPhone(this.phoneNum)) {
            return;
        }
        if (this.receiver &&
            this.receiverAdr1 && this.receiverAdr2) {
            const body = {
                consignee: this.receiver,
                mobile: this.phoneNum,
                address: this.receiverAdr1,
                address_detail: this.receiverAdr2,
                default: 1,
            };

            postAddress(body, data => {
                console.log(data);
                showToast('提交成功')
            }, err => {
                console.log(err)
            })


        } else {
            showToast('请填写完整')
        }
    }


}


const styles = StyleSheet.create({
    inputView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',

    },
    lbAdr: {
        fontSize: 15,
        color: '#444444',
        marginLeft: 17
    },
    input: {
        height: 50,
        fontSize: 15,
        color: '#444444',
        flex: 1
    },
    line: {
        height: 0.5,
        backgroundColor: Colors.bg_f5
    },
    inputAdr: {
        marginLeft: 17,
        marginTop: 17,
        height: 60,
        fontSize: 15,
        color: '#444444',
        justifyContent: 'flex-start',

    },
    view1: {
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 10

    },
    inputAdrView: {
        height: 80,
    },
    view2: {
        height: 85,
        backgroundColor: 'white'
    },
    lbDefault: {
        fontSize: 15,
        color: '#444444',
        marginLeft: 17,
        marginTop: 17
    },
    lbRemark: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 17,
        marginTop: 21

    }
});