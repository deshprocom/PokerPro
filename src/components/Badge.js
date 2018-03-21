/*
 * A smart badge for react-native apps
 * https://github.com/react-native-component/react-native-smart-badge/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width:20,
        height:20,
        borderRadius:10,
    },
    text: {
        padding:2,
        color: '#fff',
        fontFamily: '.HelveticaNeueInterface-MediumP4',
        backgroundColor: 'transparent',
        fontSize: 14,
        textAlign: 'center',         //for android
        textAlignVertical: 'center', //for android
    },
});

export default class Badge extends Component {

    static defaultProps = {
        extraPaddingHorizontal: 10,
        minHeight: 0,
        minWidth: 0,
    };

    static propTypes = {
        //borderRadius: PropTypes.number,   //number 18, null 5
        extraPaddingHorizontal: PropTypes.number,
        style: PropTypes.any,
        textStyle: PropTypes.any,
        minHeight: PropTypes.number,
        minWidth: PropTypes.number,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this._width = 0
    }

    render() {
        return (
            <View ref={component => this._container = component} style={[styles.container, this.props.style]}>
                {this._renderChildren()}
            </View>
        )
    }

    _renderChildren() {
        return React.Children.map(this.props.children, (child) => {
            if (!React.isValidElement(child)) {
                return (
                    <Text adjustsFontSizeToFit={true} style={[styles.text, this.props.textStyle]}>{child}</Text>
                )
            }
            return child;
        })
    }



}