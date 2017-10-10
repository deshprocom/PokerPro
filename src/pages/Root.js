/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Router} from 'react-native-router-flux';
import {Stacks} from '../configs/StackRoute';
import StorageKey from '../configs/StorageKey';
import {setAccessToken,getBaseURL} from '../services/RequestHelper';
import { putLoginUser} from '../utils/ComonHelper';

export default class Root extends Component {


    componentWillMount(){
        getBaseURL();
        storage.load({key: StorageKey.LoginUser})
            .then(ret => {
                let {access_token} = ret;
                putLoginUser(ret);
                setAccessToken(access_token);

            }).catch(err => {

            const recentRaces = {
                number: 8
            };
            this.props._getRecentRaces(recentRaces)
        })
    }


    render() {
        return (<Router scenes={Stacks}/>);
    }
}