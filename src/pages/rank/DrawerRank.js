import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, BackAndroid, Navigator} from 'react-native';
import Drawer from 'react-native-drawer';

import MainRankPage from './MainRankPage';
import FiltePage from './FiltePage';


class DrawerRank extends Component {

    openRankDrawer = () => {
        router.log(111111)
        this._drawer.open()
    }

    closeRankDrawer = () => {
        this._drawer.close()
    }

    _handleDrawer(){
        router.log('_handleDrawer',this._drawer._open);
        if(this._drawer._open){
            this._drawer.close()
        }else{
            this._drawer.open()
        }
    }

    render() {
        return (
            <Drawer ref={(ref) => this._drawer=ref}
                type="static"
                content={<FiltePage/>}
                tapToClose
                onClose={this.closeRankDrawer}
                openDrawerOffset={100}
                style={styles.drawer_style}
                tweenHandler={Drawer.tweenPresets.parallax}
                side="right"
                    keyboardDismissMode="on-drag">

                <MainRankPage openRank={()=>this._handleDrawer()}/>

            </Drawer>)
    }
}

const styles = StyleSheet.create({
    drawer_style: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
    }
})

export default DrawerRank;