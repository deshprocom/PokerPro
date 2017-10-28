import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, TextInput
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';


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
        marginLeft: 47,
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
        color: Colors._161,
        fontSize: 12,
        height: 30,
        width: 210
    },
    btnCat: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgCat: {
        height: 20,
        width: 22
    },
    tabSearch: {
        borderRadius: 14,
        height: 28,
        paddingLeft: 17,
        paddingRight: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1E1E2',
        marginBottom: 16,
        marginRight: 12
    },
    txtTab: {
        fontSize: 14,
        color: Colors.txt_444
    },
    resent: {
        height: 45,
        alignItems: 'center',
        flexDirection: 'row'
    },
    txtRecent: {
        fontSize: 14,
        color: Colors._333,
        marginLeft: 19
    },
    imgDel: {
        height: 20,
        width: 22
    },
    btnDel: {
        height: 45,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default class SearchMallPage extends PureComponent {


    render() {
        return (
            <View>
                {this.TopBar()}
                {this.resentBlank()}
                {this.tabBlank()}

            </View>
        );
    }

    TopBar = () => {

        return (<View style={styles.navBar}>

            <View style={styles.navContent}>

                <View
                    style={styles.search}>
                    <Image
                        style={styles.searchImg}
                        source={Images.search_gray}/>


                    <TextInput
                        ref={ref => this.input = ref}
                        style={styles.txtSearch}
                        underlineColorAndroid='transparent'
                        returnKeyLabel={I18n.t('certain')}
                        clearButtonMode='always'
                        placeholderColor={Colors._AAA}
                        onSubmitEditing={this.submitSearch}
                        placeholder={I18n.t('mall_search')}/>

                </View>
                <TouchableOpacity
                    onPress={() => {
                        global.router.pop()
                    }}
                    style={styles.btnCat}>
                    <Text>{I18n.t('cancel')}</Text>

                </TouchableOpacity>
            </View>

        </View>)


    };

    submitSearch = () => {

    };

    resentBlank = () => {
        return <View style={styles.resent}>
            <Text style={styles.txtRecent}>{I18n.t('mall_resent')}</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.btnDel}>
                <Image style={styles.imgDel}
                       source={Images.mall_del}/>

            </TouchableOpacity>

        </View>
    };

    tabBlank = () => {
        let tabs = ['扑克', '澳门景点门票', '澳门景点门票 澳门酒店三天三夜'];
        return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 19}}>
            {tabs.map(function (item, index) {
                return <View key={`tab${index}`} style={styles.tabSearch}>
                    <Text style={styles.txtTab}>{item}</Text>

                </View>
            })}

        </View>
    }


}


