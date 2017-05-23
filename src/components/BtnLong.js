/**
 * Created by lorne on 2017/2/10.
 */
import React, {PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';

export default class BtnLong extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        onPress: PropTypes.func,
        testID: PropTypes.string,
        style: PropTypes.object
    };

    render() {
        return ( <TouchableOpacity
            activeOpacity={1}
            testID={this.props.testID}
            style={[styles.btn_view,this.props.style]}
            onPress={this.props.onPress}>

            <Text style={{ alignSelf: 'center',
        color: Colors._AAA,
        fontSize: 19}}>
                {this.props.name}</Text>

        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    btn_view: {
        alignSelf: 'center',
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        width: 336,
        borderWidth: 1,
        borderColor: Colors._AAA
    }
})