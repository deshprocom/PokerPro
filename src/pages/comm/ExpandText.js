import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {Metrics} from '../../Themes'
import {Images} from "../../Themes";

class ExpandText extends Component {
    constructor(props){
        super(props);
        this.state = {
            type:RNCamera.Constants.Type.back,//前置摄像头
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}    //闪光灯
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    <View style={styles.superView}>
                        <View style={styles.topView}>
                            <TouchableOpacity onPress={() => router.pop()}>
                                <Text style={styles.closeBtn}>关闭</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.cutCamera}>
                                <Text style={styles.cutCamera}>切换</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RNCamera>
            </View>
        );
    }

    ///切换摄像头
    cutCamera = () => {

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
            console.log(data.uri);
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
        backgroundColor:"#ECECEE",
    },
    topView:{
        height:Metrics.navBarHeight,
        flexDirection:"row",
        backgroundColor:"red",
        alignItems:"flex-end",
        justifyContent:"space-between",
    },
    closeBtn:{
        marginLeft:17,
        marginBottom:17,
    },
    cutCamera:{
        marginRight:17,
        marginBottom:17,
    }

});