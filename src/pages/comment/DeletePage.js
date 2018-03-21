import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, BaseComponent} from '../../components';

export default class DeletePage extends Component {
    state = {
        dynamics: {}
    };

    componentDidMount() {

    };


    render() {
        return (
            <View style={styles.page}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                <Text style={styles.Txt1}>
                    {I18n.t('your')}{I18n.t('de')}{I18n.t('deleted')}
                </Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({

    page:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',

    },
    Txt1:{
        fontSize: 20,
        color: '#CCCCCC',
        marginTop:120
    },
    Txt2: {
        fontSize: 15,
        color: '#CCCCCC',
        marginTop:8
    }

});