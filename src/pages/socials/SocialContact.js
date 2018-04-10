import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import I18n from "react-native-i18n";
import {Colors, Images, Metrics} from "../../Themes";
import {NavigationBar,UltimateListView} from '../../components';
import {NoDataView} from '../../../src/components/load';
import {isEmptyObject, utcDate, strNotNull} from '../../utils/ComonHelper';
import {followships} from '../../services/SocialDao';
import {reallySize} from "./Header";

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MomentList from './MomentList'

export default class SocialContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:this.props.params.type,
            resultData:{
                follower_count:0,//粉丝
                followers:[],//粉丝列表
                following_count:0,//关注数
                followings:[],//关注列表
            }
        };
    }

    componentDidMount(){
        followships((success) => {
            this.setState({resultData:success});
        },(failure) => {
            console.log("获取关注与粉丝列表失败");
        });
    }

    renderTabBar = () => {
        let type = this.state.selectedIndex;
        return (
            <View style={styles.tabbar}>
                <TouchableOpacity style={{flex:1}} onPress={() => this.setState({selectedIndex:0})}>
                    <View style={styles.subView}>
                        <Text
                            style={[styles.tabTitle, type === 0 ? {color: "#F24A4A"} : {color: "#666666"}]}>{`${I18n.t('follow')}  ${this.state.resultData.following_count}`}</Text>
                        <View style={type === 0 ? styles.tabLine : {height: 2}}/>
                    </View>
                </TouchableOpacity>
                <View style={[{height: reallySize(26)}, {backgroundColor: "#ECECEE"}, {width: 1}]}/>
                <TouchableOpacity style={{flex:1}} onPress={() => this.setState({selectedIndex:1})}>
                    <View style={styles.subView}>
                        <Text
                            style={[styles.tabTitle, type === 1 ? {color: "#F24A4A"} : {color: "#666666"}]}>{`${I18n.t('stalwart')}  ${this.state.resultData.follower_count}`}</Text>
                        <View style={type === 1 ? styles.tabLine : {height: 2}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar barStyle={'dark-content'}
                               titleStyle={{fontSize: 17, color: Colors._333}}
                               toolbarStyle={{backgroundColor: 'white'}}
                               title={I18n.t('follow_stalwart')}
                               leftBtnIcon={Images.set_back}
                               leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                               leftBtnPress={() => {
                                   router.pop()
                               }}
                />

                <ScrollableTabView
                    style={{marginTop: 1}}
                    renderTabBar={this.renderTabBar}>
                    {[].map(item => {
                        return <MomentList
                            key={item}
                            tabLabel={this.tabLabel(item)}
                            type={item}/>
                    })}

                </ScrollableTabView>

            </View>
        )
    }
}

export class FollowList extends Component {
    render(){
        return(
            <View/>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
    },
    tabbar: {
        height: reallySize(45),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
    },
    subView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabTitle: {
        flex: 1,
        padding: 10,
        marginTop: reallySize(4),
        fontSize: 15,
    },
    tabLine: {
        backgroundColor: "#F24A4A",
        height: 2,
        width: reallySize(80)
    }
});