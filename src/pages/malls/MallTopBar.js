import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {Badge} from '../../components';


export default class MallTopBar extends PureComponent {

    render() {
        return (<View style={styles.navBar}>

            <View style={styles.navContent}>
                <TouchableOpacity
                    onPress={() => {
                        global.router.toSearchMallPage()
                    }}
                    style={styles.search}>
                    <Image style={styles.searchImg}
                           source={Images.search_gray}/>
                    <Text style={styles.txtSearch}>{I18n.t('mall_search')}</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        router.toShippingCart()
                    }}
                    style={styles.btnCat}>
                    <Image style={styles.imgCat}
                           source={Images.shopping_cart}/>
                    {this._carts()}

                </TouchableOpacity>
            </View>

        </View>)

    }

    _carts = () => {
        const {cartNum} = this.props;
        if (cartNum > 0) {
            return <Badge style={styles.badge}>{cartNum}</Badge>
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
        marginLeft: 20,
        marginRight: 9
    },
    txtSearch: {
        color: Colors._AAA,
        fontSize: 12
    },
    btnCat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44
    },
    imgCat: {
        height: 20,
        width: 22
    },
    badge: {
        position: 'absolute',
        top: 5,
        right:'20%'
    }

});