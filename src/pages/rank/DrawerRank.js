import React, {Component} from 'react';
import {View} from 'react-native';
import Drawer from 'react-native-drawer';

import {Colors, Images, Metrics} from '../../Themes'

import MainRankPage from './MainRankPage';
import FiltePage from './FiltePage';
import TimerMixin from 'react-timer-mixin';
import {connect} from 'react-redux';

class DrawerRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerState: false
        }
    }


    shouldComponentUpdate(newProps, nextState) {
        if (newProps.actionType === 'SWITCH_LANGUAGE') {
            this.mainRank.refresh();
            return false;
        }

        return true;
    }


    closeRankDrawer = (params) => {

        this._drawer.close();

        TimerMixin.setTimeout(() => {
            if (this.mainRank && this.filterPage)
                this.mainRank.filter(params)

        }, 200);

    };

    _handleDrawer() {

        if (this._drawer._open) {
            this._drawer.close();
            this.setState({
                drawerState: false
            })
        } else {
            this._drawer.open();
            this.setState({
                drawerState: true
            })
        }
    }


    render() {
        return (
            <Drawer ref={(ref) => this._drawer = ref}
                    type='overlay'
                    content={<FiltePage
                        ref={ref => this.filterPage = ref}
                        cancelDrawer={this.closeRankDrawer}/>}
                    tapToClose
                    onClose={() => {
                        this.setState({
                            drawerState: false
                        });
                    }}
                    openDrawerOffset={63}
                    styles={this.state.drawerState ? drawerStyles : drawerStylesColse}
                    tweenHandler={(ratio) => ({
                        main: {opacity: (2 - ratio) / 2}
                    })}
                    side="right">

                <MainRankPage
                    ref={ref => this.mainRank = ref}
                    openRank={() => this._handleDrawer()}/>

            </Drawer>)
    }
}

const drawerStyles = {
    // drawer: { shadowColor: Colors._000, shadowOpacity: 0.8, shadowRadius: 3},
    main: {backgroundColor: null},
    mainOverlay: {backgroundColor: Colors._000, opacity: 0.58}
};
const drawerStylesColse = {
    // drawer: { shadowColor: Colors._000, shadowOpacity: 0.8, shadowRadius: 3},
    main: {backgroundColor: null},
    mainOverlay: {backgroundColor: null}
}

const bindAction = dispatch => ({});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
});

export default connect(mapStateToProps, bindAction)(DrawerRank);