import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import MallTypeView from './OrderTypeView';
import MallCategories from '../MallCategories';


export default class OrderListPage extends PureComponent {

    state = {
        showCategories: false,
        categories: []
    };

    componentDidMount() {
        getCategories(data => {
            console.log('categories', data)
            const {categories} = data;
            this.setState({categories})
        }, err => {

        })
    }

    render() {
        const {categories} = this.state;
        return (<View style={{flex: 1}}>

            <OrderTypeView
                categories={categories}
                showCatePage={this.toggle}/>
            {this.state.showCategories ? <MallCategories
                categories={categories}/> : null}


        </View>)
    }

    toggle = () => {
        this.setState({
            showCategories: !this.state.showCategories
        })
    }
}