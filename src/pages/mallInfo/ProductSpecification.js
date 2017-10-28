import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';

export default class  ProductSpecification extends Component{

    componentDidMount(){

    }



    render(){
        return(
            <View style={styleP.specification}>
                <Text style={styleP.specificationTxt1}>产品规格</Text>
                <Text style={styleP.specificationTxt2}>未选</Text>
                <Text style={styleP.specificationTxt3}>已选</Text>
                <Text style={styleP.specificationTxt4}>A套餐</Text>
                <View style={{flex:1}}/>
                <Image style={styleP.specificationImg} source={Images.is}/>
            </View>
        );
    }
}

const styleP = StyleSheet.create({
    specification:{
        height:48,
        backgroundColor:"#FFFFFF",
        marginTop:7,
        flexDirection:'row',
        alignItems:'center'
    },
    specificationTxt1:{
        fontSize: 14,
        color:'#333333',
        marginLeft:17
    },
    specificationTxt2:{
        fontSize: 14,
        color:'#AAAAAA',
        marginLeft:24
    },
    specificationTxt3:{
        fontSize: 14,
        color:'#AAAAAA',
        marginLeft:41
    },
    specificationTxt4:{
        fontSize: 14,
        color:'#333333',
        marginLeft:24
    },
    specificationImg:{
        width:8,
        height:16,
        marginRight:16
    }
})