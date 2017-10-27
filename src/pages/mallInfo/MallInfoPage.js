import React,{Component} from 'react';
import {View,StyleSheet,ScrollView,Text,Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';

export class MallInfoPage extends Component{

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
            <View style={{backgroundColor:'#CECECE'}}>
                <ScrollView>
                    <Image style={styleM.mallInfoBgImg}>
                        {this.topBar()}
                    </Image>
                    <Text style={styleM.mallInfoTopText}>ssssdsdsdsd</Text>
                    <View style={styleM.textPrices}>
                        <Text style={styleM.textPrice}>¥139</Text>
                        <Text style={styleM.textOriginPrice}>¥239</Text>
                        <Text style={styleM.discount}>2.3折</Text>
                    </View>
                    <View style={styleM.locations}>
                        <Text style={styleM.return7}>7天退换</Text>
                        <Text style={styleM.freight}>运费：12.00</Text>
                        <Text style={styleM.location}>深圳</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styleM = StyleSheet.create({
    mallInfoBgImg:{
        width:375,
        height:362
    },
    mallInfoTopText:{
        width:329,
        fontSize: 17,
        color: '#333333',
        marginLeft:17,
        backgroundColor:'#FFFFFF'
    },
    textPrices:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    textPrice:{
        fontSize: 24,
        color: '#F34A4A',
        marginLeft:17
    },
    textOriginPrice:{
        fontSize: 14,
        color: '#CCCCCC',
        marginLeft:14
    },
    discount:{
        fontSize: 14,
        color: '#CCCCCC',
        marginLeft:8
    },
    locations:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    return7:{
        width:55,
        height:21,
        backgroundColor:"#FF6C6C",
        marginLeft:17
    },
    freight:{
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft:13
    },
    location:{
        flex:1,
        fontSize: 14,
        color: '#666666',
        marginRight:16
    }
})