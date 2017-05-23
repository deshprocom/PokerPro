/**
 * Created by lorne on 2017/5/23.
 */
import JPushModule from 'jpush-react-native';
import {DeviceEventEmitter, NativeAppEventEmitter, Platform} from 'react-native'
const receiveNotificationEvent = "receiveNotification";
const openNotificationEvent = "openNotification";
const getRegistrationIdEvent = "getRegistrationId";

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
        if (Platform.OS === 'ios') {
            this.iosReceiveNotification(receiveCb);
            this.iosOpenNotification(openCb)
        } else {
            JPushModule.addReceiveNotificationListener(receiveCb);
            JPushModule.addReceiveOpenNotificationListener(openCb)
        }
    }


    static removePushListener() {
        if (Platform.OS === 'ios') {
            DeviceEventEmitter.removeAllListeners();
            NativeAppEventEmitter.removeAllListeners();
        } else {
            JPushModule.removeReceiveNotificationListener(receiveNotificationEvent);
            JPushModule.removeGetRegistrationIdListener(getRegistrationIdEvent);
            JPushModule.removeReceiveOpenNotificationListener(openNotificationEvent);

            JPushModule.clearAllNotifications();
        }
        console.log("Will clear all notifications");
    }

//设置 badge 值
    static iosSetBadge(badge, cb) {
        JPushModule.setBadge(badge, cb);
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


