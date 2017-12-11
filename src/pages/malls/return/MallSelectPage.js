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
import {RefundStatus} from '../../../configs/Status';

export default class MallSelectPage extends PureComponent {

    state = {
        order_items: [],
        order_number: ''
    };

    componentDidMount() {
        const {order_items, order_number} = this.props.params.orderItem;
        if (util.isEmpty(order_items))
            return;
        order_items.map(item => {
            item.stock = item.number;
            item.isSelect = false;
        });
        this.setState({
            order_items,
            order_number
        })
    }

    render() {
        return <BaseComponent>
            <NavigationBar
                barStyle={'dark-content'}
                toolbarStyle={{backgroundColor: 'white'}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => {
                    router.pop();
                    this.props.params.mallRefresh &&
                    this.props.params.mallRefresh()
                }}
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
                                      const {order_items, order_number} = this.state;
                                      let items = order_items.filter(x => {
                                          return x.isSelect;
                                      });
                                      if (util.isEmpty(items)) {
                                          showToast(I18n.t('please_select_malls'))
                                          return;
                                      }
                                      global.router.toReturnPage(items, order_number)
                                  }}>
                    <Text style={styleS.settlement}>{I18n.t('confirm')}</Text>

                </TouchableOpacity>
            </View>
        )
    };

    renderShowEditView = (item) => {
        if (item.refund_status !== RefundStatus.none && item.refund_status !== RefundStatus.close)
            return;
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
            let canSelect = x.refund_status === RefundStatus.none || x.refund_status === RefundStatus.close;
            x.isSelect = !this.state.selectAll && canSelect;
        });

        this.setState({
            order_items: array,
            selectAll: !this.state.selectAll
        })
    };
    refundTxt = (status) => {
        let menu = [RefundStatus.none, RefundStatus.open, RefundStatus.close, RefundStatus.completed];
        if (status === menu[0]) {
            return null;
        } else {
            return <Text style={[styleS[`txt${status}`]]}>{I18n.t(`mall_${status}`)}</Text>
        }
    };

    _renderItem = ({item}) => {

        const {price, original_price, sku_value, title, image, product_id, refund_number, refund_status, number, seven_days_return} = item;
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
                <TouchableOpacity

                    style={styleS.renderItem}
                    onPress={() => {
                        if (refund_status !== RefundStatus.none) {
                            global.router.toReturnSucceedPage(refund_number);
                        }

                    }}>
                    {this.renderShowEditView(item)}

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            {/*global.router.toMallInfoPage({id: product_id})*/
                            }
                        }}>
                        <ImageLoad style={styleS.mallImg} source={{uri: image}}/>
                    </TouchableOpacity>

                    <View style={styleS.TxtView}>
                        <Text numberOfLines={2} style={styleS.mallTextName}>{title}</Text>
                        <Text
                            style={styleS.mallAttributes}>{type_value}</Text>

                        <View style={styleS.returnedView}>
                            {seven_days_return ? <View style={styleS.returned}>
                                <Text style={styleS.returnedTxt} numberOfLines={1}>{I18n.t('returned')}</Text>
                            </View> : null}
                            <View style={{flex: 1}}/>
                            {this.refundTxt(refund_status)}
                        </View>

                        <View style={styleS.PriceView}>
                            <Text style={styleS.Price}>¥{price}</Text>
                            <Text style={styleS.originPrice}>¥</Text><Text
                            style={[styleS.originPrice, {marginLeft: 1}]}>{original_price}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styleS.quantitys}>x{number}</Text>
                        </View>
                    </View>
                </TouchableOpacity>


            </Swipeout>
        )
    };
}

const styleS = StyleSheet.create({
    quantitys: {
        fontSize: 17,
        color: '#161718',
        marginRight: 17,
        marginTop: 19
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
    },
    refund: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'red',
        fontSize: 16
    },
    returnedView: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: 'center',
    },
    returned: {
        backgroundColor: '#F34A4A',
        borderRadius: 2,
        width: 65,
        height: 18,
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    returnedTxt: {
        fontSize: 10,
        color: '#FFFFFF'
    },
    txtopen: {
        fontSize: 14,
        color: '#4990E2',
        marginRight: 17
    },
    txtclose: {
        fontSize: 14,
        marginRight: 17,
        color: '#F34A4A',
    },
    txtcompleted: {
        color: '#34BA3C',
        fontSize: 14,
        marginRight: 17
    },
    originPrice: {
        fontSize: 12,
        color: '#AAAAAA',
        textDecorationLine: 'line-through',
        textDecorationColor: '#979797',
        marginLeft: 17,
        marginTop: 21
    },
})