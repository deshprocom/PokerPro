import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';
import TabIcon from './TabIcon';
import {Actions} from 'react-native-router-flux';
import {showTabTop, hideTabTop, onPressBackTop, videoPause} from '../../actions/AccountAction';
import {SHOW_BACK_TOP, HIDE_BACK_TOP, VIDEO_PAUSE, BACK_TOP} from '../../actions/ActionTypes';
import {connect} from 'react-redux';
import {setDispatchAction} from '../../utils/ComonHelper';


class BottomNavigation extends Component {

    state = {
        tabIndex: 0,
        showTop: false

    };

    componentDidMount() {
        setDispatchAction(SHOW_BACK_TOP, this.props._showBackTop);
        setDispatchAction(HIDE_BACK_TOP, this.props._hideBackTop);
        setDispatchAction(BACK_TOP, this.props._backTop)


    }

    componentWillReceiveProps(newProps) {

        if (this.state.tabIndex === 0) {
            this.setState({
                showTop: newProps.actionType === SHOW_BACK_TOP
            })
        } else if (newProps.actionType === BACK_TOP) {
            this.setState({
                tabIndex: 0
            })
        }
    }


    render() {

        const {tabIndex, showTop} = this.state;
        const {jumpToIndex} = this.props;
        return (
            <View style={styleBN.navigation}>
                {this.state.tabIndex === 0 && showTop ? <TouchableOpacity
                        style={styleBN.navigations}
                        onPress={() => {
                            this.setState({
                                showTop: false
                            });
                            this.props._backTop();
                        }}>
                        <View style={styleBN.buttonView}>
                            <Image style={styleBN.topImg} source={Images.top}/>
                            <Text style={styleBN.topText}>{I18n.t('backTop')}</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                tabIndex: 0
                            });
                            this.props._videoPause();
                            jumpToIndex(0)

                        }}
                        style={styleBN.navigations}>
                        <TabIcon tab={'home'} focused={tabIndex === 0}/>
                    </TouchableOpacity>}


                <TouchableOpacity
                    onPress={() => {
                        this.props._hideBackTop();
                        this.setState({
                            tabIndex: 1
                        });
                        jumpToIndex(1)
                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'news'} focused={tabIndex === 1}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props._videoPause();
                        this.setState({
                            tabIndex: 2
                        });
                        jumpToIndex(2)

                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'rank'} focused={tabIndex === 2}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props._videoPause();
                        this.setState({
                            tabIndex: 3
                        });
                        jumpToIndex(3)

                    }}
                    style={styleBN.navigations}>
                    <TabIcon tab={'me'} focused={tabIndex === 3}/>
                </TouchableOpacity>
            </View>

        )
    }
}

const styleBN = StyleSheet.create({
    navigation: {
        height: 50,
        width: '100%',
        backgroundColor: '#ffffff',
        opacity: 0.96,
        flexDirection: 'row',
        alignItems: 'center'
    },
    navigations: {
        flex: 1
    },
    tabs: {
        height: 50
    },
    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#161718'
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
    bgInformationStyle: {
        width: 17,
        height: 23
    },
    bgRankStyle2: {
        height: 25,
        width: 25
    },
    buttonView: {
        width: 94,
        height: 50,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topImg: {
        width: 19,
        height: 12
    },
    topText: {
        backgroundColor: 'transparent',
        color: '#151516',
        fontSize: 12,
        marginTop: 5
    }
});

const bindAction = dispatch => ({
    _showBackTop: () => dispatch(showTabTop()),
    _hideBackTop: () => dispatch(hideTabTop()),
    _backTop: () => dispatch(onPressBackTop()),
    _videoPause: () => dispatch(videoPause())

});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
});

export default connect(mapStateToProps, bindAction)(BottomNavigation);

