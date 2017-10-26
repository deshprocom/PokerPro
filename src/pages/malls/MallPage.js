import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import TopBar from './MallTopBar';
import MallTypeView from './MallTypeView';


export default class MallPage extends PureComponent {
    render() {
        return (<View style={{flex: 1}}>
            <TopBar/>
            <MallTypeView/>

        </View>)
    }
}