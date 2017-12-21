import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getPersonDynamics} from '../../services/CommentDao';
import {getDateDiff, isEmptyObject} from '../../utils/ComonHelper';

export default class DynamicEmpty extends Component {
    state = {
        dynamics: {}
    };

    componentDidMount() {

    };


    render() {
        return (
            <View style={styles.page}>

                <Text style={styles.Txt1}>
                    {I18n.t('no_content')}
                </Text>
                <Text style={styles.Txt2}>
                    {I18n.t('info_video_dynamic')}
                </Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({

   page:{
       flex:1,
       flexDirection:'column',
       alignItems:'center'
   },
    Txt1:{
        fontSize: 20,
        color: '#CCCCCC'
    },
    Txt2: {
        fontSize: 15,
        color: '#CCCCCC',
        marginTop:8
    }

});