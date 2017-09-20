import React, {Component} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {NavigationBar} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {listVerified} from '../../services/AccountDao';

export default class AddVerified extends Component {
    state = {
        name: '',
        num: ''
    };

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

        return <View style={{backgroundColor: 'white', marginTop: 8}}>
            <View style={styles.rowAlign}>
                <Text style={styles.lbName}>{I18n.t('real_name')}: </Text>
                <TextInput style={styles.inName}
                           clearButtonMode='while-editing'
                           onChangeText={name => this.setState({name})}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
                           placeholder={I18n.t('ple_real_name')}/>


            </View>
            <View style={{backgroundColor: Colors.bg_ec, height: 1}}/>
            <View style={styles.rowAlign}>
                <Text style={styles.lbName}>{I18n.t('ID_card')}</Text>
                <TextInput style={styles.inName}
                           clearButtonMode='while-editing'
                           onChangeText={num => this.setState({num})}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
                           placeholder={I18n.t('ple_id_card')}/>


            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    lbName: {
        fontSize: 15, color: Colors._333, fontWeight: 'bold', marginLeft: 17

    },
    inName: {
        height: 48, fontSize: 15, color: Colors._666, flex: 1, marginLeft: 10
    },
    rowAlign: {
        flexDirection: 'row', alignItems: 'center'
    }
});