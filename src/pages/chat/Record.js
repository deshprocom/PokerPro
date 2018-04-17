import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import Video from 'react-native-video';
import {
    /*StatusBar,*/ ActivityIndicator, Keyboard, Alert, Image,
    Text, Platform, TouchableOpacity, View, ScrollView, StyleSheet
} from 'react-native';
import {Images, Colors, Metrics} from '../../Themes'


const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // flash: 0,
            camera: 0,
            recording: false,
            duration: 0,
            delay: 0,
            uri: null,
            playing: false
        };
        this.cameras = ['back', 'front'];
        // this.flashes = ['flash-off', 'flash-on', 'flash-auto'];
        this.start = 0;
        this.timer = null;
    }

    componentWillMount() {
        //StatusBar.setHidden(true);
    }

    componentWillUnmount() {
        //StatusBar.setHidden(false);
        if (this.timer) {
            clearInterval(this.timer)
        }
        ;
        this._endRecording();
    }

    _startRecording() {
        if (!this.camera) {
            return;
        }

        // check if the user has a recording delay configured in settings
        const delay = 5;
        if (delay) {
            // start a countdown timer that will display over the camera
            this.setState({delay: delay});
            this.countdown = setInterval(() => this.setState({delay: this.state.delay - 1}), 1000);
        }

        // Change the controls to recording mode
        this.setState({recording: true});

        // Set the recording constraints and start the recording
        const options = {
            maxFileSize: 9.5 * 1024 * 1024,
            maxDuration: 20,
            quality: RNCamera.Constants.VideoQuality['480p']
        };
        // delay the start of the recording if a delay is set
        this.delayTimer =
            setTimeout(() => {
                // Stop the countdown timer
                if (this.countdown) {
                    clearInterval(this.countdown)
                }

                // start the timer that will show the recording duration - subtract 1s for the focus delay at start
                this.start = Date.now();
                this.timer = setInterval(() => this.setState({duration: Math.floor((Date.now() - this.start) / 1000 - 1)}), 1000);

                // turn on the recording light and start recording
                this.setState({recordLive: true, delay: 0});
                this.camera.recordAsync(options)
                    .then((result) => {
                        if (this.timer) {
                            clearInterval(this.timer)
                        }
                        this.setState({uri: result.uri, recording: false, duration: 0, recordLive: false});

                        // return the uri and go back to the redeem screen
                        //this.props.navigation.state.params.returnFunc(result.uri);
                        //this.props.navigation.pop();
                    })
                    .catch((err) => {
                        if (this.timer) {
                            clearInterval(this.timer)
                        }
                        this.setState({uri: null, recording: false, duration: 0, recordLive: false});
                    })
            }, 5 * 1000);
    }

    _endRecording() {
        if (!this.camera) {
            return;
        }
        if (this.state.recordLive) {
            this.camera.stopRecording();
        }
        else if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            clearInterval(this.countdown);
            this.setState({uri: null, recording: false, duration: 0, delay: 0, recordLive: false});
        }
    }

    render() {
        let recorder = (
            <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    type={RNCamera.Constants.Type[this.cameras[this.state.camera]]}
                    flashMode={(this.state.recording && !this.state.recordLive) ?
                        RNCamera.Constants.FlashMode['torch'] : RNCamera.Constants.FlashMode['off']}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />

                {this.state.delay > 0 &&
                <View
                    style={StyleSheet.flatten([styles.absolute, styles.centered, {backgroundColor: 'rgba(0,0,0,0.25)'}])}>
                    <Text style={{color: 'white', fontSize: Metrics.reallySize(128)}}>{this.state.delay}</Text>
                </View>
                }
                <View>
                    {this.state.recordLive &&
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0, left: -2 * 5, bottom: 0, right: 0
                    }}>
                        <View style={{
                            height: 5,
                            width: 5,
                            borderRadius: 5,
                            backgroundColor: 'red'
                        }}/>
                    </View>
                    }
                    <Text style={{
                        fontSize: 14,
                        color: 'white'
                    }}>{'00:00:' + (this.state.duration < 10 ? '0' : '') + this.state.duration}</Text>
                </View>
                <View style={{
                    position: 'absolute',
                    backgroundColor: this.state.recording ? 'transparent' : 'rgba(0,0,0,0.35)',
                    bottom: 0, left: 0, right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 75 + 2 * 20
                }}>
                    <TouchableOpacity
                        onPress={() => router.pop()}
                        disabled={this.state.recording}
                        style={{flex: 1, padding: 15}}
                    >
                        {!this.state.recording &&
                        <Text style={{fontSize: 14, color: 'white', textAlign: 'left'}}>Cancel</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (!this.state.recording) {
                                this._startRecording();
                            }
                            else {
                                this._endRecording();
                            }
                        }}
                        style={{
                            flex: 0,
                            borderColor: 'white',
                            borderWidth: 5,
                            borderRadius: 75,
                            height: 75,
                            width: 75,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 5,
                            margin: 20
                        }}
                    >
                        {!this.state.recording ?
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                backgroundColor: 'red',
                                borderRadius: 15
                            }}/>
                            :
                            <View style={{
                                height: 30,
                                width: 30,
                                backgroundColor: 'red',
                                borderRadius: 2
                            }}/>
                        }
                    </TouchableOpacity>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 15}}>
                        {!this.state.recording &&
                        <TouchableOpacity
                            style={{backgroundColor: 'green', height: 10, width: 10}}
                            onPress={() => this.setState({camera: (this.state.camera + 1) % this.cameras.length})}
                        />
                        }
                    </View>
                </View>
            </View>
        );
        let player = !this.state.uri ? null : (
            <View style={{backgroundColor: 'black', flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
                <Video source={{uri: this.state.uri}}    // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       rate={1.0}                              // 0 is paused, 1 is normal.
                       volume={1.0}                            // 0 is muted, 1 is normal.
                       muted={false}                           // Mutes the audio entirely.
                       paused={!this.state.playing}                          // Pauses playback entirely.
                       onEnd={() => this.setState({playing: false})}
                       resizeMode="contain"                    // Fill the whole screen at aspect ratio.*
                       repeat={true}                           // Repeat forever.
                       playInBackground={false}                // Audio continues to play when app entering background.
                       playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       style={{height: '100%', width: '100%'}}
                />
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    bottom: 0, left: 0, right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 75 + 2 * 20
                }}>
                    <TouchableOpacity onPress={() => this.setState({uri: null})}
                                      style={{flex: 1, padding: 15}}>
                        <Text style={{fontSize: 14, color: 'white', textAlign: 'left'}}>Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height: 30, width: 30, backgroundColor: 'yellow'}}
                        onPress={() => this.setState({playing: !this.state.playing})}
                    />
                    <TouchableOpacity style={{flex: 1, padding: 15}}
                                      onPress={() => {
                                          router.pop();
                                      }}
                    >
                        <Text style={{fontSize: 14, color: 'white', textAlign: 'right'}}>Use Video</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return (this.state.uri ? player : recorder);
    }
}
