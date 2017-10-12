import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';


export default class MainBanner extends Component {

    render() {

        return (
            <View style={{height: 200}}>
                <Swiper
                    autoplayTimeout={3}
                    autoplay>
                    {this.props.banners.map((item, key) => {
                        return <Image key={key} style={{height: 200, width: '100%'}} source={{uri: item.image}}/>
                    })}

                </Swiper>
            </View>
        )
    }
}