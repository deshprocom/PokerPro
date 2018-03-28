import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import JShareModule from "jshare-react-native";

const DEVICE_WIDTH = Dimensions.get('window').width;
import {Lang, strNotNull, showToast} from '../../utils/ComonHelper';
import fs from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

export default class ShareItem extends Component {

    static props = {
        item: null,//分享平台
        itemClick: null,//分享事件
        shareTitle: null,//分享标题
        shareText: null,//分享内容
        shareLink: null,//分享链接
        shareImage: null,//分享图片
    };


    //分享
    shareAction = async () => {
        let item = this.props.item;
        //是否允许分享
        let isAllowShare = true;

        let platform = item.platform;
        if (platform === "wechat_session" || platform === "wechat_timeLine") {
            //检查是否安装微信客户端
            JShareModule.isWeChatInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast("未安装微信客户端");
                }
            });
        }
        else if (platform === "qq") {
            JShareModule.isQQInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast("未安装QQ客户端");
                }
            });
        }


        if (isAllowShare) {

            let rootPath = fs.DocumentDirectoryPath;
            let savePath = rootPath + '/temp_share.jpg';

            console.log(this.props.shareImage);


            if (strNotNull(this.props.shareImage)) {
                fs.downloadFile({
                    fromUrl: this.props.shareImage,
                    toFile: savePath
                }).promise.then(resp => {
                    if (resp.statusCode === 200) {
                        if (Platform.OS === 'ios') {
                            ImageResizer
                                .createResizedImage(savePath, 100, 100, 'JPEG', 0.7)
                                .then((response) => {
                                    this.shareUrl(item.platform, response.path)
                                }).catch((err) => {
                                console.log('ImageResizer错误', err)
                            });
                        } else {
                            this.shareUrl(item.platform, savePath)
                        }


                    }
                });
            } else {
                this.shareUrl(item.platform, '')
            }


        }


    };

    shareUrl = (platform, imagePath) => {
        let message = {
            platform: platform,
            type: "link",
            url: this.props.shareLink,
            title: this.props.shareTitle,
            text: this.props.shareText,
            imagePath: imagePath,
        };
        console.log(message);
        JShareModule.share(message, (map) => {
            console.log(map);
        }, (map) => {
        });

        if (this.props.itemClick === null) return;
        this.props.itemClick();
    };

    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity onPress={this.shareAction}>
                <View style={styles.container}>
                    <View style={styles.subView}>
                        <View style={styles.imageSuper}>
                            <Image style={styles.image} source={item.icon}/>
                        </View>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: (DEVICE_WIDTH - 40) / 4,
        height: (DEVICE_WIDTH - 40) / 4,
        alignItems: "center",
        justifyContent: "center",
    },
    subView: {
        width: (DEVICE_WIDTH - 90) / 4,
        height: (DEVICE_WIDTH - 90) / 4,
        alignItems: "center",
        justifyContent: "center",
    },
    imageSuper: {
        width: (DEVICE_WIDTH - 140) / 4,
        height: (DEVICE_WIDTH - 140) / 4,
        backgroundColor: "white",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 40,
        height: 40,
    },
    text: {
        marginTop: 10,
        fontSize: 15,
    }
});