import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';


export default class MainBanner extends Component {


    state = {
        items: ['red', 'green', 'yellow', 'pink']
    };

    render() {

        return (
            <View style={{height: 200}}>
                <Swiper
                    autoplayTimeout={3}
                    autoplay>
                    {this.state.items.map((item, key) => {
                        return <View
                            key={key}
                            style={{backgroundColor: item, flex: 1}}>

                        </View>
                    })}

                </Swiper>
            </View>
        )
    }
}