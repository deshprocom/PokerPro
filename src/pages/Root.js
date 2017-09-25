/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Router} from 'react-native-router-flux';
import {Stacks} from '../configs/StackRoute';


export default class Root extends Component {


    render() {

        return (<Router scenes={Stacks}/>);
    }
}