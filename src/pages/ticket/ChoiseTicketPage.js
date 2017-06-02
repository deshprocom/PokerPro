/**
 * Created by lorne on 2017/6/1.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, Platform, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView, NavigationBar, ImageLoad} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';


export default class ChoiseTicketPage extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            {this.topBar()}

            {this.listTicketView()}

            {this.bottomBar()}

        </View>)
    }

    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                barStyle="dark-content"
                title={I18n.t('selectTicket')}
                titleStyle={styles.barTitle}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

        </View>)
    };

    titelView = () => {
        return (<View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>[澳门]扑克王杯澳门站</Text>

        </View>)

    };

    raceTypeView = () => {
        return (<View style={styles.viewRace}>
            <Text style={styles.txtSelectRace}>选择赛事</Text>
            <View style={styles.viewMainSide}>

                <View style={styles.viewSelected}>
                    <Text style={styles.txtSelected}>主赛</Text>
                </View>
                <View style={[styles.viewSelect,styles.marginLeft]}>
                    <Text style={styles.txtSelect}>边赛</Text>
                </View>
            </View>

        </View>)
    };

    ticketTypeView = () => {
        return (<View style={styles.viewRace}>
            <Text style={styles.txtSelectRace}>选择票务类型</Text>
            <View style={styles.viewMainSide}>

                <View style={styles.viewSelect}>
                    <Text style={styles.txtSelect}>仅赛事</Text>
                </View>
                <View style={[styles.viewSelected,styles.marginLeft]}>
                    <Text style={styles.txtSelected}>赛票套餐</Text>
                </View>
            </View>
        </View>)
    };

    listTicketView = () => {
        return (<UltimateListView
            ref={(ref) => this.listView = ref}
            firstLoader={false}
            onFetch={this.onFetch}
            rowView={this.itemListView}
            headerView={()=>{
              return(<View>
            {this.titelView()}

            {this.raceTypeView()}

            {this.ticketTypeView()}

            <View style={{height:10}}/>


</View>)
            }}
            separator={() => {
            return <View style={styles.separator}/>
        }}
            emptyView={()=>{
                    return this.props.error? <LoadErrorView/>: <View/>;
                }}
        />)
    };

    itemListView = () => {
        return (<View style={styles.itemView}>
            <ImageLoad
                source={{uri:''}}
                style={styles.itemImg}/>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={2}
                    style={styles.txtItemTitle}>WPT世界巡回赛票+机票+济州岛某某某酒店</Text>

                <Text style={[styles.txtLabel,styles.top8]}>2016.10.23-2016.10.25</Text>
                <Text style={styles.txtLabel}>地址：九龙乡九龙港帝豪大厦</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.txtPrice}>¥13,480</Text>

                    <View style={{flex:1}}/>

                    <View style={styles.btnInfo}>
                        <Text style={styles.btnTxt}>查看详情</Text>
                    </View>
                </View>


            </View>

        </View>)
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch([1, 3, 3], 2)
    };

    bottomBar = () => {
        return (<View style={styles.viewBottom}>
            <Text style={styles.txtMoney}>价格: </Text>
            <Text style={styles.txtMoneyNum}>¥23,300</Text>
            <View style={{flex:1}}/>
            <View style={styles.viewBtnOk}>
                <Text style={styles.txtBtnOk}>选好了</Text>

            </View>

        </View>)
    }


}


const styles = StyleSheet.create({
    topView: {
        backgroundColor: 'rgba(255,255,255,0.98)'
    },
    viewTitle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: 5
    },
    txtTitle: {
        fontSize: 16,
        color: '#444444',
        marginLeft: 17
    },
    barTitle: {
        fontSize: 18,
        color: Colors._161817
    },
    viewRace: {
        height: 100,
        paddingLeft: 17,
        backgroundColor: 'white',
        marginTop: 5
    },
    txtSelectRace: {
        fontSize: 15,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 13,
        marginBottom: 13
    },
    viewMainSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewSelected: {
        height: 36,
        width: 94,
        backgroundColor: '#000000',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSelected: {
        fontSize: 15,
        color: '#E4D57F'
    },
    viewSelect: {
        height: 36,
        width: 94,
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSelect: {
        fontSize: 15,
        color: '#444444'
    },
    txtDisabled: {
        fontSize: 15,
        color: '#AAAAAA'
    },
    marginLeft: {
        marginLeft: 20
    },
    itemView: {
        flexDirection: 'row',
        paddingLeft: 17,
        backgroundColor: 'white'
    },
    itemImg: {
        height: 104,
        width: 80,
        marginTop: 16,
        marginBottom: 20
    },
    itemContent: {
        flex: 1,
        marginTop: 16,
        marginLeft: 13,
        marginRight: 10
    },
    txtItemTitle: {
        fontSize: 16,
        color: '#444444',
        lineHeight: 20

    },
    txtLabel: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    top8: {
        marginTop: 8,
        marginBottom: 3
    },
    separator: {
        height: 4
    },
    txtPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors._161817,
    },
    viewBottom: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    },
    txtMoney: {
        fontSize: 14,
        color: Colors._161817,
        fontWeight: 'bold',
    },
    txtMoneyNum: {
        fontSize: 20,
        color: '#DF1D0F',
        fontWeight: 'bold',
    },
    viewBtnOk: {
        width: 92,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DF1D0F'
    },
    txtBtnOk: {
        fontSize: 18,
        color: 'white'
    },
    viewInfo: {
        marginTop: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnInfo: {
        height: 25,
        width: 66,
        borderRadius: 2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DDDDDD',
        marginRight: 7
    },
    btnTxt: {
        fontSize: 12,
        color: '#666666',
        fontWeight: 'bold',
    }
});