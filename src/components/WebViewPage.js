/**
 * Created by lorne on 2017/6/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet, View, WebView, InteractionManager,
    Text, TouchableOpacity, ActivityIndicator, Image,
    Linking, Clipboard, Modal, PanResponder, Animated, ToastAndroid
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import NavigationBar from './NavigationBar';
import theme from '../Themes/styles/theme';
import I18n from 'react-native-i18n';

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
                    if (this.state.bottomInfoBarBottomValue === -50) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: -50,
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
                <View
                    style={styles.contentContainer}
                    {...this._panResponder.panHandlers}>
                    <WebView

                        ref={(ref) => {
                            this.webView = ref
                        }}
                        style={styles.webView}
                        scalesPageToFit={true}
                        source={{uri: url}}
                        renderLoading={this._renderLoading}
                        renderError={this._renderError}
                        startInLoadingState={true}
                    />
                </View>


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


    _renderLoading =()=> {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={Colors._CCC} size="large"/>

            </View>
        );
    }

    _renderError  =()=>{
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

    bottomBarView = () => {
        return ( <Animated.View
            style={[styles.bottomInfoBar, {bottom: this.state.bottomInfoBarBottomValue}]}>
            <TouchableOpacity
                onPress={() => this.webView.goBack()}
                style={styles.btn}>
                <Image style={styles.imgBk}
                       source={Images.web_left}/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.webView.goForward()}
                style={styles.btn}>
                <Image style={styles.imgBk}
                       source={Images.web_right}/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.webView.reload()}
                style={styles.btn}>
                <Image style={styles.imgRef}
                       source={Images.web_refresh}/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Linking.canOpenURL(this.props.params.url).then(supported => {
                        if (supported) {
                            Linking.openURL(this.props.params.url);
                        }
                    });
                }}
                style={styles.btn}>
                <Image style={styles.imgRef}
                       source={Images.web_page}/>

            </TouchableOpacity>


        </Animated.View>)
    };

    topBarView = () => {
        const {url} = this.props.params;
        return (
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('app_name')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
            />)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1
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
        height: 50,
        width: theme.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around'
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
    },
    btn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBk: {
        height: 26,
        width: 13
    },
    imgRef: {
        height: 24,
        width: 24
    }
});
