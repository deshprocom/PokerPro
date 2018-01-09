/**
 * Created by lorne on 2018/1/9
 * Function:众筹详情
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Navbar from './Navbar';


export default class CrowdDetail extends PureComponent {

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <Navbar/>

        </View>
    }


}