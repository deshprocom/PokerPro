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
        JAnalyticsModule.setup({appKey:JPUSH_APPKEY});

        ///极光分享
        let config =
            {
                appKey:JPUSH_APPKEY,
                channel:'deshpro-app',
                advertisingId:'',
                isProduction:false,
                wechatAppId: WX_ID,
                wechatAppSecret: WX_Secret,
                qqAppId: QQ_SHARE_ID,
                qqAppKey: QQ_SHARE_KEY,
                sinaWeiboAppKey: WB_ID,
                sinaWeiboAppSecret: WB_KEY,
                sinaRedirectUri: WB_URL,
                facebookAppId: '',
                facebookDisplayName: '',
                isSupportWebSina: true
            };

        JShareModule.setup(config);

        // // 第二个参数决定在分享界面的排序1_、2_、3_为前缀
        // UMShare.initShare(Platform.OS === 'ios' ? UMENG_IOS : UMENG_ANDROID,
        //     {
        //         "1_weixin": {
        //             appKey: WX_ID,
        //             appSecret: Platform.OS === 'ios' ? '' : WX_Secret,
        //             redirectURL: WX_URL,
        //         },
        //         "2_qq": {
        //             appKey: QQ_SHARE_ID,
        //             appSecret: QQ_SHARE_KEY,
        //             redirectURL: WX_URL,
        //         },
        //         "3_sina": {
        //             appKey: WB_ID,
        //             appSecret: WB_KEY,
        //             redirectURL: WB_URL,
        //         },
        //     },
        //     false);


        WeChat.registerApp(WX_ID).then(ret => {
            console.log('registerApp', ret)
        }, err => {
            console.log(err)
        });

    }

}