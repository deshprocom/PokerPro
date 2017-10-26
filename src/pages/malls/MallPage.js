import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, StatusBar, InteractionManager,
    Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import TopBar from './MallTopBar';


export default class MallPage extends PureComponent {
    render() {
        return (<View>
            <StatusBar barStyle={this.props.barStyle ? this.props.barStyle : "dark-content"}/>
            <TopBar/>

        </View>)
    }
}