import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView, FlatList
}
    from 'react-native';
import {Images} from '../../Themes';
import {styles} from './Styles';
import {
    isEmptyObject, util, convertDate,
} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';
import ReadLike from '../comment/ReadLike';
import {getHotInfos} from '../../services/NewsDao';

export default class Information extends Component {

    state = {
        hot_infos: []
    };


    refresh = (infos) => {
        console.log('hot_infos', infos);
        this.setState({hot_infos: infos})
    }

    setInfos = (infos) => {
        console.log('hot_infos', infos);
        let {hot_infos} = this.state;

        this.setState({hot_infos: hot_infos.concat(infos)})
    };


    _renderItem = ({item}) => {
        if (item.source_type === 'info') {
            return (
                <TouchableOpacity
                    onPress={() => {

                        const {id} = item.info;
                        let url = `news/${id}`;
                        global.router.toWebPage(url, {
                            bottomNav: 'commentNav',
                            info: item.info,
                            topic_type: item.source_type
                        })
                    }}
                    style={styles.information}>
                    <View style={{flex: 1}}>
                        <Text numberOfLines={2}
                              style={[styles.raceText, {marginRight: 20}]}>{item.info.title}</Text>
                        <View style={{flexDirection: 'row', marginTop: 14}}>
                            <ReadLike
                                read={item.info.total_views}
                                like={item.info.total_likes}/>
                            <View style={{flex: 1}}/>
                            <Text
                                style={[styles.informationText, {
                                    marginLeft: 15,
                                    marginRight: 17
                                }]}>{convertDate(item.info.date, 'MM-DD')}</Text>

                        </View>

                    </View>

                    <Image style={{width: 123, height: 75}} source={{uri: item.info.image_thumb}}/>
                </TouchableOpacity>
            )
        } else if (item.source_type === 'video') {
            return (
                <View style={{marginLeft: 17, marginTop: 17, marginRight: 17}}>
                    <Text
                        onPress={() => {

                            const {id} = item.video;
                            let url = `videos/${id}`;
                            global.router.toWebPage(url, {
                                bottomNav: 'commentNav',
                                info: item.video,
                                topic_type: item.source_type
                            })
                        }}
                        style={{
                            fontSize: 15,
                            color: '#333333'
                        }}>{item.video.name}</Text>

                    <TouchableOpacity
                        onPress={() => {
                            const {id} = item.video;
                            let url = `videos/${id}/${global.language}`;
                            global.router.toWebPage(url, {
                                bottomNav: 'commentNav',
                                info: item.video,
                                topic_type: item.source_type
                            })
                        }}
                        style={{height: 207, marginTop: 14, marginBottom: 14}}>
                        <Image style={{height: 207}}
                               source={{uri: item.video.cover_link.trim()}}/>
                        <Image style={{
                            width: 70, height: 70, position: 'absolute',
                            left: '40%', top: '40%'
                        }} source={Images.begin}/>


                    </TouchableOpacity>
                </View>

            )
        }

    };
    _separator = () => {
        return <View style={{height: 0.5, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', marginTop: 8}}>
                <View style={{height: 20, flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
                    <View style={[styles.races]}>
                        <Text style={styles.raceText1}>{I18n.t('hot_infos')}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        onPress={() => {
                            global.router.toTabNews()
                        }}
                        style={[styles.racesTwo, {marginRight: 14}]}>
                        <Text style={[styles.raceText]}>{I18n.t('more')}</Text>
                        <Image style={{width: 8, height: 12, marginLeft: 6}} source={Images.is}/>
                    </TouchableOpacity>
                </View>
                <View style={styleI.informationLine}/>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separator}
                    data={this.state.hot_infos}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index+"item"}
                />
                <View style={styleI.informationLine}/>

            </View>
        );
    }

}

const styleI = StyleSheet.create({
    informationLine: {

        height: 1,
        marginLeft: 17,
        marginRight: 17,
        backgroundColor: '#ECECEE',
        marginTop: 13
    }
})