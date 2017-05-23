/**
 * Created by lorne on 2017/2/17.
 */
import React, {PropTypes} from 'react';
import {
    TouchableOpacity, View, TextInput, Dimensions,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {YYYY_MM_DD, convertDate, strValid} from '../../utils/ComonHelper';
import {ParallaxScrollView, MarkdownPlat} from '../../components';
import ForegroundView from './ForegroundView';
import TestRouter from '../../components/TestRouter';
import RaceResultView from './RaceResultView';
import RaceSideView from './RaceSideView';
import {raceStatusConvert, ticketStatusConvert, isEmptyObject} from '../../utils/ComonHelper';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import ImageLoad from '../../components/ImageLoad';

export default class RaceMarkdownView extends React.Component {

    static propTypes = {
        raceInfo: PropTypes.object,
        router: PropTypes.object,
        noBottomBar: PropTypes.bool,
        refreshPage: PropTypes.func

    };


    race_time = (raceInfo) => {
        if (isEmptyObject(raceInfo))
            return;
        let begin = convertDate(raceInfo.begin_date, YYYY_MM_DD);
        let end = convertDate(raceInfo.end_date, YYYY_MM_DD);
        return begin + '-' + end;
    }


    state = {
        selectPage: 0
    }


    render() {
        const {raceInfo} = this.props;
        const {selectPage} = this.state;

        return (<View style={styles.container}>
            <Image style={styles.header}
                   resizeMode="cover"
                   source={Images.home_bg}
            >

                <View style={styles.topBar}>
                    <TouchableOpacity
                        testID="btn_bar_left"
                        style={styles.popBtn}
                        onPress={()=>router.pop()}>
                        <Image style={styles.backImg}
                               source={Images.sign_return}/>
                    </TouchableOpacity>
                    <TestRouter refreshPage={()=>this.props.refreshPage()}/>

                    <View style={styles.viewTitle}>
                        <Text
                            testID="txt_races_title"
                            style={styles.txtTitle}
                            numberOfLines={1}>{raceInfo.name}</Text>
                    </View>
                    <View style={styles.popBtn}/>


                </View>
                <View style={styles.headerInfo}>
                    <Image style={styles.logoImg}
                           source={{uri:raceInfo.logo}}/>
                    <View style={styles.viewInfo}>
                        <View style={styles.viewTime}>
                            <Image style={styles.imgTime}
                                   source={Images.race_time}/>
                            <Text
                                testID="txt_races_period"
                                style={styles.txtTime}>{this.race_time(raceInfo)}</Text>
                        </View>
                        <View style={styles.viewLocation}>
                            <Image style={styles.imgLocation}
                                   source={Images.race_location}/>
                            <Text
                                testID="txt_races_address"
                                style={styles.txtLocation}>{raceInfo.location}</Text>
                        </View>
                        <View style={styles.viewPrice}>
                            <Text style={styles.txtLabel}>奖池:</Text>
                            <Text
                                testID="txt_races_prize"
                                style={styles.txtPrice}>{raceInfo.prize}</Text>
                        </View>

                        <View style={styles.viewPrice}>
                            <Text
                                testID="txt_races_status"
                                style={styles.txtStatus}>{raceStatusConvert(raceInfo.status)}</Text>
                            <Text
                                testID="txt_races_ticket"
                                style={[styles.txtStatus,styles.txtStatus1]}> {ticketStatusConvert(raceInfo.ticket_status)}</Text>
                        </View>

                    </View>

                </View>

                <View style={styles.viewFlex}/>

                <View style={styles.viewTab}>

                    <TouchableOpacity
                        testID="btn_main_race"
                        onPress={()=>this._selectPage(0)}
                        style={styles.viewCenter1}>
                        <Text style={selectPage === 0?styles.txtTabSelect:styles.txtTab}>主赛信息</Text>
                        {selectPage === 0 ? <Image style={styles.imgTab}
                                                   source={Images.race_triangle}/> : <View style={styles.imgTab}/>}

                    </TouchableOpacity>
                    <TouchableOpacity
                        testID="btn_sub_race"
                        onPress={()=>this._selectPage(1)}
                        style={styles.viewCenter}>
                        <Text style={selectPage === 1?styles.txtTabSelect:styles.txtTab}>边赛信息</Text>
                        {selectPage === 1 ? <Image style={styles.imgTab}
                                                   source={Images.race_triangle}/> : <View style={styles.imgTab}/>}

                    </TouchableOpacity>
                    <TouchableOpacity
                        testID="btn_main_result"
                        onPress={()=>this._selectPage(2)}
                        style={styles.viewCenter}>
                        <Text style={selectPage === 2?styles.txtTabSelect:styles.txtTab}>主赛结果</Text>
                        {selectPage === 2 ? <Image style={styles.imgTab}
                                                   source={Images.race_triangle}/> : <View style={styles.imgTab}/>}

                    </TouchableOpacity>

                </View>

            </Image>

            {this._viewPager()}
        </View>)
    }

    _selectPage = (index) => {
        this.viewpage.setPage(index);
    }


    _viewPager = () => {
        const {raceInfo, noBottomBar} = this.props;
        if (!isEmptyObject(raceInfo))
            return ( <IndicatorViewPager
                onPageSelected={(select)=>{
                     const {position} = select;
                     this.setState({
                         selectPage:position
                     })
                }}
                style={styles.container}
                ref={ref=>this.viewpage = ref}>
                <View
                    testID="page_race_info"
                    style={{
                        backgroundColor:Colors.white,
                        marginBottom:noBottomBar?0:50}}>
                    <MarkdownPlat
                        markdownStr={raceInfo.description}/>

                </View>


                <View
                    style={{
                         backgroundColor:Colors.bg_f5,
                        marginBottom:noBottomBar?0:50}}>
                    <RaceSideView
                        raceId={strValid(raceInfo.race_id)}/>
                </View>


                <View
                    style={{
                          backgroundColor:Colors.white,
                        marginBottom:noBottomBar?0:50}}>
                    <RaceResultView
                        isSub={false}
                        schedule={raceInfo.schedule}
                        race_id={raceInfo.race_id}/>
                </View>


            </IndicatorViewPager>)
    }


}


const styles = StyleSheet.create({
    tabBar: {
        borderColor: Colors.white,
        height: 40
    },
    tabStyle: {
        paddingBottom: 0,

    },
    underlineStyle: {
        backgroundColor: '#161718',
    },
    container: {
        flex: 1
    },
    header: {
        height: 220,
        backgroundColor: 'transparent',
        width: Metrics.screenWidth
    },
    topBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight
    },
    popBtn: {
        height: 40,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },
    txtTitle: {
        fontSize: 16,
        color: Colors.white
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    logoImg: {
        height: 104,
        width: 80,
        marginLeft: 15
    },
    viewInfo: {
        marginLeft: 17,
        marginTop: 4
    },
    imgTime: {
        height: 16,
        width: 14
    },
    imgLocation: {
        height: 15,
        width: 11
    },
    viewTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    txtTime: {
        color: '#cccccc',
        fontSize: 12,
        marginLeft: 11
    },
    txtLocation: {
        color: '#cccccc',
        fontSize: 12,
        marginLeft: 14
    },
    txtLabel: {
        fontSize: 14,
        color: '#D2C476'
    },
    txtPrice: {
        fontSize: 15,
        color: '#D2C476'
    },
    viewPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    txtStatus: {
        fontSize: 10,
        height: 17,
        color: '#AAAAAA',
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },
    txtStatus1: {
        marginLeft: 13
    },
    viewTab: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    viewCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25
    },
    imgTab: {
        height: 8,
        width: 16
    },
    txtTab: {
        fontSize: 16,
        color: '#888888',
        marginBottom: 10
    },
    txtTabSelect: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 10
    },
    viewCenter1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    viewFlex: {
        flex: 1
    },
    viewTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }


});
