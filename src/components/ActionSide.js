/**
 * Created by lorne on 2017/6/5.
 */
import React, {Component, PropTypes} from 'react'
import {
    Text, View, StyleSheet, Dimensions,
    Modal, TouchableHighlight, Animated, ScrollView
} from 'react-native'

export default class ActionSide extends Component {

    constructor(props) {
        super(props);
        this.translateY = 300;
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY)
        };
    }

    render() {
        return (<Modal>
            <View style={styles.wrapper}>
                <Animated.View
                    style={[sheetStyle.bd, {height: this.translateY, transform: [{translateY: sheetAnim}]}]}
                >

                </Animated.View>

            </View>
        </Modal>)
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
});
