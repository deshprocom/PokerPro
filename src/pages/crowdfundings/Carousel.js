/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Swiper from 'react-native-swiper';

export default class Carousel extends PureComponent {


    render() {

        let carousel = ['https://cdn-upyun.deshpro.com/uploads/info/image/560/preview_langdao1.jpg',
            'https://cdn-upyun.deshpro.com/uploads/info/image/559/preview_caiyunbei.jpg',
            'https://cdn-upyun.deshpro.com/uploads/info/image/557/preview_zhanduisaiguanjun.jpg',
            'https://cdn-upyun.deshpro.com/uploads/info/image/550/preview_guojiabei.png'];
        return (
            <View style={{height: 200, marginBottom: 10}}>
                <Swiper
                    activeDotStyle={stylesM.activeDot}
                    dotStyle={stylesM.dot}
                    autoplayTimeout={3}
                    autoplay>
                    {carousel.map((item, key) => {
                        return <TouchableOpacity
                            key={key}
                            activeOpacity={1}>
                            <Image style={{height: 200, width: '100%'}} source={{uri: item}}/>
                        </TouchableOpacity>

                    })}

                </Swiper>
            </View>


        );
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