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
import {crowd_list} from '../../services/CrowdDao';
import Swiper from 'react-native-swiper';

export default class Crowdfunding extends PureComponent {


    render() {
        return <UltimateFlatList
            header={() => <Carousel/>}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            item={this.renderItem}
            arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
            keyExtractor={(item, index) => `crowd${index}`}  //this is required when you are using FlatList
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
            separator={() => <View style={{height: 10, backgroundColor: Colors._ECE}}>
            </View>}
            emptyView={() => {
                var banners = [{image:Images.APPbanner}];
                return <View style={{flex: 1, backgroundColor:'#ECECEE'}}>
                    <View style={{height: 201, marginBottom: 10,marginTop:0,backgroundColor:'transparent'}}>
                        <Swiper
                            activeDotStyle={styles.activeDot}
                            dotStyle={styles.dot}
                            autoplayTimeout={2}
                            autoplay>
                            {banners.map((item,key)=>{
                                return    <TouchableOpacity
                                    key={key}
                                    activeOpacity={1}
                                >
                                    <Image style={{height: 201, width: '100%'}} source={item.image}/>
                                </TouchableOpacity>
                            })}
                        </Swiper>
                    </View>

                    <View style={{marginTop:85,alignItems:'center'}}>
                        <Image style={{height: 80, width: 62}} source={Images.none}/>
                        <Text style={{fontSize:18,color:'#BBBBBB',marginTop:15}}>暂无众筹相关赛事</Text>
                    </View>

                </View>
            }}

        />
    }


    renderItem = (item, index) => {
        return <CrowItem
            item={item}/>
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        crowd_list({page, page_size: 20}, data => {
            startFetch(data, 2)
        }, err => {
            abortFetch()
        })

    }
}
const styles = StyleSheet.create({
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginBottom: 0
    }

});

