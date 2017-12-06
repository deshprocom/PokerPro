import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject} from '../../../utils/ComonHelper';

export default class ShipAddress extends Component {

    state = {
        adrDefault: {}
    };

    componentDidMount() {
        let adrDefault = global.addressList.filter(item => item.default);
        console.log('adrDefault', adrDefault);
        if (adrDefault.length > 0)
            this.setState({adrDefault: adrDefault[0]})

    }


    _adrView = () => {
        const {address, address_detail, consignee, mobile} = this.state.adrDefault;

        return <TouchableOpacity
            onPress={() => {
                if (isEmptyObject(global.login_user))
                    router.toLoginFirstPage();
                else
                    router.toAdrListPage(this.props, this._selectAdr, {});
            }}
            style={styleS.shipAddr}>
            <View style={{marginTop: 12, width: 320}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styleS.shipAddrTxt1}>{consignee}</Text>
                    <Text style={styleS.shipAddrTxt1}>{mobile}</Text>
                </View>
                <Text style={styleS.shipAddrTxt2}>{`${address} ${address_detail}`}</Text>
            </View>
            <View style={{flex: 1}}/>
            <Image style={styleS.shipAddrImg} source={Images.is}/>
        </TouchableOpacity>

    };


    _selectAdr = (address) => {
        this.setState({
            adrDefault: address
        })
    };

    _emptyAdr = () => {
        return <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                if (isEmptyObject(global.login_user))
                    router.toLoginFirstPage();
                else
                    router.toAdrListPage(this.props, this._selectAdr, {});
            }}
            style={{height: 45, width: '100%', backgroundColor: Colors.white}}>
            <View style={{height: 1, backgroundColor: Colors._ECE, width: '100%'}}/>
            <View style={{
                height: 44, flex: 1, alignItems: 'center', flexDirection: 'row',
                justifyContent: 'space-between', marginLeft: 18
            }}>
                <Text style={{fontSize: 12, color: Colors._AAA}}>{I18n.t('no_addr_tip')}</Text>
                <Image style={{width: 11, height: 20, marginRight: 17}}
                       source={Images.ticket_arrow}/>
            </View>
        </TouchableOpacity>
    };


    render() {

        return (
            <View style={styleS.shipAddrView}>
                <View style={styleS.shipAddrName}>
                    <Text style={styleS.shipAddrTxt}>
                        {I18n.t('shopping_addr')}
                    </Text>
                </View>

                {isEmptyObject(this.state.adrDefault) ? this._emptyAdr() : this._adrView()}

            </View>
        );
    }
}

const styleS = StyleSheet.create({
    shipAddrView: {
        marginTop: 9,
    },
    shipAddrName: {
        height: 40,
        backgroundColor: '#FFFFFF',

    },
    shipAddrTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        marginTop: 11,
        fontWeight: 'bold'
    },
    shipAddr: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    shipAddrImg: {
        width: 8,
        height: 16,
        marginRight: 16
    },
    shipAddrTxt1: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 19
    },
    shipAddrTxt2: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 17,
        marginTop: 5
    }
})