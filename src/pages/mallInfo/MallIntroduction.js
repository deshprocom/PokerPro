import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class  MallIntroduction extends Component{

    componentDidMount(){

    }



    render(){
        return(
            <ScrollView style={styleI.production}>
                <View style={styleI.productionName}>
                    <Text style={styleI.productionNameTxt}>商品介绍</Text>
                </View>
                <View style={{backgroundColor:'#FFFFFF',marginTop:1}}>
                    <View style={{height:500,backgroundColor:'red',marginLeft:17,marginRight:16,marginTop:9}}>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styleI = StyleSheet.create({
    production:{
        marginTop:5
    },
    productionName:{
        height:40,
        backgroundColor:'#FFFFFF'
    },
    productionNameTxt:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17,
        marginTop:11
    }
})