import React,{Component} from 'react';
import {View, Text} from 'react-native';

import {Images, Colors} from '../../Themes';
import {NavigationBar} from '../../components';

class FocusPlayer extends Component {
    render(){
        return(<View>
            <NavigationBar leftBtnIcon={Images.sign_return}
               toolbarStyle={{backgroundColor:Colors.bg_09}}
               leftBtnPress = {() => this.props.router.pop()}
               leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                title={'我关注牌手'}/>
        </View>)
    }
}

export default FocusPlayer;
