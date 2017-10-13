import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View, Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {styles} from './Styles';
import {Images} from '../../Themes';
import Swiper from 'react-native-swiper';
import {BannerStatus} from '../../configs/Status';

export default class Headlines extends Component {
    render() {

        return (
            <View style={styles.pukes}>
                <View style={styles.puke}>
                    <Image style={styles.pukeText} source={Images.pukes}/>
                    <View style={{width: 1, height: 16, backgroundColor: '#E5E5E5', marginLeft: 15}}/>
                    {this._hotLine()}
                </View>
            </View>


        );
    }

    _hotLine = () => {
        return <View style={{
            flex: 1,height: 49,paddingRight:17
        }}>
            {this.props.headlines.length > 0 ? <Swiper
                    scrollEnabled={false}
                    autoplayTimeout={5}
                    renderPagination={() => null}
                    horizontal={false}
                    autoplay>
                    {this.props.headlines.map((item, key) => {
                        return <TouchableOpacity
                            style={{
                            height: 49,
                            alignItems: 'center', justifyContent: 'center'
                        }}
                            key={key}
                            onPress={() => this._clickBanner(item)}
                            activeOpacity={1}>
                            <Text
                                numberOfLines={1}
                                style={{
                                marginLeft: 15,
                                fontSize: 13,
                                color: '#666666'
                            }}
                            >{item.title}</Text>
                        </TouchableOpacity>

                    })}

                </Swiper> : null}
        </View>
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