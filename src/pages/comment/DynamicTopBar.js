import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, StatusBar
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {Badge} from '../../components';


export default class DynamicTopBar extends PureComponent {

    render() {
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
                <Text style={{color: Colors._161, fontWeight: 'bold', fontSize: 17}}>{I18n.t('person_dynamic')}</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        global.router.toReceivedReply();
                    }}
                    style={styles.btnCat}>
                    <Image style={styles.imgCat}
                           source={Images.commentWhite}/>
                    {this._carts()}

                </TouchableOpacity>
            </View>

        </View>)

    }

    _carts = () => {
        const {count} = this.props;
        if (count && count > 0) {
            return <View style={styles.badge}/>
        }
    }
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
        alignItems: 'center'
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
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
        top: 6,
        right: '32%'
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