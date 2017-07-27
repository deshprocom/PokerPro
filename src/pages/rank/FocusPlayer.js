import React,{Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {Images, Colors, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';

class FocusPlayer extends Component {

    focusRow = () => {
        return(<View style={styles.row_view}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 12.5}}>
                <Image source={Images.mask}
                       style={{width: 73.5, height: 73.5}}>
                </Image>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center',flex: 1}}>
                <Text style={styles.name_text}>名字</Text>
                <Text style={styles.country_text}>国家</Text>
            </View>
            <TouchableOpacity style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>+ 关注</Text>
            </TouchableOpacity>
        </View>)
    };

    render(){
        return(<View>
            <NavigationBar leftBtnIcon={Images.sign_return}
               toolbarStyle={{backgroundColor:Colors.bg_09}}
               leftBtnPress = {() => this.props.router.pop()}
               leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                title={'我关注牌手'}/>
            <View style={styles.list_view}>
                {this.focusRow()}
            </View>
        </View>)
    }
}

export default FocusPlayer;

const styles = StyleSheet.create({
    list_view: {
        backgroundColor: Colors.bg_f5,
        height:Metrics.screenHeight,
        paddingTop: 10
    },
    row_view: {
        backgroundColor: Colors.white,
        height: 105,
        flexDirection: 'row',
        paddingLeft: 19,
        paddingRight: 19,
        marginBottom: 5
    },
    name_text: {
        fontSize: 15,
        color: Colors._333,
        lineHeight: 21,
        marginBottom: 3
    },
    country_text: {
        fontSize: 14,
        color: Colors._AAA,
        lineHeight: 20
    }
});
