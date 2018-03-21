/**
 * Created by lorne on 2018/3/13.
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform,
    StyleSheet, Image, Text
} from 'react-native';

import _ from 'lodash';
import {Colors} from "../../Themes";
import Switch from './Switch';


const styles = StyleSheet.create({
    discount: {
        height: 47,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 17,
        paddingRight: 17
    },
    txt1: {
        fontSize: 15,
        color: Colors._333
    }
});

export default class Discount extends PureComponent {


    render() {
        const {discount,count} = this.props;
        let available = count * discount.discount * 100
        if (available > discount.total_poker_coins) {
            available = discount.total_poker_coins
        }

        let discount_price = available / 100;


        if (_.isEmpty(discount) || discount.total_poker_coins <= 0) {
            return <View/>
        }


        return <View style={styles.discount}>

            <Text style={styles.txt1}>{`可用${available}扑客币抵：`}<Text
                style={{color: Colors._F34}}>-¥{discount_price}</Text></Text>

            <Switch handle_value={handle_value => {
                this.props.handle_value(handle_value)
            }}
                    ref={ref => this.btn_switch = ref}/>
        </View>
    }
}


