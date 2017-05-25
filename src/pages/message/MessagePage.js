/**
 * Created by lorne on 2017/5/23.
 */
import React, {PropTypes, Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, FlatList
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ImageLoad} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {GET_NOTIFICATIONS} from '../../actions/ActionTypes';
import {fetchNotifications} from '../../actions/AccountAction';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';

class MessagePage extends Component {

    constructor(props) {
        super(props);

        let dataList = [];
        this.state = {
            dataList: dataList,
        };

    }

    componentDidMount() {
        this._onRefresh();
    }

    render() {
        const {dataList} = this.state;
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

            <FlatList
                keyExtractor={(item)=>item.id}
                data={dataList}
                renderItem={this._itemListView}
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
                dataList: notifications
            })
        }

    }


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

    _itemListView = ({item, index}) => {

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
                                testID={'txt_time_'+id}
                                style={styles.txtTime}>{convertDate(created_at, "YYYY年MM月DD日")}</Text>
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
                testID="item_order">
                <View style={{height:10}}/>
                <View style={styles.listItem}>
                    <View style={styles.itemTitle}>
                        <Text
                            testID={'txt_title_'+id}
                            style={[styles.txtPay,this._titleColor(color_type)]}>{title}</Text>
                        <View style={{flex:1}}/>
                        <Text
                            testID={'txt_time_'+id}
                            style={styles.txtTime}>{convertDate(created_at, "YYYY年MM月DD日")}</Text>
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
        }


    })