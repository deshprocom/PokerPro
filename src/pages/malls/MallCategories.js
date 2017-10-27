import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image, FlatList,
    TouchableOpacity, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';

export default class MallCategories extends PureComponent {
    componentDidMount() {
        this.selectedId = -1;
    }

    selectItem = (id) => {
        this.selectedId = id;

        this.setState({
            selectedIndex: id
        })
    }
    _renderItem = ({item}) => {
        console.log(this)
        console.log("index:", item.id);
        console.log("selectedId:", this.selectedId);
        return (
            <TouchableOpacity id={item.id}
                              style={this.selectedId === item.id ? styles.categoriesOneSlected : styles.categoriesOne}
                              onPress={() => this.selectItem(item.id)}>
                <Text style={styles.categoriesOneText}>{'热门'} (23)</Text>
            </TouchableOpacity>
        )
    };
    _renderItemTwo = () => {
        return (
            <View style={styles.categoriesTwos}>
                <TouchableOpacity style={styles.categoriesTwo}>
                    <Image
                        style={styles.imgCate}
                        source={Images.coming}/>
                </TouchableOpacity>
                <Text style={styles.categoriesTwoText}>景点门票 （2）</Text>
            </View>

        )
    };

    render() {
        var data1 = [1, 2, 3, 4];
        var data2 = [1, 2, 3, 4];
        return <Animatable.View animation={'bounceIn'}
                                style={styles.page}>
            <View style={styles.content}>
                <View style={styles.categories}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                        data={data1}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `typeList${index}`}
                    />

                </View>
                <View style={styles.itemTwo}>
                    <FlatList
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        data={data2}
                        renderItem={this._renderItemTwo}
                        keyExtractor={(item, index) => `contentList${index}`}
                    />
                </View>

            </View>


        </Animatable.View>
    }
}

const styles = StyleSheet.create({
    page: {
        position: 'absolute', top: 104, left: 0, right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.72)'
    },
    content: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 442,
        width: '100%'
    },
    categories: {
        width: 110,
        backgroundColor: '#ECECEE',
    },
    categoriesOne: {
        width: 116,
        height: 40
    },
    categoriesOneSlected: {
        width: 116,
        height: 40,
        backgroundColor: '#ECECEE'
    },
    categoriesOneText: {
        marginLeft: 17,
        marginTop: 10,
        alignItems: 'center'
    },
    categoriesTwos: {
        width: 110,
        marginRight: 13,
        marginTop: 10
    },
    categoriesTwo: {
        width: 110,
        height: 106
    },
    categoriesTwoText: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5
    },
    imgCate: {
        height: 106,
        width: 110,
        backgroundColor: 'yellow'
    },
    itemTwo: {
        flex: 1, backgroundColor: 'white', marginTop: 10,
        marginLeft: 17
    }

});