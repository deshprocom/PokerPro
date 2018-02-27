import React, {PureComponent} from 'react';
import {View, StyleSheet, TextInput, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class RefundAmount extends PureComponent {


    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.amountTxt}>{I18n.t('refund_amount')}：</Text>
                <TextInput
                    onChangeText={(refund_price) => {
                        this.props.changeText(refund_price);
                    }}
                    placeholder={I18n.t('refund_price')}
                    numberOfLines={1}
                    value={`${this.props.refund_price}`}
                    underlineColorAndroid='transparent'
                    style={styles.amount}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        height: 48,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    amountTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    amount: {
        fontSize: 14,
        color: '#F34A4A',
        height: 40,
        flex: 1,
        marginTop: 5

    }
})