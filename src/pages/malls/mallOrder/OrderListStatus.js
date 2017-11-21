import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import RenderItem from '../order/RenderItem';
import CompletedBottom from './CompletedBottom';
import {getMallOrders} from '../../../services/MallDao';

export default class OrderListStatus extends Component{

    state={

    };

    componentDidMount(){
        const body = {
            next_id: '0'
        };
        getMallOrders(body, data => {
            console.log('mall_orders', data);
            this.setState({
                mall_orders: data
            })
        }, err => {

        });
    }



    render(){
        const {items} = this.props.tabLabel;


        return(
            <View style={{flex: 1,marginTop:9}}>
                <View style={styles.top}>
                    <Text style={styles.txtLeft}>{I18n.t('order_num')}：3628736473379</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.txtRight}>状态</Text>
                </View>
                <View style={{height:1}}/>
                {/*<RenderItem/>*/}
                <CompletedBottom/>
            </View>
        )}
}
const styles = StyleSheet.create({
    top:{
        height:40,
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center'
    },
    txtLeft:{
        marginLeft:17,
        fontSize: 14,
        color: '#333333'
    },
    txtRight:{
        marginRight:16,
        fontSize: 14,
        color: '#333333'
    }
})