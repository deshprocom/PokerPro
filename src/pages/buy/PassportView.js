/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class PassportView extends Component {

    render() {
        return (<View>
            <Text>护照</Text>
        </View>)
    }
}