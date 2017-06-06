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
        this.translateY = 268;
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY)
        };
    }

    show() {
        this.setState({visible: true});
        this._showSheet();
    };

    _showSheet() {
        Animated.timing(this.state.sheetAnim, {
            toValue: 0,
            duration: 250
        }).start()
    };


    render() {
        const {visible, sheetAnim} = this.state;

        return (<Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={this._cancel}>
            <View style={styles.wrapper}>
                <Text style={styles.overlay} onPress={this._cancel}></Text>
                <Animated.View
                    style={[styles.page ,
                    {height: this.translateY, transform: [{translateY: sheetAnim}]}]}
                >
                    <Text>辣椒卡斯蒂略分 </Text>

                </Animated.View>

            </View>
        </Modal>)
    }

    _cancel = () => {
        this._hideSheet(
            () => {
                this.setState({visible: false});
            }
        );

    };

    _hideSheet(callback) {
        Animated.timing(this.state.sheetAnim, {
            toValue: this.translateY,
            duration: 150
        }).start(callback || function () {
            })
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    page: {

        backgroundColor: 'white',
    },
    overlay: {
        flex: 1
    }
});
