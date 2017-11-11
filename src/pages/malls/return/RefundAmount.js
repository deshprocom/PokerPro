import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class RefundAmount extends PureComponent {


    render(){
        return(
            <View style={styles.page}>
                <Text style={styles.amountTxt}>{I18n.t('refund_amount')}：</Text>
                <Text style={styles.amount}>¥555</Text>
            </View>
        )}
}
const styles = StyleSheet.create({
    page:{
       height:48,
        backgroundColor:'#FFFFFF',
        marginTop:10,
        flexDirection:'row',
        alignItems:'center'
    },
    amountTxt:{
        fontSize: 14,
        color:'#333333',
        marginLeft:17
    },
    amount:{
        fontSize: 18,
        color:'#F34A4A'
    }
})