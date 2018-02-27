import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TextInput, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

export default class RefundInstruction extends PureComponent {

    state = {
        memo: ''
    };

    getMemo = ()=>{
        return this.state.memo;
    };

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.amountTxt}>{I18n.t('refund_instruction')}：</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={text => {
                        this.setState({
                            memo: text
                        })
                    }}
                    placeholder={I18n.t('refund_explain')}
                    underlineColorAndroid='transparent'
                    numberOfLines={1}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        height: 48,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    amountTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17
    },
    inputText: {
        height: 40,
        fontSize: 14,
        flex: 1,
        marginTop: 5
    }
})