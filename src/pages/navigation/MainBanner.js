import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';
import {getMainBanners} from '../../services/NewsDao';
import I18n from 'react-native-i18n';


export default class MainBanner extends Component {


    state = {
        items: []
    };

    componentDidMount() {
        getMainBanners(data => {


            this.setState({
                items: data.banners
            });
            console.log('items', this.state.items)
        }, err => {
        })
    }

    render() {

        return (
            <View style={{height: 200}}>
                <Swiper
                    autoplayTimeout={3}
                    autoplay>
                    {this.state.items.map((item, key) => {
                        return <Image  key={key} style={{height:200,width:'100%'}} source={{uri:item.image}}/>
                    })}

                </Swiper>
            </View>
        )
    }
}