import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';

export default class  ShipAddress extends Component{

    componentDidMount(){

    }



    render(){
        return(
            <View style={styleS.shipAddrView}>
                <View style={styleS.shipAddrName}>
                    <Text style={styleS.shipAddrTxt}>
                        收货地址
                    </Text>
                </View>
                <View style={styleS.shipAddr}>
                    <View style={{marginTop:12}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styleS.shipAddrTxt1}>dsd</Text>
                            <Text style={styleS.shipAddrTxt1}>dsdsdsd</Text>
                        </View>
                        <Text style={styleS.shipAddrTxt2}>jdsodjskfhisfsiojiosjfos</Text>
                    </View>
                    <View style={{flex:1}}/>
                    <Image style={styleS.shipAddrImg} source={Images.is}/>
                </View>
            </View>
        );
    }
}

const styleS = StyleSheet.create({
    shipAddrView:{
        marginTop:9,
    },
    shipAddrName:{
        height:40,
        backgroundColor:'#FFFFFF',

    },
    shipAddrTxt:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17,
        marginTop:11,

    },
    shipAddr:{
        height:72,
        backgroundColor:'#FFFFFF',
        marginTop:1,
        flexDirection:'row',
        alignItems:'center'
    },
    shipAddrImg:{
        width:8,
        height:16,
        marginRight:16
    },
    shipAddrTxt1:{
        fontSize: 14,
        color: '#666666',
        marginLeft:19
    },
    shipAddrTxt2:{
        fontSize: 14,
        color: '#666666',
        marginLeft:17,
        marginTop:5
    }
})