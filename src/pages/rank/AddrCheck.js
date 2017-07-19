import React,{Component} from 'react';
import {View, Text} from 'react-native';

import {Colors} from '../../Themes'

class AddrCheck extends Component {
    choiceBtn = (num) => {
        for(var i=0;i<num;i++){
            return(<View><Text>dfg</Text></View>)
        }
    };

    render(){
        const a = 3
        return(<View>
            <Text style={{lineHeight: 21,fontSize: 15,color: Colors._888}}>地区</Text>
            <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 167}}></View>
            {this.choiceBtn(a)}
        </View>)
    }
}

export default AddrCheck;
