/**
 * Created by lorne on 2017/6/14.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, View, WebView, InteractionManager,
    Text, TouchableOpacity, ActivityIndicator, Alert,
    Linking, Clipboard, Modal, PanResponder, Animated, ToastAndroid
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import NavigationBar from './NavigationBar';
import theme from '../styles/theme'

export default class WebViewPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bottomInfoBarBottomValue: new Animated.Value(0),
            //toolbarTopValue: new Animated.Value(0)
        };

        this.bottomIconSize = [25, 25, 32];
        this.bottomIconNames = ['back',
            'forward',
            'refresh',
            '浏览器'
        ];

        this.moveYThreshold = 5;
        this.animationFlag = true;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let y = gestureState.dy;
                if (y > this.moveYThreshold && this.animationFlag) { //drag down
                    if (this.state.bottomInfoBarBottomValue === 0) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: 0,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                    // Animated.timing(this.state.toolbarTopValue, {
                    //     toValue: 0,
                    //     duration: 300
                    // }).start();
                }
                if (y < -this.moveYThreshold && this.animationFlag) {  //drag up
                    if (this.state.bottomInfoBarBottomValue === -45) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: -45,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                    // Animated.timing(this.state.toolbarTopValue, {
                    //     toValue: -theme.toolbar.height,
                    //     duration: 300
                    // }).start();
                }
            }
        });
    }

    render() {
        const {url} = this.props.params;
        return (
            <View style={ApplicationStyles.bgContainer}>
                {this.topBarView()}
                <WebView
                    ref={(ref)=>{this.webView = ref}}
                    style={styles.webView}
                    scalesPageToFit={true}
                    source={{uri: url}}
                    renderLoading={this._renderLoading}
                    renderError={this._renderError}
                    startInLoadingState={true}
                />


                {this.bottomBarView()}


            </View>
        );
    }

    _btnOnPressCallback = (id) => {
        if (id === 1) {
            this.webView.goBack();
        } else if (id === 2) {
            this.webView.goForward();
        } else if (id === 3) {
            this.webView.reload();
        } else if (id === 4) {
            Linking.canOpenURL(this.props.params.url).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.params.url);
                }
            });
        }
    };


    _renderLoading() {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={'#E4D57F'} size="large"/>
                <Text style={{marginTop: 10, color: 'red'}}>玩命加载中...</Text>
            </View>
        );
    }

    _renderError() {
        return (
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        );
    }

    bottomBarView = () => {
        return ( <Animated.View
            style={[styles.bottomInfoBar, {bottom: this.state.bottomInfoBarBottomValue}]}>
            {this.bottomIconNames.map((item, i) => {
                return (
                    <View key={i} style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={()=>this._btnOnPressCallback(i+1)}
                            activeOpacity={theme.touchableOpacityActiveOpacity}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}

        </Animated.View>)
    };

    topBarView = () => {
        return (
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                title="详细内容"
                titleStyle={styles.barTitle}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}
            />)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        marginTop: theme.toolbar.paddingTop,
        zIndex: 1
    },
    webView: {
        flex: 1
    },
    bottomInfoBar: {
        position: 'absolute',
        height: 45,
        width: theme.screenWidth,
        borderTopWidth: theme.segment.width,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'white'
    },
    moreContentContainerBackground: {
        position: 'absolute',
        top: 0,
        width: theme.screenWidth,
        height: theme.screenHeight
    },
    moreContentContainer: {
        position: 'absolute',
        right: 5,
        top: theme.toolbar.height,
        width: 150,
        height: 160,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    modalItem: {
        width: 150,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
