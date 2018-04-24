import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated, Platform} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {Images, Metrics} from "../../Themes";
import Video from "react-native-video";

class CameraVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: RNCamera.Constants.Type.back,//前置摄像头
            imagePath: "",
            videoPath: "",
            playing: false,
            duration: 0,
        };
        this.isRecord = false;//是否是录像
    }

    render() {
        let text = this.state.duration < 10 ? `0${this.state.duration}` : `${this.state.duration}`;
        return (
            <View style={styles.container}>
                {this.state.imagePath === "" && this.state.videoPath === "" ?
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={this.state.type}
                        flashMode={RNCamera.Constants.FlashMode.auto}    //闪光灯
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    >
                        <View style={styles.superView}>
                            <View style={styles.topView}>
                                <TouchableOpacity onPress={() => router.pop()}>
                                    <Image source={Images.social.close_camera} style={styles.closeBtn}/>
                                </TouchableOpacity>

                                {text !== "00" ? <Text
                                        style={[{color: "white"}, {marginBottom: 12}, {fontSize: 20}]}>{`00:${text}`}</Text> :
                                    <Text style={[{color: "white"}, {marginBottom: 12}, {fontSize: 20}]}>长按录像</Text>}

                                <TouchableOpacity onPress={this.cutCamera}>
                                    <Image source={Images.social.cut_camera} style={styles.cutCamera}/>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={this.takePicture} onLongPress={this.record}
                                              onPressOut={() => {
                                                  if (this.isRecord) {
                                                      this.stop();
                                                  }
                                              }}>
                                <Image source={Images.social.take_photo} style={styles.takePhoto}/>
                            </TouchableOpacity>

                        </View>
                    </RNCamera>
                    : null
                }
                {this.state.imagePath !== "" ?
                    <View style={styles.superView}>
                        <View style={[styles.topView, {backgroundColor: "black"}]}>
                            <TouchableOpacity onPress={() => {
                                this.setState({imagePath: ""})
                            }}>
                                <Text style={[styles.reTake, {marginLeft: 20}]}>重拍</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                if (this.props.params.fileInfo === null) return;
                                this.props.params.fileInfo({type: "image", path: this.state.imagePath});
                                router.pop();
                            }}>
                                <Text style={[styles.reTake, {marginRight: 20}]}>发送</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{uri: Platform.OS === 'ios' ? this.state.imagePath : 'file://' + this.state.imagePath}}
                            style={styles.image}/>
                    </View>
                    : null}
                {this.state.videoPath !== "" ?
                    <View style={styles.superView}>
                        <View style={[styles.topView, {backgroundColor: "black"}]}>
                            <TouchableOpacity onPress={() => {
                                this.setState({videoPath: ""})
                            }}>
                                <Text style={[styles.reTake, {marginLeft: 20}]}>重拍</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                if (this.props.params.fileInfo === null) return;
                                this.props.params.fileInfo({type: "video", path: this.state.videoPath});
                                router.pop();
                            }}>
                                <Text style={[styles.reTake, {marginRight: 20}]}>发送</Text>
                            </TouchableOpacity>
                        </View>

                        <Video source={{uri: this.state.videoPath}}
                               style={styles.image}
                               rate={1.0}                              // 0 is paused, 1 is normal.
                               volume={1.0}                            // 0 is muted, 1 is normal.
                               muted={false}                            // Mutes the audio entirely.
                               paused={!this.state.playing}
                               resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                               repeat={true}                           // Repeat forever.
                               playInBackground={false}                // Audio continues to play when app entering background.
                               playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                               ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                               progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                               onEnd={this.endPlayer}
                        />

                        <TouchableOpacity onPress={() => {
                            if (this.state.playing) {
                                return;
                            }
                            this.setState({playing: true});
                        }}>
                            <Image source={Images.social.play_video}
                                   style={[{width: Metrics.reallySize(70)}, {height: Metrics.reallySize(70)}, {marginBottom: 20}, {marginTop: 20}]}/>
                        </TouchableOpacity>
                    </View>
                    : null}
            </View>
        );
    }

    endPlayer = () => {
        this.setState({playing: false})
    };

    ///切换摄像头
    cutCamera = () => {
        this.isRecord = false;
        let type = this.state.type;
        let newType = RNCamera.Constants.Type.back;
        if (type === RNCamera.Constants.Type.back) {
            newType = RNCamera.Constants.Type.front;
        }
        this.setState({type: newType});

    };

    beginRecord = () => {
        this.timer = setInterval(() => {
            this.setState({duration: this.state.duration + 1});
        }, 1000);
    };

    //停止录制
    stop = async () => {
        if (this.camera) {
            this.camera.stopRecording()
        }
    };


    ///开始录制
    record = async () => {
        this.isRecord = true;
        this.beginRecord();
        if (this.camera) {
            const options = {maxDuration: 20};
            const data = await this.camera.recordAsync(options);
            let videoPath = data.uri.replace("file://", "");
            this.setState({videoPath: videoPath, duration: 0});

            ///清除定时器
            this.timer && clearInterval(this.timer);
        }
    };

    ///拍照
    takePicture = async () => {
        if (this.camera) {
            const options = {base64: false};
            const data = await this.camera.takePictureAsync(options);
            let imagePath = data.uri.replace("file://", "");
            this.setState({imagePath: imagePath});
        }
    };

}


export default CameraVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    superView: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        alignItems: "center",
        justifyContent: "space-between",
    },
    topView: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    closeBtn: {
        marginLeft: 20,
        marginBottom: 12,
        width: Metrics.reallySize(20),
        height: Metrics.reallySize(20),
    },
    cutCamera: {
        marginRight: 20,
        marginBottom: 12,
        width: Metrics.reallySize(25),
        height: Metrics.reallySize(25),
    },
    takePhoto: {
        width: Metrics.reallySize(74),
        height: Metrics.reallySize(74),
        marginBottom: 30,
    },
    sendView: {
        borderRadius: 4,
        backgroundColor: "blue",
        marginBottom: 15,
    },
    reTake: {
        color: "white",
        fontSize: 18,
        marginBottom: 12,
    },
    image: {
        flex: 1,
        width: Metrics.screenWidth,
    }

});