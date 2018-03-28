/**
 * Created by lorne on 2017/5/23.
 */
import JPushModule from 'jpush-react-native';
import {DeviceEventEmitter, NativeAppEventEmitter, Platform} from 'react-native'


export default class JpushHelper {
    static setTags(array, successCallback, failedCallback) {
        JPushModule.setTags(array, successCallback, failedCallback)
    }

    static getRegistrationID(callback) {
        JPushModule.getRegistrationID(callback);
    }


    static setAlias(alias, successCallback, failedCallback) {
        JPushModule.setAlias(alias, successCallback, failedCallback)
    }

    static addPushListener(receiveCb, openCb) {

        if (Platform.OS !== 'ios')
            JPushModule.notifyJSDidLoad((resultCode) => {
                console.log('Jpush', resultCode)
            });

        JPushModule.addReceiveCustomMsgListener(openCb);
        JPushModule.addReceiveNotificationListener(receiveCb);
        JPushModule.addReceiveOpenNotificationListener(map => {
            console.log('Opening notification!')
            console.log('map.extra: ' + map.extras)

        })

    }


    static removePushListener() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener(openNotificationEvent)

    }

//设置 badge 值
    static iosSetBadge(badge) {
        if (Platform.OS === 'ios')
            JPushModule.setBadge(badge, (value) => {
                console.log('badge', value)
            });
    }

    //***************************IOS******************************************
//设置本地推送
    static iosSetLocalNotification(date, textContain, badge, alertAction, notificationKey, userInfo, soundName) {

        JPushModule.setLocalNotification(date, textContain, badge, alertAction, notificationKey, userInfo, soundName);
    }

    static iosReceiveNotification(cb) {

        let subscription = NativeAppEventEmitter.addListener(
            'ReceiveNotification',
            (notification) => {
                console.log('ReceiveNotification', notification);
                cb(notification)
            }
        );
    }

    static iosOpenNotification(cb) {
        let subscription = NativeAppEventEmitter.addListener(
            'OpenNotification',
            (notification) => {
                console.log('OpenNotification', notification);
                cb(notification)
            }
        );
    }

    static iosnetworkDidReceiveMessage(cb) {
        let subscription = NativeAppEventEmitter.addListener(
            'networkDidReceiveMessage',
            (message) => {
                console.log(message);
                cb(message)
            }
        );
    }

    //***************************IOS******************************************


    //***************************ANDROID******************************************
    static initPush() {
        JPushModule.initPush();
    }

    static getInfo(map) {
        JPushModule.getInfo(map)
    }

    static stopPush() {
        JPushModule.stopPush();
    }

    static resumePush() {
        JPushModule.resumePush();
    }

    static setStyleBasic() {
        JPushModule.setStyleBasic()
    }

    static addReceiveCustomMsgListener(callback) {
        JPushModule.addReceiveCustomMsgListener(callback)
    }

    static removeReceiveCustomMsgListener(event) {
        JPushModule.removeReceiveCustomMsgListener(event)
    }


    //***************************ANDROID******************************************
}


