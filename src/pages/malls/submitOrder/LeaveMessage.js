import React, {PureComponent} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Text} from 'react-native';
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
            <View style={styleL.page}>
                <Text style={styleL.txt}>{I18n.t('leaveMessage1')}</Text>
                <TextInput
                    numberOfLines={1}
                    maxLength={45}
                    onChangeText={(text) => {
                        this.setState({text});
                    }}
                    ref={ref => this.remark = ref}
                    style={styleL.messageView}
                    placeholder={I18n.t('leaveMessage')}
                    placeholderTextColor="#AAAAAA"
                    multiline={false}
                    textAlignVertical='top'
                    returnKeyType={'done'}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}/>

            </View>

        )
    }
}
const styleL = StyleSheet.create({
    page: {
        height: 48,
        backgroundColor: '#FFFFFF',
        marginTop: 11,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        fontSize: 14,
        color: '#000000',
        marginLeft: 17
    },
    messageView: {
        fontSize: 14,
        color: '#000000',
        flex: 1,
        marginTop: 5

    }
})