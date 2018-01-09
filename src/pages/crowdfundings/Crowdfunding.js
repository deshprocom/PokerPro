/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:众筹主页
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Carousel from './Carousel';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import CrowItem from './CrowItem';
import I18n from 'react-native-i18n';

export default class Crowdfunding extends PureComponent {

    state = {
        crowdList: [
            {
                status: 'coming',
                endDate: '1515403644',
                image: 'https://cdn-upyun.deshpro.com/uploads/info/image/555/preview_P1044378.JPG',
                race: {
                    name: 'NCBP国家杯棋牌职业大师赛棋牌职业大师赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 101,
                crowd_sale: 32
            },
            {
                status: 'coming',
                endDate: '1515727644',
                image: 'https://cdn-upyun.deshpro.com/uploads/info/image/555/preview_P1044378.JPG',
                race: {
                    name: '中国创投扑克联赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 200,
                crowd_sale: 32
            },
            {
                status: 'coming',
                endDate: '1515554844',
                image: 'https://cdn-upyun.deshpro.com/uploads/info/image/555/preview_P1044378.JPG',
                race: {
                    name: '中国创投扑克联赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 200,
                crowd_sale: 32
            },
            {
                status: 'coming',
                endDate: '1515900444',
                image: 'https://cdn-upyun.deshpro.com/uploads/info/image/555/preview_P1044378.JPG',
                race: {
                    name: '中国创投扑克联赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 100,
                crowd_sale: 32
            }
        ]
    }

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            {this.renderFlatList()}
        </View>
    }

    renderFlatList = () => {
        return <UltimateFlatList
            header={() => <Carousel/>}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `crowd${index}`}  //this is required when you are using FlatList
            item={this.renderItem}  //this takes two params (item, index)
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            separator={() => <View style={{height: 10, backgroundColor: Colors._ECE}}>

            </View>}
            waitingSpinnerText={I18n.t('loading')}
        />

    };


    renderItem = (item, index) => {
        return <CrowItem
            item={item}/>
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch(this.state.crowdList, 9)

    }
}

