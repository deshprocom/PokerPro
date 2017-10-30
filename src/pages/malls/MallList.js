import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList'


export default class MallList extends PureComponent {

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
            keyExtractor={(item, index) => `${index}`}  //this is required when you are using FlatList
            item={this.renderItem}  //this takes two params (item, index)
            numColumns={2}
        />


    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch([1, 2, 3, 4, 5, 6], 8)
    };

    renderItem = (item, index, separator) => {
        return <TouchableOpacity style={[styles.listItem, index % 2 === 0 ? {} : {marginLeft: 8}]}
                onPress={()=>{
                    router.toMallInfoPage()
                }}>
            <Image style={styles.imgThem}
                   source={{uri: 'https://www.deshpro.com/pokerpro.png'}}/>

            <Text style={styles.txtName}>塑料扑克牌创意透明水晶防水可水洗</Text>
            <View style={{flex: 1}}/>
            <View style={styles.viewPrice}>

                <Text>280.8</Text>
                <View style={{flex: 1}}/>
                <Text style={styles.txtNum}>剩余1件</Text>

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