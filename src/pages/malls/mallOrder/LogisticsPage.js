import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {getLogisticsInfo} from '../../../services/MallDao';
import {convertDate} from '../../../utils/ComonHelper';
import {util} from '../../../utils/ComonHelper';

export default class LogisticsPage extends Component {
    state = {
        logisticsInfo: []
    };

    componentDidMount() {
        const {shipping_number, express_code, order_number} = this.props.params;
        const body = {
            shipping_number: shipping_number,
            express_code: express_code,
            order_number: order_number
        };
        getLogisticsInfo(body, data => {
            console.log('LogisticsInfo', data);
            this.setState({
                logisticsInfo: data
            });
        }, err => {

        })

    }


    render() {
        const {logisticsInfo} = this.state;
        const {traces} = logisticsInfo;
        if (util.isEmpty(logisticsInfo)) {
            return <View/>
        }
        return (
            <View style={styles.page}>
                <View style={styles.top}>

                </View>
                <View style={styles.content}>
                    <View style={styles.contentTop}/>
                    {traces.map((item, i) => {

                        return <RenderItem
                            itemId={i}
                            key={`key${i}`}
                            item={item}
                            history={this.props.history}
                        />
                    })}
                </View>
            </View>

        )
    }
}

class RenderItem extends Component {


    render() {

        const {accept_time, accept_station} = this.props.item;
        const{itemId} = this.props;
        return (
            <View style={styles.itemContent}>
                <View style={styles.itemLeft}>
                    <Text style={[styles.itemLeftTxt,itemId===0?styles.color1:null]}>{convertDate(accept_time, 'MM/DD')}</Text>
                    <Text style={[styles.itemLeftTxt2,itemId===0?styles.color1:styles.color3]}>{convertDate(accept_time, 'hh:mm')}</Text>
                </View>
                <View style={styles.radio}/>
                <View style={styles.itemRight}>
                    <Text style={[styles.itemRightTxt,itemId===0?styles.color1:styles.color3]}>{accept_station}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    page: {
        flex: 1,
        backgroundColor: '#ECECEE'
    },
    top: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        marginTop: 2,
        backgroundColor: '#FFFFFF'
    },
    contentTop: {
        height: 50,
    },
    itemContent: {
        marginLeft: 16,
        marginRight: 71,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemLeft: {
        width: 42,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    radio: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginLeft: 11
    },

    itemRight: {
        marginLeft: 14
    },
    itemLeftTxt: {
        fontSize: 14
    },
    itemLeftTxt2: {
        fontSize: 10,
    },
    itemRightTxt: {
        fontSize: 14,

    },
    color1: {
        color: '#F34A4A'
    },
    color2: {
        color: '#333333'
    },
    color3: {
        color: '#888888'
    }

};