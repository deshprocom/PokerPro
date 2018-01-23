/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,Platform,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';


export default class SubscriptionBottom extends PureComponent {
    state={

    };
    render() {

        return (
            <TouchableOpacity style={styles.bottom}
            onPress={()=>{
                global.router.toSubscriptionConfirmPage(this.props)
            }}>
                <View style={styles.bottomView}>
                    <Text style={styles.txt}>{I18n.t('subscription')}</Text>
                </View>
            </TouchableOpacity>


        );
    }
}


const styles = StyleSheet.create({
    bottom:{
        flex:1,
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:8,
        paddingBottom:8,
        position:'absolute',
        bottom:0,left:0,right:0,
        zIndex:99

    },
    bottomView:{
        width:'90%',
        height:34,

        backgroundColor:'#161718',
        borderRadius:2,
        justifyContent:'center',
        alignItems:'center',
    },
    txt:{
        fontSize:14,
        color:'#FFE9AD'
    }

});