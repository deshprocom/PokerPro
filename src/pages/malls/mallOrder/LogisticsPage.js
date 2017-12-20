import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {getLogisticsInfo} from '../../../services/MallDao';
import {convertDate, util, call} from '../../../utils/ComonHelper';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar, BaseComponent} from '../../../components';
import I18n from 'react-native-i18n';
import {DeShangPhone} from '../../../configs/Constants';
import {LogisticsStatus} from "../../../configs/Status";


export default class LogisticsPage extends Component {
    state = {
        logisticsInfo: {},
        height: 50
    };

    componentDidMount() {
        this.contain.open();
        const {orderItem} = this.props.params;
        const {shipments, order_number} = orderItem;
        const body = {
            shipping_number: shipments.shipping_number,
            express_code: shipments.express_code,
            order_number: order_number,
        };
        getLogisticsInfo(body, data => {
            console.log('LogisticsInfo', data);
            this.setState({
                logisticsInfo: data
            });
        }, err => {

        })

    }

    _onLayout = (event) => {
        let height = event.nativeEvent.layout.height;
        this.setState({
            height: height
        })
    };
    status = (state, menu) => {
        if (state === '0') {
            return (
                <Text style={styles.topRightTxt1}>{I18n.t('waiting_file')}</Text>
            )
        } else {
            return (
                <Text style={styles.topRightTxt1}>{state !== '4' ? I18n.t(menu[state]) : ""}</Text>
            )
        }


    };
    content = () => {
        const {logisticsInfo} = this.state;
        const {traces, phone, state, shipping_number} = logisticsInfo;
        const {order_items, shipments, created_at} = this.props.params.orderItem;
        console.log("logisticsInfo:", this.props.params.orderItem)
        let menu = [LogisticsStatus.no_track, '', LogisticsStatus.on_the_way, LogisticsStatus.have_been_received, LogisticsStatus.question_piece];
        return (
            <ScrollView>
                <View style={styles.top}>
                    <Image style={styles.topImg} source={{uri: order_items[0].image}}>
                        <View style={{flex: 1}}/>
                        <View style={styles.topView}>
                            <Text style={styles.topLeftTxt}>{state}{I18n.t('pieces')}{I18n.t('malls')}</Text>
                        </View>
                    </Image>
                    <View style={styles.topRight}>
                        {this.status(state, menu)}
                        <Text
                            style={styles.topRightTxt2}>{I18n.t('logistics_company')}：{shipments.shipping_company}</Text>
                        <Text style={styles.topRightTxt2}>{I18n.t('tracking_no')}：{shipping_number}</Text>
                        <TouchableOpacity style={styles.topRightView}
                                          onPress={() => {
                                              call(phone)
                                          }}>
                            <Text style={styles.topRightTxt2}>{I18n.t('official_phone')}：</Text>
                            <Text style={styles.topRightTxt3}>{phone}</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                {state === '0' ? <View style={styles.contentEmpty}>
                    <View style={styles.itemLeft3}>
                        <Text
                            style={[styles.itemLeftTxt]}>{convertDate(created_at, 'MM/DD')}</Text>
                        <Text
                            style={[styles.itemLeftTxt2, styles.color3]}>{convertDate(created_at, 'hh:mm')}</Text>
                    </View>
                    <View style={{alignItems: 'center', width: 14, marginLeft: 12, marginTop: 20}}>
                        <View style={{height: 250, backgroundColor: '#CCCCCC', width: 1}}/>
                        <View style={styles.radio3}/>
                    </View>
                    <Text style={{
                        fontSize: 14,
                        color: '#F34A4A',
                        marginLeft: 83,
                        marginTop: 220
                    }}>{I18n.t('order_success')}</Text>
                </View> : <View style={styles.content}>
                    <View style={styles.contentTop}/>
                    {traces.map((item, i) => {

                        return <RenderItem
                            itemId={i}
                            key={`key${i}`}
                            item={item}
                        />
                    })}

                </View>}
                <View style={{height: 50}}/>
                <View style={{height: 50, backgroundColor: '#ECECEE'}}/>
            </ScrollView>
        )
    }

    render() {
        const {logisticsInfo} = this.state;
        const {traces, phone, state, shipping_number} = logisticsInfo;
        const {order_items, shipments} = this.props.params.orderItem;
        let menu = [LogisticsStatus.no_track, '', LogisticsStatus.on_the_way, LogisticsStatus.have_been_received, LogisticsStatus.question_piece];


        return (
            <BaseComponent
                ref={ref => this.contain = ref}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => {
                        global.router.pop();
                    }}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('logistics_info')}/>

                {util.isEmpty(logisticsInfo) ? null : this.content()}


                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.bottom}
                                      onPress={() => {
                                          call(DeShangPhone)
                                      }}>
                        <Text style={styles.bottomTxt}>{I18n.t('online_service')}</Text>
                    </TouchableOpacity>
                </View>
            </BaseComponent>

        )
    }
}

class RenderItem extends Component {


    render() {

        const {accept_time, accept_station} = this.props.item;
        const {itemId} = this.props;
        return (
            <View style={styles.itemContent} onLayout={this._onLayout}>
                <View style={styles.itemLeft}>
                    <Text
                        style={[styles.itemLeftTxt, itemId === 0 ? styles.color1 : null]}>{convertDate(accept_time, 'MM/DD')}</Text>
                    <Text
                        style={[styles.itemLeftTxt2, itemId === 0 ? styles.color1 : styles.color3]}>{convertDate(accept_time, 'hh:mm')}</Text>
                </View>
                <View style={{alignItems: 'center', width: 14, marginLeft: 12}}>
                    <View style={{height: 70, backgroundColor: '#DDDDDD', width: 1}}/>
                    <View style={itemId === 0 ? styles.radio : styles.radio2}/>
                </View>

                <View style={styles.itemRight}>
                    <Text
                        style={[styles.itemRightTxt, itemId === 0 ? styles.color1 : styles.color3]}>{accept_station}</Text>
                </View>


            </View>
        )
    }
}

const styles = {
    page: {
        flex: 1
    },
    line: {
        width: 3,
        backgroundColor: '#DDDDDD',
        position: 'absolute',
        left: 60
    },

    top: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 19,
        paddingTop: 17

    },
    topImg: {
        width: 93,
        height: 90,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 17
    },
    topView: {
        width: 94,
        height: 15,
        backgroundColor: '#000000',

        alignItems: 'center',
        justifyContent: 'center'
    },
    topLeftTxt: {
        fontSize: 10,
        color: '#FFFFFF'
    },
    topRight: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 17,

    },
    topRightTxt1: {
        fontSize: 14,
        color: '#F34A4A',
        marginTop: 3,
        marginBottom: 3
    },
    topRightTxt2: {
        fontSize: 14,
        color: '#333333',
        marginTop: 3,
        marginBottom: 3
    },
    topRightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    topRightTxt3: {
        fontSize: 14,
        color: '#4990E2'
    },
    content: {
        marginTop: 4,
        backgroundColor: '#FFFFFF',
        paddingBottom: 19
    },
    contentEmpty: {
        marginTop: 4,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 19
    },
    contentTop: {
        height: 20,
    },
    itemContent: {
        marginLeft: 16,
        flexDirection: 'row',
        marginRight: 50,
        flexWrap: 'nowrap',
        backgroundColor: 'white',
        height: 70,
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
        marginLeft: 11,
        backgroundColor: '#F34A4A',
        position: 'absolute',
        top: 20
    },
    radio2: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 11,
        backgroundColor: '#DDDDDD',
        position: 'absolute',
        top: 20
    },
    itemLeft3: {
        width: 42,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 230,
        marginLeft: 17

    },
    radio3: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 11,
        backgroundColor: '#DDDDDD',
        position: 'absolute',
        top: 220
    },
    itemRight: {
        marginLeft: 14,

    },
    itemLeftTxt: {
        fontSize: 14
    },
    itemLeftTxt2: {
        fontSize: 10,
    },
    itemRightTxt: {
        fontSize: 14,
        marginRight: 71

    },
    color1: {
        color: '#F34A4A'
    },
    color2: {
        color: '#333333'
    },
    color3: {
        color: '#888888'
    },
    bottomView: {
        height: 50,
        width: '100%',
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        zIndex: 99,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bottom: {
        borderRadius: 3,
        width: 90,
        height: 37,
        marginLeft: 17,
        borderWidth: 1,
        borderColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
        left: 0,
        right: 0
    },
    bottomTxt: {
        fontSize: 14,
        color: '#333333'
    }

};