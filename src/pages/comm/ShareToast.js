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
import ShareItem from "./ShareItem";
import {Images} from '../../Themes';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;


///分享平台列表
let shareList = [
    {
        platform: "wechat_session",
        icon: Images.icon_share_wechat,
        name: "微信",
    },
    {
        platform: "wechat_timeLine",
        icon: Images.icon_share_wxcircle,
        name: "朋友圈",
    },
    {
        platform: "qq",
        icon: Images.icon_share_qq,
        name: "QQ",
    },
    {
        platform: "sina_weibo",
        icon: Images.icon_share_sina,
        name: "微博",
    },
];

export default class ShareToast extends Component {
    static props = {
        hiddenShareAction: null,//关闭弹窗回调
        shareTitle: null,//分享标题
        shareText: null,//分享内容
        shareLink: null,//分享链接
        shareImage: null,//分享图片
    };

    ///关闭分享弹窗
    hiddenShare = () => {
        if (this.props.hiddenShareAction === null) return;
        this.props.hiddenShareAction();
    };

    render() {
        return (
            <Modal
                onRequestClose={this.hiddenShare}
                transparent={true}
                visible={true}>

                {/*顶部遮罩*/}
                <TouchableOpacity onPress={this.hiddenShare}>
                    <View style={styles.hideView}/>
                </TouchableOpacity>

                {/*标题*/}
                <View style={styles.titleView}>
                    <Text style={{fontSize: 16}}>选择要分享到的平台</Text>
                </View>

                {/*分享平台*/}
                <View style={[{backgroundColor: "#eaeff3"}, {flex: 1}, {width: DEVICE_WIDTH}, {alignItems: "center"}]}>
                    <FlatList data={shareList}
                              style={[{backgroundColor: "#eaeff3"}, {width: DEVICE_WIDTH - 40}]}
                              numColumns={4}
                              bounces={false}
                              keyExtractor={(item, index) => index}
                              renderItem={(item) => {
                                  return (
                                      <ShareItem item={item.item}
                                                 itemClick={this.hiddenShare}
                                                 shareTitle={this.props.shareTitle}
                                                 shareText={this.props.shareText}
                                                 shareLink={this.props.shareLink}
                                                 shareImage={this.props.shareImage}
                                      />
                                  );
                              }}
                    />
                </View>

                {/*取消分享*/}
                <TouchableOpacity onPress={this.hiddenShare}>
                    <View style={styles.closeView}>
                        <Text style={{fontSize: 15}}>取消分享</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        position: "absolute",
        zIndex: 9999,
        alignItems: "center",
    },
    hideView: {
        height: DEVICE_HEIGHT - (DEVICE_WIDTH) / 4 - 180,
        width: DEVICE_WIDTH,
        backgroundColor: "rgba(58,58,58,0.5)"
    },
    titleView: {
        alignItems: "center",
        justifyContent: "center",
        width: DEVICE_WIDTH,
        height: 90,
        backgroundColor: "#eaeff3",
    },
    closeView: {
        height: 60,
        width: DEVICE_WIDTH,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
});