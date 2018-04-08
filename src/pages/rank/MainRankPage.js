import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import I18n from 'react-native-i18n';

import {Colors, Images, Metrics} from '../../Themes'
import {NavigationBar} from '../../components';
import RankList from './RankList';
import {isLoginUser} from '../../utils/ComonHelper';

export default class MainRankPage extends Component {

    isLogin = () => {
        if (isLoginUser()) {
            router.toFocusPlayer()
        } else {
            router.toLoginFirstPage()
        }
    };

    filter = (param) => {
        this.rankList.filterRank(param)
    };

    refresh = () => {
        this.rankList.update()
    };


    topHeader = () => {
        return (<View style={styles.header_bar}>
            <TouchableOpacity onPress={() => router.pop()}
                  style={styles.topBtn}>
                <Image style={styles.backImg}
                       source={Images.sign_return}/>
            </TouchableOpacity>

            <View style={styles.topBtn}></View>

            <View style={styles.header_title}>
                <Text style={styles.title_color}>{I18n.t('main_rank')}</Text>
            </View>

            <View style={styles.right_btn}>
                <TouchableOpacity onPress={() => this.props.openRank()}
                                  style={styles.topBtn}>
                    <Image source={Images.race_type}
                           style={styles.right_image1}/>
                </TouchableOpacity>
                {/*<TouchableOpacity onPress={() => {*/}
                    {/*this.isLogin()*/}
                {/*}}*/}
                                  {/*style={styles.topBtn}>*/}
                    {/*<Image source={Images.shape}*/}
                           {/*style={styles.right_image2}/>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </View>)
    };

    searchBar = () => {
        return (<TouchableOpacity
            onPress={() => {
                router.toSearchPoker()
            }}
            activeOpacity={1}
            style={styles.viewSearch}>
            <View style={styles.search}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={Images.poker_search}
                        style={styles.imgSearch}/>
                    <Text style={styles.txtSearch}>{I18n.t('poker_search')}</Text>
                </View>

            </View>

        </TouchableOpacity>)
    };

    render() {
        return (<View>
            {this.topHeader()}
            {this.searchBar()}
            <RankList
                ref={ref => {
                    this.rankList = ref
                }}/>
        </View>)
    };

}

const styles = StyleSheet.create({
    header_bar: {
        width: Metrics.screenWidth,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.bg_09,
        paddingTop: Metrics.statusBarHeight
    },
    topBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    back_image: {
        height: 19,
        width: 11
    },
    header_title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_color: {
        color: Colors._F4E,
        fontSize: 18
    },
    right_btn: {
        flexDirection: 'row',
        height: 44,
        marginRight: 10
    },
    right_image1: {
        width: 20,
        height: 20
    },
    right_image2: {
        width: 22,
        height: 21
    },
    viewSearch: {
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    search: {
        backgroundColor: Colors._ECE,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 330
    },
    imgSearch: {
        height: 17,
        width: 17,
    },
    txtSearch: {
        fontSize: 14,
        color: Colors._AAA,
        marginLeft: 10
    },
    backImg: {
        width: 11,
        height: 20,
        marginLeft: 15
    },

});