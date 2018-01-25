/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
} from 'react-native';

let styles = StyleSheet.create({
    background: {
        backgroundColor: '#bbbbbb',
        height: 3,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    fill: {
        backgroundColor: '#F34A4A',
        height: 5
    },
    percent: {
        zIndex: 3,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F34A4A',
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 40
    },
    txt_per: {
        color: '#F34A4A',
        fontSize: 14,
    }
});

export default class ProgressBar extends Component {

    static  defaultProps = {
        style: styles,
        easing: Easing.inOut(Easing.ease),
        easingDuration: 500
    };


    state = {
        progress: new Animated.Value(this.props.initialProgress || 0)
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
            this.update();
        }
    }

    render() {

        let fillWidth = this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
        });


        return (
            <View style={{
                flexDirection: 'row', height: 25,
                alignItems: 'center', marginTop: 10
            }}>
                <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
                    <Animated.View style={[styles.fill, this.props.fillStyle, {width: fillWidth}]}/>
                </View>
                <Animated.View
                    style={[styles.percent, {marginLeft: JSON.stringify(fillWidth) - 40}]}>
                    <Text style={styles.txt_per}>{Number.parseInt(this.props.initialProgress * 100)}%</Text>
                </Animated.View>
            </View>

        );
    }

    update = () => {
        Animated.timing(this.state.progress, {
            easing: this.props.easing,
            duration: this.props.easingDuration,
            toValue: this.props.progress
        }).start();
    }
}
