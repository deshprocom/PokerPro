import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MainVideoPage from '../videos/MainVideoPage';
import MainNewsPage from '../news/MainNewsPage';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';

class VideoNewsTab extends PureComponent {

    state = {
        currentView: 0
    };


    componentWillReceiveProps(newProps) {

        if (newProps.actionType === 'SWITCH_LANGUAGE') {

            if (this.mainVideoPage)
                this.mainVideoPage.refresh();
            if (this.mainNewsPage)
                this.mainNewsPage.refresh();
        }

        if (newProps.actionType === 'VIDEO_PAUSE') {
            if (this.mainVideoPage)
                this.mainVideoPage.pauseVideo();
        }
    }

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
                        ref={ref => this.mainNewsPage = ref}
                        tabLabel={I18n.t('home_info')}/>

                    <MainVideoPage
                        ref={ref => this.mainVideoPage = ref}
                        tabLabel={I18n.t('home_video')}/>

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
                        if (this.mainVideoPage)
                            this.mainVideoPage.pauseVideo();
                        this.tabView.goToPage(0, false);
                        this.setState({
                            currentView: 0
                        })
                    }}
                    style={styles.btn}
                >
                    <Text style={this.state.currentView === 0 ? styles.selectedTex : styles.selectTex}>
                        {I18n.t('home_info')}
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
                        {I18n.t('home_video')}
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={styles.headAlign}>
                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        if (this.mainVideoPage)
                            this.mainVideoPage.pauseVideo();

                        if (this.state.currentView === 0)
                            router.toSearchNewsPage();
                        else
                            router.toSearchVideo()
                    }}
                    style={styles.btnSearch}>
                    <Image style={styles.search}
                           source={Images.news_search}/>
                </TouchableOpacity>

            </View>

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
    },
    search: {
        height: 18,
        width: 18,
        marginRight: 20,
        marginLeft: 20,
    },
    headAlign: {
        flex: 1, flexDirection: 'row', alignItems: 'center'
    },
    btnSearch: {
        height: 44,
        justifyContent: 'center'
    }
})

const bindAction = dispatch => ({});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
});

export default connect(mapStateToProps, bindAction)(VideoNewsTab);
