
import React,{Component} from 'react';
import {View, Text} from 'react-native';
import {RankList} from './RankList';

export default class MainRankPage extends Component {
    render(){
        return(<View>
            <Text>排行</Text>
            <RankList/>
        </View>)
    }
}