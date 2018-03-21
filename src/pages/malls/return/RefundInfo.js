import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, util} from '../../../utils/ComonHelper';

export default class RefundInfo extends PureComponent {

    render() {
        const {images, refund_number, refund_type, refund_price, memo, admin_memo, status, created_at} = this.props.refundInfo;
        return (
            <View style={styles.page}>
                <Text style={styles.txt}>{I18n.t('refund_type')}：{refund_type}</Text>
                <Text style={styles.txt}>{I18n.t('refund_amount')}：¥{refund_price}</Text>
                <Text style={styles.txt}>{I18n.t('application_time')}：{utcDate(created_at, "YYYY.MM.DD hh:mm")}</Text>
                <Text style={styles.txt}>{I18n.t('refund_num')}：{refund_number}</Text>
                <Text style={styles.txt}>{I18n.t('refund_reason')}：{memo}</Text>
                <View style={styles.imgView}>
                    {!util.isEmpty(images) && images.map((item, index) => {
                        return <Image key={`refund_${index}`} style={styles.img} source={{uri: item.image_url}}/>
                    })}

                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    page: {
        marginTop: 15,

    },
    txt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        marginTop: 6
    },
    imgView: {
        marginLeft: 7,
        marginTop: 10,
        marginRight: 17,
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100,
        marginLeft: 10
    }
})