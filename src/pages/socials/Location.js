/**
 * Created by hfl on 2018/4/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Colors, Images} from "../../Themes";
import {NavigationBar} from '../../components';
import I18n from "react-native-i18n";
import {reallySize} from "./Header";

export default class Location extends Component{
    constructor(props){
        super(props);
        this.state = {
            address:[
                {
                    title:"不显示位置",
                    subtitle:"",
                    id:0,
                },
                {
                    title:"深圳市",
                    subtitle:"",
                    id:0,
                },
                {
                    title:"卓越Intown（福田店）",
                    subtitle:"广东省深圳市福田区金海路2030号",
                    id:0,
                },
                {
                    title:"海底捞火锅（卓越店）",
                    subtitle:"广东省深圳市福田区卓越世纪中心4楼L401、L402",
                    id:0,
                }
            ],
            selectedIndex:0,
        };
    }

    ///选择地址
    selectedAddress = (index) => {
        this.setState({selectedIndex:index});
    };

    _renderItem = (item) => {
        let {title,subtitle} = item.item;
        let selectedIndex = this.state.selectedIndex;
        return (
            <TouchableOpacity onPress={() => {this.selectedAddress(item.index)}}>
                <View style={styles.item}>
                    <View>
                        <Text numberOfLines={1} style={styles.title}>{title}</Text>
                        {subtitle !== "" ? <Text numberOfLines={1} style={styles.subTitle}>{subtitle}</Text> : null}
                    </View>
                    {item.index === selectedIndex ? <Image source={Images.social.icon_address_s} style={styles.image}/> : null}
                </View>
            </TouchableOpacity>
        );
    };

    render(){
        return(
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar barStyle={'dark-content'}
                               titleStyle={{fontSize: 17, color: Colors._333}}
                               toolbarStyle={{backgroundColor: 'white'}}
                               title={I18n.t('location')}
                               leftBtnIcon={Images.set_back}
                               leftImageStyle={{height:19,width:11, marginLeft: 20, marginRight: 20}}
                               leftBtnPress={() => {
                                   router.pop()
                               }}
                />

                <FlatList data={this.state.address}
                          keyExtractor={(item, index) => index + ""}
                          renderItem={this._renderItem}
                          ListHeaderComponent={() => <View style={[{backgroundColor:"#ECECEE"},{height:reallySize(15)}]}/>}
                          ItemSeparatorComponent={() => <View style={[{backgroundColor:"#ECECEE"},{height:1}]}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ECECEE",
        flex: 1,
    },
    item:{
        height:reallySize(56),
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    image:{
        height:reallySize(11),
        width:reallySize(15),
        marginRight:reallySize(17),
    },
    title:{
        color:"#444444",
        width:reallySize(300),
        fontSize:14,
        marginLeft:reallySize(17),
    },
    subTitle:{
        color:"#888888",
        width:reallySize(300),
        fontSize:12,
        marginTop:reallySize(6),
        marginLeft:reallySize(17),
    }
});