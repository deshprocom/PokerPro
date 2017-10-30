import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import MallInfoPageTopBar from './MallInfoPageTopBar';
import ProductSpecification from './ProductSpecification';
import ShipAddress from './ShipAddress';
import MallIntroduction from './MallIntroduction';
import MallInfoBottom from './MallInfoBottom';
import ProductSpecificationInfo from './ProductSpecificationInfo';

export default class MallInfoPage extends Component {
    state = {
        banners: [],
        specShow: false
    };

    componentDidMount() {
        this.setState({
            banners: [1, 2, 3, 4]
        })
    }

    topBar = () => {
        return (<View style={styleM.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleM.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleM.backImg}
                       source={Images.sign_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                testID="btn_bar_right"
                style={styleM.popBtn}
                onPress={() => {
                }}>
                <Image style={styleM.imgShare}
                       source={Images.share}/>
            </TouchableOpacity>


        </View>)
    };

    render() {
        const {specShow} = this.state;
        return (
            <View style={{flex: 1}}>

                <ScrollView style={{backgroundColor: '#EEEEEE'}}>
                    <MallInfoPageTopBar banners={this.state.banners}/>
                    <ProductSpecification
                        showSpecInfo={this.showSpecInfo}
                    />
                    <ShipAddress/>
                    <MallIntroduction/>
                    <View style={{height: 50}}/>
                </ScrollView>


                {this.topBar()}

                {specShow ? <ProductSpecificationInfo/> : null}

                <MallInfoBottom
                    showSpecInfo={this.showSpecInfo}/>

            </View>

        );
    }

    showSpecInfo = () => {
        this.setState({
            specShow: !this.state.specShow
        })
    }
}

const styleM = StyleSheet.create({
    topView: {
        backgroundColor: 'rgba(255,255,255,0.98)'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    imgShare: {
        height: 22,
        width: 23,
        marginRight: 24.8
    },
})