/**
 * Created by lorne on 2017/5/26.
 */

import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager,
    Modal
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, uVideoShare, strNotNull} from '../../utils/ComonHelper';
import {LoadingView} from '../../components/load'
import {NavigationBar, MarkdownPlat, VideoPlayer} from '../../components';
import {getVideoDetail, getSubVideo} from '../../services/NewsDao';
import CommentBottom from '../comment/CommentBottom';
import Comment from '../comment/CommentList';


export default class VideoInfoPage extends Component {
    state = {
        videoInfo: {},
        subVideos: []
    };

    componentDidMount() {
        const {info, video_id} = this.props.params;
        if (!isEmptyObject(info)) {
            this.setState({videoInfo: info});
            this._getSubVideos(info.group_id)
        } else if (strNotNull(video_id)) {
            getVideoDetail({video_id}, data => {

                this.setState({
                    videoInfo: data
                });
                this._getSubVideos(data.group_id)
            }, err => {

            })
        }
    }

    _getSubVideos = (group_id) => {
        getSubVideo({group_id}, data => {
            console.log(data)
            this.setState({
                subVideos: data.items
            })
        }, err => {

        })
    };

    render() {

        const {video_link, cover_link} = this.state.videoInfo;

        return (<View
            testID="page_news_info"
            style={ApplicationStyles.bgContainer}>
            <StatusBar hidden={true}/>

            <View
                style={styles.video}>
                {strNotNull(video_link) ? <VideoPlayer
                    thumbnailsHeight={216}
                    thumbnails={cover_link}
                    showBack={true}
                    source={{uri: video_link.trim()}}
                /> : null}

            </View>

            {this.renderTitle()}
            {this.renderList()}

            {this.renderContent()}

        </View>)
    }


    renderList = () => {
        const {group_name} = this.state.videoInfo;
        if (this.state.subVideos.length > 1)
            return <View style={{backgroundColor: 'white', marginTop: 5, paddingLeft: 17,}}>
                <View style={styles.listTitle}>
                    <Text style={styles.childTitle}>{group_name}</Text>
                    <View style={{flex: 1}}/>
                    {/* <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={styles.more}>查看更多</Text>
                        <Image style={styles.imgMore}
                               source={Images.is}/>
                    </TouchableOpacity>*/}

                </View>

                <FlatList
                    horizontal
                    keyExtractor={(item, index) => index+"item"}
                    renderItem={this.renderVideoItem}
                    data={this.state.subVideos}/>


            </View>
    };

    renderVideoItem = ({item}) => {
        const {video_duration, name, cover_link} = item;
        return <TouchableOpacity
            onPress={() => {
                this.setState({
                    videoInfo: item
                })
            }}
            style={styles.itemCard}>
            <Image
                source={{uri: cover_link.trim()}}
                style={styles.itemImg}>
                <View style={{flex: 1}}/>
                <Text style={styles.itemDuration}>{video_duration}</Text>
            </Image>

            <Text
                numberOfLines={2}
                style={styles.itemName}>{name}</Text>

        </TouchableOpacity>
    };

    renderTitle = () => {
        const {name, cover_link, id, title_desc} = this.state.videoInfo;
        return <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>{name}</Text>

            <View style={{flex: 1}}/>
            <TouchableOpacity

                onPress={() => {
                    uVideoShare(name, title_desc, cover_link, id)
                }}>

                <Image style={styles.imgShare}
                       source={Images.video_share}/>

            </TouchableOpacity>
        </View>
    };

    renderContent = () => {
        const {description} = this.state.videoInfo;
        return <ScrollView style={{backgroundColor:'#FFFFFF'}}>

            <MarkdownPlat
                noScroll={true}
                markdownStr={description}
            />
            <Comment/>
        </ScrollView>
    };


}


const styles = StyleSheet.create({
    itemName: {fontSize: 14, color: Colors._333, marginTop: 7},
    itemDuration: {
        alignSelf: 'flex-end', fontSize: 14, color: 'white',
        padding: 3, backgroundColor: 'transparent'
    },
    itemCard: {marginRight: 10, width: 149, height: 148},
    itemImg: {height: 90, width: 149, backgroundColor: Colors._ECE},
    listTitle: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',

    },
    childTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors._333
    },
    more: {
        fontSize: 14,
        color: Colors._888
    },
    imgMore: {
        height: 12,
        width: 7,
        marginRight: 17,
        marginLeft: 5
    },
    viewTitle: {
        height: 80,
        backgroundColor: 'white',
        flexDirection: 'row'

    },
    txtTitle: {
        fontSize: 17,
        color: Colors._333,
        marginTop: 15,
        marginLeft: 17,
        width:'80%'
    },
    txtTime: {
        fontSize: 12,
        color: Colors._AAA
    },
    headerView: {
        borderBottomWidth: 1,
        borderBottomColor: Colors._EEE,
        marginRight: 17,
        marginLeft: 17
    },
    txtSource: {
        fontSize: 12,
        color: Colors._AAA,
        marginLeft: 17
    },
    sourceView: {
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: 9
    },
    page: {
        flex: 1,
        backgroundColor: Colors.white
    },
    video: {
        height: 216,
        marginTop:0
    },
    fullVideo: {
        flex: 1
    },
    imgShare: {
        height: 17,
        width: 17,
        marginTop: 34,
        marginRight: 14

    },

})