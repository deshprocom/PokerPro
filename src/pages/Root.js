/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Navigator, Platform, BackAndroid} from 'react-native'
import Router from '../configs/Router';
import DrawerPage from './DrawerPage';
let initialRoute = {
    name: 'DrawerPage',
    page: DrawerPage,
};

export default class Root extends Component {
    constructor(props) {

        super(props);

    }

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

    renderScene = ({page, name, id, index, props, params}, navigator) => {
        this.router = this.router || new Router(navigator);
        global.router = this.router;

        if (page) {
            return React.createElement(page, {
                ...props,
                ref: view => this[index] = view,
                router: this.router,
                name,
                params,
                route: {
                    name, id, index
                },
            })
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
    }

    render() {

        return (<Navigator
            ref={view => this.navigator=view}
            initialRoute={initialRoute}
            renderScene={this.renderScene}
        />);
    }
}