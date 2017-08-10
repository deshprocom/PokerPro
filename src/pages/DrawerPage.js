/**
 * Created by lorne on 2017/1/3.
 */
import React from 'react';
import {StyleSheet, BackAndroid, Navigator} from 'react-native';
import Drawer from 'react-native-drawer'
import {connect} from 'react-redux';
import SidePage from './SidePage';
import HomePage from './HomePage';
import {fetchGetCertification} from '../actions/AccountAction';
import {closeDrawer}from '../reducers/DrawerRedux';
import {setDispatchAction} from '../utils/ComonHelper';
import {GET_CERTIFICATION} from '../actions/ActionTypes';

class DrawerPage extends React.Component {


    componentDidMount() {
        setDispatchAction(GET_CERTIFICATION, this.props._getRealName)
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
                    router={this.props.router}/>}
                tapToClose
                openDrawerOffset={100}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}


            >
                <HomePage router={this.props.router}/>

            </Drawer>
        )
    }
}

const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},

}

const bindAction = dispatch => ({
    closeDrawer: () => dispatch(closeDrawer()),
    _getRealName: () => dispatch(fetchGetCertification())
});

const mapStateToProps = state => ({
    drawerState: state.DrawerRedux.drawerState

});

export default connect(mapStateToProps, bindAction)(DrawerPage);