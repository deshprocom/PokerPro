import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ApplicationType from './ApplicationType';
import ApplicationTypeInfo from './ApplicationTypeInfo';
import RefundAmount from './RefundAmount';
import RefundInstruction from './RefundInstruction';
import UploadDocument from './UploadDocument';
import UploadBottom from './UploadBottom';
import RenderItem from '../order/RenderItem';
import {NavigationBar} from '../../../components';


export default class ReturnPage extends Component {

    state={
        typeShow: false,
    };

    showTypeInfo = () => {
        this.setState({
            typeShow: !this.state.typeShow
        })
    };

    render(){
        return(
            <View style={{flex:1}}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('apply_returned')}/>
                <ScrollView style={styleC.orderView}>
                    <RenderItem/>

                    <ApplicationType
                        showTypeInfo={this.showTypeInfo}/>

                    <RefundAmount/>


                    <RefundInstruction/>

                    <UploadDocument/>

                    <View style={{height:80}}/>
                </ScrollView>


                <UploadBottom
                    showTypeInfo={this.showTypeInfo}/>

                {this.state.typeShow ? <ApplicationTypeInfo
                    showTypeInfo={this.showTypeInfo}/> : null}
            </View>

        );
    }
}
const styleC = StyleSheet.create({
    orderView:{
        backgroundColor:'#ECECEE'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: '#FFFFFF',
        width: '100%',
        zIndex: 999
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    cart:{
        fontSize: 17,
        color: '#161718',
        fontWeight:'bold'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    rightTxt: {
        fontSize: 15,
        color: '#161718'
    },

})