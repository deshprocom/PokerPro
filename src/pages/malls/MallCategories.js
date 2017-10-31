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
                key={'sepcies' + item.id}
                style={speciesId === item.id ? styles.categoriesOneSlected : styles.categoriesOne}
                onPress={() => {
                    this._clickSpecies(item)

                }}>
                <Text style={styles.categoriesOneText}>{`${item.name} (${item.products_count})`}</Text>
            </TouchableOpacity>
        )
    };


    _renderItemTwo = ({item}) => {
        return (
            <View style={styles.categoriesTwos}>
                <TouchableOpacity style={styles.categoriesTwo}>
                    <Image
                        style={styles.imgCate}
                        source={{uri: item.image}}/>
                </TouchableOpacity>
                <Text style={styles.categoriesTwoText}>{`${item.name} (${item.products_count})`}</Text>
            </View>

        )
    };

    render() {

        const {speciesId, childMap} = this.state;
        const {categories} = this.props;

        return <Animatable.View animation={'bounceIn'}
                                style={styles.page}>
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
        backgroundColor: Colors._ECE
    },
    itemTwo: {
        flex: 1, backgroundColor: 'white', marginTop: 10,
        marginLeft: 17
    }

});