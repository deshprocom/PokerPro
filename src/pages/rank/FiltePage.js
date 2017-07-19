import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Metrics, Colors} from '../../Themes';

import AddrCheck from './AddrCheck';
import TimeCheck from './TimeCheck';
import RankCheck from './RankCheck';

class FiltePage extends Component {
    render(){
        return(<View style={styles.view_bg}>

            <AddrCheck/>

            <TimeCheck/>

            <RankCheck/>

            <Text>取消</Text>
            <Text>调用</Text>
            <Text>调用侧边页</Text>
            <Text>调用侧边页</Text>
            <Text>调用侧边页</Text>
        </View>)
    }
}

export default FiltePage;

const styles = StyleSheet.create({
    view_bg: {
        backgroundColor: Colors.white,
        height: Metrics.screenHeight,
    }
})
