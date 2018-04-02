/**
 * Created by wangdi on 23/11/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Platform, View, Text, StatusBar, TouchableOpacity,
    Image, Animated,Dimensions
} from 'react-native';
import theme from '../Themes/styles/theme';
import TestRouter from './TestRouter';
import PropTypes from 'prop-types';

///屏幕宽高
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const navBarHeight = Platform.OS === "ios" ? ScreenWidth===375 && ScreenHeight === 812 ? 88 : 64 : 44;
const toolMargin = Platform.OS === "ios" ? ScreenWidth===375 && ScreenHeight === 812 ? 44 : 20 : 0;

export default class NavigationBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        leftBtnIcon: PropTypes.number,
        leftBtnText: PropTypes.string,
        leftBtnPress: PropTypes.func,
        rightBtnIcon: PropTypes.number,
        rightBtnText: PropTypes.string,
        rightBtnPress: PropTypes.func,
        leftImageStyle: PropTypes.object,
        rightImageStyle: PropTypes.object,
        btnTextStyle: PropTypes.object,
        toolbarStyle: PropTypes.object,
        router: PropTypes.object,
        refreshPage: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            title, leftBtnIcon, leftBtnText, leftBtnPress,
            rightBtnIcon, rightBtnText, rightBtnPress, leftImageStyle,
            rightImageStyle, btnTextStyle, toolbarStyle
        } = this.props;

        return (
            <Animated.View style={[styles.container, toolbarStyle]}>
                <StatusBar barStyle={this.props.barStyle ? this.props.barStyle : "light-content"}/>
                <View style={styles.toolbar}>
                    <View style={styles.fixedCell}>
                        {(leftBtnIcon || leftBtnText) ?
                            <Button
                                testID="btn_bar_left"
                                icon={leftBtnIcon} text={leftBtnText} onPress={leftBtnPress}
                                imageStyle={leftImageStyle} textStyle={btnTextStyle}/>
                            :
                            null
                        }
                    </View>
                    <View style={styles.centerCell}>
                        <Text
                            numberOfLines={1}
                            style={[styles.title, this.props.titleStyle ? this.props.titleStyle : {}]}>{title}</Text>
                        <TestRouter
                            refreshPage={this.props.refreshPage}/>
                    </View>
                    <View style={[styles.fixedCell, {justifyContent: 'flex-end'},{alignItems:"flex-end"}]}>
                        {(rightBtnIcon || rightBtnText) ?
                            <Button
                                testID="btn_bar_right"
                                icon={rightBtnIcon} text={rightBtnText} onPress={rightBtnPress}
                                imageStyle={rightImageStyle} textStyle={btnTextStyle}/>
                            :
                            null
                        }
                    </View>
                </View>
            </Animated.View>
        );
    }
}

class Button extends Component {
    static propTypes = {
        icon: PropTypes.number,
        text: PropTypes.string,
        onPress: PropTypes.func,
        imageStyle: PropTypes.object,
        textStyle: PropTypes.object,
        testID: PropTypes.string

    };

    render() {
        return (
            <TouchableOpacity
                testID={this.props.testID}
                onPress={this.props.onPress}
                activeOpacity={theme.touchableOpacityActiveOpacity}>

                {this.props.icon != undefined ?

                    <View style={styles.btnImage}>
                        <Image source={this.props.icon} style={this.props.imageStyle}/>
                    </View>
                    :
                    <View style={styles.btnTextView}>
                        <Text style={[styles.btnText, this.props.textStyle]}
                              numberOfLines={1}>{this.props.text}</Text>
                    </View>
                }

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: { //in submitOrder to display the shadow on home tab
        height: navBarHeight,
        width: theme.screenWidth
    },
    toolbar: {
        height: 44,
        flexDirection: 'row',
        marginTop:toolMargin,
    },
    fixedCell: {
        flexDirection: 'row',
        width: 100
    },
    centerCell: {
        flex: 1,
        height: theme.toolbar.height,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: theme.toolbar.titleSize,
        color: theme.toolbar.titleColor
    },
    btnImage: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: theme.toolbar.height,
    },
    btnText: {
        color: theme.toolbar.titleColor,
        fontSize: theme.toolbar.textBtnSize,
        marginLeft: 20,
        marginRight: 20,
    },
    btnTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: theme.toolbar.height,
    }
});
