import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class RefundInfo extends PureComponent {

    render(){
       return(
           <View style={styles.page}>
                <Text style={styles.txt}>{I18n.t('refund_type')}：全额退款</Text>
               <Text style={styles.txt}>{I18n.t('refund_amount')}：¥2189</Text>
               <Text style={styles.txt}>{I18n.t('application_time')}：2017年8月19日  18:56</Text>
               <Text style={styles.txt}>{I18n.t('refund_num')}：234324235325</Text>
               <Text style={styles.txt}>{I18n.t('refund_reason')}：货物损坏</Text>
               <Text style={styles.txt}>{I18n.t('refund_description')}：</Text>
               <Image style={styles.img} source={Images.empty_image}/>
           </View>

       );
    }
}
const styles = StyleSheet.create({
    page:{
        marginTop:15,

    },
    txt:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17,
        marginTop:6
    },
    img:{
        width:100,
        height:100,
        marginLeft:17,
        marginTop:10
    }
})