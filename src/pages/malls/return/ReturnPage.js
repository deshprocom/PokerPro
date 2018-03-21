//退换货申请页面
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Alert, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ApplicationType from './ApplicationType';
import ApplicationTypeInfo from './ApplicationTypeInfo';
import RefundAmount from './RefundAmount';
import RefundInstruction from './RefundInstruction';
import UploadDocument from './UploadDocument';
import {NavigationBar, BaseComponent} from '../../../components';
import ReturnItem from './ReturnItem';
import {postTempImg, postMallRefund, getReturnType} from '../../../services/MallDao';
import {strNotNull, showToast, getFileName, util, alertOrder} from '../../../utils/ComonHelper';


export default class ReturnPage extends Component {

    state = {
        typeShow: false,
        refund_mall_amount: false,
        change_mall: false,
        refund_price: 0,
        order_item_ids: [],
        product_refund_type: {},
        memo: '',
        order_number: '',
        refund_types: []
    };

    showTypeInfo = () => {
        this.setState({
            typeShow: !this.state.typeShow
        })
    };
    _refund_mall_amount = (item) => {
        let refund_types = [...this.state.refund_types];
        refund_types.map(x => {
            x.isSelect = x.id === item.id;
        });

        this.setState({
            refund_types,
            product_refund_type: item
        })
    };
    _change_mall = () => {
        this.setState({
            change_mall: !this.state.change_mall,
            refund_mall_amount: false
        })
    };

    componentDidMount() {
        getReturnType(data => {
            data.map(x => {
                x.isSelect = false;
            });
            this.setState({
                refund_types: data
            })
        }, err => {
        });

        const {order_items, order_number} = this.props.params;
        let price = 0;
        let order_item_ids = [];
        order_items.forEach(item => {
            order_item_ids.push(item.id);
            price += Number.parseFloat(item.price) * Number.parseFloat(item.number)
        });
        this.setState({
            refund_price: price,
            order_item_ids,
            order_number
        })
    }

    render() {
        const {order_items} = this.props.params;

        return (
            <BaseComponent
                ref={ref => this.contain = ref}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('apply_returned')}/>
                <ScrollView style={styleC.orderView}>
                    <View style={{height: 1}}/>
                    {order_items.map(x => {
                        return <ReturnItem
                            key={x.id}
                            item={x}/>;
                    })}


                    <ApplicationType
                        showTypeInfo={this.showTypeInfo}
                        product_refund_type={this.state.product_refund_type}/>

                    <RefundAmount
                        changeText={(refund_price)=>{
                            this.setState({
                                refund_price
                            })
                        }}
                        refund_price={this.state.refund_price}/>


                    <RefundInstruction
                        ref={ref => this.refundMemo = ref}/>

                    <UploadDocument
                        ref={ref => this.upFiles = ref}/>

                    <View style={{height: 80}}/>
                </ScrollView>


                <View style={styleC.bottomView}>
                    <TouchableOpacity
                        onPress={() => {

                            this._upload()
                        }}
                        style={styleC.customer}>
                        <Text style={styleC.orderSubmitTxt}>{I18n.t('confirm')}</Text>
                    </TouchableOpacity>

                </View>

                {this.state.typeShow ? <ApplicationTypeInfo
                    refund_types={this.state.refund_types}
                    showTypeInfo={this.showTypeInfo}
                    _refund_mall_amount={this._refund_mall_amount}
                    _change_mall={this._change_mall}
                    refund_mall_amount={this.state.refund_mall_amount}
                    change_mall={this.state.change_mall}/> : null}
            </BaseComponent>

        );
    }

    _fileName = (filePath) => {
        return getFileName(filePath)
    };

    _upload = async () => {


        if (util.isEmpty(this.state.product_refund_type)) {
            showToast(I18n.t('ple_select_refund_type'));
            return;
        }

        if (!strNotNull(this.state.refund_price)) {
            showToast('请填写退款金额');
            return;
        }
        Alert.alert('退款金额', `¥${this.state.refund_price}`, [{
            text: `${I18n.t('cancel')}`, onPress: () => {

            }
        }, {
            text: `${I18n.t('confirm')}`, onPress: () => {
                let locals = this.upFiles.getImages();
                this.contain.open();
                let uploadeds = [];
                if (util.isEmpty(locals)) {
                    this.postRefundReq(uploadeds)
                } else
                    locals.forEach(item => {
                        setTimeout(() => {
                            let formData = new FormData();
                            let file = {
                                uri: item.path, type: 'multipart/form-data',
                                name: this._fileName(item.path)
                            };
                            formData.append("image", file);
                            postTempImg(formData, data => {

                                uploadeds.push(data);
                                if (uploadeds.length === locals.length) {

                                    console.log('上传完成：', uploadeds);
                                    this.postRefundReq(uploadeds)


                                }
                            }, err => {
                                showToast(I18n.t('img_load_fail'))
                            })
                        }, 500)
                    });
            }
        }])


    };


    postRefundReq = (uploadeds) => {
        const {refund_price, product_refund_type, order_item_ids, memo, order_number} = this.state;


        let body = {
            refund_price: refund_price,
            product_refund_type_id: product_refund_type.id,
            order_item_ids,
            memo: this.refundMemo.getMemo(),
            refund_images: uploadeds,
            order_number
        };

        console.log(body);

        postMallRefund(body, data => {
            console.log(data)
            this.contain.close();
            global.router.toReturnSucceedPage(data.refund_number);
        }, err => {
            this.contain.close();
            showToast(err)
        })
    }
}
const styleC = StyleSheet.create({
    orderView: {
        backgroundColor: '#ECECEE'
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
    cart: {
        fontSize: 17,
        color: '#161718',
        fontWeight: 'bold'
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
    bottomView: {
        height: 50,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: '100%',
    },
    returnedBottom: {
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customer: {
        backgroundColor: '#F34A4A',
        borderRadius: 4,
        width: 90,
        height: 37,
        marginRight: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderSubmitTxt: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    payment: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    paymentPrice: {
        fontSize: 18,
        color: '#F34A4A'
    }

})