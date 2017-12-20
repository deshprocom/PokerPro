/**
 * Created by lorne on 2017/12/13
 * Function:
 * Desc:
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    WebView,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';

import {NavigationBar} from '../components';
import {Colors, Fonts, Images, ApplicationStyles} from '../Themes';
import {getAccessToken} from '../services/RequestHelper';
import {strNotNull, isEmptyObject} from "../utils/ComonHelper";
import {CommentBottom} from './comment';

class PostRoute {
    static NewsInfo = 'NewsInfo';
    static CommentList = 'comments';
    static RepliesComment = 'replies';
}


export default class WebPage extends Component {


    constructor(props) {
        super(props);

        const {url} = props.params;

        let webUrl = url + `?accessToken=${getAccessToken()}`;

        this.state = {
            url: webUrl,
            canGoBack: false,
            title: this.props.title,
            webViewData: '',
            nativeData: ''
        };
        this.webMsg = '';
        this.navState = {};
    }

    onBackPress = () => {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            global.router.pop();
        }
    };

    onNavigationStateChange(navState) {
        if (this.navState !== navState) {
            console.log('onNavigationStateChange', navState);
            this.setState({
                canGoBack: navState.canGoBack,
                url: navState.url,
                title: navState.title
            });
        }

    }

    sendMessage = (str) => {
        this.webView && this.webView.postMessage(str);
    };

    handleMessage = (e) => {
        let msg = e.nativeEvent.data;

        let webParam = JSON.parse(msg);
        console.log('来自Web数据', webParam);
        const {route, param} = webParam;
        if (strNotNull(route)) {
            switch (route) {
                case PostRoute.CommentList:
                    let commentsUrl = `${global.desh5}comment`;
                    global.router.toCommentInfoPage(param);
                    break;
                case PostRoute.RepliesComment:
                    this.commentNav && this.commentNav.repliesBtn(param);
                    break;
            }
        }


    };

    render() {
        const {webViewData, nativeData, url} = this.state;
        return (
            <View style={styles.container}>

                {this.props.hideNav || <NavigationBar
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    toolbarStyle={{backgroundColor: '#090909'}}
                    leftBtnPress={this.onBackPress}
                    title={this.state.title}
                />}


                <WebView
                    ref={ref => this.webView = ref}
                    startInLoadingState={true}
                    renderError={this._renderError}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    source={{uri: url}}
                    mixedContentMode={'always'}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    onMessage={this.handleMessage}/>

                <View style={styles.bottom}>
                    {this._renderBottomNav()}
                </View>


            </View>
        );
    };

    webRefesh=()=>{
        this.webView.reload();
    };

    _renderBottomNav = () => {
        if (this.props.params.body) {
            const {bottomNav, info, topic_type} = this.props.params.body;
            if (strNotNull(bottomNav)) {
                switch (bottomNav) {
                    case 'commentNav':
                        return <CommentBottom
                            ref={ref => this.commentNav = ref}
                            topic_type={topic_type}
                            info={info}
                            webRefesh={this.webRefesh}/>

                }
            }
        }

    };

    _renderError = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.webView.reload();
                }}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> 出错了, 重新刷新下吧～</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    listViewContainer: {
        flex: 1,
        backgroundColor: '#f3f3f4',
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});