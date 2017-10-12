/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Router} from 'react-native-router-flux';
import {Stacks} from '../configs/StackRoute';
import StorageKey from '../configs/StorageKey';
import {setAccessToken, getBaseURL} from '../services/RequestHelper';
import {putLoginUser, getUserData, updateApp} from '../utils/ComonHelper';
import {init} from '../services/ConfigDao';
import {getActivityPush, getUpdate} from '../services/AccountDao';
import JpushHelp from '../services/JpushHelper';

export default class Root extends Component {

    state = {
        languageChange: false,
    };


    constructor(props) {
        super(props);
        JpushHelp.addPushListener(this.receiveCb, this.openCb);
        init(() => {
            this.setState({
                languageChange: true
            });
        });
        getUserData();
        getBaseURL();
        //App更新

        storage.load({key: StorageKey.LoginUser})
            .then(ret => {
                let {access_token} = ret;
                putLoginUser(ret);
                setAccessToken(access_token);

            }).catch(err => {

            const recentRaces = {
                number: 10
            };
            this.props._getRecentRaces(recentRaces)
        });

        setTimeout(this._getUpdate, 300);
    }

    _getUpdate = () => {
        getUpdate(data => {
            updateApp(data);
        }, err => {

        })
    };

    receiveCb = (notification) => {
        const {aps} = notification;
        if (aps.badge > 0) {
            this.setState({
                badge: true
            })
        }
    };

    openCb = (notification) => {

    };

    render() {
        return (<Router scenes={Stacks}/>);
    }

    componentWillUnmount() {
        JpushHelp.removePushListener();
    }

}