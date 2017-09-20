import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {NavigationBar} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {listVerified} from '../../services/AccountDao';

export default class AddVerified extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: '#161718'}}
                title={I18n.t('verified_new')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
            />

            {this.renderInput()}

        </View>)
    }

    renderInput = () => {
        return <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, color: Colors._333}}>{I18n.t('real_name')}: </Text>
                <TextInput style={{height: 48, fontSize: 15, color: Colors._666}}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
                           placeholder={I18n.t('ple_real_name')}/>


            </View>
        </View>
    }
}