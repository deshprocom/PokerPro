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
import {NavigationBar, UltimateListView, ImageLoad} from '../../components';
import {NoDataView} from '../../../src/components/load';
import {isEmptyObject, utcDate, strNotNull} from '../../utils/ComonHelper';
import {follow, followings, followers} from '../../services/SocialDao';
import {reallySize} from "./Header";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';


export default class SocialContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            following_count: this.props.params.following_count,
            follower_count: this.props.params.follower_count
        }
    }

    renderTabBar = (props) => {
        const {goToPage, activeTab} = props;
        let type = activeTab;
        return (
            <View style={styles.tabbar}>
                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    goToPage(0);
                }}>
                    <View style={styles.subView}>
                        <Text
                            style={[styles.tabTitle, type === 0 ? {color: "#F24A4A"} : {color: "#666666"}]}>{`${I18n.t('follow')} ${this.state.following_count}`}</Text>
                        <View style={type === 0 ? styles.tabLine : {height: 2}}/>
                    </View>
                </TouchableOpacity>
                <View style={[{height: reallySize(26)}, {backgroundColor: "#ECECEE"}, {width: 1}]}/>
                <TouchableOpacity style={{flex: 1}} onPress={() => {
                    goToPage(1);
                }}>
                    <View style={styles.subView}>
                        <Text
                            style={[styles.tabTitle, type === 1 ? {color: "#F24A4A"} : {color: "#666666"}]}>{`${I18n.t('stalwart')}  ${this.state.follower_count}`}</Text>
                        <View style={type === 1 ? styles.tabLine : {height: 2}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


    render() {
        let data = [{type: "followings"}, {type: "followers"}];
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
                    initialPage={this.props.params.type}
                    style={{marginTop: 1}}
                    renderTabBar={this.renderTabBar}>
                    {data.map((item) => {
                        return (
                            <FollowList data={item}
                                        key={item.type}
                                        add={() => {
                                            this.setState({following_count: this.state.following_count - 1});
                                        }}
                                        reduce={() => {
                                            this.setState({following_count: this.state.following_count + 1});
                                        }}
                            />
                        );

                    })}


                </ScrollableTabView>

            </View>
        )
    }
}

export class FollowList extends Component {

    render() {
        return (
            <UltimateListView keyExtractor={(item, index) => index + ""}
                              ref={(ref) => this.listView = ref}
                              onFetch={this.onFetch}
                              item={this.renderItem}
                              header={() => <View style={[{height: 7}, {backgroundColor: "#ECECEE"}]}/>}
                              separator={() =>
                                  <View style={[{backgroundColor: "white"}, {height: 1}]}>
                                      <View
                                          style={[{backgroundColor: "#ECECEE"}, {height: 1}, {marginLeft: reallySize(82)}]}/>
                                  </View>
                              }
                              refreshableTitlePull={I18n.t('pull_refresh')}
                              refreshableTitleRelease={I18n.t('release_refresh')}
                              dateTitle={I18n.t('last_refresh')}
                              allLoadedText={I18n.t('no_more')}
                              waitingSpinnerText={I18n.t('loading')}
                              emptyView={() => {
                                  return <NoDataView/>
                              }}
            />
        );
    }

    ///关注 取消关注
    followAction = (target_id, is_following, callback) => {
        follow(is_following, {target_id: target_id}, (success) => {
            if (is_following) {
                if (this.props.add === null) return;
                this.props.add();
            }
            else {
                if (this.props.reduce === null) return;
                this.props.reduce();
            }
            callback();
        }, (error) => {

        });
    };

    ///渲染行
    renderItem = (item) => {
        let icon = "";
        const {avatar, follower_count, following_count, nick_name, is_following, id} = item;
        if (avatar !== null) {
            icon = avatar;
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    global.router.toUserTopicPage({user_id: id})
                }}
                style={styles.item}>
                <View style={styles.subRowItem}>
                    <ImageLoad
                        emptyBg={Images.home_avatar}
                        source={{uri: icon}}
                        style={styles.iconImage}/>
                    <View>
                        <Text style={styles.nickname}>{nick_name}</Text>
                        <Text style={styles.followText}>{`${I18n.t("follow")} ${following_count} | ${I18n.t("stalwart")} ${follower_count}`}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.followAction(id, is_following, () => {
                    item.is_following = !item.is_following;
                    this.listView && this.listView.updateDataSource(this.listView.getRows())
                })}>
                    {!is_following ?
                        <View style={styles.button_n}>
                            <Text style={styles.btnText}>{`+${I18n.t("follow")}`}</Text>
                        </View>
                        :
                        <View style={styles.button_s}>
                            <Text style={styles.btnText}>{I18n.t("rank_del_focus")}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        let type = this.props.data.type;
        if (type === "followings") {
            followings({page, page_size: 20}, (success) => {
                success.followings.forEach((item) => {
                    item.is_following = true;
                });
                startFetch(success.followings, 15);
            }, (error) => {
                abortFetch()
            });
        }
        if (type === "followers") {
            followers({page, page_size: 20}, (success) => {
                startFetch(success.followers, 15)
            }, (error) => {
                abortFetch()
            });
        }

    };
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
    },
    item: {
        height: reallySize(75),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    subRowItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconImage: {
        width: reallySize(54),
        height: reallySize(54),
        marginLeft: 17,
        borderRadius: reallySize(27),
    },
    nickname: {
        marginLeft: reallySize(22),
        fontSize: 15,
        color: "#333333",
    },
    followText: {
        marginTop: reallySize(6),
        marginLeft: reallySize(22),
        fontSize: 12,
        color: "#AAAAAA",
    },
    button_n: {
        height: reallySize(26),
        width: reallySize(80),
        marginRight: 17,
        borderColor: "#ECECEE",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button_s: {
        height: reallySize(26),
        width: reallySize(80),
        marginRight: 17,
        backgroundColor: "#ECECEE",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "#444444",
        fontSize: 14,
    }
});