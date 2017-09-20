import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationBar, UltimateListView} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import UltimateList from '../../components/ultimate';
import ItemVerified from './ItemVerified';

export default class VerifiedPage extends Component {

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: '#161718'}}
                title={I18n.t('verified_list')}
                rightBtnText={I18n.t('certain')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
            />
            <ScrollableTabView>
                <UltimateList
                    tabLabel="身份证"
                    refreshable={false}
                    keyExtractor={(item, index) => `${index}`}
                    onFetch={this.onFetch}
                    separator={this.renderSeparatorView}
                    item={this.renderItem}
                    allLoadedText=''/>

                <UltimateList
                    tabLabel="护照"
                    refreshable={false}
                    keyExtractor={(item, index) => `${index}`}
                    onFetch={this.onFetch}
                    item={this.renderItem}/>

            </ScrollableTabView>
        </View>)
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch([], 10)

    };

    renderSeparatorView = () => {
        return (<View style={{height: 1}}/>)
    };

    renderItem = (item, index, separator) => {

        return (<ItemVerified/>)
    }
}