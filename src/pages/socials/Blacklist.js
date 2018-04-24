/**
 * Created by hfl on 2018/4/9.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Colors, Images} from "../../Themes";
import {NavigationBar} from '../../components';
import I18n from "react-native-i18n";
import {reallySize} from "./Header";
import JMessage from "jmessage-react-plugin";
import {NoDataView} from '../../../src/components/load';
import {isEmptyObject, showToast} from '../../utils/ComonHelper';
import ImageLoad from "../../components/ImageLoad";

export default class Blacklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blacklist: [],
        };
    }

    componentDidMount() {
        this.getBlackList();
    }

    ///获取黑名单列表
    getBlackList = () => {
        JMessage.getBlacklist((blacklist) => {
            this.setState({blacklist: blacklist});
        }, (error) => {
            console.log("获取黑名单列表失败", error);
        });
    };

    ///移除黑名单
    removeFromBlackList = (username) => {
        JMessage.removeUsersFromBlacklist({usernameArray: [username]}, (success) => {
            this.getBlackList();
            showToast(I18n.t("remove_blacklist_success"));
        }, (error) => {
            console.log("移除黑名单失败");
        });
    };

    _renderItem = (item) => {
        let {avatarThumbPath, nickname, username} = item.item;
        let selectedIndex = this.state.selectedIndex;
        return (
            <View style={styles.item}>
                <View style={styles.subView}>
                    <ImageLoad
                        emptyBg={Images.home_avatar}
                        source={{uri: avatarThumbPath}}
                        style={styles.image}/>
                    <Text style={styles.nickName}>{nickname}</Text>
                </View>
                <TouchableOpacity onPress={() => this.removeFromBlackList(username)}>
                    <View style={styles.btnRemove}>
                        <Text style={styles.btnText}>{I18n.t('remove_blacklist')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar
                    toolbarStyle={{backgroundColor: Colors.bg_09}}
                    router={router}
                    title={I18n.t('blacklist')}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>

                {!isEmptyObject(this.state.blacklist) ?
                    <FlatList data={this.state.blacklist}
                              keyExtractor={(item, index) => index + ""}
                              renderItem={this._renderItem}
                              ItemSeparatorComponent={() =>
                                  <View style={[{backgroundColor: "white"}, {height: 1}]}>
                                      <View
                                          style={[{backgroundColor: "#ECECEE"}, {height: 1}, {marginLeft: reallySize(82)}]}/>
                                  </View>}
                    /> : <NoDataView/>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
    },
    item: {
        height: reallySize(75),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    subView: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: reallySize(54),
        width: reallySize(54),
        borderRadius: reallySize(27),
        marginLeft: reallySize(17),
    },
    nickName: {
        marginLeft: reallySize(21),
        fontSize: 15,
        color: "#333333",
    },
    btnRemove: {
        height: reallySize(26),
        borderWidth: 1,
        borderColor: "#979797",
        marginRight: reallySize(17),
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    btnText: {
        color: "#444444",
        fontSize: 14,
    }
});