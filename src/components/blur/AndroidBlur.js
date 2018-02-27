/**
 * Created by lorne on 2017/2/9.
 */
import React from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, findNodeHandle,
    Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {BlurView} from 'react-native-blur';

export default class AndroidBlur extends React.Component {


    render() {

        return (
            <Image style={{height:236,
                width:Metrics.screenWidth}}
                   source={Images.races_bg}
                   ref={'backgroundImage'}>


            </Image>
        )
    }
}

