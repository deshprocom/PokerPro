import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class Tips extends PureComponent {
    state={
        showTips:true
    };

    render(){
        return(
            <View>
                {this.state.showTips?
                    <View style={styleT.tipsView}>

                        <TouchableOpacity style={styleT.tipsTouch}
                                          onPress={()=>{
                            setTimeout(this.setState({
                                showTips : ! this.state.showTips,
                            }),1000)
                        }}>
                            <Image style={styleT.tipsImg} source={Images.close}/>
                        </TouchableOpacity>
                        <Text style={styleT.tipsTxt}>{I18n.t('tips')}</Text>

                    </View>:<View/>}
            </View>
        )}
}
const styleT = StyleSheet.create({
    tipsView:{
        height:46,
        backgroundColor:'#F34A4A',
        opacity:0.6,
        flexDirection:'row-reverse',
        alignItems:'center'
    },
    tipsTxt:{
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft:41,
        marginRight:15
    },
    tipsTouch:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center'
    },
    tipsImg:{
        width:18,
        height:18,
        marginRight:17
    }
})