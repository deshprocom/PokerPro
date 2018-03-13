import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput, Platform,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

const styles = StyleSheet.create({
    btn_switch: {
        height: 34,
        width: 53
    }
})

export default class Switch extends PureComponent {

    state = {
        handle: false
    }

    handle_value = () => {
        return this.state.handle
    }

    render() {
        return <TouchableOpacity
            onPress={() => {
                let handle_value = !this.state.handle
                this.props.handle_value(handle_value)
                this.setState({
                    handle: handle_value
                })
            }}>
            <Image
                style={styles.btn_switch}
                source={this.state.handle ? Images.handle : Images.handle2}/>

        </TouchableOpacity>
    }
}