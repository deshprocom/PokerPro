import React, {Component} from 'react';
import {
    View, ScrollView, Platform, StyleSheet, Image, TextInput,
    Text, Animated
}
    from 'react-native';
import {strNotNull} from '../../utils/ComonHelper';
import {fetchSearchByKeyword} from '../../actions/RacesAction';
import {Images, Metrics, Colors} from '../../Themes';
import I18n from 'react-native-i18n';

export class SearchPage extends Component {
    state = {
        bgColor: 'transparent',
        headlines: [],
        next_id: '0',
        keyword: '',
        opacity: 0
    };

    loadList = (next_id, keyword) => {

        if (strNotNull(keyword)) {
            this.setState({
                next_id: next_id
            });
            const body = {
                next_id: next_id,
                keyword: keyword
            };
            this.props._searchByDate(body);

        }


    };
    onScroll = (event) => {
        const offsetHeight = 200;

        let offsetY = event.nativeEvent.contentOffset.y;
        console.log(offsetY)
        if (offsetY <= offsetHeight) {
            let opacity = offsetY / offsetHeight;
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }
    };

    _search = () => {
        return (
            <Animated.View style={styleR.searchBar}>
                <Image style={styleR.imgSearch}
                       source={Images.search_gray}/>
                <TextInput
                    placeholderTextColor="#6A6B6B"
                    placeholder={I18n.t('moreRace')}
                    testID="input_keyword"
                    underlineColorAndroid='transparent'
                    style={styleR.inputSearch}
                    onChangeText={txt => {
                        this.setState({
                            keyword: txt
                        });
                        this.loadList('0', txt)
                    }}/>
            </Animated.View>
        )
    };

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'rgba(0,0,0,' + this.state.opacity + ')',
                    paddingTop: Metrics.statusBarHeight
                }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50
                }}>
                    <Text style={styleR.searchText}>{I18n.t('app_name')}</Text>
                    {this._search()}
                    <Image style={styleR.imgSearch2}
                           source={Images.search_notice}/>
                </View>
            </View>
        )
    }
}

const styleR = StyleSheet.create({
    searchText: {
        fontSize: 14,
        color: '#FFE9AD',
        marginLeft: 17,
        backgroundColor: 'transparent'
    },
    searchBar: {
        height: 28,
        width: 248,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        opacity: 0.8,
        borderRadius: 3,
        marginLeft: 23
    },
    imgSearch: {
        height: 18,
        width: 18,
        marginRight: 11,
        marginLeft: 8
    },
    imgSearch2: {
        height: 22,
        width: 19,
        marginLeft: 22,
        marginRight: 22
    },
    inputSearch: {
        height: Platform.OS === 'android' ? 40 : 30,
        flex: 1,
        color: Colors.white,
        fontSize: 15
    }
})