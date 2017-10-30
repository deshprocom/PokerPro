import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image,TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';

export default class  MallInfoBottom extends Component{

    componentDidMount(){

    }



    render(){
        return(
            <View style={styleB.mallBottom}>
                <TouchableOpacity style={styleB.shoppingCar}>
                    <Image style={styleB.shoppingCarImg}>
                        <View style={styleB.shoppingCarView}>
                            <Text style={styleB.shoppingCarTxt}>1</Text>
                        </View>
                    </Image>
                </TouchableOpacity>
                <View style={{flex:1}}/>
                <TouchableOpacity style={styleB.joinShoppingCar}>
                    <Text style={styleB.joinShoppingCarTxt}>加入购物车</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styleB = StyleSheet.create({
    mallBottom:{
        height:50,
        width:'100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        zIndex:99
    },
    shoppingCar:{
        borderRadius: 3,
        width:118,
        height:40,
        marginLeft:17,
        borderWidth:1,
        borderColor:'#CCCCCC',
        alignItems:'center',
        justifyContent:'center'
    },
    joinShoppingCar:{
        backgroundColor: '#F34A4A',
        borderRadius: 3,
        width:208,
        height:40,
        marginRight:16,
        alignItems:'center',
        justifyContent:'center'
    },
    shoppingCarImg:{
        width:24,
        height:23
    },
    shoppingCarView:{
        backgroundColor: '#F34A4A',
        width:16,
        height:16,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },
    shoppingCarTxt:{
        fontSize: 12,
        color: '#FFFFFF'
    },
    joinShoppingCarTxt:{
        fontSize: 18,
        color: '#FFFFFF'
    }
})