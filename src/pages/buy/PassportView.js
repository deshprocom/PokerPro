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
import Button from 'react-native-smart-button'

import {
    isEmptyObject
} from '../../utils/ComonHelper';


import {InputView} from "../../components";

export default class PassportView extends Component {
    static propTypes = {
        router:PropTypes.object
    };

    state = {
        editable: true,
        realName: '',
        passwordCard:'',
        cardImage:''
    }

    _cardImageView = () => {
        let {cardImage} = this.state;
        if(isEmptyObject(cardImage)){
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image
                        source={Images.name_id}
                        style={{height:35,width:49}}/>

                    <Text style={{fontSize:Fonts.size.h18,color:Colors._AAA,marginTop:31}}>
                        {I18n.t('ple_upload_name_id')}
                    </Text>
                </View>
            )
        }else{
            return (<Image
                style={{height:150,width:250}}
                source={{uri:cardImage}}>

            </Image>)
        }
    }

    render() {
        const {editable,realName,passwordCard}=this.state;
        router.log(this.state);
        return (<View
            testID="page_real_name"
            style={ApplicationStyles.bgContainer}>

            <View
                style={{height:50,alignItems:'center',flexDirection:'row',marginTop:8,
                backgroundColor:Colors.white}}>
                <Text style={{marginLeft:18}}>真实姓名：</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text=>{
                                this.setState({
                                    realName:text
                                })
                            }}
                    inputValue={realName}
                    inputView={{height:50, borderBottomColor: Colors.white,
                        borderBottomWidth: 1,flex:1}}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder={I18n.t('ple_real_name')}/>
            </View>
            <View
                style={{height:50,alignItems:'center',flexDirection:'row',marginTop:8,
                backgroundColor:Colors.white}}>
                <Text style={{marginLeft:18}}>{I18n.t('password_card')}</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text=>{
                                this.setState({
                                    passwordCard:text
                                })
                            }}
                    inputValue={passwordCard}
                    inputView={{height:50,borderBottomColor:Colors.white,
                        borderBottomWidth:1,flex:1}}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder={I18n.t('ple_password_card')}/>
            </View>
            <TouchableOpacity
                disabled={!editable}
                activeOpacity={1}
                style={{height:198,width:Metrics.screenWidth-34,
                alignSelf:'center',backgroundColor:Colors.txt_CCCCCC,
                marginTop:14,alignItems:'center',justifyContent:'center'}}>
                {this._cardImageView()}
            </TouchableOpacity>
            <Text
                style={{fontSize:Fonts.size.h12,marginTop:114,alignSelf:'center',color:Colors._AAA}}>
                {I18n.t('upload_issue')}
            </Text>
            <Button activeOpacity={1}
                style={{height:49,width:Metrics.screenWidth-34,
                alignSelf:'center',backgroundColor:'#161718',
                marginTop:25,justifyContent:'center'}}
                textStyle={{fontSize:Fonts.size.h17,color:Colors.txt_E0C}}>
                {I18n.t('submit')}
            </Button>

        </View>)
    }
}
