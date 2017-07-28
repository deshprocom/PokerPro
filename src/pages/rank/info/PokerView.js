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
import {playerInfo} from '../../../services/AccountDao';
import {postFocus, deleteFocus} from '../../../services/RankDao';

export default class PokerView extends Component {

    state = {
        poker: {},
        followed: false
    };

    componentDidMount() {
        const {playerId} = this.props;
        const body = {
            player_id: playerId
        };
        playerInfo(body, data => {
            this.setState({
                poker: data,
                followed: data.followed
            })
        }, err => {

        })
    }


    _btnFocus = () => {
        const {playerId} = this.props;
        const {followed} = this.state;
        const body = {
            player_id: playerId
        };

        if (followed) {
            deleteFocus(body, data => {
                this.setState({
                    followed: !followed
                })
            }, err => {
            })
        } else
            postFocus(body, data => {
                this.setState({
                    followed: !followed
                })
            }, err => {
            })

    };


    render() {
        const {name, country, avatar, dpi_total_earning, dpi_total_score, ranking} = this.state.poker;
        return (<Image
            source={Images.rank_bg}
            style={styles.page}>
            {this._topView()}

            <Image
                defaultSource={Images.home_avatar}
                source={{uri: avatar}}
                style={styles.avatar}/>

            <View style={styles.viewName}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{country}</Text>
            </View>

            <TouchableOpacity
                activeOpacity={1}
                onPress={this._btnFocus}
                style={styles.btnFocus}>
                <Text style={styles.focus}>{this.state.followed ? I18n.t('rank_focused') : I18n.t('rank_focus')}</Text>
            </TouchableOpacity>


            <View style={styles.tabView}>
                <View style={styles.tab}>
                    <Text style={styles.tabValue}>NO.{ranking}</Text>
                    <View style={styles.tabNameView}>
                        <Text style={styles.tabName}>{I18n.t('rank_no')}</Text>
                    </View>

                </View>
                <View style={styles.tab}>
                    <Text style={styles.tabValue}>{dpi_total_score}</Text>
                    <View style={styles.tabNameView}>
                        <Text style={styles.tabName}>{I18n.t('rank_number')}</Text>
                    </View>

                </View>
                <View style={styles.tab}>
                    <Text style={styles.tabValue}>{dpi_total_earning}</Text>
                    <View style={styles.tabNameView}>
                        <Text style={styles.tabName}>{I18n.t('rank_prize')}</Text>
                    </View>

                </View>

            </View>

        </Image>)
    }

    _topView = () => {
        const {name} = this.state.poker;
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
                onPress={
                    () => {
                        router.popToDrawerRank();
                    }
                }
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
                style={styles.title}>{name}</Text>
            <View style={{flex: 1}}/>

            <View style={styles.right}>
                <TouchableOpacity
                    testID="btn_bar_close"
                    style={styles.topBtn}
                    activeOpacity={1}>
                    <Image
                        source={Images.share}
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
        height: 22,
        width: 23,
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
        backgroundColor: 'transparent',
        margin: 5
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
        fontWeight: 'bold',
        margin: 5
    },
    tabNameView: {
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 12
    },
    tabView: {
        height: 80,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: 40
    }


});