import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import Swiper from 'react-native-swiper';
import {isEmptyObject, moneyFormat} from '../../../utils/ComonHelper'

export default class MallInfoPageTopBar extends Component {


    componentDidMount() {

    }

    _clickBanner = (index) => {
        const {images} = this.props.product;
        let urls = images.map(item => {
            return {url: item.large}
        });
        console.log(urls);
        router.toImageGalleryPage(urls, index)
    };


    _carouselView = () => {
        if (isEmptyObject(this.props.product))
            return;
        const {images} = this.props.product;


        return <View style={styleM.mallInfoBgImg}>
            <Swiper
                autoplayTimeout={3}
                autoplay>
                {images.map((item, index) => {
                    return <TouchableOpacity
                        key={`banner${index}`}
                        onPress={() => this._clickBanner(index)}
                        activeOpacity={1}>
                        <Image style={{height: 362, width: '100%'}}
                               source={{uri: item.preview}}/>
                    </TouchableOpacity>

                })}

            </Swiper>
        </View>;
    };

    _detailView = () => {

        if (isEmptyObject(this.props.product))
            return;
        const {title, master} = this.props.product;
        const {price, original_price, origin_point} = master;
        return <View>
            <View style={styleM.mallInfoTop}>
                <Text style={styleM.mallInfoTopText}>{title}</Text>
            </View>
            <View style={styleM.textPrices}>
                <Text style={styleM.textPrice}>¥{price}</Text>
                <Text style={styleM.textOriginPrice}>¥{original_price}</Text>
                <Text style={styleM.discount}>2.3折</Text>
            </View>
            <View style={styleM.locations}>
                <View style={styleM.return7}><Text style={styleM.return7Txt}>7天退换</Text></View>
                <Text style={styleM.freight}>运费：¥12.00</Text>
                <View style={{flex: 1}}/>
                <Text style={styleM.location}>{origin_point}</Text>
            </View>
        </View>
    };


    render() {


        return (
            <View style={{backgroundColor: '#FFFFFF'}}>

                {this._carouselView()}
                {this._detailView()}

            </View>
        );
    }
}

const styleM = StyleSheet.create({
    mallInfoBgImg: {
        height: 362,
        backgroundColor: '#FFFFFF'
    },
    mallInfoTop: {
        backgroundColor: '#FFFFFF'
    },
    mallInfoTopText: {
        marginTop: 14,
        marginLeft: 17,
        marginRight: 29,
        fontSize: 17,
        color: '#333333',
        backgroundColor: '#FFFFFF'
    },
    textPrices: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 3
    },
    textPrice: {
        fontSize: 24,
        color: '#F34A4A',
        marginLeft: 17,
    },
    textOriginPrice: {
        fontSize: 14,
        color: '#CCCCCC',
        marginLeft: 14,
        textDecorationLine: 'line-through',
        textDecorationColor: '#CCCCCC'
    },
    discount: {
        fontSize: 14,
        color: '#CCCCCC',
        marginLeft: 8
    },
    locations: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingBottom: 23,
        marginTop: 5
    },
    return7: {
        width: 55,
        height: 21,
        backgroundColor: "#FF6C6C",
        marginLeft: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    return7Txt: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    freight: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 13
    },
    location: {
        fontSize: 14,
        color: '#666666',
        marginRight: 16
    }
})