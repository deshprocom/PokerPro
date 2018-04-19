import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {Images, Metrics, Colors} from "../../Themes";
import {localFilePath} from '../../utils/ComonHelper';
import ImageLoad from "../../components/ImageLoad";

export default class OtherMessage extends Component {
    static props = {
        message: null,
        messageClick: null
    };

    createMessage = () => {
        let {type, text, image, duration} = this.props.message;
        image = localFilePath(image);

        switch (type) {
            case "text" :
                return (
                    <View style={[styles.superView, styles.textView]}>
                        <Text style={[{color: Colors.txt_444}, {fontSize: 15}]}>{text}</Text>
                    </View>
                );
            case "image" :
                return (
                    <View style={[styles.superView, styles.imageView, {backgroundColor: Colors._ECE}]}>
                        <Image source={{uri: image}} style={{flex: 1, borderRadius: 5}}/>
                    </View>
                );
            case "video":
                return (
                    <View style={[styles.superView, styles.imageView, {backgroundColor: Colors._ECE}]}>
                        <Image source={{uri: image}} style={{flex: 1, borderRadius: 5}}/>
                    </View>
                );
            case "voice":
                return (
                    <View style={[styles.superView, styles.voiceView, {width: parseInt(duration) * 6 + 50}]}>
                        <Image source={Images.social.voice_left} style={styles.voiceImage}/>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>{`${parseInt(duration)}"`}</Text>
                    </View>
                );
            default:
                return null;
        }

    };

    render() {
        const {userInfo} = this.props.message;
        let avatarThumbPath = localFilePath(userInfo.avatarThumbPath);
        return (
            <View style={styles.container}>
                <ImageLoad
                    emptyBg={Images.home_avatar}
                    source={{uri: avatarThumbPath}}
                    style={styles.userIcon}/>

                <Image source={Images.social.chat_left} style={styles.leftCorner}/>
                <TouchableOpacity onPress={() => {
                    if (this.props.messageClick === null) return;
                    this.props.messageClick();
                }}>
                    {this.createMessage()}
                </TouchableOpacity>
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
    },
    userIcon: {
        width: Metrics.reallySize(38),
        height: Metrics.reallySize(38),
        borderRadius: Metrics.reallySize(19),
        marginLeft: 17,
        marginBottom: 17,
    },
    superView: {
        backgroundColor: Colors._ECE,
        marginBottom: 17,
        marginTop: 17,
        marginLeft: -5,
        borderRadius: 6,
    },
    textView: {
        maxWidth: Metrics.screenWidth - (Metrics.reallySize(38) + 27) * 2,
        padding: 10,
    },
    voiceView: {
        flexDirection: "row",
        alignItems: "center",
    },
    voiceImage: {
        marginBottom: 12,
        marginTop: 12,
        width: Metrics.reallySize(24),
        height: Metrics.reallySize(15),
        marginRight: 2,
        marginLeft: 3,
        resizeMode: 'contain',
    },
    imageView: {
        width: Metrics.reallySize(120),
        height: Metrics.reallySize(150),
        padding: 1,
    },
    leftCorner: {
        width: Metrics.reallySize(10),
        height: Metrics.reallySize(10),
        marginLeft: 10,
        marginBottom: 17,
    }
});