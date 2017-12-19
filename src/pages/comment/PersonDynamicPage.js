import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal,Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {NavigationBar} from '../../components';

export default class PersonDynamicPage extends Component {

    componentDidMount() {

    };

    personTop=()=>{
        return(
            <View style={styles.topPage}>
                <Image style={styles.TopImg} source={Images.icon_deshpro}/>
            </View>
        )
    };

    render() {
        return (
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('person_dynamic')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    rightBtnIcon={Images.commentWhite}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    rightImageStyle={{height: 20, width: 22, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                {this.personTop()}
            </View>
        );
    }


}

const styles = StyleSheet.create({

    topPage:{
        width:Metrics.screenWidth,
        flexDirection:'row',
        alignItems:'center'
    },
    TopImg:{

    }

});