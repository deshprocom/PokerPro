/**
 * Created by lorne on 2017/2/8.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, Keyboard
} from 'react-native';
import PropTypes from 'prop-types'

export default class TestRouter extends Component {
    static propTypes = {
        router: PropTypes.object,
        refreshPage: PropTypes.func
    }

    render() {
        return (
            <View style={{width: 1, height: 20}}>
                <TouchableOpacity
                    style={{width: 1, height: 1}}
                    testID="btn_keyboard_dismiss"
                    onPress={() => Keyboard.dismiss()}/>
                <TouchableOpacity
                    style={{width: 1, height: 1}}
                    testID="btn_home_page"
                    onPress={() => router.popToTop()}/>
                <TouchableOpacity
                    style={{width: 1, height: 1}}
                    testID="btn_exit_home"
                    onPress={() => {
                        storage.clearMap();
                        router.popToTop();
                        if (this.props.refreshPage != undefined)
                            this.props.refreshPage();
                    }}/>
                <TouchableOpacity
                    style={{width: 1, height: 1}}
                    testID="btn_refresh"
                    onPress={() => {
                        if (this.props.refreshPage != undefined)
                            this.props.refreshPage();
                    }}/>


            </View>
        )
    }
}