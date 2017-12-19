import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, util, isEmptyObject} from '../../../utils/ComonHelper';
import {getLogisticsInfo} from '../../../services/MallDao';


export default class Positioning extends PureComponent {
    state = {
        logisticsInfo: {},
        accept_station: '',
        accept_time: ''

    };

    componentDidMount() {
        const {shipments, order_number} = this.props.orderDetail;

        if (isEmptyObject(shipments))
            return;
        const body = {
            shipping_number: shipments.shipping_number,
            express_code: shipments.express_code,
            order_number: order_number,
        };
        getLogisticsInfo(body, data => {
            console.log('LogisticsInfo', data);

            if (util.isEmpty(data.traces)) {
                this.setState({
                    logisticsInfo: data
                });
            } else {
                this.setState({
                    logisticsInfo: data,
                    accept_station: data.traces[0].accept_station,
                    accept_time: data.traces[0].accept_time
                });
            }

        }, err => {

        });
    }


    render() {
        const {traces} = this.state.logisticsInfo;
        const {province, city, area, address, mobile, name} = this.props.address;
        return (
            <View style={{backgroundColor: '#ECECEE', alignItems: 'center'}}>
                {util.isEmpty(traces) ? null : <TouchableOpacity style={styleC.logistiscView}
                                                                 onPress={() => {
                                                                     global.router.toLogisticsPage(this.props.orderDetail);
                                                                 }}>
                    <Image style={styleC.shipImagView} source={Images.delivery}/>
                    <View style={{alignItems: 'flex-start', marginLeft: 21}}>
                        <Text style={styleC.Txt1}>{this.state.accept_station}</Text>
                        <Text style={styleC.Txt2}>{this.state.accept_time}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <Image style={styleC.specificationImg} source={Images.is}/>
                </TouchableOpacity>}

                <View style={styleC.addressView}>
                    <View style={styleC.shipImagView}>
                        <Image style={styleC.shipAddrImg} source={Images.positioning}/>
                    </View>

                    <View style={styleC.shipAddr}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styleC.shipAddrTxt1}>{I18n.t('buy_person')}</Text>
                            <Text style={styleC.shipAddrTxt1}>{name}</Text>
                            <Text style={styleC.mobile}>{mobile}</Text>
                        </View>
                        <View style={styleC.shipAddrView}>
                            <Text style={styleC.shipAddrTxt2}>{`${province}${city}${area}${address}`}</Text>
                        </View>

                    </View>

                </View>
                <Image style={styleC.lineImg} source={Images.order_line}/>
            </View>

        )
    }
}
const styleC = StyleSheet.create({
    lineImg: {
        width: '100%',
        height: 4,


    },
    addressView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 16,

    },
    logistiscView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 15,
    },
    shipImagView: {
        width: 40,
        height: 30,
        marginLeft: 17,
        alignItems: 'center'
    },
    title: {
        height: 40,
        backgroundColor: '#FFFFFF'
    },
    titleName: {
        marginLeft: 17,
        marginTop: 11,
        marginBottom: 9,
        fontSize: 14,
        color: '#333333'
    },
    shipAddr: {
        marginLeft: 21,
        marginTop: 20,
    },
    shipAddrTxt1: {
        fontSize: 14,
        color: '#666666',
    },
    shipAddrView: {
        marginTop: 10,
        marginRight: 60,
    },
    shipAddrTxt2: {
        fontSize: 14,
        color: '#666666',
        marginRight: 20
    },
    mobile: {
        marginLeft: 20,
        fontSize: 14,
        color: '#666666',
    },
    shipAddrTouch: {
        marginRight: 16,
        width: 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shipAddrImg: {
        width: 27,
        height: 35,
    },
    Txt1: {
        fontSize: 14,
        color: '#34BA3C',
    },
    Txt2: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5
    },
    specificationImg: {
        width: 8,
        height: 16,
        marginRight: 16
    }

})