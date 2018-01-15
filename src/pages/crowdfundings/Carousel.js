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

        let carousel = ['https://cdn-upyun.deshpro.com/uploads/photo/2018/01/b10f8847636ed9e19fcb43310f26b48b.jpg',
            'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/605e1ef97f57f20eb595ac3695223059.jpg',
            'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/d5c623d68fbfba5d3b2cfa1a1d843db1.jpg',
            'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/1d25c4c446fae853245b0d547361c3b4.jpg'];
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