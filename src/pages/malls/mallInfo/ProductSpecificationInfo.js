import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import * as Animatable from 'react-native-animatable';
import I18n from 'react-native-i18n';
import {showToast, strNotNull, pushProductToCart, isEmptyObject} from '../../../utils/ComonHelper';
import _ from 'lodash';


export default class ProductSpecificationInfo extends PureComponent {
    state = {
        number: 1,
        optionTypes: [],
        tempImg: '',
        tempPrice: '',
        tempStock: 0
    };

    componentDidMount() {

        const {product, selectProduct} = this.props;
        const {icon, master, option_types} = product;
        this.tempProduct = selectProduct;
        const {price, stock} = master;

        this.setState({
            optionTypes: option_types,
            tempImg: icon,
            tempPrice: price,
            tempStock: stock
        });


    }

    tabBlank = (x, array) => {

        const {option_values} = x;
        let that = this;
        return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 17, marginTop: 16}}>
            {option_values.map(function (item, index) {

                return <TouchableOpacity
                    onPress={() => {
                        x.select = item;
                        let newOptions = Array.from(array);

                        that.tempValue(newOptions);
                    }}
                    key={`tab${index}`}
                    style={[styleP.tabSearch, {
                        backgroundColor: x.hasOwnProperty('select') && x.select.id === item.id ?
                            '#F34A4A' : '#F6F5F5'
                    }]}>
                    <Text
                        style={[styleP.txtTab, {
                            color: x.hasOwnProperty('select') && x.select.id === item.id ?
                                Colors.white : Colors.txt_444
                        }]}>{item.name}</Text>
                </TouchableOpacity>
            })}
        </View>
    };


    buyQuantity = () => {

        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        let {number, tempStock} = this.state;


        return (

            <View style={{marginRight: 29, flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
                <TouchableOpacity
                    style={[styleP.buyTouch, number === 1 ? styleCutDisable : styleCut]}
                    onPress={() => {
                        if (number > 1) {
                            this.setState({number: --number})
                        }

                    }}>
                    <Image style={styleP.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styleP.buyInput}>
                    <Text>{number}</Text>
                </View>

                <TouchableOpacity
                    style={styleP.buyTouch}
                    onPress={() => {

                        if (number < tempStock) {
                            this.setState({
                                number: ++number
                            })
                        } else {
                            showToast(I18n.t('max_stock'))
                        }

                    }}>
                    <Image style={styleP.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    };

    optionTypesView = (option_types) => {
        let that = this;

        return <View>
            {option_types.map((x, index, array) => {

                return <View
                    key={`option_types${x.id}`}
                    style={styleP.size}>
                    <Text style={[styleP.sizeTxt1, {marginTop: 11}]}>{x.name}</Text>
                    {that.tabBlank(x, array)}
                </View>
            })}

            <View style={styleP.buyQuantity}>
                <Text style={[styleP.sizeTxt1, {marginTop: 20}]}>{I18n.t('buy_count')}</Text>
                <View style={{flex: 1}}/>
                {this.buyQuantity()}
            </View>

        </View>
    };


    tempValue = (optionTypes) => {

        const {icon, master, variants, title} = this.props.product;

        let obj = {};

        optionTypes.forEach(item => {
            if (item.hasOwnProperty('select')) {
                if (!obj[`${item.id}`]) {
                    obj[`${item.id}`] = item.select.id;


                }
            }
        });

        let tempArr = variants.filter(item => {
            return _.isEqual(obj, item.sku_option_values)

        });


        if (tempArr.length > 0) {
            const {image, price, stock} = tempArr[0];
            this.tempProduct = tempArr[0];
            this.tempProduct.title = title;

            this.setState({
                tempStock: stock,
                tempImg: strNotNull(image) ? image : this.state.tempImg,
                tempPrice: price,
                optionTypes: optionTypes
            })
        } else
            this.setState({optionTypes})


    };

    render() {

        const {optionTypes, tempImg, tempPrice, tempStock} = this.state;


        return (
            <Animatable.View
                duration={300}
                animation={'fadeInUp'}
                style={styleP.page}>
                <Image
                    resizeMode={'contain'}
                    style={styleP.specificationInfoTopImg}
                    source={{uri: tempImg}}/>
                <View style={styleP.specificationInfo}>

                    <View style={styleP.specificationInfoTop}>

                        <View style={styleP.specificationInfoTopM}>
                            <Text style={styleP.specificationInfoTopP}>
                                {tempPrice}
                            </Text>
                            <Text style={styleP.specificationInfoTopS}>
                                {I18n.t('stock') + tempStock + I18n.t('pieces')}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styleP.closeView}
                        onPress={() => {
                            this.props.showSpecInfo(this.tempProduct)
                        }}>
                        <Image style={styleP.closeImg} source={Images.close}/>
                    </TouchableOpacity>

                    <ScrollView>
                        {this.optionTypesView(optionTypes)}
                        <View style={{height: 80}}/>
                    </ScrollView>

                </View>

                <View style={styleP.confirmView}>
                    <TouchableOpacity
                        onPress={() => {
                            if (isEmptyObject(global.login_user))
                                global.router.toLoginFirstPage();
                            else
                                this.addCarts()
                        }}
                        style={styleP.confirm}>
                        <Text style={styleP.confirmTxt}>{I18n.t('confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        );
    }


    addCarts = () => {
        const {id} = this.props.product;
        const {number} = this.state;
        if (_.isEmpty(this.tempProduct) || number < 1) {
            showToast(I18n.t('ple_select_all'));
            return;
        }

        showToast(I18n.t('add_cart_ok'));
        if (!strNotNull(this.tempProduct.image))
            this.tempProduct.image = this.state.tempImg;

        let selectCommodity = {number: number, variant: this.tempProduct, title: this.tempProduct.title};
        console.log('购物车', selectCommodity)
        pushProductToCart(selectCommodity);
        this.props.showSpecInfo(this.tempProduct)
    }
}
const styleP = StyleSheet.create({
    page: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
    },
    specificationInfo: {
        paddingBottom: 160,
        marginTop: 160,
        backgroundColor: '#EEEEEE'
    },
    specificationInfoTop: {
        height: 87,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    specificationInfoTopImg: {
        width: 124,
        height: 120,
        marginLeft: 17,
        position: 'absolute',
        marginTop: 115,
        backgroundColor: 'white',
        zIndex: 9999
    },
    specificationInfoTopM: {
        flexDirection: 'column',
        marginLeft: 158,
        marginTop: 21
    },
    specificationInfoTopP: {
        fontSize: 18,
        color: '#F34A4A'
    },
    specificationInfoTopS: {
        fontSize: 14,
        color: '#333333'
    },
    closeView: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeImg: {
        width: 18,
        height: 18,
    },
    size: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 16
    },
    sizeTxt1: {
        fontSize: 15,
        color: '#444444',
        marginLeft: 17,

    },
    tabSearch: {
        borderRadius: 14,
        height: 28,
        paddingLeft: 17,
        paddingRight: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F5F5',
        marginBottom: 16,
        marginRight: 12
    },
    txtTab: {
        fontSize: 14,
        color: Colors.txt_444
    },
    colorClass: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 20
    },
    buyQuantity: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
    confirmView: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
    },
    confirm: {
        height: 40,
        marginLeft: 17,
        marginRight: 16,
        backgroundColor: '#F34A4A',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 5
    },
    confirmTxt: {
        fontSize: 18,
        color: '#FFFFFF'
    }
})