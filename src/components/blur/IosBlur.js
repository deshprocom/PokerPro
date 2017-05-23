/**
 * Created by lorne on 2017/2/9.
 */
import React, {PropTypes} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image,
    Text, ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {BlurView} from 'react-native-blur';


export default class IosBlur extends React.Component {

    static propTypes = {
        raceInfo: PropTypes.object
    }


    render() {
        const {raceInfo} =  this.props;
        return (
            <Image style={{height:200,
                width:Metrics.screenWidth}}
                   source={{uri:raceInfo.logo}}>
                <BlurView
                    blurType='dark'
                    blurAmount={10}
                    style={{flex:1}}/>

            </Image>
        )
    }
}