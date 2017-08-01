/**
 * Created by lorne on 2017/8/1.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class SearchPoker extends Component {

    _navSearchBar = () => {
        return (<View style={styles.navBar}>
            <View style={styles.topBar}>

                <View
                    style={styles.searchView}>

                    <View style={styles.searchBar}>
                        <Image style={styles.searchImg}
                               source={Images.news_outline}/>
                        <TextInput
                            autoFocus={true}
                            testID="input_news_search"
                            placeholderTextColor={Colors.txt_666}
                            placeholder={I18n.t('news_outline')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            underlineColorAndroid="transparent"
                            style={this._searchInput()}
                            onChangeText={text => {
                                this.keyword = text;
                                if (this.listView)
                                    this.listView.refresh();
                            }}

                        />

                    </View>

                    <TouchableOpacity
                        testID="btn_bar_right"
                        style={styles.popBtn}
                        onPress={() => router.pop()}>
                        <Text style={styles.barTxt}>{I18n.t('cancel')}</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>)
    };
    _searchInput = () => {
        if (Platform.OS === 'ios')
            return styles.searchTextInput;
        else
            return styles.androidInput;
    };

    render() {

        return (<View style={ApplicationStyles.bgContainer}>
            {this._navSearchBar()}

        </View>)
    }
}


const styles = StyleSheet.create({
    topBar: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight,

    },
    popBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backImg: {
        width: 11,
        height: 20
    },
    searchView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    searchBar: {
        backgroundColor: '#212325',
        height: 28,
        width: 270,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3
    },
    navBar: {
        backgroundColor: Colors._161817
    },
    searchImg: {
        height: 16,
        width: 16,
        marginLeft: 20,
        marginRight: 10
    },
    searchTextInput: {
        color: Colors.white,
        fontSize: 12,
        height: 28,
        width: 230,
    },
    androidInput: {
        color: Colors.white,
        fontSize: 12,
        height: 40,
        width: 230,
    },
    barTxt: {
        fontSize: 15,
        color: '#E4D57F'
    },

});