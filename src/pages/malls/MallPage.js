import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import TopBar from './MallTopBar';
import MallTypeView from './MallTypeView';
import MallCategories from './MallCategories';
import {getCategories,categoriesChild} from '../../services/MallDao';


export default class MallPage extends PureComponent {

    state = {
        showCategories: false,
        categories:[]
    };

    componentDidMount(){
        getCategories(data=>{
            console.log('categories',data)
            const {categories} = data;
            this.setState({categories})
        },err=>{

        })
    }

    render() {
        const {categories} = this.state;
        return (<View style={{flex: 1}}>
            <TopBar/>
            <MallTypeView
                categories={categories}
                showCatePage={this.toggle}/>
            {this.state.showCategories ? <MallCategories/> : null}


        </View>)
    }

    toggle = () => {
        this.setState({
            showCategories: !this.state.showCategories
        })
    }
}