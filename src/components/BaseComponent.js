import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Loading from './Loading';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes/index';

export default class BaseComponent extends Component {


    render() {
        return <View style={ApplicationStyles.bgContainer}>
            {this._renderChildren()}

            <Loading ref={ref => this.loading = ref}/>
        </View>
    }


    close() {
        this.loading.clone()
    };

    open = () => {
        this.loading.open()
    };

    _renderChildren() {
        return React.Children.map(this.props.children, (child) => {
            return child
        })
    }
}