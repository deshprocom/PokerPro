/**
 * Created by lorne on 2017/7/25.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class PokerView extends Component {
    render() {
        return (<Image
            source={Images.rank_bg}
            style={styles.page}>
            {this._topView()}

            <Image
                source={Images.home_avatar}
                style={styles.avatar}/>

            <View style={styles.viewName}>
                <Text style={styles.name}>阿拉斯加卡德罗夫</Text>
                <Text style={styles.location}>中国</Text>
            </View>

            <View style={styles.btnFocus}>
                <Text style={styles.focus}>{I18n.t('rank_focus')}</Text>
            </View>


            <View style={styles.tabView}>
                <View style={styles.tab}>
                    <Text style={styles.tabValue}>NO.1</Text>
                    <View style={styles.tabNameView}>
                        <Text style={styles.tabName}>{I18n.t('rank_no')}</Text>
                    </View>

                </View>
                <View style={styles.tab}>
                    <Text style={styles.tabValue}>NO.1</Text>
                    <View style={styles.tabNameView}>
                        <Text style={styles.tabName}>{I18n.t('rank_number')}</Text>
                    </View>

                </View>
                <View style={styles.tab}>
                    <Text style={styles.tabValue}>NO.1</Text>
                    <View style={styles.tabNameView}>
                        <Text style={styles.tabName}>{I18n.t('rank_prize')}</Text>
                    </View>

                </View>

            </View>

        </Image>)
    }

    _topView = () => {
        return (<View style={styles.topBar}>

            <TouchableOpacity
                testID="btn_bar_left"
                onPress={() => router.pop()}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_return}
                    style={styles.topImgLeft}/>

            </TouchableOpacity>

            <TouchableOpacity
                testID="btn_bar_close"
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_close}
                    style={styles.imgClose}/>
            </TouchableOpacity>

            <View style={{flex: 1}}/>
            <Text
                numberOfLines={1}
                style={styles.title}>阿斯顿发</Text>
            <View style={{flex: 1}}/>

            <View style={styles.right}>
                <TouchableOpacity
                    testID="btn_bar_close"
                    style={styles.topBtn}
                    activeOpacity={1}>
                    <Image
                        source={Images.match_share}
                        style={styles.imgShare}/>
                </TouchableOpacity>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    page: {
        height: 267,
        width: Metrics.screenWidth
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 3,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight
    },
    topImgLeft: {
        height: 19,
        width: 11,
        marginLeft: 20,
        marginRight: 10
    },
    topBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgClose: {
        height: 18,
        width: 18,
        marginLeft: 15,
        marginRight: 15
    },
    title: {
        fontSize: 18,
        color: Colors._F4E,
        backgroundColor: 'transparent',
    },
    right: {
        width: 90,
        flexDirection: 'row-reverse'
    },
    imgShare: {
        height: 23,
        width: 18,
        marginRight: 20,
        marginLeft: 10
    },
    avatar: {
        height: 74,
        width: 74,
        position: 'absolute',
        left: 20,
        top: 84,
        borderRadius: 37
    },
    name: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    location: {
        fontSize: 14,
        color: Colors._AAA,
        marginTop: 8,
        fontWeight: 'bold'
    },
    viewName: {
        marginTop: 105,
        marginLeft: 105,
        backgroundColor: 'transparent'
    },
    btnFocus: {
        height: 32,
        width: 64,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 111,
        right: 28
    },
    focus: {
        color: 'white',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabValue: {
        color: Colors._CCC,
        fontSize: 17,
        fontWeight: 'bold'
    },
    tabName: {
        fontSize: 12,
        color: Colors._888,
        fontWeight: 'bold'
    },
    tabNameView: {
        height: 20,
        width: 50,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        marginTop: 12
    },
    tabView: {
        height: 80,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 40
    }


});