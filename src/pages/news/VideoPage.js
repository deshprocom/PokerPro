'use strict';
import React, {
    Component
} from 'react';

import {
    AlertIOS,
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

} from 'react-native';
import Orientation from 'react-native-orientation';

import VideoPlayer from '../../components/VideoPlayer';

export default class VideoPage extends Component {
    render() {
        return (<View style={styles.container}>
            <VideoPlayer
                title={ 'oceans.mp4' }                 // Video title, if null title area is hidden
                source={{ uri: 'http://v.yoai.com/femme_tampon_tutorial.mp4' }}
            />
        </View>)
    }

    componentWillMount() {
        Orientation.lockToLandscape();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

