/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Navigator, Platform, BackAndroid} from 'react-native'

import {Stacks} from '../configs/StackRouters';



export default class Root extends Component {


    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }



    onBackAndroid = () => {
        const nav = this.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    };

    render() {

        return (<Stacks/>);
    }
}