import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Animated} from 'react-native';

import {RNCamera} from 'react-native-camera';

class ExpandText extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.record}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 14}}> RECORD </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.stop}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 14}}> STOP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    stop = async () => {
        if (this.camera) {

        this.camera.stopRecording()

        }
    }


    record = async () => {
        if (this.camera) {
            const options = {quality: 0.5};
            const data = await this.camera.recordAsync(options)
            console.log('视频录制',data);
        }
    }

    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: false};
            const data = await this.camera.takePictureAsync(options)
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
    }
});