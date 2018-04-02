import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {reallySize} from "./Header";
import {Images, ApplicationStyles, Metrics, Colors} from "../../Themes";
import I18n from "react-native-i18n";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MomentList from './MomentList'


export default class Square extends PureComponent {

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
                <MomentList tabLable={'广场'}/>
            </ScrollableTabView>

        </View>
    }
}



