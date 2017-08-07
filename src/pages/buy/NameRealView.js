/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component, PropTypes}from 'react';
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
    static propTypes = {
        router: PropTypes.object,
        user_extra: PropTypes.object
    };

    _certification = () => {
        const {user_extra} = this.props;

        umengEvent("ticket_buy_true_name");
        if (isEmptyObject(user_extra)) {
            this.props.router.toCertificationPage()
        } else {
            this.editIdCard(user_extra)
        }
    };

    render() {
        const {user_extra} = this.props;
        return (  <TouchableOpacity
            onPress={this._certification}
            testID={isEmptyObject(user_extra) ? 'btn_certification' :
                'btn_edit_id'}
            activeOpacity={1}
            style={{backgroundColor: Colors.white, marginTop: 5}}>

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

    editIdCard = (user_extra) => {

        if (user_extra.status === Verified.FAILED || user_extra.status === Verified.INIT) {
            this.props.router.toCertificationPage()
        }
    };

    nameView = () => {
        const {user_extra} = this.props;
        if (isEmptyObject(user_extra)) {
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
                                {user_extra.real_name}</Text>
                        </View>

                    </View>

                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Text style={{fontSize: Fonts.size.h15, color: Colors.txt_666, marginRight: 9}}>
                            {I18n.t('card_num')}:</Text>
                        <SecurityText
                            securityOptions={{
                                isSecurity: true,
                                startIndex: 4,
                                endIndex: 8,
                            }}
                            style={{fontSize: Fonts.size.h15, color: Colors.txt_666}}>
                            {user_extra.cert_no}</SecurityText>
                    </View>
                </View>

                {this._showStatus()}

                <Image style={{width: 11, height: 20}}
                       source={Images.ticket_arrow}/>
            </View>)
        }
    }

    _showStatus = () => {
        const {user_extra} = this.props;
        if (user_extra.status !== Verified.INIT) {
            return (  <View style={{
                borderRadius: 2, backgroundColor: '#cccccc',
                height: 25, width: 55, justifyContent: 'center', alignItems: 'center',
                marginRight: 20
            }}>
                <Text style={[Fonts.H12, {color: Colors.white}]}>
                    {idCardStatus(user_extra.status)}
                </Text>

            </View>)
        }

    }


}