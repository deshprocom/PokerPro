import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Platform,
    ActivityIndicator
} from 'react-native';

import {Images, Metrics, Colors} from "../../Themes";
import ImageLoad from "../../components/ImageLoad";
import {localFilePath} from "../../utils/ComonHelper";

export default class SelfMessage extends Component {
    static props = {
        message: null,
        messageClick: null
    };

    createMessage = () => {
        let {type, text, image, duration, coverPath} = this.props.message;
        image = localFilePath(image);
        switch (type) {
            case "text" :
                return (
                    <View style={[styles.superView, styles.textView]}>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>{text}</Text>
                    </View>
                );
            case "image" :
                return (
                    <View style={[styles.superView, styles.imageView, {backgroundColor: "#ECECEE"}, {marginRight: 10}]}>
                        <Image source={{uri: image}} style={{flex: 1, borderRadius: 5}}/>
                    </View>
                );
            case "video":
                return (
                    <View style={[styles.superView, styles.imageView, {backgroundColor: "#ECECEE"}, {marginRight: 10}]}>
                        <Image source={{uri: coverPath}} style={{flex: 1, borderRadius: 5}}/>
                        <Image source={Images.social.play_video} style={styles.playImage}/>
                    </View>
                );
            case "voice":
                return (
                    <View style={[styles.superView, styles.voiceView, {width: parseInt(duration) * 6 + 50}]}>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>{`${parseInt(duration)}"`}</Text>
                        <Image source={Images.social.voice_right} style={styles.voiceImage}/>
                    </View>
                );
            default:
                return null
        }

    };


    render() {
        const {type, userInfo, serverMessageId} = this.props.message;
        let avatarThumbPath = localFilePath(userInfo.avatarThumbPath);
        return (
            <View style={styles.container}>


                {serverMessageId === 0 ? <ActivityIndicator style={[{marginBottom: 17}, {marginRight: 10}]}/> : null}
                {serverMessageId === undefined ?
                    <Image source={Images.social.send_failure}
                           style={[{marginBottom: 17}, {marginRight: 10}, {width: 20}, {height: 20}]}/> : null}

                <TouchableOpacity onPress={() => {
                    if (this.props.messageClick === null) return;
                    this.props.messageClick();
                }} style={[{flexDirection: "row"}, {alignItems: "flex-end"}]}>
                    {this.createMessage()}
                    {Platform.OS === 'ios' ? type === "image" || type === "video" ? null :
                        <Image source={Images.social.chat_right} style={styles.rightCorner}/> : null}

                </TouchableOpacity>


                <ImageLoad
                    emptyBg={Images.home_avatar}
                    source={{uri: avatarThumbPath}}
                    style={styles.userIcon}/>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    userIcon: {
        width: Metrics.reallySize(38),
        height: Metrics.reallySize(38),
        borderRadius: Metrics.reallySize(19),
        marginRight: 17,
        marginBottom: 17,
    },
    superView: {
        backgroundColor: "#1D89FA",
        marginBottom: 17,
        marginTop: 17,
        borderRadius: 6,
        marginRight: Platform.OS === 'ios' ? -6 : 10,
    },
    textView: {
        maxWidth: Metrics.screenWidth - (Metrics.reallySize(38) + 27) * 2,
        padding: 10,
    },
    voiceView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    voiceImage: {
        marginBottom: 12,
        marginTop: 12,
        width: Metrics.reallySize(24),
        height: Metrics.reallySize(15),
        marginLeft: 2,
        marginRight: 3,
        resizeMode: 'contain',
    },
    imageView: {
        width: Metrics.reallySize(120),
        height: Metrics.reallySize(150),
        padding: 1,
    },
    rightCorner: {
        width: Metrics.reallySize(10),
        height: Metrics.reallySize(10),
        marginBottom: 17,
        marginRight: 10,
    },
    playImage: {
        position: "absolute",
        marginLeft: Metrics.reallySize(35),
        marginTop: Metrics.reallySize(50),
        width: Metrics.reallySize(50),
        height: Metrics.reallySize(50),
    }
});