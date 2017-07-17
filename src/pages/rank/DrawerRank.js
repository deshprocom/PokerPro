import React, {Compontent, PropTypes} from 'react';
import {View, Text, StyleSheet, BackAndroid, Navigator} from 'react-native';
import Drawer from 'react-native-drawer';

import MainRankPage from './MainRankPage';
import FiltePage from './FiltePage';


class DrawerRank extends Compontent {

    openRankDrawer = () => {
        router.log(111111)
        this._drawer.open()
    }

    closeRankDrawer() {
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
        return (<View>
            <Drawer ref={(ref) => this._drawer=ref}
                type="static"
                content={<FiltePage router={this.props.router}/>}
                tapToClose
                onClose={this.closeRankDrawer()}
                openDrawerOffset={100}
                tweenHandler={Drawer.tweenPresets.parallax}
                side="right">

                <MainRankPage openRank={()=>this._handleDrawer()} router={this.props.router}/>

            </Drawer>
        </View>)
    }
}

export default DrawerRank;