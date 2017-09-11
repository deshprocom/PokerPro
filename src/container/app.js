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
import {
    UMENG_ANDROID, UMENG_IOS, WX_ID, WX_Secret,
    QQ_SHARE_ID, QQ_SHARE_KEY, WX_URL, WB_URL,
    WB_ID, WB_KEY
} from '../configs/Constants';
import Orientation from 'react-native-orientation';
import UMShare from 'react-native-umshare';
import * as WeChat from 'react-native-wechat';

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


        // 第二个参数决定在分享界面的排序1_、2_、3_为前缀
        UMShare.initShare(Platform.OS === 'ios' ? UMENG_IOS : UMENG_ANDROID,
            {
                "1_weixin": {
                    appKey: WX_ID,
                    appSecret: Platform.OS === 'ios' ? '' : WX_Secret,
                    redirectURL: WX_URL,
                },
                "2_qq": {
                    appKey: QQ_SHARE_ID,
                    appSecret: QQ_SHARE_KEY,
                    redirectURL: WX_URL,
                },
                "3_sina": {
                    appKey: WB_ID,
                    appSecret: WB_KEY,
                    redirectURL: WB_URL,
                },
            },
            true);

        MobclickAgent.startWithAppkey(Platform.OS === 'ios' ? UMENG_IOS : UMENG_ANDROID);

        WeChat.registerApp(WX_ID).then(ret => {
            console.log('registerApp', ret)
        }, err => {
            console.log(err)
        });

        MobclickAgent.onEvent("startApp");
    }

}