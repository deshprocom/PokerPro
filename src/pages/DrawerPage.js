/**
 * Created by lorne on 2017/1/3.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import Drawer from 'react-native-drawer'
import {connect} from 'react-redux';
import SidePage from './SidePage';
import HomePage from './HomePage';
import {fetchGetCertification} from '../actions/AccountAction';
import {closeDrawer} from '../reducers/DrawerRedux';
import {setDispatchAction} from '../utils/ComonHelper';
import {GET_CERTIFICATION, GET_RECENT_RACES, GET_PROFILE} from '../actions/ActionTypes';
import {fetchGetProfile} from '../actions/PersonAction';
import {fetchGetRecentRaces} from '../actions/RacesAction';
import Router from '../configs/Router';


class DrawerPage extends React.Component {

    componentWillMount(){

        this.router = this.router || new Router();
        global.router = this.router;

    }

    componentDidMount() {
        setDispatchAction(GET_CERTIFICATION, this.props._getRealName);
        setDispatchAction(GET_RECENT_RACES, this.props._getRecentRaces);
        setDispatchAction(GET_PROFILE, this.props._getProfile);

    }


    componentDidUpdate() {
        if (this.props.drawerState === 'opened') {
            this.openDrawer();
        }

        if (this.props.drawerState === 'closed') {
            this._drawer.close();
        }
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if (this.props.drawerState === 'opened') {
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => {
                    this._drawer = ref;
                }}
                type="static"
                onClose={() => this.closeDrawer()}
                content={<SidePage
                    router={this.router}/>}
                tapToClose
                openDrawerOffset={100}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}


            >
                <HomePage router={this.router}/>
            </Drawer>

        )
    }
}

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},

}

const bindAction = dispatch => ({
    closeDrawer: () => dispatch(closeDrawer()),
    _getRealName: () => dispatch(fetchGetCertification()),
    _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body))
});

const mapStateToProps = state => ({
    drawerState: state.DrawerRedux.drawerState

});

export default connect(mapStateToProps, bindAction)(DrawerPage);