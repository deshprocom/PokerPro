import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, StatusBar
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {Badge} from '../../components';
import propTypes from 'prop-types';

export default class DynamicTopBar extends PureComponent {


    render() {
        const {unreadCount, setUnreadCount, nickname, hideReceived} = this.props;
        let counts = unreadCount;
        return (<View style={styles.navBar}>
            <StatusBar barStyle={"dark-content"}/>
            <View style={styles.navContent}>
                <TouchableOpacity
                    testID="btn_bar_left"
                    style={styles.popBtn}
                    onPress={() => router.pop()}>
                    <Image style={styles.backImg}
                           source={Images.mall_return}/>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <Text style={{color: Colors._161, fontWeight: 'bold', fontSize: 17}}
                >{hideReceived ? I18n.t('person_dynamic') : nickname + '的动态'}</Text>
                <View style={{flex: 1}}/>
                {this.props.hideReceived ? <TouchableOpacity
                    onPress={() => {
                        global.router.toReceivedReply();
                        setUnreadCount && setUnreadCount(0);
                    }}
                    style={styles.btnCat}>
                    <Image style={styles.imgCat}
                           source={Images.commentWhite}/>
                    {this._carts(unreadCount)}

                </TouchableOpacity> : <View style={styles.btnCat}/>}

            </View>

        </View>)

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