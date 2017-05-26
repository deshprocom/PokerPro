/**
 * Created by lorne on 2017/5/23.
 */
import React, {PropTypes, Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, ListView, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ImageLoad, SwipeListView} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {GET_NOTIFICATIONS} from '../../actions/ActionTypes';
import {fetchNotifications} from '../../actions/AccountAction';
import {isEmptyObject, utcDate} from '../../utils/ComonHelper';

class MessagePage extends Component {

    constructor(props) {
        super(props);

        let dataList = [];
        this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList)
        };

    }

    componentDidMount() {
        this._onRefresh();
    }

    render() {
        const {dataList, dataSource} = this.state;
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
            {isEmptyObject(dataList) ? <NoDataView/> : null}

            <SwipeListView
                dataSource={dataSource}
                renderHiddenRow={this.hiddenRow}
                renderRow={this._itemListView}
                disableRightSwipe={true}
                rightOpenValue={-75}
            />

        </View>)
    }

    componentWillReceiveProps(newProps) {
        const {actionType, notices, loading, hasData} = newProps;
        if (actionType === GET_NOTIFICATIONS
            && loading !== this.props.loading
            && hasData) {

            const {notifications} = notices;
            this.setState({
                dataList: notifications,
                dataSource: this._dataSource.cloneWithRows(notifications)
            })
        }

    }

    hiddenRow = (data, secId, rowId, rowMap) => {

        return (

            <View style={styles.rowHidden}>
                <View></View>
                <TouchableOpacity
                    onPress={()=>this.deleteRow(secId, rowId, rowMap)}
                    style={styles.rightSwipe}>
                    <Text style={styles.txtSwipe}>删除</Text>
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
                                style={styles.txtTime}>{utcDate(created_at, "YYYY年MM月DD日")}</Text>
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
                                    style={styles.txtNum}>订单编号:{order_number}</Text>

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
                            style={styles.txtTime}>{utcDate(created_at, "YYYY年MM月DD日")}</Text>
                    </View>

                    <Text
                        testID={'txt_content_'+id}
                        style={styles.txtNotice}>{content}</Text>

                    <Text style={styles.txtSource}>来自：Poker Pro官方客服</Text>

                </View>
            </View>)
        }
    }

}

const
    bindAction = dispatch => ({
        getNotices: () => dispatch(fetchNotifications())
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