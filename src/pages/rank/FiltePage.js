import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Metrics, Colors} from '../../Themes';

import AddrCheck from './AddrCheck';
import TimeCheck from './TimeCheck';
import RankCheck from './RankCheck';

class FiltePage extends Component {
    static propTypes = {
        cancelDrawer: PropTypes.func
    };

    render(){
        return(<View style={styles.view_bg}>

            <AddrCheck/>

            <TimeCheck/>

            <RankCheck/>

            <Text onPress={() => this.props.cancelDrawer()}>取消</Text>
            <Text onPress={() => this.props.cancelDrawer()}>确定</Text>
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
