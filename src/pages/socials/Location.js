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
import {locations} from '../../services/SocialDao'
import {isInChina} from './ChinaLocation';
import {checkPermission} from "../comm/Permission";

export default class Location extends Component{
    constructor(props){
        super(props);
        this.state = {
            address:[
                {
                    name:I18n.t('hide_address'),
                    address:"",
                    latitude:"",
                    longitude:"",
                }
            ],
            selectedIndex:0,
        };
    }

    componentDidMount(){
        checkPermission("location", result => {
            if (result){
                navigator.geolocation.getCurrentPosition(data => {
                    let latitude = data.coords.latitude;
                    let longitude = data.coords.longitude;
                    let inChina = isInChina(latitude,longitude);

                    let geoType = "amap";
                    if (!inChina) {
                        geoType = "google";
                    }
                    let body = {
                        "latitude": latitude,
                        "longitude": longitude,
                        "geo_type": geoType,
                    };
                    locations(body,ret => {
                        let address = [...this.state.address];
                        let nearbys = ret.nearbys;
                        nearbys.forEach(item => {
                            address.push(item);
                        });
                        this.setState({address:address});
                    },err => {
                        console.log("获取附近位置失败");
                    })

                }, err => {
                    console.log(err)
                })
            }
        })
    }



    ///选择地址
    selectedAddress = (index) => {
        this.setState({selectedIndex:index});
    };

    _renderItem = (item) => {
        let {name,address} = item.item;
        let selectedIndex = this.state.selectedIndex;
        return (
            <TouchableOpacity onPress={() => {this.selectedAddress(item.index)}}>
                <View style={styles.item}>
                    <View>
                        <Text numberOfLines={1} style={styles.title}>{name}</Text>
                        {address !== "" ? <Text numberOfLines={1} style={styles.subTitle}>{address}</Text> : null}
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
                               title={I18n.t('location_title')}
                               leftBtnIcon={Images.set_back}
                               leftImageStyle={{height:19,width:11, marginLeft: 20, marginRight: 20}}
                               leftBtnPress={() => {
                                   router.pop();
                               }}
                               rightBtnText={I18n.t('certain')}
                               rightBtnPress={() => {
                                   if (this.props.params.address === null) return;
                                   this.props.params.address(this.state.address[this.state.selectedIndex]);
                                   router.pop();
                               }}
                               btnTextStyle={{fontSize: 14, color: Colors._333}}
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