/**
 * Created by lorne on 2016/12/20.
 */
import React, {Component} from 'react';
import {Router} from 'react-native-router-flux';
import {Stacks} from '../configs/StackRoute';
import StorageKey from '../configs/StorageKey';
import {setAccessToken, getBaseURL} from '../services/RequestHelper';
import {putLoginUser, getUserData, updateApp, setDispatchAction, isEmptyObject,getDispatchAction} from '../utils/ComonHelper';
import {init} from '../services/ConfigDao';
import {releases_show, getUpdate} from '../services/AccountDao';
import {
    GET_CERTIFICATION,
    GET_RECENT_RACES,
    GET_PROFILE,
    GET_UNREAND_MSG,
    SWITCH_LANGUAGE,
    VIDEO_PAUSE,
    ADD_CART,
    DELETE_CART
} from '../actions/ActionTypes';
import JpushHelp from '../services/JpushHelper';
import {fetchGetProfile} from '../actions/PersonAction';
import {fetchGetRecentRaces} from '../actions/RacesAction';
import {fetchGetCertification, switchLanguage, videoPause} from '../actions/AccountAction';
import {connect} from 'react-redux';
import {fetchUnreadMsg} from '../actions/AccountAction';
import {addCart, deleteCart} from '../actions/MallAction';

class Root extends Component {

    state = {
        languageChange: false,
    };

    componentDidMount() {

        setDispatchAction(GET_CERTIFICATION, this.props._getRealName);
        setDispatchAction(GET_RECENT_RACES, this.props._getRecentRaces);
        setDispatchAction(GET_PROFILE, this.props._getProfile);
        setDispatchAction(GET_UNREAND_MSG, this.props._fetchUnreadMsg);
        setDispatchAction(SWITCH_LANGUAGE, this.props._switchLanguage);
        setDispatchAction(VIDEO_PAUSE, this.props._videoPause);
        setDispatchAction(DELETE_CART, this.props._deleteCart);
        setDispatchAction(ADD_CART, this.props._addCart);


        init(() => {
            this.setState({
                languageChange: true
            });
        });
    }

    constructor(props) {
        super(props);
        JpushHelp.addPushListener(this.receiveCb, this.openCb);

        getUserData();
        getBaseURL(() => {
            this._getUpdate();
        });
        //App更新

        storage.load({key: StorageKey.LoginUser})
            .then(ret => {
                console.log('User', ret);
                let {access_token, user_id} = ret;
                putLoginUser(ret);
                setAccessToken(access_token);
                this.props._getProfile(user_id);
                this.props._fetchUnreadMsg();
            }).catch(err => {

        });

    }
    _getUpdate = () => {
        getUpdate(data => {
            updateApp(data);
            releases_show(data => {
                global.menuReleases = data;
                getDispatchAction()['BACK_TOP']();
            }, err => {
            })
        }, err => {

        })
    };

    receiveCb = (notification) => {
        const {aps} = notification;
        if (aps.badge > 0) {
            if (!isEmptyObject(global.login_user))
                this.props._fetchUnreadMsg()
        }
    };

    openCb = (notification) => {

    };

    render() {
        return (<Router
            scenes={Stacks}/>);
    }

    componentWillUnmount() {
        JpushHelp.removePushListener();
    }

}

const bindAction = dispatch => ({
    _getRealName: () => dispatch(fetchGetCertification()),
    _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _fetchUnreadMsg: () => dispatch(fetchUnreadMsg()),
    _switchLanguage: () => dispatch(switchLanguage()),
    _videoPause: () => dispatch(videoPause()),
    _addCart: () => dispatch(addCart()),
    _deleteCart: () => dispatch(deleteCart())
});

const mapStateToProps = state => ({
    drawerState: state.DrawerRedux.drawerState,
    actionType: state.AccountState.actionType

});

export default connect(mapStateToProps, bindAction)(Root);