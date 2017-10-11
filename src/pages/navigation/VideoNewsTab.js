import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MainVideoPage from '../videos/MainVideoPage';
import MainNewsPage from '../news/MainNewsPage';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class VideoNewsTab extends PureComponent {

    state = {
        currentView: 0
    };

    render() {
        return (
            <View style={{flex: 1}}>

                {this.renderHead()}
                <ScrollableTabView
                    page={1}
                    ref={ref => this.tabView = ref}
                    locked
                    renderTabBar={false}
                >

                    <MainNewsPage
                        tabLabel={'资讯'}/>

                    <MainVideoPage
                        tabLabel={'视频'}/>

                </ScrollableTabView>
            </View>
        )
    }


    renderHead = () => {
        return <View style={{
            backgroundColor: Colors._161,
            height: Metrics.navBarHeight, width: '100%', paddingTop: Metrics.statusBarHeight,
            flexDirection: 'row'
        }}>
            <View style={{flex: 1}}/>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.tabView.goToPage(0, false);
                        this.setState({
                            currentView: 0
                        })
                    }}
                    style={styles.btn}
                >
                    <Text style={this.state.currentView === 0 ? styles.selectedTex : styles.selectTex}>
                        资讯
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.tabView.goToPage(1, false);
                        this.setState({
                            currentView: 1
                        })
                    }}
                    style={styles.btn}>
                    <Text style={this.state.currentView === 1 ? styles.selectedTex : styles.selectTex}>
                        视频
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={{flex: 1}}/>

        </View>
    }

}

const styles = StyleSheet.create({
    selectTex: {
        fontSize: 14,
        color: '#CCB984'
    },
    selectedTex: {
        fontSize: 17,
        fontWeight: 'bold',
        color: "#FFE9AD"
    },
    btn: {
        width: 60,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


