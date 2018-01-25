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
import {crowd_banner} from '../../services/CrowdDao';
import {isEmptyObject} from '../../utils/ComonHelper';

export default class Carousel extends PureComponent {
    state = {
        banners: {}
    };

    componentDidMount() {
        crowd_banner(data => {
            console.log("banners:", data);
            this.setState({
                banners: data
            })
        }, err => {
        });
    }

    render() {
        const {banners} = this.state.banners;
        return (
            <View style={{height: 200, marginBottom: 10}}>
                <Swiper
                    activeDotStyle={stylesM.activeDot}
                    dotStyle={stylesM.dot}
                    autoplayTimeout={3}
                    autoplay>
                    {isEmptyObject(banners) ? [] : banners.map((item, key) => {
                            return <TouchableOpacity
                                key={key}
                                activeOpacity={1}
                            >
                                <Image style={{height: 200, width: '100%'}} source={{uri: item.image}}/>
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