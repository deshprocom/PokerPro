/**
 * Created by lorne on 2017/5/23.
 */
import React, {PropTypes, Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, UltimateListView, ImageLoad} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {GET_NOTIFICATIONS} from '../../actions/ActionTypes';
import {fetchNotifications} from '../../actions/AccountAction';


class MessagePage extends Component {

    constructor(props) {
        super(props);

        let dataList = [];
        this.state = {
            listTicket: dataList,
        };
        this.listPage = 1;

    }

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={router}
                title={I18n.t('messages')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

            <UltimateListView
                ref={(ref) => this.listView = ref}
                keyExtractor={(item, index) => `${item.race_id}`}
                onFetch={this.onFetch}
                refreshableMode="advanced"
                separator={()=>  <View style={{height:10}}/>}
                rowView={this._itemListView}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={()=>{
             return <NoDataView/>;
             }}
            />

        </View>)
    }

    componentWillReceiveProps(newProps) {
        const {actionType, notices, loading, hasData} = newProps;
        if (actionType === GET_NOTIFICATIONS
            && loading !== this.props.loading
            && hasData) {

            const {notifications} = notices;
            if (this.listPage == 1) {
                this.listView.postRefresh(notifications, 1);
            }
        }

    }

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            this.listPage = page;

            if (page === 1) {
                this._onRefresh();
            }

        } catch (err) {
            abortFetch();
            console.log(err);
        }
    };

    _onRefresh = () => {
        this.props.getNotices()
    };

    _itemListView = (item, index) => {

        const {notify_type} = item;
        if (notify_type === 'order') {
            return (  <View style={styles.listItem}>
                <View style={styles.itemTitle}>
                    <Text style={styles.txtPay}>付款成功</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.txtTime}>2018年5月17日 12:34</Text>
                </View>

                <View style={styles.itemView}>
                    <ImageLoad
                        source={{uri:''}}
                        style={styles.imgRace}/>
                    <View style={styles.itemContent}>
                        <Text style={styles.txtContent}>恭喜您，下单成功！客服将及时与您联系，请保持手机通话畅通！</Text>
                        <View style={{flex:1}}/>

                        <Text style={styles.txtNum}>订单编号：34324325325</Text>

                    </View>

                </View>

                <View style={{height:15}}/>

            </View>)
        } else if (notify_type === 'certification') {
            return ( <View style={styles.listItem}>
                <View style={styles.itemTitle}>
                    <Text style={[styles.txtPay,styles.txtRed]}>实名认证失败</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.txtTime}>2018年5月17日 12:34</Text>
                </View>

                <Text style={styles.txtNotice}>您上传的证件号码有误，为了完善您更良好的购票体验，请重新实名认证！</Text>

                <Text style={styles.txtSource}>来自：Poker Pro官方客服</Text>

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
            color: '#34BA3C'
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