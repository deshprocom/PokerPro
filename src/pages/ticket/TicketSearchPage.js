/**
 * Created by lorne on 2017/5/31.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, strNotNull, convertDate, ticketStatusConvert} from '../../utils/ComonHelper';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {getRaceTickets} from '../../services/RacesDao';
import {UltimateListView} from '../../components'
import {itemListView} from './TicketRow';

export default class TicketSearchPage extends Component {

    constructor(props) {
        super(props);
        this.keyword = '';
        this.state = {
            layout: 'list',
            items: [],
            last_id: 0,
            loadErr: true
        };
    }


    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            {this._navSearchBar()}
            <UltimateListView
                ref={(ref) => this.listView = ref}
                key={this.state.layout}
                keyExtractor={(item, index) => `${this.state.layout} - ${item.race_id}`}
                onFetch={this.onFetch}
                legacyImplementation
                rowView={itemListView}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={()=>{
                    return <NoDataView/>;
                }}
            />
        </View>)
    }


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            let {last_id} = this.state;
            if (strNotNull(this.keyword)) {

                if (page === 1) {
                    let body = {
                        keyword: this.keyword
                    };
                    this.fetch(body, startFetch, abortFetch)
                } else {
                    let body = {
                        keyword: this.keyword,
                        seq_id: last_id
                    };
                    this.fetch(body, startFetch, abortFetch)
                }
            } else {
                startFetch([], 5)
            }

        } catch (err) {
            abortFetch();
        }
    };


    fetch = (body, startFetch, abortFetch) => {

        getRaceTickets(body, (data) => {

            let {items, last_id} = data;

            if (last_id !== 0) {
                this.setState({
                    items: items,
                    last_id: last_id
                });
                startFetch(this.state.items, 5);
            } else {
                startFetch([], 5)
            }

        }, (err) => {
            abortFetch();
            this.setState({
                loadErr: true
            })
        })
    };

    _navSearchBar = () => {
        return (<View style={styles.navBar}>
            <View style={styles.topBar}>
                <View
                    testID="btn_bar_left"
                    style={styles.popBtn}
                    onPress={()=>router.pop()}>

                </View>

                <View
                    style={styles.searchView}>

                    <View style={styles.searchBar}>
                        <Image style={styles.searchImg}
                               source={Images.news_outline}/>
                        <TextInput
                            testID="input_news_search"
                            placeholderTextColor={Colors.txt_666}
                            placeholder={I18n.t('news_outline')}
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            underlineColorAndroid="transparent"
                            style={this._searchInput()}
                            onChangeText={text=>{
                                this.keyword = text;
                                 if(this.listView)
                                     this.listView.refresh();
                            }}

                        />

                    </View>

                </View>

                <TouchableOpacity
                    testID="btn_bar_right"
                    style={styles.popBtn}
                    onPress={()=>router.pop()}>
                    <Text style={styles.barTxt}>{I18n.t('cancel')}</Text>
                </TouchableOpacity>

            </View>
        </View>)
    };

    _searchInput = () => {
        if (Platform.OS === 'ios')
            return styles.searchTextInput;
        else
            return styles.androidInput;
    }

}


const styles = StyleSheet.create({
    topBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Metrics.statusBarHeight,

    },
    popBtn: {
        height: 40,
        width: 50,
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
        alignItems: 'center'
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
        marginLeft: 10,
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

