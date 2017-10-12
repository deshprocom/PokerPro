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
        return (
            <View
                style={{height: 200}}>
                <Swiper
                    autoplayTimeout={3}
                    autoplay>
                    {this.props.banners.map((item, key) => {
                        return <TouchableOpacity
                            key={'banner' + key}
                            onPress={() => this._clickBanner(item)}
                            activeOpacity={1}>
                            <Image key={key} style={{height: 200, width: '100%'}} source={{uri: item.image}}/>
                        </TouchableOpacity>

                    })}

                </Swiper>
            </View>
        )
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