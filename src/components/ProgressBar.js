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
        height: 5,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    fill: {
        backgroundColor: '#F34A4A',
        height: 5
    },
    percent: {
        zIndex: 9,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#F34A4A',
        color: '#F34A4A',
        fontSize: 14,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2
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
                <Animated.Text
                    style={[styles.percent, {marginLeft: fillWidth}]}>{Number.parseInt(this.props.initialProgress * 100)}%</Animated.Text>
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
