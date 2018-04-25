import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, StatusBar, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {Badge} from '../../components';
import propTypes from 'prop-types';

export default class DynamicTopBar extends PureComponent {


    render() {
        const {
            unreadCount, setUnreadCount, nickname,
            hideReceived, goToPage, tabs, activeTab,
            scrollTop
        } = this.props;

        let tabs_views = tabs.map((item, index) => <TouchableOpacity
            key={'bar' + index}
            onPress={() => {
                goToPage(index)
            }}
            style={{
                height: hideReceived ? Metrics.navBarHeight - Metrics.statusBarHeight : 40,
                alignItems: 'center', justifyContent: 'center',
                width: 80,
            }}>
            <Text style={[{fontSize: 15},
                activeTab === index ?
                    {color: hideReceived ? '#F24A4A' : Colors.txt_444, fontWeight: 'bold'}
                    : {color: hideReceived ? '#333333' : Colors._AAA}]}>{item}</Text>
            {activeTab === index ? <View style={{
                height: 2, width: 48, backgroundColor: hideReceived ? '#F24A4A' : Colors.txt_444,
                position: 'absolute', bottom: 0
            }}/> : null}

        </TouchableOpacity>);
        if (hideReceived) {
            return (<View style={styles.navBar}>
                <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
                <View style={styles.navContent}>
                    <TouchableOpacity
                        testID="btn_bar_left"
                        style={styles.popBtn}
                        onPress={() => router.pop()}>
                        <Image style={styles.backImg}
                               source={Images.mall_return}/>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>

                    {/*<Text style={{color: Colors._161, fontWeight: 'bold', fontSize: 17}}*/}
                    {/*>{hideReceived ? I18n.t('person_dynamic') : nickname + '的动态'}</Text>*/}
                    {tabs_views}

                    <View style={{flex: 1}}/>
                    {this.props.hideReceived ? <TouchableOpacity
                        onPress={() => {
                            setUnreadCount && setUnreadCount(0);
                            global.router.toReceivedReply();

                        }}
                        style={styles.btnCat}>
                        <Image style={styles.imgCat}
                               source={Images.commentWhite}/>
                        {this._carts(unreadCount)}

                    </TouchableOpacity> : <View style={styles.btnCat}/>}

                </View>

            </View>)
        } else {
            return <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    scrollTop && scrollTop()
                }}
                style={{
                    height: 40, width: '100%',
                    justifyContent: 'center', flexDirection: 'row',
                    backgroundColor: 'white'
                }}>
                {tabs_views}

            </TouchableOpacity>
        }


    }

    _carts = (unreadCount) => {

        if (unreadCount && unreadCount > 0)
            return <View
                style={styles.badge}>
                <Text style={{fontSize: 10, color: Colors.white}}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
            </View>
    };
}

const styles = StyleSheet.create({
    navBar: {
        height: Metrics.navBarHeight,
        width: '100%',
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: 'white'
    },
    navContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
    },
    search: {
        height: 28,
        width: 270,
        backgroundColor: Colors._ECE,
        borderRadius: 3,
        marginLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchImg: {
        height: 17,
        width: 17,
        marginLeft: 15,
        marginRight: 9
    },
    txtSearch: {
        color: Colors._AAA,
        fontSize: 12
    },
    btnCat: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        width: 50
    },
    imgCat: {
        height: 20,
        width: 22
    },
    badge: {
        position: 'absolute',
        top: -2,
        left: 22,
        height: 22,
        width: 22,
        borderRadius: 11,
        backgroundColor: '#F34A4A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 23,
        height: 23,
        marginLeft: 15
    },

});