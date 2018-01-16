/**
 * Created by lorne on 2018/1/15
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import I18n from 'react-native-i18n';

const styles = StyleSheet.create({
    btnLeft: {
        height: 44,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgLeft: {
        height: 23,
        width: 23
    },
    imgRight: {
        height: 20,
        width: 20
    },
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: Metrics.statusBarHeight,

    },
    selected: {
        borderRadius: 2,
        borderWidth: 1,
        paddingRight: 5,
        paddingLeft: 5,
        height: 24,
        justifyContent: 'center',
        marginLeft: 18
    },
    txtTitle: {
        fontSize: 14,
        color: Colors._F34
    },
    race: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 10,
        padding: 17
    },
    txtName: {
        fontSize: 14,
        color: Colors._333,
        fontWeight: 'bold',
        marginBottom: 10
    },
    txtTime: {
        fontSize: 12,
        color: Colors._888,
        marginTop: 5
    }


});

export default class ReportPage extends PureComponent {

    state = {
        race_reports: {
            title: 'NCBP国家杯棋牌职业大师赛棋牌职业大师赛',
            time: '2017.09.11—2017.09.12',
            location: '地点：北京香格里拉酒店',

        }
    };


    render() {

        return <View style={ApplicationStyles.bgContainer}>
            <View
                style={styles.nav}>
                <StatusBar barStyle={"dark-content"}/>
                {this.renderBtn(true, Images.mall_return, styles.imgLeft)}
                <View style={{
                    flex: 1, alignItems: 'center', height: 44, justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    {this.reportBtn(true, '及时赛报')}
                    {this.reportBtn(false, '牌手赛报')}
                </View>
                {this.renderBtn(false)}
            </View>

            {this.renderFlatList()}


        </View>
    }


    headerRace = () => {
        const {title, time, location} = this.state.race_reports;

        return <View style={styles.race}>
            <Text style={styles.txtName}>{title}</Text>
            <Text style={styles.txtTime}>{time}</Text>
            <Text style={styles.txtTime}>{location}</Text>
        </View>
    };

    renderFlatList = () => {
        return <UltimateFlatList
            header={()=>this.headerRace()}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `crowd${index}`}
            item={this.renderItem}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
        />

    };

    onFetch = (page = 1, startFetch, abortFetch) => {

    };

    renderItem = (item, index) => {

    };


    renderBtn = (isLeft, image, imgStyle) => {
        return <TouchableOpacity
            onPress={() => {
                isLeft && global.router.pop()
            }}
            style={styles.btnLeft}>
            <Image style={imgStyle} source={image}/>
        </TouchableOpacity>
    };

    reportBtn = (select, title) => {
        return <View style={[styles.selected, {borderColor: select ? Colors._F34 : Colors.txt_444}]}>
            <Text style={[styles.txtTitle, {color: select ? Colors._F34 : Colors.txt_444}]}>{title}</Text>
        </View>
    }


}