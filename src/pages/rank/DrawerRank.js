import React,{Compontent, PropTypes} from 'react';
import {View, Text, StyleSheet, BackAndroid, Navigator} from 'react-native';
import Drawer from 'react-native-drawer';

import MainRankPage from './MainRankPage';
import FiltePage from './FiltePage';


class DrawerRank extends Compontent {

    openRankDrawer(){
        router.log(111111)
        this.props.openDrawer()
    }

    closeRankDrawer(){
        this.props.closeDrawer()
    }

    render(){
        return(<View>
            <Drawer
                type="static"
                content={<FiltePage router={this.props.router}/>}
                tapToClose
                onClose={this.closeRankDrawer()}
                openDrawerOffset={100}
                tweenHandler={Drawer.tweenPresets.parallax}
                side="right">

                <MainRankPage openRank={() => {this.openRankDrawer()}} router={this.props.router}/>

            </Drawer>
        </View>)
    }
}

export default DrawerRank;