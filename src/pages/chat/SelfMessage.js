import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Platform
} from 'react-native';

import {Images, Metrics} from "../../Themes";
import Colors from "../../Themes/styles/Colors";

export default class SelfMessage extends Component {
    static props = {
        message: null,
        messageClick: null
    };

    createMessage = () => {
        const {type, text, image, path} = this.props.message;
        switch (type) {
            case "text" :
                return (
                    <View style={[styles.superView, styles.textView]}>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>{text}</Text>
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
                        <Image source={{uri: path}} style={{flex: 1, borderRadius: 5}}/>
                    </View>
                );
            case "voice":
                return (
                    <View style={[styles.superView, styles.textView]}>
                        <Text style={[{color: "white"}, {fontSize: 15}]}>这是一条语音消息</Text>
                    </View>
                );
            default:
                return null
        }

    };


    render() {
        const {userInfo} = this.props.message;
        let avatarThumbPath = userInfo.avatarThumbPath;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    if (this.props.messageClick === null) return;
                    this.props.messageClick();
                }}>
                    {this.createMessage()}
                </TouchableOpacity>
                {avatarThumbPath === "" ?
                    <Image source={Images.home_avatar} style={styles.userIcon}/> :
                    <Image source={{uri: avatarThumbPath}} style={styles.userIcon}/>}
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
        marginRight: 10,
        borderRadius: 6,
    },
    textView: {
        maxWidth: Metrics.screenWidth - (Metrics.reallySize(38) + 27) * 2,
        padding: 10,
    },
    imageView: {
        width: Metrics.reallySize(120),
        height: Metrics.reallySize(150),
        padding: 1,
    }
});