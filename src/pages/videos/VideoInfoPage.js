/**
 * Created by lorne on 2017/5/26.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager,
    Modal
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, convertDate, strNotNull} from '../../utils/ComonHelper';
import {LoadingView} from '../../components/load'
import {NavigationBar, MarkdownPlat, VideoPlayer} from '../../components';
import {getVideoDetail} from '../../services/NewsDao';


export default class VideoInfoPage extends Component {
    state = {
        videoInfo: {}
    };

    componentDidMount() {
        const {info, video_id} = this.props.params;
        if (!isEmptyObject(info)) {
            this.setState({videoInfo: info})
        } else if (strNotNull(video_id)) {
            getVideoDetail({video_id}, data => {
                console.log(data)
                this.setState({
                    videoInfo: data
                })

            }, err => {

            })
        }

    }

    render() {

        const {video_link, cover_link} = this.state.videoInfo;

        return (<View
            testID="page_news_info"
            style={ApplicationStyles.bgContainer}>
            <StatusBar hidden={true}/>

            <View
                style={styles.video}>
                {isEmptyObject(this.state.videoInfo) ? null : <VideoPlayer
                    thumbnailsHeight={216}
                    thumbnails={cover_link}
                    showBack={true}
                    source={{uri: video_link.trim()}}
                />}

            </View>

            {this.renderTitle()}
            {this.renderList()}

            {this.renderContent()}


        </View>)
    }


    renderList = () => {

        return <View style={{backgroundColor: 'white', marginTop: 5, paddingLeft: 17,}}>
            <View style={styles.listTitle}>
                <Text style={styles.childTitle}>2016APL全集</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.more}>查看更多</Text>
                    <Image style={styles.imgMore}
                           source={Images.is}/>
                </TouchableOpacity>

            </View>

            <FlatList
                horizontal
                keyExtractor={(item, index) => index}
                renderItem={this.renderVideoItem}
                data={[1, 2, 3, 5]}/>


        </View>
    };

    renderVideoItem = ({item}) => {
        return <View style={styles.itemCard}>
            <Image style={styles.itemImg}>
                <View style={{flex: 1}}/>
                <Text style={styles.itemDuration}>12:23</Text>
            </Image>

            <Text style={styles.itemName}>APL比赛第一集：开幕式</Text>

        </View>
    };

    renderTitle = () => {
        const {name} = this.state.videoInfo;
        return <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>{name}</Text>
        </View>
    };

    renderContent = () => {
        const {description} = this.state.videoInfo;
        return <ScrollView>

            <MarkdownPlat
                noScroll={true}
                markdownStr={description}
            />
        </ScrollView>
    };


}


const styles = StyleSheet.create({
    itemName: {fontSize: 14, color: Colors._333, marginTop: 7},
    itemDuration: {
        alignSelf: 'flex-end', fontSize: 14, color: 'white',
        padding: 3
    },
    itemCard: {marginRight: 10, width: 149, height: 148},
    itemImg: {height: 90, width: 149, backgroundColor: 'red'},
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
        width: '100%',
        backgroundColor: 'white',
        paddingLeft: 17

    },
    txtTitle: {
        fontSize: 17,
        color: Colors._333,
        marginTop: 15,
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
        height: 216
    },
    fullVideo: {
        flex: 1
    }

})