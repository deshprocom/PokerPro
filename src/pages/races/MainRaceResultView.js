/**
 * Created by lorne on 2017/4/29.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {strNotNull, isEmptyObject} from '../../utils/ComonHelper'
import I18n from 'react-native-i18n';
import {BtnLong, MarkdownPlat} from '../../components';
import RaceResultList from './RaceResultList';
import ScheduleList from './ScheduleList';
import BlindsList from './BlindsList';

const TAB_INFO = 'TAB_RACE_INFO',
    TAB_BLINDS = 'TAB_BLINDS',
    TAB_RESULT = 'TAB_RESULT';

export default class MainRaceResultView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            curTab: ''
        }
    }


    render() {

        return (<View
            style={styles.page}
            testID="page_race_result">
            {this._tabView()}
            <ScrollView>
                {this._tabPage()}
            </ScrollView>


        </View>)
    }

    _tabView = () => {

        const {curTab} = this.state;
        const {raceRanks, schedules, blinds, isSideRace, schedules_markdown, data} = this.props;
        const {blind_memo, schedule_memo} = data;
        this.tabs = [];

        if (isSideRace && strNotNull(schedules_markdown)) {
            this.tabs.push(<BtnLong
                name={I18n.t('Schudel')}
                onPress={() => this.btnSelectTab(TAB_INFO)}
                activeOpacity={1}
                testID="btn_race_info"
                key={TAB_INFO}
                style={curTab === TAB_INFO ? styles.btnSelect : styles.btn}
                textStyle={curTab === TAB_INFO ? styles.txtBtnSelect : styles.txtBtn}
            />)

        }
        else if (!isSideRace && !isEmptyObject(schedules) &&
            schedules.length > 0 || strNotNull(schedule_memo)) {
            this.tabs.push(<BtnLong
                name={I18n.t('Schudel')}
                onPress={() => this.btnSelectTab(TAB_INFO)}
                activeOpacity={1}
                testID="btn_race_info"
                key={TAB_INFO}
                style={curTab === TAB_INFO ? styles.btnSelect : styles.btn}
                textStyle={curTab === TAB_INFO ? styles.txtBtnSelect : styles.txtBtn}
            />)

        }
        if (!isEmptyObject(blinds)
            && blinds.length > 0 || strNotNull(blind_memo)) {
            this.tabs.push(<BtnLong
                name={I18n.t('Blind')}
                onPress={() => this.btnSelectTab(TAB_BLINDS)}
                activeOpacity={1}
                key={TAB_BLINDS}
                testID="btn_race_blinds"
                style={curTab === TAB_BLINDS ? styles.btnSelect : styles.btn}
                textStyle={curTab === TAB_BLINDS ? styles.txtBtnSelect : styles.txtBtn}
            />)
        }
        if (!isEmptyObject(raceRanks) &&
            raceRanks.length > 0) {
            this.tabs.push(<BtnLong
                name={I18n.t('Ranks')}
                onPress={() => this.btnSelectTab(TAB_RESULT)}
                activeOpacity={1}
                key={TAB_RESULT}
                testID="btn_race_result"
                style={curTab === TAB_RESULT ? styles.btnSelect : styles.btn1}
                textStyle={curTab === TAB_RESULT ? styles.txtBtnSelect : styles.txtBtn}
            />)


        }


        return (
            <View style={styles.tab}>
                {this.tabs}
            </View>);

    };


    componentDidMount() {
        if (this.tabs.length > 0)
            this.setState({
                curTab: this.tabs[0].key
            })

    }


    _tabPage = () => {

        const {curTab} = this.state;
        const {raceRanks, schedules, blinds, isSideRace, schedules_markdown, raceInfo, data} = this.props;


        switch (curTab) {
            case TAB_INFO:

                return isSideRace ? <MarkdownPlat
                        noScroll={true}
                        markdownStr={schedules_markdown}/> :
                    <ScheduleList
                        data={data}
                        schedules={schedules}/>;
            case TAB_BLINDS:
                return <BlindsList
                    data={data}
                    startChips={isEmptyObject(raceInfo) ? null : raceInfo.blind}
                    blinds={blinds}/>;
            case TAB_RESULT:
                return <RaceResultList
                    raceRanks={raceRanks}/>;
            default:
                return null;


        }
    };

    btnSelectTab = (tabStr) => {
        this.setState({
            curTab: tabStr
        })
    }


}


const styles = StyleSheet.create({

    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginRight: 17,
        marginLeft: 17,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors._161817,
        borderRadius: 2,
    },
    btn1: {
        flex: 1,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: Colors._161817
    },
    btnSelect: {
        flex: 1,
        height: 36,
        backgroundColor: Colors._161817,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtn: {
        color: Colors._161817,
        fontSize: 14
    },
    txtBtnSelect: {
        color: Colors.white,
        fontSize: 14
    },
    btnLeft: {
        borderBottomLeftRadius: 2,
        borderTopLeftRadius: 2
    },
    btnRight: {
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2
    },
    txtTab: {
        color: Colors.txt_666,
        fontSize: 13,
        marginTop: 13,
        marginLeft: 17,
        marginBottom: 5
    },
    markView: {
        padding: 20,
        paddingBottom: 40,
        paddingTop: 0,
        backgroundColor: Colors.white
    },
    page: {
        backgroundColor: Colors.white
    },


});