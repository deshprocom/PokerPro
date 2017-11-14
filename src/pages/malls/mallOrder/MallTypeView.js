import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './../ScrollableTabBar';
import MallListOrderView from './MallListOrderView';
import propTypes from 'prop-types';

export default class MallTypeView extends PureComponent {
    static propTypes = {
        categories: propTypes.array.isRequired,
    };

    render() {
        const {categories} = this.props;
        if (categories.length > 0)
            return <View style={ApplicationStyles.bgContainer}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar
                        backgroundColor={Colors.white}
                        activeTextColor="#F34A4A"
                        inactiveTextColor={Colors.txt_444}
                        textStyle={{fontSize: 15}}
                        style={{borderColor: Colors._EEE}}
                        underlineStyle={{backgroundColor: '#F34A4A', height: 2}}
                    />}>

                    {categories.map((item, key) => {

                        return <MallListOrderView
                            category={item}
                            tabLabel={item.name}
                            key={`mallList${key}`}/>
                    })}


                </ScrollableTabView>
            </View>;
        else
            return <View/>

    }

}