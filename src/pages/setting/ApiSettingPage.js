/**
 * Created by lorne on 2017/5/9.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Picker
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, SecurityText} from '../../components';
import StorageKey from '../../configs/StorageKey';
import {setBaseURL} from '../../services/RequestHelper'
import Api from '../../configs/ApiConfig';

export default class ApiSettingPage extends Component {
    state = {
        api: Api.dev
    };

    componentDidMount() {
        storage.load({key: StorageKey.ApiSever})
            .then((ret) => {
                router.log(ret);
                this._select(ret);
            }).catch(err => {
            this._select(Api.test);
        })
    }

    _select = (ret) => {
        let api = '';

        if (ret === Api.dev)
            api = Api.dev;
        else if (ret === Api.test)
            api = Api.test;
        else if (ret === Api.staging)
            api = Api.staging;

        this.setState({
            api: api
        })
    };


    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                title={'Api设置'}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

            <Picker
                selectedValue={this.state.api}
                onValueChange={(api) => this._setApiSever(api)}>
                <Picker.Item value={Api.dev} label="dev"/>
                <Picker.Item value={Api.test} label="test"/>
                <Picker.Item value={Api.staging} label="staging"/>
            </Picker>

        </View>)
    }

    _setApiSever = (api) => {
        this.setState({
            api: api
        })
        setBaseURL(api);

    }
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})