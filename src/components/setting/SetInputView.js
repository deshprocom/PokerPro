/**
 * Created by lorne on 2017/3/1.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import PropTypes from 'prop-types';

export default class SetInputView extends Component {

    static propTyeps = {
        placeholder: PropTypes.string,
        security: PropTypes.bool,
        inputTestID: PropTypes.string,
        eyeTestID: PropTypes.string,
        clearTestID: PropTypes.string,
        textChange: PropTypes.func

    }

    state = {
        showClear: false,
        eyeClose: false
    }

    componentDidMount() {
        if (this.props.security) {
            this.setState({
                eyeClose: true
            });
        }
    }

    _showClear = () => {
        const {clearTestID} = this.props;
        if (this.state.showClear)
            return (    <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        showClear:false
                    });
                    this.input.clear()
                }}
                testID={clearTestID}
                style={{height:50,flexDirection:'row',
                    alignItems:'center'}}>
                <Image style={{height:16,width:16,marginRight:30}}
                       source={Images.set_fork2}/>
            </TouchableOpacity>)
    }

    _showEye = () => {
        const {eyeTestID} = this.props;
        const {eyeClose} = this.state;
        return (<TouchableOpacity
            onPress={()=>{
                    this.setState({
                        eyeClose:!eyeClose
                    })
                }}
            testID={eyeTestID}
            style={{height:50,flexDirection:'row',
                    alignItems:'center'}}>
            <Image style={eyeClose?{height:9,width:18,marginRight:26}
            :{height:18,width:18,marginRight:26}}
                   source={eyeClose?Images.set_eye_close:Images.set_eye}/>
        </TouchableOpacity>)
    }


    render() {
        const {
            placeholder, textChange, inputTestID, security
        } = this.props;

        return ( <View style={{height:50,flexDirection:'row',backgroundColor:Colors.setting,
                paddingLeft:17,alignItems:'center'}}>

            <TextInput
                numberOfLines={1}
                underlineColorAndroid='transparent'
                ref={ref=>this.input = ref}
                onChangeText={text=>{
                    this.setState({
                        showClear:text.length>0
                    });
                    if(textChange != undefined)
                    textChange(text)
                }}
                secureTextEntry={this.state.eyeClose}
                testID={inputTestID}
                placeholderTextColor={Colors._AAA}
                placeholder={placeholder}
                style={[{height:50,color:Colors.txt_DDD,flex:1},
                    Fonts.H16]}/>

            {this._showClear()}

            {security ? this._showEye() : null}

        </View>)

    }
}