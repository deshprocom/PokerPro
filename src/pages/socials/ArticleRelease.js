import React, {PureComponent} from 'react';
import {
    StyleSheet, Image, Platform,
    View, TextInput, Text, TouchableOpacity,
    KeyboardAvoidingView, Modal
} from 'react-native';
import {NavigationBar} from '../../components'
import {Colors, Images} from "../../Themes";
import I18n from "react-native-i18n";

export default class ArticleRelease extends PureComponent {


    render() {
        return (<KeyboardAvoidingView>
            <NavigationBar
                barStyle={'dark-content'}
                titleStyle={{fontSize: 17, color: Colors._333}}
                toolbarStyle={{backgroundColor: 'white'}}
                title={I18n.t('release_article')}
                leftBtnText={I18n.t('cancel')}
                rightBtnText={I18n.t('draft_box')}
                btnTextStyle={{fontSize: 14, color: Colors._333}}
                leftBtnPress={() => {

                    router.pop()
                }}/>



        </KeyboardAvoidingView>)
    }
}