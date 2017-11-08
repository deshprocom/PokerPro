import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class Tips extends PureComponent {
    state={
        showTips:true
    };

    render(){
        const{showTips}= this.state;
        return(
            <View>
                {showTips?
                    <View style={styleT.tipsView}>
                        <Text style={styleT.tipsTxt}>{I18n.t('tips')}</Text>
                        <TouchableOpacity onPress={()=>{
                            setTimeout(this.setState({
                                showTips : !showTips,
                            }),1000)
                        }}>
                            <Image style={styleT.tipsImg} source={Images.close}/>
                        </TouchableOpacity>

                    </View>:<View/>}
            </View>
        )}
}
const styleT = StyleSheet.create({
    tipsView:{
        height:46,
        backgroundColor:'#F34A4A',
        opacity:0.6,
        flexDirection:'row',
        alignItems:'center'
    },
    tipsTxt:{
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft:41
    },
    tipsImg:{
        width:18,
        height:18
    }
})