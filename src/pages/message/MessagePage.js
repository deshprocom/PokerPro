/**
 * Created by lorne on 2017/5/23.
 */
import React, { Component} from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, ListView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ImageLoad, SwipeListView} from '../../components';
import {isEmptyObject, utcDate, showToast} from '../../utils/ComonHelper';
import {OrderStatus, Verified} from '../../configs/Status';
import {delNotification, postMsgRead, getNotifications} from '../../services/AccountDao';
import {fetchUnreadMsg} from '../../actions/AccountAction';
import {connect} from 'react-redux';

const icons = [
    require('../../../source/message/ic_send.png'),
    require('../../../source/message/ic_success.png'),
    require('../../../source/message/ic_cancel.png'),
    require('../../../source/message/cer_fail.png'),
    require('../../../source/message/cer_success.png'),
    require('../../../source/message/ic_poker.png')
];
const ORDER = 'order';
const CERTIFICATION = "certification";

class MessagePage extends Component {

    constructor(props) {
        super(props);

        this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList: [],
            dataSource: this._dataSource.cloneWithRows([]),

        };


    }

    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        getNotifications(data => {
            const {notifications} = data;
            this.setState({
                dataList: notifications,
                dataSource: this._dataSource.cloneWithRows(notifications)
            })
        }, err => {

        })
    };

    render() {
        const {dataSource} = this.state;
        return (<View
            testID="page_message"
            style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title={I18n.t('messages')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <SwipeListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderHiddenRow={this.hiddenRow}
                renderRow={this.readerItem}
                disableRightSwipe={true}
                rightOpenValue={-75}
            />

        </View>)
    }


    readerItem = (item, secId, rowId) => {
        const {notify_type, color_type, title, content, created_at, order_number, id, read, order_status} = item;

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (notify_type === ORDER) {
                        router.toOrderInfoPage(this.props, order_number)
                    } else {
                        router.toCertificationPage()
                    }
                    postMsgRead({id: id}, data => {
                        this.refresh();
                        this.props._fetchUnreadMsg();

                    }, err => {

                    });


                }}
                style={{backgroundColor: 'white'}}>
                {rowId !== 0 ? <View style={styles.msgLine}/> : null}
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={this.getIcon(notify_type, order_status, color_type)}/>
                    {read ? null : <View style={styles.msgRed}/>}
                    <View>
                        <Text style={styles.msgTitle}>{title}</Text>
                        <Text style={styles.msgDesc}>{this.getDesc(notify_type, order_number, content)}</Text>
                    </View>

                    <Text style={styles.msgTime}>{utcDate(created_at, 'YYYY/MM/DD')}</Text>

                </View>
            </TouchableOpacity>)
    };

    getDesc = (type, orderNum, content) => {
        if (type === ORDER) {
            return '订单编号:' + orderNum;
        } else {
            return content;
        }
    };

    getIcon = (type, status, color_type) => {
        if (type === ORDER) {
            switch (status) {
                case OrderStatus.delivered:
                    return icons[0];
                case OrderStatus.paid:
                    return icons[1];
                case OrderStatus.canceled:
                    return icons[2];

                default:
                    return icons[5];
            }
        } else if (type === CERTIFICATION) {
            switch (color_type) {
                case 'failure':
                    return icons[3];
                case "success":
                    return icons[4];

                default:
                    return icons[5];
            }
        }
    };


    hiddenRow = (data, secId, rowId, rowMap) => {
        return (

            <View style={styles.rowHidden}>
                <View></View>
                <TouchableOpacity
                    onPress={() => this._delNotice(data, secId, rowId, rowMap)}
                    style={styles.rightSwipe}>
                    <Text style={styles.txtSwipe}>{I18n.t('buy_del')}</Text>
                </TouchableOpacity>

            </View>
        )
    };


    deleteRow = (secId, rowId, rowMap) => {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.dataList];
        newData.splice(rowId, 1);
        this.setState({
            dataList: newData,
            dataSource: this._dataSource.cloneWithRows(newData)
        });
    };

    _delNotice = (data, secId, rowId, rowMap) => {
        delNotification({id: data.id}, ret => {
            this.deleteRow(secId, rowId, rowMap)
        }, err => {
            showToast(err)
        })

    };

}


const bindAction = dispatch => ({
    _fetchUnreadMsg: () => dispatch(fetchUnreadMsg())
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(MessagePage);


const
    styles = StyleSheet.create({
        flatItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 24,
            paddingBottom: 22
        },
        msgIcon: {
            height: 54,
            width: 54,
            borderRadius: 27,
            marginLeft: 18,
            marginRight: 22
        },
        msgTitle: {
            fontSize: 16,
            color: Colors._161
        },
        msgDesc: {
            fontSize: 14,
            color: Colors._888,
            marginTop: 10
        },
        msgTime: {
            fontSize: 12,
            color: Colors._AAA,
            position: 'absolute',
            top: 30,
            right: 10
        },
        msgLine: {
            height: 1,
            backgroundColor: Colors._ECE,
            marginLeft: 18,
        },
        msgRed: {
            height: 10,
            width: 10,
            backgroundColor: '#D0011B',
            borderRadius: 5,
            position: 'absolute',
            top: 25,
            left: 67
        },
        itemTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 40
        },
        txtPay: {
            fontSize: 18,
        },
        txtTime: {
            fontSize: 12,
            color: Colors._AAA
        },
        imgRace: {
            height: 84,
            width: 65
        },
        itemView: {
            height: 84,
            flexDirection: 'row',
        },
        txtContent: {
            fontSize: 14,
            color: Colors.txt_666,
            marginTop: 10,
            lineHeight: 20
        },
        txtNum: {
            fontSize: 12,
            color: Colors._AAA
        },
        itemContent: {
            flex: 1,
            marginLeft: 10
        },
        listItem: {
            paddingLeft: 18,
            backgroundColor: 'white',
            paddingRight: 18
        },
        txtRed: {
            color: '#F34A4A'
        },
        txtGreen: {
            color: '#34BA3C'
        },
        txtBlack: {
            color: '#444444'
        },
        txtNotice: {
            fontSize: 14,
            color: Colors.txt_666,
            marginTop: 10,
            lineHeight: 20
        },
        txtSource: {
            fontSize: 12,
            color: Colors._888,
            alignSelf: 'flex-end',
            marginTop: 15,
            marginBottom: 17
        },
        rowHidden: {
            alignItems: 'center',
            backgroundColor: '#F34A4A',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        txtSwipe: {
            fontSize: 20,
            color: 'white'
        },
        rightSwipe: {
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
            height: 100
        }


    })