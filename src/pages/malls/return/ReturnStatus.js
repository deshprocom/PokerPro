import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, strNotNull} from '../../../utils/ComonHelper';
import {RefundStatus} from '../../../configs/Status';

export default class ReturnStatus extends Component {
    state = {
        showStatus: true
    };

    render() {
        const {admin_memo} = this.props.refundInfo;

        return (
            <View>
                <View style={styleT.tipsView}>
                    <Text style={styleT.tipsTxt}>{this._refundStatus()}</Text>

                </View>
                {strNotNull(admin_memo) ? <View style={styleT.status}>
                    <Text style={styleT.statusTxt}>{admin_memo}</Text>
                </View> : null}

            </View>
        )
    }

    _refundStatus = () => {
        const {status, refund_type} = this.props.refundInfo;
        switch (status) {
            case RefundStatus.close:
                return '退换失败';
            case  RefundStatus.completed:
                return refund_type === '退货退款' ? I18n.t('refund_success') : '换货受理成功';
            case RefundStatus.open:
                return refund_type === '退货退款' ? '退款受理中' : '换货受理中'
        }
    }
}
const styleT = StyleSheet.create({
    tipsView: {
        height: 46,
        backgroundColor: '#F34A4A',
        opacity: 0.6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tipsTxt: {
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 17
    },
    tipsTouch: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    date: {
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 23
    },
    status: {
        height: 48,
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    }
})