/**
 * Created by lorne on 2016/12/19.
 */

import React,{Component }from 'react';

import {
    Navigator,
    View,
    Text,StyleSheet
} from 'react-native';

export default class Essence extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={[styles.container]}>
                <Text style={{fontSize:30,
                color:'#837'}}>
                    Hello PuKe
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'yellow'
    }
})