import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import Swipeout from 'react-native-swipeout';
import I18n from 'react-native-i18n';
import {deleteProductFromCart, util, showToast, alertOrder} from '../../../utils/ComonHelper';
import {ImageLoad} from '../../../components';
import EmptyCart from './EmptyCart';
import {connect} from 'react-redux';
import {ADD_CART, DELETE_CART} from '../../../actions/ActionTypes';

class ShoppingCart extends Component {
    state = {
        showCart: true,
        showEdit: true,
        showBottom: true,
        selected: false,
        selectAll: false,
        dataHosts: [],
        selectedData: []
    };

    componentDidMount() {

        let commodities = [...global.shoppingCarts];

        commodities.map(function (x) {
            x.isSelect = false;
        });
        this.setState({
            dataHosts: commodities.reverse()
        })
    }

    componentWillReceiveProps(newProps) {

        if (newProps.hasData && (newProps.actionType === ADD_CART
                || newProps.actionType === DELETE_CART)) {

            let commodities = [...global.shoppingCarts];

            commodities.map(function (x) {
                x.isSelect = false;
            });
            this.setState({
                dataHosts: commodities
            })
        }
    }


    total_price = () => {
        const {dataHosts} = this.state;
        let total_prices = Number.parseFloat('0');
        dataHosts.forEach(item => {
            if (item.isSelect)
                total_prices += Number.parseFloat(item.variant.price) * item.number;
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

    dataFilter = () => {
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
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                        this.setState({
                            selectAll: !this.state.selectAll
                        });
                        this._pressAll()
                    }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                    <Text style={styleS.selectedAll}>{I18n.t('selectAll')}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styleS.total}>{I18n.t('ticket_price')}</Text>
                        <Text style={styleS.selectedPrice}>{this.total_price()}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{flex: 1}}/>
                <TouchableOpacity style={styleS.settlementView}
                                  onPress={() => {
                                      if (util.isEmpty(global.login_user)) {
                                          global.router.toLoginFirstPage();
                                      } else {
                                          let datas = this.dataFilter();
                                          if (datas.length > 0) {
                                              global.router.toOrderConfirm(datas);
                                          } else {
                                              showToast(I18n.t('please_select_malls'))
                                          }
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
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                        this.setState({
                            selectAll: !this.state.selectAll
                        });
                        this._pressAll()
                    }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                    <Text style={styleS.selectedAll}>{I18n.t('selectAll')}</Text>
                </TouchableOpacity>
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
        const {variant} = item;
        let index = dataHosts.findIndex(function (x) {
            return util.isEqual(variant, x.variant);
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

        const {id} = item.variant;
        const {dataHosts} = this.state;
        let newSelects = [...dataHosts];
        newSelects.map(function (x) {
            if (x.variant.id === id) {
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
                style={{height: 120, alignItems: 'center', justifyContent: 'center'}}
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
                text: I18n.t('buy_del'),
                backgroundColor: '#F34A4A',
                onPress: () => {
                    alertOrder(I18n.t('confirm_delete'), () => {
                        this.closeThisMall(item)
                    });

                }
            }
        ];
        const {price, original_price, text_sku_values, title, image, product_id} = item.variant;
        let type_value = '';
        if (!util.isEmpty(text_sku_values)) {
            text_sku_values.forEach(x => {
                type_value += x + ' ';
            });
        }

        return (
            <Swipeout
                autoClose={true}
                right={swipeoutBtns}>
                <View

                    style={styleS.renderItem}>
                    {this.renderShowEditView(item)}

                    <View
                        activeOpacity={0.5}
                        onPress={() => {
                            global.router.replaceProductInfo({id: product_id})
                        }}>
                        <ImageLoad style={styleS.mallImg} source={{uri: image}}/>
                    </View>

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

        const {id, stock} = item.variant;

        return (
            <View style={styleS.quantity}>
                <TouchableOpacity
                    style={[styleS.buyTouch, item.number === 1 ? styleCutDisable : styleCut]}
                    onPress={() => {
                        if (item.number > 1) {
                            --item.number;
                            let newDataHosts = [...dataHosts];
                            newDataHosts.map(function (x) {
                                if (id === x.variant.id) {
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
                            if (id === x.variant.id) {
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

        if (util.isEmpty(this.state.dataHosts)) {
            return <EmptyCart/>
        }
        return (
            <View style={{flex: 1}}>
                {this.topBar()}
                <ScrollView
                    bounces={false}>
                    <FlatList
                        style={{paddingTop: 6}}
                        data={this.state.dataHosts}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `commodities${index}`}
                    />

                    <View style={{paddingTop: 160}}/>
                </ScrollView>


                {this.state.showBottom ? this.toBottom() : this.toBottom2()}

            </View>
        )
    }
}

const bindAction = dispatch => ({});

const mapStateToProps = state => ({
    actionType: state.MallState.actionType,
    hasData: state.MallState.hasData
});

export default connect(mapStateToProps, bindAction)(ShoppingCart);

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
        marginLeft: 11,
        resizeMode: 'contain',
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
        paddingBottom: 11,
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
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#EEEEEE'
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