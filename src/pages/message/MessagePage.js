/**
 * Created by lorne on 2017/5/23.
 */
import React, {PropTypes, Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, ListView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ImageLoad, SwipeListView} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {GET_NOTIFICATIONS, DEL_NOTIFICATIONS} from '../../actions/ActionTypes';
import {fetchNotifications, fetchDelNotice} from '../../actions/AccountAction';
import {isEmptyObject, utcDate,YYYY_MM_DD} from '../../utils/ComonHelper';

const icons = [
    require('../../../source/message/ic_send.png'),
    require('../../../source/message/ic_success.png'),
    require('../../../source/message/ic_cancel.png'),
    require('../../../source/message/cer_fail.png'),
    require('../../../source/message/cer_success.png')
];

class MessagePage extends Component {

    constructor(props) {
        super(props);

        let dataList = [];
        this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList),
            fetchState: false
        };


    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._onRefresh();
        });


    }

    render() {
        const {dataList, dataSource, fetchState} = this.state;
        return (<View
            testID="page_message"
            style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={router}
                title={I18n.t('messages')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>
            {isEmptyObject(dataList) && !fetchState ? <NoDataView/> : null}
            {isEmptyObject(dataList) && fetchState ? <LoadErrorView
                    onPress={this._onRefresh}/> : null}

            <SwipeListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderHiddenRow={this.hiddenRow}
                renderRow={this._itemListView}
                disableRightSwipe={true}
                rightOpenValue={-75}
            />

        </View>)
    }

    componentWillReceiveProps(newProps) {
        const {actionType, notices, loading, hasData, error} = newProps;
        if (actionType === GET_NOTIFICATIONS
            && loading !== this.props.loading
            && hasData) {

            const {notifications} = notices;
            this.setState({
                dataList: notifications,
                dataSource: this._dataSource.cloneWithRows(notifications),
                fetchState: error
            })
        }

    }


    readerItem = (index, desc, time) => {


        return (
            <TouchableOpacity
                onPress={() => {
                    if (index === 0)
                        router.toMessagePage();
                    else if (index === 1)
                        router.toActivityCenter(this.props, this.state.activities)

                }}
                style={{backgroundColor: 'white'}}>
                {index !== 0 ? <View style={styles.msgLine}/> : null}
                <View style={styles.flatItem}>
                    <Image style={styles.msgIcon}
                           source={icons[index]}/>
                    <View style={styles.msgRed}/>
                    <View>
                        <Text style={styles.msgTitle}>{titles[index]}</Text>
                        <Text style={styles.msgDesc}>{desc}</Text>
                    </View>

                    <Text style={styles.msgTime}>{utcDate(time, 'YYYY/MM/DD')}</Text>

                </View>
            </TouchableOpacity>)
    };


    hiddenRow = (data, secId, rowId, rowMap) => {

        return (

            <View style={styles.rowHidden}>
                <View></View>
                <TouchableOpacity
                    onPress={()=>this._delNotice(data,secId, rowId, rowMap)}
                    style={styles.rightSwipe}>
                    <Text style={styles.txtSwipe}>{I18n.t('buy_del')}</Text>
                </TouchableOpacity>

            </View>
        )
    };


    _onRefresh = () => {
        this.props.getNotices()
    };

    _titleColor = (color_type) => {
        switch (color_type) {
            case 'success':
                return styles.txtGreen;
            case 'failure':
                return styles.txtRed;
            default:
                return styles.txtBlack;
        }
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


        this.props.delNotice({id: data.id}, () => {
            this.deleteRow(secId, rowId, rowMap)
        })
    };

    _itemListView = (item) => {

        const {notify_type, color_type, title, content, created_at, order_number, image, id} = item;
        if (notify_type === 'order') {
            return ( <View
                    testID={'item_order_'+id}>
                    <View style={{height:10}}/>
                    <View style={styles.listItem}>
                        <View style={styles.itemTitle}>
                            <Text
                                testID={'txt_title_'+id}
                                style={[styles.txtPay,this._titleColor(color_type)]}>{title}</Text>
                            <View style={{flex:1}}/>
                            <Text
                                testID={'txt_notice_time_1'+id}
                                style={styles.txtTime}>{utcDate(created_at, YYYY_MM_DD)}</Text>
                        </View>

                        <View style={styles.itemView}>
                            <ImageLoad
                                source={{uri:image}}
                                style={styles.imgRace}/>
                            <View style={styles.itemContent}>
                                <Text
                                    testID={'txt_content_'+id}
                                    style={styles.txtContent}>{content}</Text>
                                <View style={{flex:1}}/>

                                <Text
                                    testID={'txt_order_num_'+id}
                                    style={styles.txtNum}>{I18n.t('order_num')}:{order_number}</Text>

                            </View>

                        </View>

                        <View style={{height:15}}/>

                    </View>
                </View>
            )
        } else if (notify_type === 'certification') {
            return ( <View
                testID={"item_certification_"+id}>
                <View style={{height:10}}/>
                <View style={styles.listItem}>
                    <View style={styles.itemTitle}>
                        <Text
                            testID={'txt_title_'+id}
                            style={[styles.txtPay,this._titleColor(color_type)]}>{title}</Text>
                        <View style={{flex:1}}/>
                        <Text
                            testID={'txt_notice_time_1'+id}
                            style={styles.txtTime}>{utcDate(created_at, YYYY_MM_DD)}</Text>
                    </View>

                    <Text
                        testID={'txt_content_'+id}
                        style={styles.txtNotice}>{content}</Text>

                    <Text style={styles.txtSource}>{I18n.t('message_from')}</Text>

                </View>
            </View>)
        }
    }

}

const
    bindAction = dispatch => ({
        getNotices: () => dispatch(fetchNotifications()),
        delNotice: (body, success) => dispatch(fetchDelNotice(body, success))
    })
    ;

const
    mapStateToProps = state => ({
        loading: state.AccountState.loading,
        error: state.AccountState.error,
        hasData: state.AccountState.hasData,
        actionType: state.AccountState.actionType,
        notices: state.AccountState.notices

    });

export
default

connect(mapStateToProps, bindAction)

(
    MessagePage
)
;


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
            backgroundColor: Colors._ECE,
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
            backgroundColor: 'white',
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
            marginTop: 10
        },
        txtSwipe: {
            fontSize: 20,
            color: 'white'
        },
        rightSwipe: {
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
            height: 140
        }


    })