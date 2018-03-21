/**
 * Created by lorne on 2017/2/9.
 */
import React from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
export default class InputPwdView extends React.Component {

    state = {
        pwdEye: true
    };

    render() {
        const {pwdEye} = this.state;
        return (  <View style={styles.input_view}>
                <TextInput
                    testID={this.props.testID}
                    style={styles.input}
                    placeholderTextColor={Colors._BBBB}
                    underlineColorAndroid='transparent'
                    onChangeText={text=>{
                                this.props.stateText(text);
                               }}
                    secureTextEntry={pwdEye}
                    placeholder={this.props.placeholder}/>


                <TouchableOpacity
                    onPress={()=>{
                            this.setState({
                                pwdEye:!pwdEye
                            })
                        }}
                    style={{alignItems:'center',
                        justifyContent:'center',
                        height:50,width:50}}>

                    <Image
                        style={{width:18,height:10
                         }}
                        source={pwdEye?Images.sign_eye:Images.sign_eye_open}/>


                </TouchableOpacity>
            </View>
        )

    }


}

const styles = StyleSheet.create({
    input_view: {
        borderBottomColor: Colors._E5E5,
        borderBottomWidth: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth
    },
    input: {
        height: 50,
        color: Colors.txt_666,
        fontSize: 15, flex: 1, alignSelf: 'center',
        marginLeft: 20
    }
})