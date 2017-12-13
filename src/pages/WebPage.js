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
    Button
} from 'react-native';

import {NavigationBar} from '../components';
import {Colors, Fonts, Images, ApplicationStyles} from '../Themes';


export default class WebPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
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
    }

    onNavigationStateChange(navState) {
        console.log('onNavigationStateChange', navState);
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
            title: navState.title
        });
    }

    sendMessage = (str) => {
        this.webView.postMessage(str);
    };

    handleMessage = (e) => {
        this.setState({webViewData: e.nativeEvent.data});
    };

    render() {
        const {webViewData, nativeData} = this.state;
        return (
            <View style={styles.container}>

                {this.props.hideNav || <NavigationBar
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    toolbarStyle={{backgroundColor: '#090909'}}
                    leftBtnPress={this.onBackPress}
                    title={this.state.title}
                />}

                <View style={{height: 300, width: '100%', borderWidth: 1, borderColor: Colors._ECE}}>
                    <TextInput
                        onChangeText={text => this.setState({
                            nativeData: text
                        })}
                        style={{height: 40, width: '100%'}}/>
                    <Button
                        onPress={() => {
                            this.sendMessage(nativeData)
                        }}
                        title={'发送数据到Web'}/>


                    <Text>{`${webViewData}`}</Text>
                </View>


                <WebView
                    ref={ref => this.webView = ref}
                    startInLoadingState={true}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    source={{uri: 'http://192.168.2.173:3000'}}
                    onMessage={this.handleMessage}/>
            </View>
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