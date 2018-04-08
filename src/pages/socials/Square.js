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
                renderTabBar={() => <SquareBar/>}>
                {this.state.square_types.map(item => {
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

class SquareBar extends PureComponent {

    render() {
        const {tabs, activeTab, goToPage} = this.props;

        let tabs_views = tabs.map((item, index) => <TouchableOpacity
            key={'bar' + index}
            onPress={() => {
                goToPage(index)
            }}
            style={{
                height: Metrics.navBarHeight - Metrics.statusBarHeight,
                marginTop: Metrics.statusBarHeight,
                alignItems: 'center', justifyContent: 'center',
                width: 80,
            }}>
            <Text style={[{fontSize: 15},
                activeTab === index ? {color: '#F24A4A', fontWeight: 'bold'} : {color: '#333333'}]}>{item}</Text>
            {activeTab === index ? <View style={{
                height: 2, width: 48, backgroundColor: '#F24A4A',
                position: 'absolute', bottom: 0
            }}/> : null}

        </TouchableOpacity>);


        return <View style={{
            height: Metrics.navBarHeight, width: '100%',
            flexDirection: 'row', justifyContent: 'center',
            backgroundColor: 'white'
        }}>
            {tabs_views}
        </View>
    }
}



