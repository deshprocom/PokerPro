import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from './ScrollableTabBar';

export default class MallTypeView extends PureComponent {

    render() {
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
                <View tabLabel={'推荐'}>

                </View>
                <View tabLabel={'旅游'}>

                </View>
                <View tabLabel={'筹码'}>

                </View>
                <View tabLabel={'扑克'}>

                </View>

            </ScrollableTabView>
        </View>

    }

}