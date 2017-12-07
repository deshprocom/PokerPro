import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import TopBar from './MallTopBar';
import MallTypeView from './MallTypeView';
import MallCategories from './MallCategories';
import {getCategories} from '../../services/MallDao';
import {connect} from 'react-redux';
import {ADD_CART, DELETE_CART} from '../../actions/ActionTypes';


class MallPage extends PureComponent {

    state = {
        showCategories: false,
        categories: [],
        cartNum: global.shoppingCarts.length
    };

    componentDidMount() {
        getCategories(data => {

            const {categories} = data;

            console.log('categories', categories);
            this.setState({categories})
        }, err => {

        })
    }

    componentWillReceiveProps(newProps) {

        if (newProps.hasData && (newProps.actionType === ADD_CART
                || newProps.actionType === DELETE_CART)) {

            this.setState({
                cartNum: global.shoppingCarts.length
            })
        }
    }

    render() {
        const {categories, cartNum} = this.state;
        return (<View style={{flex: 1}}>
            <TopBar
                cartNum={cartNum}/>
            <MallTypeView
                categories={categories}
                showCatePage={this.toggle}/>
            {this.state.showCategories ? <MallCategories
                showCatePage={this.toggle}
                categories={categories}/> : null}


        </View>)
    }

    toggle = () => {
        this.setState({
            showCategories: !this.state.showCategories
        })
    }
}

const bindAction = dispatch => ({});

const mapStateToProps = state => ({
    actionType: state.MallState.actionType,
    hasData: state.MallState.hasData
});

export default connect(mapStateToProps, bindAction)(MallPage);