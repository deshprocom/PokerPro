/**
 * Created by lorne on 2017/3/29.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, ListView,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import {strNotNull, isEmptyObject, convertDate} from '../../utils/ComonHelper';
import {SUB_RACE_INFO} from '../../actions/ActionTypes';
import {fetchSubInfo} from '../../actions/RacesAction';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import MainRaceResultView from './MainRaceResultView';

class ChildRaceInfoPage extends Component {


    componentDidMount() {

        this.props.getSubInfo(this.props.params.race_ids)
    }

    render() {
        return (<View
            testID="page_sub_race"
            style={ApplicationStyles.bgContainer}>
            <NavigationBar
                refreshPage={()=>{ this.props.getSubInfo(this.props.params.race_ids)}}
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={this.props.router}
                title={this.raceTitle()}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>this.props.router.pop()}/>


            {this.subRaceInfoView()}

            {this.raceView()}
        </View>)
    }

    subRaceInfoView = () => {
        const {subRaceInfo} = this.props;
        if (!isEmptyObject(subRaceInfo)) {
            return (  <View style={styles.viewRace}>
                <Text
                    testID="txt_race_title"
                    style={styles.txtTitle}>{subRaceInfo.name}</Text>

                <Text
                    testID="txt_race_time"
                    style={styles.txtTime}>时间：{this.subTime(subRaceInfo)}</Text>

                <Text
                    testID="txt_race_addr"
                    style={styles.txtLocation}>地点：{subRaceInfo.location}</Text>

                <View
                    style={styles.viewPrice}>
                    <Text
                        testID="txt_race_buy_in"
                        style={styles.txtPrice}>买入：{subRaceInfo.ticket_price}</Text>
                    <Text
                        testID="txt_race_price"
                        style={styles.txtPrice}>奖池：{subRaceInfo.prize}</Text>
                </View>

                <View style={styles.viewPrice}>

                    <Text
                        testID="txt_race_joinNum"
                        style={styles.txtNum}>参赛人数：{subRaceInfo.participants}</Text>

                    <Text
                        testID="txt_race_begin_chips"
                        style={styles.txtNum}>起始筹码：{subRaceInfo.participants}</Text>
                </View>

            </View>)
        }
    }


    raceTitle = () => {
        const {subRaceInfo} = this.props;
        if (!isEmptyObject(subRaceInfo))
            return subRaceInfo.name;

    }


    subTime = (subRaceInfo) => {
        const format = 'YYYY年MM月DD日';

        return convertDate(subRaceInfo.begin_date, format) + '-'
            + convertDate(subRaceInfo.end_date, format);

    }

    raceView = () => {
        const {subRaceInfo} = this.props;
        if (isEmptyObject(subRaceInfo))
            return;
        const {schedules, ranks, blinds} = subRaceInfo;

        return ( <View style={styles.page}>
            <MainRaceResultView
                blinds={blinds}
                schedules={schedules}
                raceRanks={ranks}/>
        </View>)
    }

}


const bindAction = dispatch => ({
    getSubInfo: (body) => dispatch(fetchSubInfo(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    subRaceInfo: state.RaceState.subRaceInfo
});

export default connect(mapStateToProps, bindAction)(ChildRaceInfoPage);


const styles = StyleSheet.create({
    viewRace: {
        marginTop: 6,
        padding: 17,
        backgroundColor: Colors.white,
        marginBottom: 5
    },
    txtTitle: {
        color: '#444444',
        fontSize: 18
    },
    txtTime: {
        color: Colors._888,
        fontSize: 13,
        marginTop: 8
    },
    txtLocation: {
        color: Colors._888,
        fontSize: 13,
        marginTop: 3,
        marginBottom: 7
    },
    txtPrice: {
        color: Colors.txt_666,
        fontSize: 14,
        flex: 2,
        fontWeight: 'bold'
    },
    txtNum: {
        color: Colors.txt_666,
        fontSize: 14,
        flex: 3,
        fontWeight: 'bold'
    },
    viewPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
    },
    viewInfo: {
        marginTop: 5,
        backgroundColor: Colors.white,
        flex: 1
    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 16,
        borderRadius: 2
    },
    viewSelected: {
        backgroundColor: Colors._161817,
        width: 172,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36
    },
    viewUn: {
        width: 172,
        borderWidth: 1,
        borderColor: Colors._161817,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36
    },
    txtSelected: {
        color: Colors.white,
        fontSize: 14
    },
    txtUn: {
        color: Colors._161817,
        fontSize: 14
    },
    page: {
        flex: 1,
        backgroundColor: Colors.white
    }
});