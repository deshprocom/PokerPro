import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {Images,Metrics} from "../../Themes";

class ExpandText extends Component {
    constructor(props){
        super(props);
        this.state = {
            type:RNCamera.Constants.Type.back,//前置摄像头
            imagePath:"",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.imagePath === "" ?
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
                                <TouchableOpacity onPress={this.cutCamera}>
                                    <Image source={Images.social.cut_camera} style={styles.cutCamera}/>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={this.takePicture}>
                                <Image source={Images.social.take_photo} style={styles.takePhoto}/>
                            </TouchableOpacity>

                        </View>
                    </RNCamera>
                :
                    <View style={styles.superView}>
                        <View style={[styles.topView,{backgroundColor:"black"}]}>
                            <TouchableOpacity onPress={() => {this.setState({imagePath:""})}}>
                                <Text style={[styles.reTake,{marginLeft:20}]}>重拍</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                if (this.props.params.imageInfo === null) return;
                                this.props.params.imageInfo(this.state.imagePath);
                                router.pop();
                            }}>
                                <Text style={[styles.reTake,{marginRight:20}]}>发送</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={{uri:this.state.imagePath}} style={styles.image}/>
                    </View>
                }
            </View>
        );
    }

    ///切换摄像头
    cutCamera = () => {
        let type = this.state.type;
        let newType = RNCamera.Constants.Type.back;
        if (type === RNCamera.Constants.Type.back){
            newType = RNCamera.Constants.Type.front;
        }
        this.setState({type:newType});

    };

    stop = async () => {
        if (this.camera) {

        this.camera.stopRecording()

        }
    };


    record = async () => {
        if (this.camera) {
            const options = {quality: 0.5};
            const data = await this.camera.recordAsync(options);
            console.log('视频录制',data);
        }
    };

    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: false};
            const data = await this.camera.takePictureAsync(options);
            console.log(data);
            let imagePath = data.uri.replace("file://","");
            this.setState({imagePath:imagePath});
        }
    };

}


export default ExpandText;

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
    superView:{
        width:Metrics.screenWidth,
        height:Metrics.screenHeight,
        alignItems:"center",
        justifyContent:"space-between",
    },
    topView:{
        height:Metrics.navBarHeight,
        width:Metrics.screenWidth,
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"space-between",
    },
    closeBtn:{
        marginLeft:20,
        marginBottom:12,
        width:Metrics.reallySize(20),
        height:Metrics.reallySize(20),
    },
    cutCamera:{
        marginRight:20,
        marginBottom:12,
        width:Metrics.reallySize(25),
        height:Metrics.reallySize(25),
    },
    takePhoto:{
        width:Metrics.reallySize(74),
        height:Metrics.reallySize(74),
        marginBottom:30,
    },
    sendView:{
        borderRadius:4,
        backgroundColor:"blue",
        marginBottom:15,
    },
    reTake:{
        color:"white",
        fontSize:18,
        marginBottom:12,
    },
    image:{
        flex:1,
        width:Metrics.screenWidth,
    }

});