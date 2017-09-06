import React, {PropTypes, Component} from 'react';
import {
    StyleSheet, Image, Platform, Modal,
    Dimensions, View, Text, ScrollView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import Colors from "../../styles/Colors";

var imgClose = require('../../../source/message/msg_close.png');


export default class ActivityModel extends Component {

    state = {
        visible: false,
        activity: {}
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    setData = (activity) => {
        this.setState({
            activity: activity,
            visible: true
        })

    };

    render() {
        const {visible, activity} = this.state;
        return (<Modal
            transparent
            visible={visible}>
            <View style={styles.body}>
                <Image style={styles.banner}
                       source={{uri: activity.pushed_img}}/>

                <TouchableOpacity
                    onPress={this.toggle}
                    style={styles.btnClose}>
                    <Image style={styles.close}
                           source={imgClose}/>

                </TouchableOpacity>

            </View>

        </Modal>)
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner: {
        width: 286,
        height: 384,
        borderRadius: 5,
        backgroundColor: 'green'
    },
    close: {
        width: 30,
        height: 30
    },
    btnClose: {
        padding: 25,
    }
});