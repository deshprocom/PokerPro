import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Button from 'react-native-smart-button';

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
            <ScrollView style={{marginTop: 41,paddingLeft: 36}}>
                <AddrCheck/>
                <TimeCheck/>
                <RankCheck/>
            </ScrollView>

            <View style={{flexDirection: 'row',paddingLeft: 36, position: 'absolute', bottom: 36}}>
                <View style={[{borderColor: Colors._161817,borderRadius: 2,borderWidth: 1},styles.side_btn]}>
                    <Text style={{color: Colors._333}}>取消</Text>
                </View>
                <View style={[{backgroundColor: Colors._161817,marginLeft: 48},styles.side_btn]}>
                    <Text style={{color: Colors.text_choice_btn}}
                          onPress={() => this.props.cancelDrawer()}>确定</Text>
                </View>
            </View>
        </View>)
    }
}

export default FiltePage;

const styles = StyleSheet.create({
    view_bg: {
        backgroundColor: Colors.white,
        height: Metrics.screenHeight,
    },
    side_btn: {
        height:30,
        width: 96,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
    }
});
