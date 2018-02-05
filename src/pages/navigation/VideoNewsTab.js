import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MainVideoPage from '../videos/MainVideoPage';
import MainNewsPage from '../news/MainNewsPage';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {umengEvent} from '../../utils/UmengEvent';

class VideoNewsTab extends PureComponent {

    state = {
        currentView: 0
    };


    shouldComponentUpdate(newProps, nextState) {


        if (newProps.actionType === 'SWITCH_LANGUAGE') {

            if (this.mainVideoPage && this.state.currentView === 1)
                this.mainVideoPage.refresh();
            if (this.mainNewsPage)
                this.mainNewsPage.refresh();

            return false;
        }

        if (newProps.actionType === 'VIDEO_PAUSE' && this.state.currentView === 1) {

            if (this.mainVideoPage)
                this.mainVideoPage.pauseVideo();
            return false;
        }


        return true;
    }



    render() {
        return (
            <View style={{flex: 1}}>

                {this.renderHead()}
                <ScrollableTabView
                    ref={ref => this.tabView = ref}
                    locked
                    renderTabBar={false}
                    prerenderingSiblingsNumber={1}
                >

                    <MainNewsPage
                        key={'news'}
                        ref={ref => this.mainNewsPage = ref}
                        tabLabel={I18n.t('home_info')}/>

                    <MainVideoPage
                        key={'video'}
                        ref={ref => this.mainVideoPage = ref}
                        tabLabel={I18n.t('home_video')}/>

                </ScrollableTabView>
            </View>
        )
    }


    goTab = (page) => {
        this.setState({
            currentView: page
        });
        this.tabView.goToPage(page, false);

    };


    renderHead = () => {
        return <View style={{
            backgroundColor: Colors._161,
            height: Metrics.navBarHeight, width: '100%', paddingTop: Metrics.statusBarHeight,
            flexDirection: 'row'
        }}>
            <View style={styles.headAlign}>

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
            <View style={{flex: 1}}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        if (this.mainVideoPage)
                            this.mainVideoPage.pauseVideo();

                        this.goTab(0)
                    }}
                    style={styles.btn}
                >
                    <Text style={this.state.currentView === 0 ? styles.selectedTex : styles.selectTex}>
                        {I18n.t('home_info')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.goTab(1)
                    }}
                    style={styles.btn}>
                    <Text style={this.state.currentView === 1 ? styles.selectedTex : styles.selectTex}>
                        {I18n.t('home_video')}
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={{flex: 1}}/>
            <View style={styles.headAlign}>

                <TouchableOpacity
                    onPress={()=>{
                        umengEvent('drawer_rank');
                        global.router.toDrawerRank();
                    }}
                    style={styles.btnSearch}>
                    <Image style={styles.search}
                           source={Images.ranking}/>
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
        flexDirection: 'row', alignItems: 'center'
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
