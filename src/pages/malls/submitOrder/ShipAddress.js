import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject} from '../../../utils/ComonHelper';

export default class ShipAddress extends PureComponent {
    state = {
        adrDefault: {}
    };

    componentDidMount() {
        let adrDefault = global.addressList.filter(item => item.default);
        console.log('Address', adrDefault)
        if (adrDefault.length > 0)
            this.setState({adrDefault: adrDefault[0]})

    };

    getAddress = () => {
        return this.state.adrDefault;
    };
    _emptyAdr = () => {
        return <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                if (isEmptyObject(global.login_user))
                    global.router.toLoginFirstPage();
                else
                    global.router.toAdrListPage(this.props, this._selectAdr, {});
            }}
            style={{height: 45, width: '100%', backgroundColor: Colors.white}}>
            <View style={{height: 1, backgroundColor: Colors._ECE, width: '100%'}}/>
            <View style={{
                height: 44, flex: 1, alignItems: 'center', flexDirection: 'row',
                justifyContent: 'space-between', marginLeft: 18
            }}>
                <Text style={{fontSize: 12, color: Colors._AAA}}>{I18n.t('no_addr_tip')}</Text>
                <Image style={{width: 11, height: 20, marginRight: 16}}
                       source={Images.ticket_arrow}/>
            </View>
        </TouchableOpacity>
    };
    _selectAdr = (address) => {
        this.setState({
            adrDefault: address
        })
    };

    render() {
        if (isEmptyObject(this.state.adrDefault)) {
            return this._emptyAdr()
        };
        const {address, address_detail, consignee, mobile} = this.state.adrDefault;
        return (
            <View style={styleS.addressView}>
                <View style={styleS.title}>
                    <Text style={styleS.titleName}>{I18n.t('shopping_addr')}</Text>
                </View>
                <TouchableOpacity style={styleS.shipAddr}
                                  onPress={() => {
                        if (isEmptyObject(global.login_user))
                            global.router.toLoginFirstPage();
                        else
                            global.router.toAdrListPage(this.props, this._selectAdr, {});
                    }}>
                    <View style={{marginTop: 12}}>
                        <View style={{flexDirection: 'row',marginLeft:17}}>
                            <Text style={styleS.shipAddrTxt1}>{I18n.t('buy_person')}：</Text>
                            <Text style={styleS.shipAddrTxt1}>{consignee.trim()}</Text>
                            <Text style={styleS.mobile}>{mobile}</Text>
                        </View>
                        <View style={{width:290}}>
                            <Text style={styleS.shipAddrTxt2} numberOfLines={2}>{`${address} ${address_detail}`}</Text>
                        </View>

                    </View>
                    <View style={{flex: 1}}/>
                    <View style={styleS.shipAddrTouch}>
                        <Image style={styleS.shipAddrImg} source={Images.is}/>
                    </View>
                </TouchableOpacity>
                <Image style={styleS.lineImg} source={Images.order_line}/>

            </View>
        )
    }
}
const styleS = StyleSheet.create({
    lineImg: {
        width: '100%',
        height: 4
    },
    addressView: {},
    title: {
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent:'center'
    },
    titleName: {
        marginLeft: 17,
        marginTop: 11,
        marginBottom: 9,
        fontSize: 14,
        color: '#333333',
        fontWeight: 'bold'
    },
    shipAddr: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    shipAddrTxt1: {
        fontSize: 14,
        color: '#666666',

    },
    shipAddrTxt2: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 17,
        marginTop: 10
    },
    mobile: {
        marginLeft: 20,
        fontSize: 14,
        color: '#666666',
    },
    shipAddrTouch: {
        marginRight: 16,
        paddingLeft:20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shipAddrImg: {
        width: 8,
        height: 16,
        marginTop: 20
    }
})