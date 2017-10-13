import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import {BannerStatus} from '../../configs/Status';


export default class MainBanner extends Component {

    render() {
        if (this.props.banners.length > 0)
            return (
                <View style={{height: 200}}>
                    <Swiper
                        activeDotStyle={stylesM.activeDot}
                        dotStyle={stylesM.dot}
                        autoplayTimeout={3}
                        autoplay>
                        {this.props.banners.map((item, key) => {
                            return <TouchableOpacity
                                key={key}
                                onPress={() => this._clickBanner(item)}
                                activeOpacity={1}>
                                <Image style={{height: 200, width: '100%'}} source={{uri: item.image}}/>
                            </TouchableOpacity>

                        })}

                    </Swiper>
                </View>


            );
        else
            return <View style={{height: 200}}/>
    }

    _clickBanner = (item) => {
        switch (item.source_type) {
            case BannerStatus.INFO:
                global.router.toNewsInfo(item.source_id);
                break;
            case BannerStatus.RACE:
                global.router.toRacesInfoPage(this.props, item.source_id, false);
                break;

            case BannerStatus.VIDEO:
                global.router.toVideoInfo(item.source_id);
                break;
            case BannerStatus.LINK:
                global.router.toWebViewPage(this.props, item.link);
                break;

        }
    }
}

const stylesM = StyleSheet.create({
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    }

});