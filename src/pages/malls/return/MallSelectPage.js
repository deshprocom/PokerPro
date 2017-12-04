/**
 * Created by lorne on 2017/12/1
 * Function:
 * Desc:退换货商品列表
 */
import React, {PureComponent} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, BaseComponent, ImageLoad} from '../../../components';
import Swipeout from 'react-native-swipeout';
import {showToast, util} from '../../../utils/ComonHelper';

export default class MallSelectPage extends PureComponent {

    state = {
        order_items: []
    };

    componentDidMount() {
        const {order_items} = this.props.params;
        if (util.isEmpty(order_items))
            return;
        order_items.map(item => {
            item.stock = item.number;
            item.isSelect = false;
        });
        console.log(order_items)
        this.setState({
            order_items
        })
    }

    render() {
        return <BaseComponent>
            <NavigationBar
                barStyle={'dark-content'}
                toolbarStyle={{backgroundColor: 'white'}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                titleStyle={{color: Colors._161}}
                title={I18n.t('mall_select')}/>

            <FlatList
                style={{paddingTop: 6}}
                data={this.state.order_items}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View
                    style={{height: 10, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => `commodities${index}`}
            />

            {this.renderBottom()}

        </BaseComponent>
    }

    renderBottom = () => {
        return (
            <View style={styleS.bottomView}>
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {

                        this.allRadio()
                    }}>
                    <Image style={styleS.radioImg} source={this.state.selectAll ? Images.radioSelected : Images.radio}/>
                    <Text style={styleS.selectedAll}>{I18n.t('selectAll')}</Text>

                </TouchableOpacity>

                <View style={{flex: 1}}/>
                <TouchableOpacity style={styleS.settlementView}
                                  onPress={() => {
                                      const {order_items} = this.state;
                                      let items = order_items.filter(x => {
                                          return x.isSelect;
                                      });
                                      if (util.isEmpty(items)) {
                                          showToast(I18n.t('ple_select_mall'))
                                          return;
                                      }
                                      global.router.toReturnPage(items)
                                  }}>
                    <Text style={styleS.settlement}>{I18n.t('confirm')}</Text>

                </TouchableOpacity>
            </View>
        )
    };

    renderShowEditView = (item) => {
        let imageURL = Images.radio;
        if (item.isSelect === true) {
            imageURL = Images.radioSelected
        }
        return (
            <TouchableOpacity
                style={{height: 120, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                    this.onPressRadio(item)
                }}>
                <Image style={styleS.radioImg}
                       source={imageURL}/>
            </TouchableOpacity>
        )
    };

    onPressRadio = (item) => {
        const {order_items} = this.state;
        let array = [...order_items];
        array.map(x => {
            if (x.id === item.id)
                x.isSelect = !x.isSelect;
        });

        this.setState({
            order_items: array
        })
    };

    allRadio = () => {
        const {order_items} = this.state;
        let array = [...order_items];
        array.map(x => {
            x.isSelect = !this.state.selectAll;
        });

        this.setState({
            order_items: array,
            selectAll: !this.state.selectAll
        })
    };

    _renderItem = ({item}) => {

        const {price, original_price, sku_value, title, image, product_id} = item;
        let type_value = '';
        if (!util.isEmpty(sku_value)) {
            sku_value.forEach(x => {
                type_value += x + ' ';
            });
        }

        return (
            <Swipeout
                disabled={true}
            >
                <View

                    style={styleS.renderItem}>
                    {this.renderShowEditView(item)}

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            global.router.replaceProductInfo({id: product_id})
                        }}>
                        <ImageLoad style={styleS.mallImg} source={{uri: image}}/>
                    </TouchableOpacity>

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
        const {order_items} = this.state;
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };

        const {id, stock} = item;

        return (
            <View style={styleS.quantity}>
                <TouchableOpacity
                    style={[styleS.buyTouch, item.number === 1 ? styleCutDisable : styleCut]}
                    onPress={() => {
                        if (item.number > 1) {
                            --item.number;
                            let newDataHosts = [...order_items];
                            newDataHosts.map(function (x) {
                                if (id === x.id) {
                                    x.number = item.number
                                }
                            });
                            this.setState({
                                order_items: newDataHosts
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
                        let newDataHosts = [...order_items];
                        newDataHosts.map(function (x) {
                            if (id === x.id) {
                                x.number = item.number
                            }
                        });
                        this.setState({
                            order_items: newDataHosts
                        })
                    }}>
                    <Image style={styleS.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };
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
        height: 37,
        width: 89,
        backgroundColor: '#F34A4A',
        marginRight: 15,
        borderRadius: 4
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
    positionBtn: {
        position: 'absolute',
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        bottom: 0
    }
})