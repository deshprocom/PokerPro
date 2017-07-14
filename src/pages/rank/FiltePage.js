import React,{Component} from 'react';
import {View, Text} from 'react-native';

import AddrCheck from './AddrCheck';
import TimeCheck from './TimeCheck';
import RankCheck from './RankCheck';

class FiltePage extends Component {
    render(){
        return(<View>

            <AddrCheck/>

            <TimeCheck/>

            <RankCheck/>

            <Text>筛选</Text>
        </View>)
    }
}

export default FiltePage;
