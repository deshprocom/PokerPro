// @flow

import React, {Component} from 'react';
import {
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

type Props = {
    onKeyPressed: Function,
    onShow: Function,
    onHide: Function,
    onSubmit: Function,
    keyboardType: String,
    keyboardAppearance: String,
    returnKeyType: String,
};

type State = {
    selection: Object,
};

/*
  This is a crossplatform component
  If you're building only an iOS app, you could use `onKeyPress` props to detect
  keyboard changement.

  This is a full js component which (I hope) will be traduced as native.
  This does not handle full touch event actually and will never handle them
*/

/*
  Additional to this component, the Keyboard component is provided by Facebook where
  there is more listeners
  http://facebook.github.io/react-native/releases/0.38/docs/keyboard.html#keyboard
*/

export default class ControlledKeyboard extends Component {
    props: Props;
    state: State;

    show: () => Boolean;
    hide: () => Boolean;
    isVisible: () => Boolean;

    _onChangeText: (text: String) => undefined;
    _onFocus: () => undefined;
    _onBlur: () => undefined;

    static propTypes = {
        /**
         * each times a printable key is pressed
         * (such as '1', ' ', etc... Delete a character is also considered)
         * this function is provide as a callback
         *
         * if delete key is pressed, an empty string is passed as arg
         */
        onKeyPressed: PropTypes.func,
        /**
         * once the keyboard as been shown / hidden
         */
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        /*
         * Callback when enter or submit key as been pressed
        */
        onSubmit: PropTypes.func,
        /**
         * Determines which keyboard to open, e.g.`numeric`.
         *
         * The following values work across platforms:
         *
         * - `default`
         * - `numeric`
         * - `email-address`
         * - `phone-pad`
         */
        keyboardType: PropTypes.oneOf([
            // Cross-platform
            'default',
            'email-address',
            'numeric',
            'phone-pad',
            // iOS-only
            'ascii-capable',
            'numbers-and-punctuation',
            'url',
            'number-pad',
            'name-phone-pad',
            'decimal-pad',
            'twitter',
            'web-search',
        ]),
        /**
         * Determines the color of the keyboard.
         * @platform ios
         */
        keyboardAppearance: PropTypes.oneOf([
            'default',
            'light',
            'dark',
        ]),
        /**
         * Determines how the return key should look. On Android you can also use
         * `returnKeyLabel`.
         *
         * *Cross platform*
         *
         * The following values work across platforms:
         *
         * - `done`
         * - `go`
         * - `next`
         * - `search`
         * - `send`
         *
         * *Android Only*
         *
         * The following values work on Android only:
         *
         * - `none`
         * - `previous`
         *
         * *iOS Only*
         *
         * The following values work on iOS only:
         *
         * - `default`
         * - `emergency-call`
         * - `google`
         * - `join`
         * - `route`
         * - `yahoo`
         */
        returnKeyType: PropTypes.oneOf([
            // Cross-platform
            'done',
            'go',
            'next',
            'search',
            'send',
            // Android-only
            'none',
            'previous',
            // iOS-only
            'default',
            'emergency-call',
            'google',
            'join',
            'route',
            'yahoo',
        ]),
    };

    constructor(props: Props): undefined {
        super(props);

        /*
          selection should always be { start: 1, end: 1 } but id does not work on android
          the only way to set cursorPosition: 1 on android is to set after the component as been mounted
          to be sure it will never fail, we switch cursor position from 0 to 1 each time we focus the textInput
        */
        this.state = {
            selection: {start: 0, end: 0},
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.isVisible = this.isVisible.bind(this);

        this._onChangeText = this._onChangeText.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    render(): ReactElement<*> {
        return (
            <TextInput
                key={'react-native-controlled-keyboard'}
                ref={'controlledKeyBoard'}

                autoCorrect={false}
                multiline={false}
                style={{height: 0, width: 0}}
                value={'.'}
                selection={this.state.selection}
                keyboardType={this.props.keyboardType}
                keyboardAppearance={this.props.keyboardAppearance}

                onChangeText={this._onChangeText}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                onEndEditing={this._onSubmit}
                onSubmitEditing={this._onSubmit}
            />
        );
    }

    show(): Boolean {
        if (this.refs.controlledKeyBoard && this.refs.controlledKeyBoard.focus) {
            this.refs.controlledKeyBoard.focus();
            return true;
        }
        return false;
    }

    hide(): Boolean {
        if (this.refs.controlledKeyBoard && this.refs.controlledKeyBoard.blur) {
            this.refs.controlledKeyBoard.blur();
            return true;
        }
        return false;
    }

    isVisible(): Boolean {
        if (this.refs.controlledKeyBoard && this.refs.controlledKeyBoard.isFocused) {
            return this.refs.controlledKeyBoard.isFocused();
        }
        return false;
    }

    _onChangeText(text: String): undefined {
        if (this.props.onKeyPressed && typeof this.props.onKeyPressed === 'function') {
            this.props.onKeyPressed(text.slice(1));
        }
    }

    _onFocus(): undefined {
        this.setState({isFocused: true, selection: {start: 1, end: 1}});
        if (this.props.onShow && typeof this.props.onShow === 'function') {
            this.props.onShow();
        }
    }

    _onBlur(): undefined {
        this.setState({isFocused: false, selection: {start: 0, end: 0}});
        if (this.props.onHide && typeof this.props.onHide === 'function') {
            this.props.onHide();
        }
    }

    _onSubmit(): undefined {
        if (this.props.onSubmit && typeof this.props.onSubmit === 'function') {
            this.props.onSubmit();
        }
    }

}
