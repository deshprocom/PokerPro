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
import {SecurityText} from '../../components';
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
        if (isEmptyObject(global.verifies))
            return;
        const {chinese_ids, passport_ids} = global.verifies;
        let verified = {};

        console.log("RealName", this.props.required_id_type)
        if (this.props.required_id_type === 'passport_id') {

            passport_ids.forEach(function (x) {
                if (x.default)
                    verified = x;
            });

        } else {

            chinese_ids.forEach(function (x) {
                if (x.default)
                    verified = x;
            });
        }
        this.setState({verified})

    };

    getVerified = () => {
        return this.state.verified;
    };

    _certification = () => {
        umengEvent('ticket_buy_true_name');
        router.toVerifiedPage((verified) => {
            if (this.props.required_id_type === verified.cert_type ||
                this.props.required_id_type === 'any') {
                this.setState({verified})
            } else {
                alert(this.props.required_id_type === 'passport_id' ? I18n.t('cert_buy_pass') : I18n.t('cert_buy_china'))
            }

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


    isPassport = () => {
        return this.props.required_id_type === 'passport_id'
    };

    nameView = () => {
        const {verified} = this.state;
        if (isEmptyObject(verified)) {
            return ( <View
                style={{
                    height: 39, alignItems: 'center', flexDirection: 'row',
                    justifyContent: 'space-between', marginLeft: 18, marginRight: 18
                }}>
                <Text style={{fontSize: 12, color: Colors._AAA}}>{this.isPassport() ?
                    I18n.t('cert_pass') : I18n.t('cert_chinese')}</Text>
                <View style={{flex: 1}}/>
                <Text style={{fontSize: 15, color: '#3681F1', marginRight: 12}}>{I18n.t('init')}</Text>
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

                            {this._showStatus()}
                        </View>

                    </View>

                    <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Text style={{fontSize: Fonts.size.h15, color: Colors.txt_666, marginRight: 9}}>
                            {this.isPassport() ? I18n.t('password_card') : I18n.t('ID_card')}</Text>
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


                <Image style={{width: 11, height: 20}}
                       source={Images.ticket_arrow}/>
            </View>)
        }
    }

    _showStatus = () => {
        const {verified} = this.state;
        if (verified.status !== Verified.INIT) {
            return (
                <Text style={this.statusStyle(verified.status)}>
                    {idCardStatus(verified.status)}
                </Text>)
        }

    }

    statusStyle = (status) => {
        switch (status) {
            case Verified.PENDING:
                return styles.pendingStatus;
            case Verified.PASSED:
                return [styles.pendingStatus, {
                    borderColor: '#34BA3C',
                    color: '#34BA3C'
                }];
            case Verified.FAILED:
                return [styles.pendingStatus, {
                    borderColor: '#F34A4A',
                    color: '#F34A4A',
                }];
        }
    }

}


const styles = StyleSheet.create({
    pendingStatus: {
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#6DB0FF',
        color: '#6DB0FF',
        borderRadius: 2,
        textAlign: 'center',
        marginLeft: 13
    },
})