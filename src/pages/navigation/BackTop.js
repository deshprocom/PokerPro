import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';

export default class BackTop extends PureComponent {
    state = {
        show: false
    };

    onScroll = (event) => {
        const offsetHeight = 500;
        let offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY >= offsetHeight) {
            this.setState({show: true});
        } else {
            this.setState({show: false});
        }
    };

    render() {
        if (!this.state.show) {
            return null
        }
        return (
            <Animated.View style={styleB.buttonAnimated}>
                <TouchableOpacity
                    onPress={()=>{
                    this.props.scrollToTop()
                }}>
                    <View style={styleB.buttonView}>
                        <Image style={styleB.topImg} source={Images.top}/>
                        <Text style={styleB.topText}>{I18n.t('backTop')}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

        )
    }
}
const styleB = StyleSheet.create({
    buttonAnimated: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 999
    },
    buttonView: {
        width: 94,
        height: 50,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImg: {
        width: 19,
        height: 12
    },
    topText: {
        backgroundColor: 'transparent',
        color: '#151516',
        fontSize: 12,
        marginTop: 5
    }
})

