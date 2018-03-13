/**
 * Created by lorne on 2018/3/13.
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform,
    StyleSheet, Image, Text
} from 'react-native';
import {get_discount} from '../../services/CrowdDao';
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

    state = {
        discount: {}
    };

    componentWillMount() {
        get_discount(discount => {
            this.setState({discount})
        }, err => {

        })
    }

    available = () => {
        const {discount} = this.state;
        let total = this.props.count * discount.discount * 100
        if (total < discount.total_poker_coins) {
            return total
        } else {
            return discount.total_poker_coins
        }
    }


    discount_price = () => {
        return this.available() / 100;
    }


    btn_switch_value = () => {
        return this.btn_switch.handle_value()
    }


    render() {
        const {discount} = this.state;
        if (_.isEmpty(discount) || discount.discount <= 0) {
            return <View/>
        }


        return <View style={styles.discount}>

            <Text style={styles.txt1}>{`可用${this.available()}扑客币抵：`}<Text
                style={{color: Colors._F34}}>¥{this.discount_price()}</Text></Text>

            <Switch ref={ref => this.btn_switch = ref}/>
        </View>
    }
}


