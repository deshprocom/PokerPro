import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import propTypes from 'prop-types';
import {catProducts, searchProducts} from '../../services/MallDao';
import {isEmptyObject} from '../../utils/ComonHelper';
import SearchEmpty from './SearchEmpty';

export default class MallList extends Component {

    static propTypes = {
        category: propTypes.object,
        isSearch: propTypes.bool
    };

    componentWillMount() {
        this.searchKey = '';
    }

    render() {
        return (<View style={{flex: 1}}>

            {/*{this.renderSort()}*/}

            {this.renderFlatList()}
        </View>)

    }

    renderFlatList = () => {
        return <UltimateFlatList
            firstLoader={!this.props.isSearch}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `mallList${index}`}  //this is required when you are using FlatList
            item={this.renderItem}  //this takes two params (item, index)
            numColumns={2}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
            emptyView={()=><SearchEmpty/>}
        />


    };

    search = (keywords) => {
        this.searchKey = keywords;
        this.listView.refresh()
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            if (page === 1) {
                if (this.props.isSearch)
                    this.searchRefresh(startFetch, abortFetch);
                else
                    this.refresh(startFetch, abortFetch)
            } else {
                if (this.props.isSearch)
                    this.searchLoad(page, startFetch, abortFetch);
                else
                    this.loadmore(page, startFetch, abortFetch);
            }
        } catch (err) {
            abortFetch();
        }
    };


    searchRefresh = (startFetch, abortFetch) => {
        searchProducts({
            page: 1,
            page_size: 20,
            keyword: this.searchKey
        }, data => {
            startFetch(data.products, 6)
        }, err => {
            abortFetch()
        })

    };


    searchLoad = (page, startFetch, abortFetch) => {
        searchProducts({
            page: page,
            page_size: 20,
            keyword: this.searchKey
        }, data => {
            startFetch(data.products, 6)
        }, err => {
            abortFetch()
        })
    };

    refresh = (startFetch, abortFetch) => {
        const {id} = this.props.category;
        catProducts({id}, data => {
            startFetch(data.products, 6)
        }, err => {
            abortFetch()
        }, {
            page: 1,
            page_size: 20
        })
    };

    loadmore = (page, startFetch, abortFetch) => {
        const {id} = this.props.category;
        catProducts({id}, data => {
            startFetch(data.products, 6)
        }, err => {
            abortFetch()
        }, {
            page: page,
            page_size: 20
        })
    };

    renderItem = (item, index, separator) => {
        const {title, price, all_stock, icon} = item;
        return <TouchableOpacity style={[styles.listItem, index % 2 === 0 ? {} : {marginLeft: 8}]}
                                 onPress={() => {
                                     global.router.toMallInfoPage(item)
                                 }}>
            <Image
                resizeMode={'contain'}
                style={styles.imgThem}
                source={{uri: icon}}/>

            <Text style={styles.txtName}>{title}</Text>
            <View style={{flex: 1}}/>
            <View style={styles.viewPrice}>

                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={{fontSize: 14, color: Colors._DF1}}>¥</Text>
                    <Text style={{fontSize: 18, color: Colors._DF1}}>{price}</Text>
                </View>

                <View style={{flex: 1}}/>
                {all_stock > 0 ?
                    <Text style={styles.txtNum}>{I18n.t('surplus') + all_stock + I18n.t('pieces')}</Text> : null}


            </View>

        </TouchableOpacity>
    };

    renderSort = () => {
        return <View style={styles.sort}>
            <View style={styles.rowAlign}>
                <Text style={styles.txtSort}>热门</Text>

                <Image style={styles.imgSort}
                       source={Images.sort}/>
            </View>
            <View style={styles.rowAlign}>
                <Text style={styles.txtSort}>销量</Text>
                <Image style={styles.imgSort}
                       source={Images.sort}/>
            </View>
            <View style={styles.rowAlign}>
                <Text style={styles.txtSort}>最新</Text>
                <Image style={styles.imgSort}
                       source={Images.sort}/>
            </View>

            <View style={styles.rowAlign}>
                <Text style={styles.txtSort}>价格</Text>
                <Image style={styles.imgSort}
                       source={Images.sort}/>
            </View>

        </View>
    }
}

const styles = StyleSheet.create({
    sort: {
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    listItem: {
        height: 264,
        width: '49%',
        backgroundColor: 'white',
        marginTop: 5
    },
    imgThem: {
        height: 178,
        width: '100%'
    },
    txtName: {
        fontSize: 14,
        color: Colors.txt_444,
        marginTop: 7,
        marginLeft: 15
    },
    rowAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    txtSort: {
        color: Colors._AAA,
        fontSize: 15,
        marginRight: 7
    },
    imgSort: {
        height: 12,
        width: 12
    },
    viewPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 8
    },
    txtNum: {
        fontSize: 12,
        color: Colors._AAA,
        marginRight: 15
    }
});