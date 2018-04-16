import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Animated} from 'react-native';

let minHeight = 160;

class ExpandText extends Component {
    constructor(props) {
        super(props);


        this.state = {
            label: props.label,
            expanded: true,
            animation: new Animated.Value()
        };
    }

    toggle = () => {
        let initialValue = this.state.expanded ? this.state.maxHeight + minHeight : minHeight,
            finalValue = this.state.expanded ? minHeight : this.state.maxHeight + minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight = (event) => {
        console.log('展开', event.nativeEvent.layout.height)
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }


    render() {
        return (
            <Animated.View
                style={[styles.container, {height: this.state.animation}]}>


                <View style={styles.body} onLayout={this._setMaxHeight}>
                    {this.props.children}
                </View>

                <Text onPress={this.toggle}>{this.state.label}</Text>

            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 10,
        color: '#2a2f43',
        fontWeight: 'bold'
    },
    button: {},
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        padding: 10,
        paddingTop: 0
    }
});

export default ExpandText;