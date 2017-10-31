import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import propTypes from 'prop-types';
import {catProducts} from '../../services/MallDao';


export default class MallList extends Component {

    static propTypes = {
        category: propTypes.object.isRequired
    };

    render() {
        return (<View style={{flex: 1}}>

            {this.renderSort()}

            {this.renderFlatList()}
        </View>)

    }

    renderFlatList = () => {
        return <UltimateFlatList
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `mallList${index}`}  //this is required when you are using FlatList
            item={this.renderItem}  //this takes two params (item, index)
            numColumns={2}
        />


    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            if (page === 1) {
                this.refresh(startFetch, abortFetch)
            } else {
                this.loadmore(page, startFetch, abortFetch);
            }
        } catch (err) {
            abortFetch();
        }
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
        const {title, price, all_stock} = item;
        return <TouchableOpacity style={[styles.listItem, index % 2 === 0 ? {} : {marginLeft: 8}]}
                                 onPress={() => {
                                     router.toMallInfoPage()
                                 }}>
            <Image style={styles.imgThem}
                   source={{uri: 'https://www.deshpro.com/pokerpro.png'}}/>

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
        width: 184,
        backgroundColor: 'white',
        marginTop: 8
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