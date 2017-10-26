import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';


export default class MallTopBar extends PureComponent {

    render() {
        return (<View style={styles.navBar}>

            <View style={styles.navContent}>
                <View style={styles.search}></View>
            </View>

        </View>)

    }
}

const styles = StyleSheet.create({
    navBar: {
        height: Metrics.navBarHeight,
        width: '100%',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: 'white'
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
    },
    search: {
        height: 28,
        width: 270,
        backgroundColor: Colors._ECE,
        borderRadius: 3
    }

});