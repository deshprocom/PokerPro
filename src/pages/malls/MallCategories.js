import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, FlatList,
    TouchableOpacity, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';
import {categoriesChild} from '../../services/MallDao';
import propTypes from 'prop-types';

export default class MallCategories extends Component {
    static propTypes = {
        categories: propTypes.array.isRequired
    };

    state = {
        speciesId: 0,
        childMap: new Map()
    };

    componentWillMount() {

        const {categories} = this.props;
        this._clickSpecies(categories[0])
    }

    _clickSpecies = (item) => {
        const {childMap} = this.state;
        this.setState({
            speciesId: item.id
        });
        if (!childMap.has(item.id))
            categoriesChild({id: item.id}, data => {
                const {categories} = data;
                childMap.set(item.id, categories);
                this.setState({childMap});
            });


    };

    _renderItem = (item) => {
        const {speciesId} = this.state;
        return (
            <TouchableOpacity
                onPress={() => {
                    this._clickSpecies(item)

                }}
                key={'sepcies' + item.id}
                style={[speciesId === item.id ? styles.categoriesOneSlected : styles.categoriesOne, {
                    flexDirection: 'row',
                    alignItems: 'center'
                }]}>

                <View style={speciesId === item.id ? styles.selected : styles.select}/>


                <Text style={styles.categoriesOneText}>{`${item.name}`}</Text>

            </TouchableOpacity>
        )
    };


    _renderItemTwo = ({item}) => {
        return (
            <View style={styles.categoriesTwos}>
                <TouchableOpacity
                    style={styles.categoriesTwo}
                    onPress={() => {
                        router.toMallResult(item)
                    }}>
                    <Image
                        style={styles.imgCate}
                        source={{uri: item.image}}/>
                </TouchableOpacity>
                <Text style={styles.categoriesTwoText}>{`${item.name}`}</Text>

            </View>

        )
    };

    render() {

        const {speciesId, childMap} = this.state;
        const {categories} = this.props;

        return <Animatable.View animation={'fadeIn'}
                                duration={500}
                                style={styles.page}>
            <View style={styles.topBar}>
                <View style={{flex: 1}}/>
                <Text style={{alignSelf: 'center'}}>请选择分类</Text>

                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.showCatePage && this.props.showCatePage()
                        }}
                        style={styles.btnFilter}>
                        <Image
                            source={Images.mall_up}
                            style={{height: 9, width: 16}}/>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={styles.content}>
                <View style={styles.categories}>
                    {categories.map((x, index) => {
                        return this._renderItem(x)
                    })}

                </View>
                <View style={styles.itemTwo}>
                    <FlatList
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        data={childMap.get(speciesId)}
                        renderItem={this._renderItemTwo}
                        keyExtractor={(item, index) => `contentList${index}`}
                    />
                </View>

            </View>

            <TouchableOpacity
                onPress={() => {
                    this.props.showCatePage && this.props.showCatePage()
                }}
                style={{flex: 1}}/>


        </Animatable.View>
    }
}

const styles = StyleSheet.create({
    page: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 44 : 64,
        left: 0,
        right: 0,
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
        width: 110,
        height: 40,
        backgroundColor: Colors._ECE
    },
    categoriesOneSlected: {
        width: 110,
        height: 40,
        backgroundColor: 'white'
    },
    categoriesOneText: {
        color: Colors._333,
        fontSize: 14
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
        backgroundColor: Colors._ECE
    },
    itemTwo: {
        flex: 1, backgroundColor: 'white', marginTop: 10,
        marginLeft: 17
    },
    select: {
        height: 24, width: 4, backgroundColor: Colors._ECE, marginRight: 13
    },
    selected: {
        height: 24, width: 4, backgroundColor: Colors._DF1, marginRight: 13
    },
    topBar: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: Colors._ECE,
        borderBottomWidth: 1
    },
    btnFilter: {
        height: 39,
        width: 58,
        alignItems: 'center',
        justifyContent: 'center',

    },

});