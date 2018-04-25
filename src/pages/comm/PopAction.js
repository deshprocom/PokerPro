import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Modal, Text} from 'react-native';
import {Images, Colors} from '../../Themes/index';
import propTypes from 'prop-types';
import I18n from 'react-native-i18n';


export default class PopAction extends PureComponent {

    static propTypes = {
        btnArray: propTypes.array
    }

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }


    btnArrayView = () => {

        const {btnArray} = this.props;

        return btnArray.map((item, index) => {
            return <TouchableOpacity
                onPress={() => item.onPress && item.onPress()}
                activeOpacity={1}
                key={'action' + index}
                style={{
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomColor: Colors._ECE,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>

                <Text style={[{fontSize: 17, fontWeight: 'bold'}, item.txtStyle]}>{item.name}</Text>

            </TouchableOpacity>
        })
    }

    render() {
        return (<Modal
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {
            }}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.toggle} style={{flex: 1}}/>
                {this.btnArrayView()}

            </View>

        </Modal>)
    }
}