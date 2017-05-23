/**
 * Created by lorne on 2017/3/10.
 */
import React, {PropTypes, Component}from 'react';
import {
    ActivityIndicator, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class LoadingView extends Component {

    render() {
        return (
            <View>
                <ActivityIndicator
                    color={Colors._E0C294}/>
            </View>

        )
    }
}