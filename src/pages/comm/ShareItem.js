import React, { Component } from 'react';
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
import {shareHost,Lang,strNotNull,showToast} from '../../utils/ComonHelper';

export default class ShareItem extends Component{

    static props = {
        item:null,//分享平台
        itemClick:null,//分享事件
        shareTitle:null,//分享标题
        shareText:null,//分享内容
        shareLink:null,//分享链接
        shareImage:null,//分享图片
        dotNeedSpell:false,//是否需要拼接地址
    };

    getShareIcon =(icon)=> {
        return strNotNull(icon) ? encodeURI(icon) : shareIcon
    };

    //分享
    shareAction = () => {
        let item = this.props.item;
        //是否允许分享
        let isAllowShare = true;

        let platform = item.platform;
        if (platform === "wechat_session" || platform === "wechat_timeLine")
        {
            //检查是否安装微信客户端
            JShareModule.isWeChatInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast("未安装微信客户端");
                }
            });
        }
        else if (platform === "qq"){
            JShareModule.isQQInstalled((isInstalled) => {
                if (isInstalled !== true) {
                    isAllowShare = false;
                    showToast("未安装QQ客户端");
                }
            });
        }

        if (isAllowShare){
            let message;
            if (Platform.OS === 'ios')
                message = {
                    platform: item.platform,
                    type: "link",
                    url:this.props.dotNeedSpell ? this.props.shareLink : shareHost() + this.props.shareLink+ "/" + Lang,
                    title:this.props.shareTitle,
                    text:this.props.shareText,
                    imagePath: this.getShareIcon(this.props.shareImage),
                };
            else
                message = {
                    platform: item.platform,
                    type: "link",
                    url:this.props.dotNeedSpell ? this.props.shareLink : shareHost() + this.props.shareLink+ "/" + Lang,
                    title:this.props.shareTitle,
                    text:this.props.shareText,
                    imageUrl: this.getShareIcon(this.props.shareImage),
                };


            JShareModule.share(message, (map) => {
                console.log(map);
            }, (map) => {
            });

            if(this.props.itemClick === null) return;
            this.props.itemClick();
        }


    };

    render(){
        const {item} = this.props;
        return(
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
        width:(DEVICE_WIDTH - 40)/ 4,
        height:(DEVICE_WIDTH - 40)/ 4,
        alignItems:"center",
        justifyContent:"center",
    },
    subView:{
        width:(DEVICE_WIDTH - 90)/ 4,
        height:(DEVICE_WIDTH - 90)/ 4,
        alignItems:"center",
        justifyContent:"center",
    },
    imageSuper:{
        width:(DEVICE_WIDTH - 140)/ 4,
        height:(DEVICE_WIDTH - 140)/ 4,
        backgroundColor:"white",
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
    },
    image:{
        width:40,
        height:40,
    },
    text:{
        marginTop:10,
        fontSize:15,
    }
});