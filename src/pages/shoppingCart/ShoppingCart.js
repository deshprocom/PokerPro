import React, {Component,PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import Swipeout from 'react-native-swipeout';


export default class ShoppingCart extends Component {
    state = {
        selected: false,
        text: "1",
        selectAll: false,
        dataHosts: [1, 2, 3, 4, 5, 6],
    }
    static propTypes = {
        pressItem: PropTypes.func,
        pressAll: PropTypes.func,
        selectAll: PropTypes.bool
    };

    toBottom = () => {
        return (
            <View style={styleS.bottomView}>
                <TouchableOpacity

                    onPress={this._pressAll}>
                    <Image style={styleS.radioImg} source={this.props.selectAll?Images.radioSelected:Images.radio}/>
                </TouchableOpacity>
                <Text style={styleS.selectedAll}>全选</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styleS.total}>合计：</Text>
                    <Text style={styleS.selectedPrice}>¥23,300.8</Text>
                </View>
                <View style={{flex:1}}/>
                <TouchableOpacity style={styleS.settlementView}>
                    <Text style={styleS.settlement}>去结算</Text>
                    <Text style={styleS.settlementQuantity}>(3)</Text>
                </TouchableOpacity>
            </View>
        )
    }

    topBar = () => {
        return (<View style={styleS.topBar}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleS.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleS.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text style={styleS.cart}>购物车</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                testID="btn_bar_right"
                style={styleS.popBtn}
                onPress={() => {
                    router.toEditCart()
                }}>
                <Text style={styleS.rightTxt}>编辑</Text>
            </TouchableOpacity>


        </View>)
    };
    closeThisMall=()=>{
        return(
           alert("确认删除该商品吗？")
        )
    };
    _pressAll = () => {
        const {selectAll} = this.state;
        this.setState((state) => {
            const newData = [...state.dataHosts];
            newData.map(function (element) {
                element.select = !selectAll;
                return element;
            });

            return {
                dataHosts: newData,
                selectAll: !selectAll
            }
        })
    }

    _pressItem = (item) => {

        this.setState((state) => {
            const newData = [...state.dataHosts];
            newData.map(function (element) {
                if (item.id === element.id) {
                    element.select = !item.select;
                }
                return element;
            });

            return {dataHosts: newData}
        })
    };
    _renderItem = (item, index) => {

        let swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor:'#F34A4A',
                onPress:this.closeThisMall
            }
        ];
        return (
            <Swipeout right={swipeoutBtns}>
                <View style={styleS.renderItem}>
                    <TouchableOpacity
                        onPress={()=>{
                            this._pressItem(item)
                        }}>
                        <Image style={styleS.radioImg}
                               source={item.select?Images.radioSelected:Images.radio}/>
                    </TouchableOpacity>
                    <Image style={styleS.mallImg} source={Images.empty_image}/>
                    <View style={styleS.TxtView}>
                        <Text numberOfLines={2} style={styleS.mallTextName}>筹码14克皇冠粘土百家乐德州扑克筹码币</Text>
                        <Text style={styleS.mallAttributes}>重量：1.62KG 颜色：黑 数量：500</Text>
                        <View style={styleS.PriceView}>
                            <Text style={styleS.Price}>¥555555.55</Text>
                            {this.buyQuantity()}
                        </View>
                    </View>
                </View>
            </Swipeout>
        )
    };
    buyQuantity = () => {
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        return (
            <View style={styleS.quantity}>
                <TouchableOpacity
                    style={[styleS.buyTouch,Number(this.state.text)==="1"?styleCutDisable:styleCut]}
                    onPress={()=>{
                        let number =Number(this.state.text)
                        if(number>=1){
                          this.setState({
                            text:number-1
                          })
                        }

                    }}>
                    <Image style={styleS.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styleS.buyInput}>
                    <Text>1</Text>
                </View>

                <TouchableOpacity
                    style={styleS.buyTouch}
                    onPress={()=>{
                        let number =Number(this.state.text)
                        this.setState({
                            text:number+1
                        })
                    }}>
                    <Image style={styleS.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch([1, 2, 3, 4, 5, 6], 8)
    };

    _separator = () => {
        return <View style={{height:10,marginLeft:17,marginRight:17,backgroundColor:'#ECECEE'}}/>;
    };

    render() {
        return (
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

const styleS = StyleSheet.create({
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
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    rightTxt: {
        fontSize: 15,
        color: '#161718'
    },
    cart: {
        fontSize: 17,
        color: '#161718',
        alignItems: 'center'
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
        height: 50,
        width: 120,
        backgroundColor: '#F34A4A'
    },
    settlement: {
        fontSize: 18,
        color: '#FFFFFF',
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