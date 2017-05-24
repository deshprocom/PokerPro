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

import VideoPlayer from '../../components/VideoPlayer';

export default class VideoPage extends Component {
    render() {
        return (<View style={styles.container}>
            <VideoPlayer
                playInBackground={ false }   // play audio when entering background
                playWhenInactive={ false }   // [iOS] continuing playing when notification centre active
                resizeMode={ 'contain' }     // 'contain' or 'cover' should be used.
                paused={ false }             // stop playback entirely
                repeat={ false }             // Repeats at end of duration
                muted={ false }              // Mutes the audio entirely.
                title={ '' }                 // Video title, if null title area is hidden
                volume={ 1 }                 // 0 is muted, 1 is normal.
                rate={ 1 }
                source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
                navigator={ this.props.navigator }
            />
        </View>)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

