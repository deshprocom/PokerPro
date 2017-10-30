import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image,TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import MallInfoPageTopBar from './MallInfoPageTopBar';
import ProductSpecification from './ProductSpecification';
import ShipAddress from './ShipAddress';
import MallIntroduction from './MallIntroduction';
import MallInfoBottom from './MallInfoBottom';

export default class  MallInfoPage extends Component{
    state = {
        banners: []
    };

    componentDidMount(){
        this.setState({
            banners: [1,2,3,4]
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
            <View style={{flex:1}}/>
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

    render(){
        return(
            <ScrollView style={{backgroundColor:'#EEEEEE'}}>
                <MallInfoPageTopBar banners={this.state.banners}/>
                <ProductSpecification/>
                <ShipAddress/>
                <MallIntroduction/>
                <MallInfoBottom/>

                {this.topBar()}
            </ScrollView>
        );
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
        width:'100%'
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