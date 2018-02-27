/**
 * Created by lorne on 2017/2/8.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import PropTypes from 'prop-types'

export default class InputView extends Component {

    static propTypes = {
        placeholder: PropTypes.string,
        stateText: PropTypes.func,
        testID: PropTypes.string,
        inputView: PropTypes.object,
        inputText: PropTypes.object,
        testIDClear: PropTypes.string,
        inputValue: PropTypes.string,
        editable:PropTypes.bool
    };

    state = {
        inputClear: false
    };

    render() {
        const {editable} = this.props;
        return (  <View style={[styles.input_view,this.props.inputView]}>
                <TextInput style={[styles.input,this.props.inputText]}
                           editable={editable}
                           numberOfLines={1}
                           placeholderTextColor={Colors._BBBB}
                           underlineColorAndroid='transparent'
                           onChangeText={text=>{
                               this.props.stateText(text);
                                   this.setState({
                                       inputClear:text.length>0

                                   })
                               }}
                           testID={this.props.testID}
                           ref={ref=>this.mobile = ref}
                           value={this.props.inputValue}
                           placeholder={this.props.placeholder}/>
                {this.state.inputClear ? this._inputClear() : null}

            </View>
        )

    }

    _inputClear = () => {
        return (
            <TouchableOpacity
                testID={this.props.testIDClear}
                onPress={()=>{
                    this.setState({
                        inputClear:false
                    });
                    this.mobile.clear()
                }}
                style={{alignItems:'center',
                        justifyContent:'center',
                        height:50,width:50}}>

                <Image
                    style={{height:13,width:13}}
                    source={Images.sign_close_gray}/>


            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    input_view: {
        borderBottomColor: Colors._E5E5,
        borderBottomWidth: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: 50,
        color: Colors.txt_666,
        fontSize: 15,
        flex: 1,
        alignSelf: 'center',
        marginLeft: 20
    }
})