import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import Swipeout from 'react-native-swipeout';
import I18n from 'react-native-i18n';
import {deleteProductFromCart, util, showToast} from '../../../utils/ComonHelper';
import {ImageLoad} from '../../../components';
import EmptyCart from './EmptyCart';

export default class ShoppingCart extends Component {
    state = {
        showCart: true,
        showEdit: true,
        showBottom: true,
        selected: false,
        selectAll: false,
        dataHosts: [],
        selectedData:[]
    };

    componentDidMount() {

        let commodities = [...global.shoppingCarts];

        commodities.map(function (x) {
            x.isSelect = false;
        });
        this.setState({
            dataHosts: commodities
        })
    }


    total_price = () => {
        const {dataHosts} = this.state;
        let total_prices = Number.parseFloat('0');
        dataHosts.forEach(item => {
            if (item.isSelect)
                total_prices += Number.parseFloat(item.commodity.price) * item.number;
        });

        return total_prices;
    };

    count = () => {
        const {dataHosts} = this.state;
        let count = 0;
        dataHosts.forEach(item => {
            if (item.isSelect)
                ++count;
        });

        return `(${count})`;
    };

    dataFilter=()=>{
        return this.state.dataHosts.filter(
            function (value) {
                return value.isSelect
            }
        )
    };

    toBottom = () => {
        return (
            <View style={styleS.bottomView}>
                <TouchableOpacity

                    onPress={() => {
                        this.setState({
                            selectAll: !this.state.selectAll
                        });
                        this._pressAll()
                    }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                </TouchableOpacity>
                <Text style={styleS.selectedAll}>{I18n.t('selectAll')}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styleS.total}>{I18n.t('ticket_price')}</Text>
                    <Text style={styleS.selectedPrice}>{this.total_price()}</Text>
                </View>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={styleS.settlementView}
                                  onPress={() => {
                                      let datas=this.dataFilter()
                                      if(datas.length>0){
                                          router.toOrderConfirm(datas);
                                      }else{
                                          showToast("请选择商品")
                                      }
                                  }}>
                    <Text style={styleS.settlement}>{I18n.t('settlement')}</Text>
                    <Text style={styleS.settlementQuantity}>{this.count()}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    _isSelect = (x) => {
        return (x.isSelect === false);
    };
    _deleteItem = () => {
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects = newSelects.filter(this._isSelect);
        deleteProductFromCart(newSelects);
        this.setState({dataHosts: newSelects});

    };
    toBottom2 = () => {
        return (
            <View style={styleS.bottomView}>
                <TouchableOpacity

                    onPress={() => {
                        this.setState({
                            selectAll: !this.state.selectAll
                        });
                        this._pressAll()
                    }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                </TouchableOpacity>
                <Text style={styleS.selectedAll}>{I18n.t('selectAll')}</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    style={styleS.settlementView2}
                    onPress={() => {
                        this._deleteItem()
                    }}>
                    <Text style={styleS.settlement2}>{I18n.t('buy_del')}</Text>
                </TouchableOpacity>
            </View>
        )
    };

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
            <Text style={styleS.cart}>{this.state.showCart ? I18n.t('cart') : ""}</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                testID="btn_bar_right"
                style={styleS.popBtn}
                onPress={() => {
                    this.setState({
                        showEdit: !this.state.showEdit,
                        showCart: !this.state.showCart,
                        showBottom: !this.state.showBottom,
                        selectAll: false
                    });
                    this.refreshAll()
                }}>
                <Text style={styleS.rightTxt}>{this.state.showEdit ? I18n.t('buy_editor') : I18n.t('complete')}</Text>
            </TouchableOpacity>


        </View>)
    };
    closeThisMall = (item) => {
        const {dataHosts} = this.state;
        const {commodity} = item;
        let index = dataHosts.findIndex(function (x) {
            return util.isEqual(commodity, x.commodity);
        });
        dataHosts.splice(index, 1);
        deleteProductFromCart(dataHosts);

        this.setState({dataHosts: [...dataHosts]});

    };
    _pressAll = () => {
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        if (this.state.selectAll === false) {
            newSelects.map(function (x) {
                x.isSelect = true
            });
        } else {
            newSelects.map(function (x) {
                x.isSelect = false
            });
        }


        this.setState({newSelects})
    };
    refreshAll = () => {
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects.map(function (x) {
            x.isSelect = false
        });
        this.setState({newSelects})
    };

    _pressItem = (item) => {

        const {id} = item.commodity;
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects.map(function (x) {
            if (x.commodity.id === id) {
                item.isSelect = !item.isSelect;
            }
        });

        this.setState({newSelects})
    };

    renderShowEditView(item) {
        let imageURL = Images.radio;
        if (item.isSelect === true) {
            imageURL = Images.radioSelected
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this._pressItem(item)
                }}>
                <Image style={styleS.radioImg}
                       source={imageURL}/>
            </TouchableOpacity>
        )
    };

    _renderItem = ({item}) => {
        let swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: '#F34A4A',
                onPress: () => {
                    this.closeThisMall(item)
                }
            }
        ];
        const {price, original_price, stock, arr_type, title, image} = item.commodity;
        let type_value = '';
        if(!util.isEmpty(arr_type)){
            arr_type.forEach(x => {
                type_value += x.name + ':';
                type_value += x.value + '  ';
            });
        }

        return (
            <Swipeout
                autoClose={true}
                right={swipeoutBtns}>
                <View style={styleS.renderItem}>
                    {this.renderShowEditView(item)}

                    <ImageLoad style={styleS.mallImg} source={{uri: image}}/>
                    <View style={styleS.TxtView}>
                        <Text numberOfLines={2} style={styleS.mallTextName}>{title}</Text>
                        <Text
                            style={styleS.mallAttributes}>{type_value}</Text>
                        <View style={styleS.PriceView}>
                            <Text style={styleS.Price}>¥{price}</Text>
                            <View style={{flex: 1}}/>
                            {this.buyQuantity(item)}
                        </View>
                    </View>
                </View>
            </Swipeout>
        )
    };
    buyQuantity = (item) => {
        const {dataHosts} = this.state;
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };

        const {id, stock} = item.commodity;

        return (
            <View style={styleS.quantity}>
                <TouchableOpacity
                    style={[styleS.buyTouch, item.number === 1 ? styleCutDisable : styleCut]}
                    onPress={() => {
                        if (item.number > 1) {
                            --item.number;
                            let newDataHosts = [...dataHosts];
                            newDataHosts.map(function (x) {
                                if (id === x.commodity.id) {
                                    x.number = item.number
                                }
                            });
                            this.setState({
                                dataHosts: newDataHosts
                            })
                        }

                    }}>
                    <Image style={styleS.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styleS.buyInput}>
                    <Text>{item.number}</Text>
                </View>

                <TouchableOpacity
                    style={styleS.buyTouch}
                    onPress={() => {
                        if (item.number >= stock) {
                            showToast(I18n.t('max_stock'));
                            return;
                        }
                        ++item.number;
                        let newDataHosts = [...dataHosts];
                        newDataHosts.map(function (x) {
                            if (id === x.commodity.id) {
                                x.number = item.number
                            }
                        });
                        this.setState({
                            dataHosts: newDataHosts
                        })
                    }}>
                    <Image style={styleS.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };


    _separator = () => {
        return <View style={{height: 10, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    };


    render() {

        console.log(this.state.dataHosts);
        if(util.isEmpty(this.state.dataHosts)){
            return <EmptyCart/>
        }
        return (
            <View style={{flex: 1}}>
                {this.topBar()}

                <FlatList
                    style={{paddingTop: 6, marginBottom: 50}}
                    data={this.state.dataHosts}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `commodities${index}`}
                />

                {this.state.showBottom ? this.toBottom() : this.toBottom2()}

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
        marginRight: 17, flexDirection: 'row', alignItems: 'center', marginTop: 9,
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
    },
    settlementView2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 37,
        width: 89,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#F34A4A'
    },
    settlement2: {
        fontSize: 18,
        color: '#F34A4A',
    },
})