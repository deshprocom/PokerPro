import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    Modal,
} from 'react-native';
import Video from "react-native-video";
import {Images, Metrics} from '../../Themes';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;


export default class ShareToast extends Component {
    static props = {
        hiddenVideoAction: null,//关闭弹窗回调
        videoUrl: null,//视频地址
    };

    ///关闭视频弹窗
    hiddenVideo = () => {
        if (this.props.hiddenVideoAction === null) return;
        this.props.hiddenVideoAction();
    };

    render() {

        console.log('视频播放', this.props.videoUrl)
        return (
            <Modal
                onRequestClose={this.hiddenVideo}
                transparent={Platform.OS === 'ios'}
                visible={true}>

                <Video source={{uri: this.props.videoUrl}}
                       style={styles.backgroundVideo}
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       rate={1.0}                              // 0 is paused, 1 is normal.
                       volume={1.0}                            // 0 is muted, 1 is normal.
                       muted={false}                           // Mutes the audio entirely.
                       paused={false}                          // Pauses playback entirely.
                       resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
                       repeat={true}                           // Repeat forever.
                       playInBackground={false}                // Audio continues to play when app entering background.
                       playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                />

                <TouchableOpacity onPress={this.hiddenVideo} style={{position: 'absolute', zIndex: 99}}>
                    <Image source={Images.social.close_camera} style={styles.closeBtn}/>
                </TouchableOpacity>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    closeBtn: {
        marginTop: 60,
        marginLeft: 30,
        width: Metrics.reallySize(20),
        height: Metrics.reallySize(20)
    }
});