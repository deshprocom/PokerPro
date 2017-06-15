/**
 * Created by lorne on 2016/12/19.
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';
import PuKe from './index';
import '../configs/StorageConfig';
import '../I18n/I18n';
import SplashScreen from 'react-native-smart-splash-screen';
import MobclickAgent from 'rn-umeng';
import {UMENG_ANDROID,UMENG_IOS} from '../configs/Constants';
import Orientation from 'react-native-orientation';
console.disableYellowBox = true;

const store = configureStore();

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PuKe/>
            </Provider>
        )
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        });

        if (Platform.OS === 'ios')
            MobclickAgent.startWithAppkey(UMENG_IOS);
        else
            MobclickAgent.startWithAppkey(UMENG_ANDROID);

        MobclickAgent.onEvent("startApp");
    }

}