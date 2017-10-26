import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import TopBar from './MallTopBar';


export default class MallPage extends PureComponent {
    render() {
        return (<View>
            <TopBar/>

        </View>)
    }
}