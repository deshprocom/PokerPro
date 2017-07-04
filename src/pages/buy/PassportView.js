/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component,PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

import {InputView} from "../../components";

export default class PassportView extends Component {
    static propTypes = {
        router:PropTypes.object
    };

    state = {
        editable: true
    }

    render() {
        const {editable}=this.state;
        return (<View
            style={ApplicationStyles.bgContainer}>

            <View
                style={{height:50,alignItems:'center',flexDirection:'row',marginTop:8,
                backgroundColor:Colors.white}}>
                <Text style={{marginLeft:18}}>真实姓名：</Text>
                <InputView
                    editable={editable}
                    inputView={{height:50, borderBottomColor: Colors.white,
                        borderBottomWidth: 1,flex:1}}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder="请输入真实姓名"/>
            </View>

            <View
                style={{height:50,alignItems:'center',flexDirection:'row',marginTop:8,
                backgroundColor:Colors.white}}>
                <Text style={{marginLeft:18}}>护照号：</Text>
                <InputView
                    editable={editable}
                    inputView={{height:50,borderBottomColor:Colors.white,
                        borderBottomWidth:1,flex:1}}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder="请输入护照号"/>
            </View>

        </View>)
    }
}
