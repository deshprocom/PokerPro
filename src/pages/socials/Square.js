import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';
import {reallySize} from "./Header";
import {Images, ApplicationStyles, Metrics, Colors} from "../../Themes";
import I18n from "react-native-i18n";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MomentList from './MomentList'
import PopAction from '../comm/PopAction';
import {isEmptyObject, showToast} from "../../utils/ComonHelper";
import {report_topic} from "../../services/SocialDao";

let topicId = -1;

export default class Square extends PureComponent {

    state = {
        square_types: ['topics', 'recommends', 'follows']
    };

    //举报原因
    report = (index) => {
        let reportList = global.reportList;
        let data = reportList[index];
        let body = {
            "body": data.name,
        };
        report_topic(topicId, body, (ret) => {
            showToast("举报成功");
        }, (err) => {
            console.log(err);
        });
        this.popAction && this.popAction.toggle();
    };

    //弹窗
    popActions = () => {
        let reportList = global.reportList;
        let resultArray = [];
        reportList.forEach((data, index) => {
            let item = {name: data.name, txtStyle: {color: '#4A90E2'}, onPress: () => this.report(index)};
            resultArray.push(item);
        });
        resultArray.push({
            name: I18n.t('cancel'),
            txtStyle: {color: Colors._AAA},
            onPress: () => this.popAction.toggle()
        });
        return resultArray;
    };

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <ScrollableTabView
                renderTabBar={() => <SquareBar/>}>
                {this.state.square_types.map(item => {
                    return <MomentList
                        key={item}
                        tabLabel={this.tabLabel(item)}
                        type={item}
                        showMore={(id) => {
                            topicId = id;
                            this.popAction && this.popAction.toggle();
                        }}/>
                })}

            </ScrollableTabView>

            <PopAction
                ref={ref => this.popAction = ref}
                btnArray={this.popActions()}/>

        </View>
    }

    tabLabel = (type) => {
        if (type === 'topics')
            return I18n.t('social.square');
        if (type === 'recommends')
            return I18n.t('social.essence');
        return I18n.t('social.follow')
    }
}

class SquareBar extends PureComponent {

    render() {
        const {tabs, activeTab, goToPage} = this.props;

        if (activeTab === 2 && isEmptyObject(global.login_user))
            global.router.toLoginFirstPage();
        let tabs_views = tabs.map((item, index) => <TouchableOpacity
            key={'bar' + index}
            onPress={() => {
                goToPage(index)
            }}
            style={{
                height: Metrics.navBarHeight - Metrics.statusBarHeight,
                marginTop: Metrics.statusBarHeight,
                alignItems: 'center', justifyContent: 'center',
                width: 90
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
            <StatusBar barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
            <TouchableOpacity
                onPress={() => {
                    global.router.pop()
                }}
                style={{
                    position: 'absolute', height: 40, width: 50,
                    alignItems: 'center', justifyContent: 'center',
                    left: 0, bottom: 0
                }}>
                <Image style={{height: 19, width: 10}}
                       source={Images.social.back}/>
            </TouchableOpacity>
            {tabs_views}
        </View>
    }
}



