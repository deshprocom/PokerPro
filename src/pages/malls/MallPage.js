import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import TopBar from './MallTopBar';
import MallTypeView from './MallTypeView';
import MallCategories from './MallCategories';


export default class MallPage extends PureComponent {

    state = {
        showCategories: false
    };

    render() {
        return (<View style={{flex: 1}}>
            <TopBar/>
            <MallTypeView showCatePage={this.toggle}/>
            {this.state.showCategories ? <MallCategories/> : null}


        </View>)
    }

    toggle = () => {
        this.setState({
            showCategories: !this.state.showCategories
        })
    }
}