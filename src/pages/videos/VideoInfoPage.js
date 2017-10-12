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
            style={styles.page}>
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


            {this.renderContent()}


        </View>)
    }

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
    txtTitle: {
        fontSize: 17,
        color: Colors.txt_444,
        marginTop: 9
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