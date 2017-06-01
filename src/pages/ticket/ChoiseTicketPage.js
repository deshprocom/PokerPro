/**
 * Created by lorne on 2017/6/1.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView, NavigationBar} from '../../components'

export default class ChoiseTicketPage extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            {this.topBar()}


        </View>)
    }

    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                title={I18n.t('home_ticket')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

        </View>)
    };

    titelView = () => {
        return (<View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>[澳门]扑克王杯澳门站</Text>

        </View>)

    }

}


const styles = StyleSheet.create({
    topView: {
        backgroundColor: Colors._161817
    },
    viewTitle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    txtTitle: {
        fontSize: 16,
        color: '#444444'
    }
});