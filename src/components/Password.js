/**
 * Created by lorne on 2017/5/11.
 */
import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';

export default class Password extends Component {
    static propTypes = {
        style: PropTypes.any,
        inputItemStyle: PropTypes.any,
        iconStyle: PropTypes.any,
        maxLength: PropTypes.any,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        autoFocus: true,
        onChange: () => {
        },
        onEnd: () => {
        },
    };

    state = {
        text: ''
    };

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TextInput
                    testID="input_bind_code"
                    style={{height: 45, zIndex: 99, position: 'absolute', width: 45 * 6, opacity: 0}}
                    ref='textInput'
                    maxLength={this.props.maxLength}
                    keyboardType="number-pad"
                    onChangeText={
                        (text) => {
                            this.setState({text});
                            this.props.onChange(text);
                            if (text.length === this.props.maxLength) {
                                this.props.onEnd(text);
                            }
                        }
                    }
                />
                {
                    this._getInputItem()
                }
            </View>
        )

    }

    _getInputItem() {
        let inputItem = [];
        let {text} = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
                        {i < text.length ? <Text style={styles.txt}>{text[i]}</Text> : null}
                    </View>)
            }
            else {
                inputItem.push(
                    <View key={i}
                          style={[styles.inputItem, styles.inputItemBorderLeftWidth, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <Text style={styles.txt}>{text[i]}</Text> : null}
                    </View>)
            }
        }
        return inputItem;
    }

    _onPress() {
        this.refs.textInput.focus();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#BBBBBB',
        backgroundColor: '#fff'
    },
    inputItem: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: 1,
        borderColor: '#BBBBBB',
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
    txt: {
        fontSize: 14,
        color: '#333333'
    }
});