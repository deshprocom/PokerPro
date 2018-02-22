/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text,StatusBar
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import Swiper from 'react-native-swiper';
import {crowd_banner} from '../../../services/CrowdDao';
import {isEmptyObject} from '../../../utils/ComonHelper';
import {_clickBanner} from '../../navigation/MainBanner';

export default class Carousel extends PureComponent {
    state = {
        banners: []
    };

    componentDidMount() {
        crowd_banner(data => {

            this.setState({
                banners: data
            })
        }, err => {
        });
    }

    render() {
        const {banners} = this.state.banners;
        if (!isEmptyObject(banners) && banners.length > 0)
            return (
                <View style={{height: 200, marginBottom: 10,marginTop:0,backgroundColor:'transparent'}}>

                    <Swiper
                        activeDotStyle={stylesM.activeDot}
                        dotStyle={stylesM.dot}
                        autoplayTimeout={2}
                        autoplay>
                        {banners.map((item,key)=>{
                            return    <TouchableOpacity
                                key={key}
                                activeOpacity={1}
                                onPress={() => _clickBanner(item)}
                            >
                                <Image style={{height: 200, width: '100%'}} source={{uri: item.image}}/>
                            </TouchableOpacity>
                        })}


                    </Swiper>
                </View>


            );
        else
            return <View  style={{height: 200, marginBottom: 10}}>
                <Image source={Images.crowd_banner} style={{height: 200, width: '100%'}}/>
            </View>
    }
}


const stylesM = StyleSheet.create({
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    }

});