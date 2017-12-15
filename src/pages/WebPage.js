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


export default class WebPage extends Component {

    constructor(props) {
        super(props);
        console.log(getAccessToken(), props)
        const {url} = props.params;
        this.state = {
            url: url + `?accessToken=${getAccessToken()}`,
            canGoBack: false,
            title: this.props.title,
            webViewData: '',
            nativeData: ''
        }
    }

    onBackPress = () => {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            global.router.pop();
        }
    };

    onNavigationStateChange(navState) {
        console.log('onNavigationStateChange', navState);
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
            title: navState.title
        });
    }

    sendMessage = (str) => {
        this.webView && this.webView.postMessage(str);
    };

    handleMessage = (e) => {
        console.log('来自Web数据', e.nativeEvent.data)
        this.setState({
            webViewData: e.nativeEvent.data
        });
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
                    onMessage={this.handleMessage}/>
            </View>
        );
    }

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
    }
});