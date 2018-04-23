import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {reallySize} from "./Header";
import I18n from "react-native-i18n";

export default class TitleView extends Component {

    static props = {
        callbackTitle: null,
        defaultValue: null,
        beginEdit: null,
    };

    beginEditing = () => {
        if (this.props.beginEdit === null) return;
        this.props.beginEdit();
    };

    updateText = (text) => {
        if (this.props.callbackTitle === null) return;
        this.props.callbackTitle(text);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={I18n.t('social_title')}
                           style={styles.textInput}
                           onEndEditing={(event) => {
                               this.updateText(event.nativeEvent.text)
                           }}
                           defaultValue={this.props.defaultValue}
                           onFocus={() => this.beginEditing()}
                           underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        height: reallySize(76),
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        height: reallySize(54),
        width: reallySize(342),
        backgroundColor: "white",
        padding: 10,
    }
});
