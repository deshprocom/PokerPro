/**
 * Created by lorne on 2018/1/9
 * Function:众筹详情
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, ScrollView,
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

            {this.footer()}
        </View>
    }

    footer = () => {
        return <View style={styles.footer}>
            <TouchableOpacity
                style={styles.btnLeft}>

                <Text style={styles.txtLeft}>及时赛报</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                style={styles.btnRight}>
                <Text style={styles.txtRight}>我要认购</Text>
            </TouchableOpacity>
        </View>
    }


}

const styles = StyleSheet.create({
    footer: {
        height: 50, width: '100%', flexDirection: 'row', alignItems: 'center',
        borderTopColor: Colors._ECE, borderTopWidth: 1, position: 'absolute', bottom: 0,
        paddingLeft: 17, paddingRight: 17, backgroundColor: 'white'
    },
    btnLeft: {
        height: 34, width: 97, borderColor: Colors._F34, borderWidth: 1, alignItems: 'center',
        borderRadius: 2, justifyContent: 'center'
    },
    btnRight: {
        height: 34,
        width: 224,
        backgroundColor: Colors._F34,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txtRight: {
        color: 'white',
        fontSize: 14
    },
    txtLeft: {
        color: Colors._F34,
        fontSize: 14
    }
})