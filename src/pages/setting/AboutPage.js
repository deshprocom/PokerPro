/**
 * Created by lorne on 2017/4/10.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, SecurityText} from '../../components';

export default class AboutPage extends Component {

    render() {
        return (<View style={styles.container}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={router}
                title={I18n.t('about')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>router.toApiSettingPage()}
            >
                <Image style={styles.logo}
                       source={Images.set_poker}/>
            </TouchableOpacity>


            <Text style={styles.txtCode}>V3.2</Text>

            <View style={styles.viewFlex}/>

            <Text style={styles.txtCompany}>北京德尚全彩體育文化傳播有限公司@</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    logo: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: 94
    },
    txtCode: {
        fontSize: 24,
        color: '#444444',
        alignSelf: 'center',
        marginTop: 30
    },
    viewFlex: {
        flex: 1
    },
    txtCompany: {
        alignSelf: 'center',
        marginBottom: 25,
        fontSize: 10,
        color: Colors._888
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
});