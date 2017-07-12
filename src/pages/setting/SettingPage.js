/**
 * Created by lorne on 2017/2/28.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, Button, ActionSheet} from '../../components';
import {
    clearLoginUser, getLoginUser, strNotNull,
    isLoginUser, share, setSize
} from '../../utils/ComonHelper';
import {fetchGetRecentRaces, _getProfileOk, _getRecentRaces} from '../../actions/RacesAction';
import {umengEvent} from '../../utils/UmengEvent';
import StorageKey from '../../configs/StorageKey';

import {setLocalLanguage} from '../../services/ConfigDao';

const CANCEL_INDEX = 0;
const options = [I18n.t('cancel'), '标准', '中', '大'];


class SettingPage extends Component {
    state = {
        DESTRUCTIVE_INDEX: 1
    }

    _likeView = () => {
        return (
            <SetItemView name={I18n.t('like_support')}/>)
    };

    _noticeView = () => {
        return (<View>
            <SetItemView name={I18n.t('game_remind')}
                         rightType="SWITCH_BTN"/>

            <View
                style={{height: 1, marginLeft: 17, backgroundColor: Colors.bg_black}}/>

            <SetItemView name={I18n.t('system_inform')}
                         rightType="SWITCH_BTN"/>
            <View
                style={{height: 1, marginLeft: 17, backgroundColor: Colors.bg_black}}/>
        </View>)
    };

    componentDidMount() {
        storage.load({
            key: StorageKey.FontNum
        }).then(ret => {
            // console.log('FontNum' + ret)
            let fontIndex = 1;
            if (ret === 0) {
                fontIndex = 1;
            } else if (ret === 2) {
                fontIndex = 2;
            } else if (ret === 4) {
                fontIndex = 3;
            }
            this.setState({
                DESTRUCTIVE_INDEX: fontIndex
            })
        })
    }


    render() {
        const {DESTRUCTIVE_INDEX} = this.state;

        return (<View
            testID="page_setting"
            style={ApplicationStyles.bg_black}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={this.props.router}
                title={I18n.t('setting')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => this.props.router.pop()}/>
            <SetItemView
                testID="btn_account_security"
                onPress={() => {

                    umengEvent('setting_security');
                    if (isLoginUser())
                        this.props.router.toSecurityPage();
                    else
                        this.props.router.toLoginFirstPage();
                }}
                name={I18n.t('account_security')}
                styles={{marginTop: 5}}/>


            <View style={{backgroundColor: Colors.setting, marginTop: 10}}>
                <SetItemView
                    onPress={this._switchLanguage}
                    name={I18n.t('Chinese')}
                    styles={{marginTop: 10}}/>
                <View
                    style={{height: 1, marginLeft: 17, backgroundColor: Colors.bg_black}}/>
                <SetItemView
                    onPress={() => {
                        this.ActionSheet.show();
                    }}
                    name={'字体设置'}/>

                <View
                    style={{height: 1, marginLeft: 17, backgroundColor: Colors.bg_black}}/>

                <SetItemView
                    onPress={() => {
                        umengEvent('setting_recommend');
                        share(`${I18n.t('share_friend')}`, "http://www.deshpro.com")
                    }}
                    testID="btn_share"
                    name={I18n.t('recommend_friend')}/>


            </View>
            <View style={{backgroundColor: Colors.setting, marginTop: 10}}>

                <SetItemView name={I18n.t('about')}
                             onPress={() => router.toAboutPage()}/>
            </View>


            <View style={{flex: 1}}/>

            {this._exitView()}


            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'字体选择'}
                options={options}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePress}
            />

        </View>)
    }

    handlePress = (i) => {
        switch (i) {
            case 1:
                setSize(0);
                break;
            case 2:
                setSize(2);
                break;
            case 3:
                setSize(4);
                break;
        }

        if (i === 0)
            return;

        this.setState({
            DESTRUCTIVE_INDEX: i
        });
        let recentRaces = {
            number: 8
        };
        if (login_user.user_id)
            recentRaces['user_id'] = login_user.user_id;

        this.props._getRecentRaces(recentRaces);
    };

    _exitView = () => {
        if (strNotNull(getLoginUser().user_id)) {
            return ( <Button
                testID="btn_exit"
                onPress={this._exitApp}
                style={{
                    width: Metrics.screenWidth, height: 59,
                    justifyContent: 'center', backgroundColor: '#212325'
                }}
                textStyle={[{color: Colors._AAA}, Fonts.H17]}>
                {I18n.t('exit_login')}
            </Button>)
        }
    };


    _switchLanguage = () => {
        Alert.alert('语言切换', '', [
            {
                text: '中文', onPress: () => {
                this._switch('zh')

            }
            },
            {
                text: '英语', onPress: () => {
                this._switch('en')

            }
            }
        ]);
    };

    _switch = (language) => {
        setLocalLanguage(language);
        this.forceUpdate();
        let recentRaces = {
            number: 8
        };
        if (login_user.user_id)
            recentRaces['user_id'] = login_user.user_id;

        this.props._getRecentRaces(recentRaces);
    };

    _exitApp = () => {
        Alert.alert(I18n.t('tint'), I18n.t('exit_tine'), [
            {
                text: I18n.t('cancel'), onPress: () => {
            }
            },
            {
                text: I18n.t('certain'), onPress: () => {
                clearLoginUser();
                const recentRaces = {
                    number: 8
                };
                this.props._getRecentRaces(recentRaces);
                this.props._getProfileNull();

                this.props.router.toLoginFirstPage()

            }
            }
        ]);


    }
}

const bindAction = dispatch => ({
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _getProfileNull: () => dispatch(_getProfileOk({})),
    _refreshRaces: () => dispatch(_getRecentRaces())
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(SettingPage);