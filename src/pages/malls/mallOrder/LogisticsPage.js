import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {getLogisticsInfo} from '../../../services/MallDao';
import {convertDate, util} from '../../../utils/ComonHelper';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import {NavigationBar} from '../../../components';
import I18n from 'react-native-i18n';

export default class LogisticsPage extends Component {
    state = {
        logisticsInfo: [],
        height: 50
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

    _onLayout = (event) => {
        let height = event.nativeEvent.layout.height;
        this.setState({
            height: height
        })
    };


    render() {
        const {logisticsInfo} = this.state;
        const {traces,phone,express_code,order_number,state,shipping_number} = logisticsInfo;

        if(util.isEmpty(logisticsInfo)){
            return <View/>
        }
        return (
            <View style={styles.page}>
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

                <View style={styles.top}>
                    <Image style={styles.topImg} source={Images.business}>
                        <View style={{flex:1}}/>
                        <View style={styles.topView}>
                            <Text style={styles.topLeftTxt}>{state}{I18n.t('pieces')}{I18n.t('malls')}</Text>
                        </View>
                    </Image>
                    <View style={styles.topRight}>
                        <Text style={styles.topRightTxt1}>{state}</Text>
                        <Text style={styles.topRightTxt2}>{I18n.t('carrier_source')}：{express_code}</Text>
                        <Text style={styles.topRightTxt2}>{I18n.t('tracking_no')}：{shipping_number}</Text>
                        <View style={styles.topRightView}>
                            <Text style={styles.topRightTxt2}>{I18n.t('official_phone')}：</Text>
                            <Text style={styles.topRightTxt3}>{phone}</Text>
                        </View>
                    </View>

                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.contentTop}/>
                    {traces.map((item, i) => {

                        return <RenderItem
                            itemId={i}
                            key={`key${i}`}
                            item={item}
                        />
                    })}
                    <View style={{height:50}}/>
                    <View style={{height:50,backgroundColor:'#ECECEE'}}/>
                </ScrollView>


                <View style={styles.bottomView}>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomTxt}>{I18n.t('online_service')}</Text>
                    </View>
                </View>
            </View>

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
                        style={[styles.itemLeftTxt,itemId===0?styles.color1:null]}>{convertDate(accept_time, 'MM/DD')}</Text>
                    <Text
                        style={[styles.itemLeftTxt2,itemId===0?styles.color1:styles.color3]}>{convertDate(accept_time, 'hh:mm')}</Text>
                </View>
                <View style={{alignItems:'center',width:14,marginLeft:12}}>
                    <View style={{height:70,backgroundColor:'#DDDDDD',width:1}}/>
                    <View style={itemId===0?styles.radio:styles.radio2}/>
                </View>

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
    line: {
        width: 3,
        backgroundColor: '#DDDDDD',
        position: 'absolute',
        left: 60
    },

    top: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:19,
        paddingTop:17

    },
    topImg: {
        width: 93,
        height: 90,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft:17
    },
    topView: {
        width: 94,
        height: 15,
        backgroundColor: '#000000',
        opacity: 0.5,
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
        marginTop:3
    },
    topRightTxt2: {
        fontSize: 14,
        color: '#333333',
        marginTop:3
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
    bottomView:{
        height:50,
        width:'100%',
        backgroundColor:'#FFFFFF',
        position: 'absolute',
        bottom: 0,
        zIndex: 99,
        alignItems: 'flex-end',
        justifyContent:'center'
    },
    bottom:{
        borderRadius: 3,
        width: 90,
        height: 37,
        marginLeft: 17,
        borderWidth: 1,
        borderColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:18
    },
    bottomTxt:{
        fontSize: 14,
        color:'#333333'
    }

};