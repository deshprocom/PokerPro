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

export default class NewAddress extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                refreshPage={this.refreshPage}
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('add_new_adr')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.inputView}>
                <Text style={styles.lbAdr}>收货人:</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.line}/>
            <View style={styles.inputView}>
                <Text style={styles.lbAdr}>联系电话:</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.line}/>
            <View style={styles.inputView}>
                <Text style={styles.lbAdr}>所在地:</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.line}/>

        </View>)
    }
}

const styles = StyleSheet.create({
    inputView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
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
        flex:1
    },
    line: {
        height: 0.5,
    }
});