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

    state = {
        square_types: ['topics', 'recommends', 'follows']
    }

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
                {this.state.square_types.map((item, index) => {
                    return <MomentList
                        key={item}
                        tabLabel={this.tabLabel(item)}
                        type={item}/>
                })}

            </ScrollableTabView>

        </View>
    }

    tabLabel = (type) => {
        if (type === 'topics')
            return '广场'
        if (type === 'recommends')
            return '精华'
        return '关注'
    }
}



