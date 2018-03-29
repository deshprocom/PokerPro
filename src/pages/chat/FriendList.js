import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import NavigationBar from "../../components/NavigationBar";
import JMessage from "jmessage-react-plugin";
import {showToast} from "../../utils/ComonHelper";

export default class FriendList extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            friendList:[],
        }
    }

    componentWillMount(){
        // 添加监听
        JMessage.addContactNotifyListener(this.receiveNewInfomation);
        this.getFriendList();
    }

    componentWillUnmount(){
        ///移除监听
        JMessage.removeContactNotifyListener(this.receiveNewInfomation);
    }

    ///收到新的消息
    receiveNewInfomation = (event) => {

        console.log(event);
        let type = event.type;

        ///收到添加好友请求
        if (type === "invite_received"){
            /*
             fromUserAppKey:"3789f75e5d780c24595607b6"
             fromUsername:"QQ1049260505"
             reason:"请求添加好友"
             type:"invite_received"
             */
            JMessage.acceptInvitation({ username: event.fromUsername, appKey: '3789f75e5d780c24595607b6' },
                () => {
                    showToast("添加好友成功");
                }, (error) => {
                    console.log("添加好友失败");
                    console.log(error);
                })
        }

        ///收到同意添加好友消息
        if (type === "invite_accepted"){
            /*
            fromUserAppKey:"3789f75e5d780c24595607b6"
            fromUsername:"QQ1049260506"
            reason:"请求添加好友"
            type:"invite_accepted"
            */
        }
    };


    ///获取好友列表
    getFriendList = () => {
        //获取好友列表
        JMessage.getFriends((friendArray) =>{
            console.log(friendArray);
            this.setState({friendList:friendArray});
            /*
             appKey:"3789f75e5d780c24595607b6"
             avatarThumbPath:""
             gender:"unknown"
             isFriend:true
             isInBlackList:false
             isNoDisturb:false
             noteName:""
             noteText:""
             type:"user"
             username:"QQ1049260506"
             */
        },(error)=>{
            console.log("获取好友列表失败");
            console.log(error);
        });
    };

    ///接受添加请求
    acceptAddFriendRequrest = () => {
        // JMessage
    };

    ///发送添加好友请求
    sendAddFriendRequrest = () => {
        let param = {
          username:"QQ1049260505",
            reason:"请求添加好友",
            appKey:"3789f75e5d780c24595607b6",
        };
        JMessage.sendInvitationRequest(param,
            () => {
                showToast("发送请求成功");
            },
            (error) => {
                console.log("发送添加好友消息失败");
                console.log(error);
            },
        );
    };

    ///渲染好友列表
    _renderItem = (item) => {
        return(
            <TouchableOpacity onPress={() => {this.visitChatMessage(item.item)}}>
                <View style={[{height:60},{backgroundColor:"white"},{justifyContent:"center"}]}>
                    <Text style={{marginLeft:15}}>{item.item.username}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    ///聊天页面
    visitChatMessage = (item) => {
        router.toMessageList(item);
    };

    render(){
        const userInfo = this.props.params.userInfo;
        return(
            <View>
                {/*导航栏*/}
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: "white"}}
                    title={userInfo.username}
                    titleStyle={{color: "red"}}
                    leftBtnText={"返回"}
                    leftImageStyle={{height: 23, width: 23, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => global.router.pop()}
                    rightBtnText={"添加好友"}
                    rightBtnPress={this.sendAddFriendRequrest}
                />

                {/*好友列表*/}
                <FlatList data={this.state.friendList}
                          renderItem = {this._renderItem}
                          keyExtractor={(item,index) => index + ""}
                />


            </View>
        );
    }
}