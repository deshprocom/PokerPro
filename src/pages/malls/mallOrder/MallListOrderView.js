import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform
} from 'react-native';
import propTypes from 'prop-types';
import AllStatus from './OrderListStatus';
import UnReceived from './UnReceived';


export default class MallListOrderView extends Component {

    static propTypes = {
        category: propTypes.object,
        isSearch: propTypes.bool
    };

    componentWillMount() {
        this.searchKey = '';
    };

    selectStatus = (category) => {

        if (category.id === 1) {
            return <UnReceived/>
        } else if (category.id  === 2) {
            return <UnReceived/>
        } else if (category.id  === 3) {
            return <AllStatus/>
        } else if (category.id  === -1) {
            return <AllStatus/>
        }
    };

    render() {
        console.log(this)
        const {category} = this.props;
        return (
            <div style={{flex:1}}>
                {this.selectStatus(category)}
            </div>
        )

    }


}

const styles = StyleSheet.create({


});