/**
 * Created by lorne on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import PropTypes from 'prop-types';

export default class BtnLong extends Component {

    static propTypes = {
        name: PropTypes.string,
        onPress: PropTypes.func,
        testID: PropTypes.string,
        style: PropTypes.any
    };

    render() {
        return (<TouchableOpacity
            activeOpacity={1}
            testID={this.props.testID}
            style={[styles.btn_view, this.props.style]}
            onPress={this.props.onPress}>

            <Text style={[styles.txt, this.props.textStyle]}>
                {this.props.name}</Text>

        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    btn_view: {
        alignSelf: 'center',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: Colors._AAA,
        fontSize: 19
    }
})