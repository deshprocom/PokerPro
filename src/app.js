/**
 * Created by lorne on 2016/12/19.
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/ConfigureStore';
import './configs/GlobalVariables';
import PuKe from './pages/Root'
import './configs/StorageConfig';
import './I18n/I18n';
import SplashScreen from 'react-native-smart-splash-screen';
import JAnalyticsModule from 'janalytics-react-native';
import {
    UMENG_ANDROID, UMENG_IOS, WX_ID, WX_Secret,
    QQ_SHARE_ID, QQ_SHARE_KEY, WX_URL, WB_URL,
    WB_ID, WB_KEY, JPUSH_APPKEY
} from './configs/Constants';
import Orientation from 'react-native-orientation';
import * as WeChat from 'react-native-wechat';
import JShareModule from 'jshare-react-native';
import JMessage from "jmessage-react-plugin";


console.disableYellowBox = true;

const store = configureStore();

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}


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


        ///极光统计
        JAnalyticsModule.setup({appKey: JPUSH_APPKEY});

        ///jMessage
        JMessage.init({
            appkey:JPUSH_APPKEY,
            isProduction:false,//是否为生产模式
            isOpenMessageRoaming:false,//是否开启消息漫游
        });
        //开启Debug模式
        JMessage.setDebugMode({ enable: false });


        WeChat.registerApp(WX_ID).then(ret => {
            console.log('registerApp', ret)
        }, err => {
            console.log(err)
        });

    }

}