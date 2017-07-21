import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, BackAndroid, Navigator} from 'react-native';
import Drawer from 'react-native-drawer';

import {Colors, Images, Metrics} from '../../Themes'

import MainRankPage from './MainRankPage';
import FiltePage from './FiltePage';


class DrawerRank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerState: false
        }
    }

    openRankDrawer = () => {
        this._drawer.open()
    };

    closeRankDrawer = () => {
        this._drawer.close()
    };

    _handleDrawer() {
        router.log('_handleDrawer', this._drawer._open);
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

    // 事例ref
    _search = ()=>{
        this.mainRank.topHeader()
    };

    render() {
        return (
            <Drawer ref={(ref) => this._drawer=ref}
                    type='overlay'
                    content={<FiltePage cancelDrawer={() => this.closeRankDrawer()}/>}
                    tapToClose
                    onClose={()=>{
                    this.setState({
                        drawerState : false
                    });
                }}
                    openDrawerOffset={63}
                    styles={this.state.drawerState?drawerStyles:drawerStylesColse}
                    tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
                    side="right">

                <MainRankPage
                    ref={ref=>this.mainRank = ref}
                    openRank={()=>this._handleDrawer()}/>

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

export default DrawerRank;