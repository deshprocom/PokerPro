import React, {Component,PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import UltimateFlatList from '../../../components/ultimate/UltimateFlatList';

export default class EditCartPage extends Component {
    state = {
        selected: false,
        text: "1",
    }

    topBar = () => {
        return (<View style={styleE.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleE.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleE.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styleE.popBtn}>
                <Text style={styleE.popBtnTxt}>完成</Text>
            </TouchableOpacity>
        </View>)
    };
    buyQuantity = () => {
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        return (
            <View style={styleE.quantity}>
                <TouchableOpacity
                    style={[styleE.buyTouch,Number(this.state.text)==="1"?styleCutDisable:styleCut]}
                    onPress={()=>{
                        let number =Number(this.state.text)
                        if(number>=1){
                          this.setState({
                            text:number-1
                          })
                        }

                    }}>
                    <Image style={styleE.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styleE.buyInput}>
                    <Text>1</Text>
                </View>

                <TouchableOpacity
                    style={styleE.buyTouch}
                    onPress={()=>{
                        let number =Number(this.state.text)
                        this.setState({
                            text:number+1
                        })
                    }}>
                    <Image style={styleE.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };
    _renderItem = (item, index) => {

        return (
            <View style={styleE.renderItem}>
                <TouchableOpacity
                    onPress={() => this.props.pressItem(item)}>
                    <Image style={styleE.radioImg}
                           source={item.select?Images.radioSelected:Images.radio}/>
                </TouchableOpacity>
                <Image style={styleE.mallImg} source={Images.empty_image}/>
                <View style={styleE.TxtView}>
                    <Text numberOfLines={2} style={styleE.mallTextName}>筹码14克皇冠粘土百家乐德州扑克筹码币</Text>
                    <Text style={styleE.mallAttributes}>重量：1.62KG 颜色：黑 数量：500</Text>
                    <View style={styleE.PriceView}>
                        <Text style={styleE.Price}>¥555555.55</Text>
                        {this.buyQuantity()}
                    </View>
                </View>
            </View>
        )
    };
    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch([1, 2, 3, 4, 5, 6], 8)
    };

    _separator = () => {
        return <View style={{height:10,marginLeft:17,marginRight:17,backgroundColor:'#ECECEE'}}/>;
    };
    toBottom = () => {
        return (
            <View style={styleE.bottomView}>
                <TouchableOpacity

                    onPress={this.props.pressAll}>
                    <Image style={styleE.radioImg} source={this.props.selectAll?Images.radioSelected:Images.radio}/>
                </TouchableOpacity>
                <Text style={styleE.selectedAll}>全选</Text>
                <View style={{flex:1}}/>
                <TouchableOpacity style={styleE.settlementView}>
                    <Text style={styleE.settlement}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    };

    render(){
        return(
            <View style={{flex:1}}>
                {this.topBar()}
                <UltimateFlatList
                    style={{paddingTop:6,marginBottom:50}}
                    onFetch={this.onFetch}
                    showsHorizontalScrollIndicator={false}
                    separator={this._separator}
                    item={this._renderItem}
                    keyExtractor={(item, index) => index}
                />
                {this.toBottom()}
            </View>
        )
    }
}

const styleE = StyleSheet.create({
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
    popBtnTxt:{
        fontSize: 15,
        color: '#161718'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    cart: {
        fontSize: 17,
        color: '#161718',
        alignItems: 'center'
    },
    cartView:{
        marginTop:64,
        alignItems:'center'
    },
    cartImg:{
        width:69,
        height:64
    },
    cartViewTxt:{
        marginTop:44,
        width:140,
        height:37,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#F34A4A',
        borderRadius:4
    },
    cartTxt:{
        fontSize: 18,
        color: '#F34A4A',

    },
    radioImg: {
        width: 22,
        height: 22,
        marginLeft: 16
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 11
    },
    TxtView: {
        flex: 1,
        marginLeft: 12,
    },
    mallTextName: {
        fontSize: 14,
        color: '#333333',
        marginRight: 27
    },
    mallAttributes: {
        fontSize: 10,
        color: '#AAAAAA',
        marginRight: 27,
        marginTop: 5
    },
    PriceView: {
        flexDirection: 'row',
    },
    Price: {
        fontSize: 14,
        color: '#F34A4A',
        marginTop: 19
    },
    buyTouch: {
        width: 33,
        height: 30,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyImgCut: {
        width: 12,
        height: 2
    },
    buyImgAdd: {
        width: 12,
        height: 12,
    },
    buyInput: {
        width: 38,
        height: 30,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buyTextInput: {
        fontSize: 15,
        color: '#444444',
    },
    renderItem: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: 15, paddingBottom: 11
    },
    quantity: {
        marginRight: 17, flexDirection: 'row', alignItems: 'center', marginTop: 9, marginLeft: 15
    },
    selectedAll: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 6
    },
    total: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12
    },
    selectedPrice: {
        fontSize: 18,
        color: '#DF1D0F',
    },
    settlementView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 37,
        width: 89,
        marginRight:15,
        borderWidth:1,
        borderColor:'#F34A4A'
    },
    settlement: {
        fontSize: 18,
        color: '#F34A4A',
    },
    settlementQuantity: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    bottomView: {
        backgroundColor: '#FFFFFF',
        height: 50,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }
})