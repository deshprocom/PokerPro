import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image} from 'react-native';
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
            banners: [{},{},{},{}]
        })
    }

    topBar = () => {
        return (<View style={styleM.topView}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('selectTicket')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{
                    height: 19, width: 11,
                    marginLeft: 20, marginRight: 20
                }}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.share}
                rightImageStyle={{height:22,width:22,resizeMode:'contain',marginRight:25}}
                rightBtnPress={() => {


                }}/>

        </View>)
    };

    render(){
        return(
            <ScrollView style={{backgroundColor:'#EEEEEE'}}>
                <MallInfoPageTopBar topBar={this.topBar()} banners={this.state.banners}/>
                <ProductSpecification/>
                <ShipAddress/>
                <MallIntroduction/>
                <MallInfoBottom/>
            </ScrollView>
        );
    }
}

const styleM = StyleSheet.create({
    topView: {
        backgroundColor: 'rgba(255,255,255,0.98)'
    }
})