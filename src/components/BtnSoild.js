/**
 * Created by lorne on 2017/2/10.
 */
import React,{Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import PropTypes from 'prop-types'
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';

export default class BtnSoild extends Component {

    static propTypes = {
        name: PropTypes.string,
        onPress: PropTypes.func,
        testID: PropTypes.string,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        textStyle: PropTypes.object
    };

    render() {
        const {name, onPress, testID, style, textStyle, disabled} = this.props;
        return ( <TouchableOpacity
            activeOpacity={1}
            testID={testID}
            style={[styles.btn_view, style]}
            disabled={disabled}
            onPress={onPress}>

            <Text style={[styles.btn_text, textStyle]}>
                {name}</Text>

        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    btn_view: {
        alignSelf: 'center',
        height: 45,
        justifyContent: 'center',
        borderRadius: 5,
        width: 336
    },
    btn_text: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 19
    }
})