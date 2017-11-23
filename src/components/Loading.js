/**
 * Created by lorne on 2017/8/10.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import I18n from 'react-native-i18n';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    textContent: {
        top: 80,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const SIZES = ['small', 'normal', 'large'];

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {visible: this.props.visible, textContent: this.props.textContent};
    }

    static propTypes = {
        visible: PropTypes.bool,
        cancelable: PropTypes.bool,
        textContent: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.oneOf(SIZES),
        overlayColor: PropTypes.string
    };

    static defaultProps = {
        visible: false,
        cancelable: false,
        textContent: '',
        color: 'white',
        size: 'large', // 'normal',
        overlayColor: 'rgba(0, 0, 0, 0.25)'
    };

    close() {
        this.setState({visible: false});
    }

    open = () => {
        this.setState({visible: true});
    };

    componentWillReceiveProps(nextProps) {
        const {visible, textContent} = nextProps;
        this.setState({visible, textContent});
    }

    _handleOnRequestClose() {
        if (this.props.cancelable) {
            this.close();
        }
    }

    _renderDefaultContent() {
        return (
            <View style={styles.background}>
                <ActivityIndicator
                    color={this.props.color}
                    size={this.props.size}
                    style={{flex: 1}}
                />
                <View style={styles.textContainer}>
                    <Text
                        style={[styles.textContent, this.props.textStyle]}>{I18n.t('loading')}</Text>
                </View>
            </View>);
    }

    _renderSpinner() {
        const {visible} = this.state;

        if (!visible)
            return (
                <View display="none"/>
            );

        const spinner = (
            <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                style={[
                    styles.container,
                    {backgroundColor: this.props.overlayColor}
                ]} key={`spinner_${Date.now()}`}>
                {this.props.children ? this.props.children : this._renderDefaultContent()}
            </TouchableOpacity>
        );

        return (
            <Modal
                onRequestClose={() => this._handleOnRequestClose()}
                supportedOrientations={['landscape', 'portrait']}
                transparent
                visible={visible}>
                {spinner}
            </Modal>
        );

    }

    render() {
        return this._renderSpinner();
    }

}
