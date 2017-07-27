import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Button from 'react-native-smart-button';

import {Metrics, Colors, Images} from '../../Themes';

import RankCheck from './RankCheck';

class FiltePage extends Component {
    static propTypes = {
        cancelDrawer: PropTypes.func
    };

    _cancelSelect = () => {
        // this.checkArr.cancelBtn();
        this.checkDay.cancelBtn();
        this.checkScore.cancelBtn();
    };

    _sureSendType =() => {
        let time = this.checkDay.sureBtn();
        let score = this.checkScore.sureBtn();
        router.log(time,score);
        this.props.cancelDrawer();
    };

    handleData = () => {

    };

    render(){
        return(<View style={styles.view_bg}>
            <ScrollView style={{marginTop: 41,paddingRight: 20, paddingLeft: 36}}>
                {this.adrCheck()}
                <RankCheck ref={ref => this.checkDay = ref}
                           checkTitle='年份' checkData={['全部','2014','2015','2016','2017']}/>
                <RankCheck ref={ref => this.checkScore =ref}
                           checkTitle='排名' checkData={['全部','1-100','100-200','200-300','300-600','600以上']}/>
            </ScrollView>

            <View style={{flexDirection: 'row',paddingLeft: 36,position: 'absolute', bottom: 36}}>
                <TouchableOpacity style={[{borderColor: Colors._161817,borderRadius: 2,borderWidth: 1},styles.side_btn]}>
                    <Text style={{fontSize: 15,color: Colors._333}}
                        onPress={() => this._cancelSelect()}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{backgroundColor: Colors._161817,marginLeft: 48},styles.side_btn]}>
                    <Text style={{fontSize: 15,color: Colors.text_choice_btn}}
                          onPress={() => this._sureSendType()}>确定</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }

    adrCheck = () => {
        return(<View>
            <Text style={{lineHeight: 21,fontSize: 15,color: Colors._888}}>地区</Text>
            <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 155}}></View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
                <TouchableOpacity style={{marginBottom: 16,marginRight: 13}}>
                    <Image source={Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>全球</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={{marginBottom: 16}}>
                    <Image source={Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>国内</Text>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>)
    };

    timeCheck = () => {

    };

    scoreCheck = () => {

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
