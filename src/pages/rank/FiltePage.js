import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Button from 'react-native-smart-button';

import {Metrics, Colors} from '../../Themes';

import RankCheck from './RankCheck';

class FiltePage extends Component {
    static propTypes = {
        cancelDrawer: PropTypes.func,
        testt: PropTypes.func
    };

    render(){
        return(<View style={styles.view_bg}>
            <ScrollView style={{marginTop: 41,paddingRight: 20, paddingLeft: 36}}>
                <RankCheck checkTitle='地区' checkData={['全球','国内']}/>
                <RankCheck checkTitle='年份' checkData={['全部','2014','2015','2016','2017']}/>
                <RankCheck checkTitle='排名' checkData={['全部','1-100','100-200','200-300','300-600','600以上']}/>
            </ScrollView>

            <View style={{flexDirection: 'row',paddingLeft: 36,position: 'absolute', bottom: 36}}>
                <TouchableOpacity style={[{borderColor: Colors._161817,borderRadius: 2,borderWidth: 1},styles.side_btn]}>
                    <Text style={{fontSize: 15,color: Colors._333}}
                        >取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{backgroundColor: Colors._161817,marginLeft: 48},styles.side_btn]}>
                    <Text style={{fontSize: 15,color: Colors.text_choice_btn}}
                          onPress={() => this.props.cancelDrawer()}>确定</Text>
                </TouchableOpacity>
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
        justifyContent: 'center'
    }
});
