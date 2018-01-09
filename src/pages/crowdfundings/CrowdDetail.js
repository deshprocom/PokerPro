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
import DetailChild from './DetailChild';


export default class CrowdDetail extends PureComponent {

    state = {
        crowd: {
            status: 'coming',
            endDate: '1515554844',
            image: 'https://cdn-upyun.deshpro.com/uploads/info/image/555/preview_P1044378.JPG',
            race: {
                name: '中国创投扑克联赛',
                buy_in: 9000,
                end_start_time: '2017.09.11-2017.09.15',
                location: '澳门',
                prize: '800万'
            },
            crowd_num: 200,
            crowd_sale: 32
        },
    };

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <Navbar/>
            <DetailChild
            info={this.state.crowd}/>


        </View>
    }


}