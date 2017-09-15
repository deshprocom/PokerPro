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
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';
import {LoadingView} from '../../components/load'
import {NavigationBar, MarkdownPlat, VideoPlayer} from '../../components';
import Orientation from 'react-native-orientation';


export default class VideoInfoPage extends Component {
    state = {
        videoFull: false,

    };

    render() {

        const {description, video_link} = this.props.navigation.state.params.info;
        const {videoFull} = this.state;

        return (<View
            testID="page_news_info"
            style={styles.page}>
            <StatusBar hidden={true} />

            <View
                style={styles.video}>
                <VideoPlayer
                    ref={ref => this.player = ref}
                    showBack={true}
                    toggleFullscreen={this.toggleFullscreen}
                    source={{uri: video_link.trim()}}
                />
            </View>


            {this.renderContent()}


        </View>)
    }

    renderContent = () => {
        const {description} = this.props.navigation.state.params.info;
        return <ScrollView>

            <MarkdownPlat
                noScroll={true}
                markdownStr={description}
            />
        </ScrollView>
    };

    toggleFullscreen = () => {
        this.player.presentFullscreenPlayer();
    }


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