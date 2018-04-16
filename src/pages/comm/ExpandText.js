import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Animated} from 'react-native';

let minHeight = 100;

class ExpandText extends Component {
    constructor(props) {
        super(props);


        this.state = {
            expanded: false,
        };
    }


    _setMaxHeight = (event) => {
        console.log('展开', event.nativeEvent.layout)

        this.setState({
            expanded: event.nativeEvent.layout.height > 100
        });
    }

    toggle = () => {
        this.setState({expanded: !this.state.expanded})
    }

    txt = () => {
        if (this.state.expanded)
            return <Text
                numberOfLines={5}
                onPress={this.toggle}
                style={this.props.txtStyle}
            >{this.props.body}</Text>
        else
            return (
                <Text
                    onPress={this.toggle}
                    style={this.props.txtStyle}
                    onLayout={this._setMaxHeight}
                >{this.props.body}</Text>
            );
    }

    render() {
        return <View>
            {this.txt()}
        </View>

    }
}


export default ExpandText;