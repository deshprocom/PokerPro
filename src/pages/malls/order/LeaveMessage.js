import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';


export default class LeaveMessage extends PureComponent {
    state = {
        text: ""
    };

    componentDidMount() {


    };

    getLeaveMessage = () => {
        return this.state.text;
    };

    render() {
        return (
            <TextInput
                ref={ref => this.remark = ref}
                style={styleL.messageView}
                placeholder={I18n.t('leaveMessage')}
                placeholderTextColor="#AAAAAA"
                multiline={true}
                textAlignVertical='top'
                returnKeyType={'done'}
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                    this.setState({text});
                }}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
            />

        )
    }
}
const styleL = StyleSheet.create({
    messageView: {
        height: 85,
        backgroundColor: "#FFFFFF",
        marginTop: 11,
        fontSize: 14,
        textAlign: 'left',
        paddingLeft: 17,
        paddingTop: 12,
        paddingBottom: 50,
        paddingRight: 17
    }
})