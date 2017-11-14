import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './ScrollableTabBar';
import MallListOrderView from './MallListOrderView';
import propTypes from 'prop-types';

export default class MallTypeView extends Component {
    static propTypes = {
        categories: propTypes.array.isRequired,
    };

    render() {
        const {categories} = this.props;
        if (categories.length > 0){
            this.arrayMenu = [...categories];
            this.arrayMenu.unshift({id: -1, name: '全部'});
            return (<View style={ApplicationStyles.bgContainer}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar
                        backgroundColor={Colors.white}
                        activeTextColor="#F34A4A"
                        inactiveTextColor={Colors._AAA}
                        textStyle={{fontSize: 15}}
                        style={{borderColor: Colors._EEE,marginTop:1}}
                        underlineStyle={{backgroundColor: '#F34A4A', height: 2}}
                    />}>

                    {this.arrayMenu.map((item, key) => {

                        return <MallListOrderView
                            category={item}
                            tabLabel={item.name}
                            key={key}/>
                    })}


                </ScrollableTabView>
            </View>)
        }
        else
            return <View/>

    }

}