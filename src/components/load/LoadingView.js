/**
 * Created by lorne on 2017/3/10.
 */
import React, { Component} from 'react';
import {
    ActivityIndicator, View
} from 'react-native';

export default class LoadingView extends Component {

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator/>
            </View>

        )
    }
}