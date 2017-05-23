/**
 * Created by lorne on 2017/5/22.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Button,

    DeviceEventEmitter,
    NativeAppEventEmitter,
} from 'react-native';
import JPushModule from 'jpush-react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import moment from 'moment';

export default class JpushPage extends Component {

    state = {
        registrationId: '',
        setTags: '',
        setAlias: '',
        appkey: '',
        connectStatus: '',
        notification: {},

    };

    render() {
        const {setTags, setAlias, registrationId, notification} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>


            <Button title={'启动Jpush'}
                    onPress={this.onInitPress}/>

            <Button title={'设置Tag'}
                    onPress={this.setTag}/>

            <Button title={'设置别名'}
                    onPress={this.setAlias}/>





            <Text>"setTags: "{setTags}</Text>
            <Text>"setAlias: "{setAlias}</Text>
            <Text>"registrationId: "{registrationId}</Text>
            <Text>"ReceiveNotification: "{notification.alert} badge: {notification.badge}</Text>

        </View>)
    }

    componentDidMount() {

        NativeAppEventEmitter.addListener('networkDidSetup', (token) => {
            this.setState({connectStatus: '已连接'});
        });
        NativeAppEventEmitter.addListener('networkDidClose', (token) => {
            this.setState({connectStatus: '连接已断开'});
        });
        NativeAppEventEmitter.addListener('networkDidRegister', (token) => {
            this.setState({connectStatus: '已注册'});
        });
        NativeAppEventEmitter.addListener('networkDidLogin', (token) => {
            this.setState({connectStatus: '已登陆'});
        });

        var subscription = NativeAppEventEmitter.addListener(
            'ReceiveNotification',
            (notification) => {
                console.log(notification)
                this.setState({
                    notification: notification.aps
                })
            }
        );

        var subscription = NativeAppEventEmitter.addListener(
            'OpenNotification',
            (notification) => console.log(notification)
        );

        var subscription = NativeAppEventEmitter.addListener(
            'networkDidReceiveMessage',
            (message) => console.log(message)
        );

    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
        NativeAppEventEmitter.removeAllListeners();
    }





    onInitPress = () => {

        console.log('on click init push ');
        // PushHelper.setupPush('dssdf');
        JPushModule.getRegistrationID((registrationid) => {
            console.log(registrationid);
            this.setState({registrationId: registrationid});
        });
    }


    setTag = () => {

        /*
         * 请注意这个接口要传一个数组过去，这里只是个简单的示范
         */
        JPushModule.setTags(["VIP", "NOTVIP"], () => {
            this.setState({
                setTag: "Set tag succeed"
            })
            console.log("Set tag succeed");
        }, () => {
            this.setState({
                setTag: "Set tag failed"
            })
            console.log("Set tag failed");
        });

    }

    setAlias = () => {

        JPushModule.setAlias('lajsdfjhol234234ASd', () => {
            this.setState({
                setAlias: "Set alias succeed"
            })
            console.log("Set alias succeed");
        }, () => {
            this.setState({
                setAlias: "Set alias failed"
            })
            console.log("Set alias failed");
        });

    }

}
