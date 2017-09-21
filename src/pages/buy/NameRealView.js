/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {isEmptyObject, idCardStatus} from '../../utils/ComonHelper';
import SecurityText from 'react-native-smart-security-text';
import {Verified} from '../../configs/Status';
import {umengEvent} from '../../utils/UmengEvent';

export default class NameRealView extends Component {


    state = {
        verified: {}
    };


    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        const {chinese_ids, passport_ids} = verifies;
        let verified = {};
        chinese_ids.forEach(function (x) {
            if (x.default)
                verified = x;
        });


        this.setState({verified})
    };


    _certification = () => {
        umengEvent('ticket_buy_true_name');
        router.toVerifiedPage((verified) => {
            this.setState({verified})
        })
    };

    render() {


        return (  <TouchableOpacity
            onPress={this._certification}
            activeOpacity={1}
            style={{backgroundColor: Colors.white, marginTop: 8}}>

            <View style={{height: 61, flex: 1, marginLeft: 18}}>

                <Text
                    style={{fontSize: 15, color: Colors.txt_666, marginTop: 13}}>{I18n.t('real_name_tip')}</Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: Colors._AAA,
                        flex: 1,
                        marginTop: 4
                    }}>{I18n.t('real_name_ticket')}</Text>

            </View>
            <View
                style={{
                    height: 1, backgroundColor: '#EEEEEE',
                    marginLeft: 18, marginRight: 18
                }}/>

            {this.nameView()}


        </TouchableOpacity>)
    }


    nameView = () => {
        const {verified} = this.state;
        if (isEmptyObject(verified)) {
            return ( <View
                style={{
                    height: 39, alignItems: 'center', flexDirection: 'row',
                    justifyContent: 'space-between', marginLeft: 18, marginRight: 18
                }}>
                <Text style={{fontSize: 12, color: Colors._AAA}}>{I18n.t('add_real_name')}</Text>
                <Image style={{width: 11, height: 20}}
                       source={Images.ticket_arrow}/>
            </View>)
        } else {
            return ( <View

                style={{
                    marginLeft: 18, marginRight: 18, height: 67,
                    flexDirection: 'row', alignItems: 'center'
                }}>
                <View style={{flex: 1}}>
                    <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: Fonts.size.h15, color: Colors.txt_666, marginRight: 9}}>
                                {I18n.t('real_name')}:</Text>
                            <Text style={{fontSize: Fonts.size.h15, color: Colors.txt_666}}>
                                {verified.real_name}</Text>
                        </View>

                    </View>

                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Text style={{fontSize: Fonts.size.h15, color: Colors.txt_666, marginRight: 9}}>
                            {I18n.t('card_num')}:</Text>
                        <SecurityText
                            securityOptions={{
                                isSecurity: true,
                                startIndex: 3,
                                endIndex: 12,
                            }}
                            style={{fontSize: Fonts.size.h15, color: Colors.txt_666}}>
                            {verified.cert_no}</SecurityText>
                    </View>
                </View>

                {this._showStatus()}

                <Image style={{width: 11, height: 20}}
                       source={Images.ticket_arrow}/>
            </View>)
        }
    }

    _showStatus = () => {
        const {verified} = this.state;
        if (verified.status !== Verified.INIT) {
            return (  <View style={{
                borderRadius: 2, backgroundColor: '#cccccc',
                height: 25, width: 55, justifyContent: 'center', alignItems: 'center',
                marginRight: 20
            }}>
                <Text style={[Fonts.H12, {color: Colors.white}]}>
                    {idCardStatus(verified.status)}
                </Text>

            </View>)
        }

    }


}