import React, {PureComponent} from 'react';
import {
    StyleSheet, Image, Platform,
    View, Text
} from 'react-native';

export default class MapPosition extends PureComponent {

    state = {
        location: {}
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(data => {
            console.log('位置坐标：', data)
            this.setState({
                location: data
            })
        }, err => {
            console.log(err)
        })

    }



    render() {
        return <View>
            <Text>{JSON.stringify(this.state.location)}</Text>
        </View>
    }
}