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
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import Carousel from './Carousel';
import UltimateFlatList from '../../../components/ultimate/UltimateFlatList';
import CrowItem from './CrowItem';
import I18n from 'react-native-i18n';
import {crowd_list} from '../../../services/CrowdDao';
import {NavigationBar} from '../../../components';

export default class Crowdfunding extends PureComponent {


    render() {
        return <View>
            <NavigationBar
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => global.router.pop()}
                toolbarStyle={{backgroundColor: Colors._161}}
                title={I18n.t('crowdfunding')}
                titleStyle={{color: Colors._FFE}}
            />
            <UltimateFlatList
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

                    return <View style={{flex: 1, backgroundColor: '#ECECEE'}}>
                        <Image style={{height: 201, width: '100%'}} source={Images.APPbanner}/>

                        <View style={{marginTop: 85, alignItems: 'center'}}>
                            <Image style={{height: 80, width: 62}} source={Images.none}/>
                            <Text style={{fontSize: 18, color: '#BBBBBB', marginTop: 15}}>暂无众筹相关赛事</Text>
                        </View>

                    </View>
                }}

            />
        </View>
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

