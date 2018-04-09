/**
 * Created by lorne on 2017/2/28.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SetItemView, BtnLong, ActionSheet} from '../../components';
import {
    clearLoginUser, getLoginUser, strNotNull,
    isLoginUser, share, setSize, loadApp
} from '../../utils/ComonHelper';
import {fetchGetRecentRaces, _getProfileOk, _getRecentRaces} from '../../actions/RacesAction';
import {umengEvent} from '../../utils/UmengEvent';
import StorageKey from '../../configs/StorageKey';
import {_getMsgNumOk} from '../../actions/AccountAction';
import {setLocalLanguage} from '../../services/ConfigDao';
import ƒ from "jmessage-react-plugin";


class SettingPage extends Component {
    state = {
        DESTRUCTIVE_INDEX: 1
    }


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
                title={I18n.t('setting')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>
            <SetItemView
                testID="btn_account_security"
                onPress={() => {

                    umengEvent('setting_security');
                    if (isLoginUser())
                        router.toSecurityPage();
                    else
                        router.toLoginFirstPage();
                }}
                name={I18n.t('account_security')}
                styles={{marginTop: 5}}/>
            {/*黑名单*/}

            <SetItemView
                testID="blacklist"
                onPress={() => {
                    if (isLoginUser())
                        router.toBlackList();
                    else
                        router.toLoginFirstPage();
                }}
                name={I18n.t('blacklist')}
                styles={{marginTop: 1}}/>


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
                    name={I18n.t('font_set')}/>

                <View
                    style={{height: 1, marginLeft: 17, backgroundColor: Colors.bg_black}}/>

                <SetItemView
                    onPress={() => {
                        umengEvent('setting_recommend');
                        share(`${I18n.t('share_friend')}`, loadApp)
                    }}
                    testID="btn_share"
                    name={I18n.t('recommend_friend')}/>


            </View>
            <View style={{backgroundColor: Colors.setting, marginTop: 10}}>

                <SetItemView name={I18n.t('about')}
                             onPress={() => router.toAboutPage()}/>
                <View
                    style={{height: 1, marginLeft: 17, backgroundColor: Colors.bg_black}}/>
                <SetItemView name={I18n.t('suggest')}
                             onPress={() => router.toSuggest()}/>
            </View>


            <View style={{flex: 1}}/>

            {this._exitView()}


            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={I18n.t('font_select')}
                options={[I18n.t('cancel'), I18n.t('font_stan'), I18n.t('font_mid'), I18n.t('font_big')]}
                cancelButtonIndex={0}
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
            return ( <BtnLong
                name={I18n.t('exit_login')}
                testID="btn_exit"
                onPress={this._exitApp}
                style={{
                    width: Metrics.screenWidth, height: 59,
                    justifyContent: 'center', backgroundColor: 'white',
                    flex:0
                }}
                textStyle={[{color: Colors._333,fontWeight:'normal'}, Fonts.H17]}/>)
        }
    };


    _switchLanguage = () => {
        Alert.alert(I18n.t('language_switch'), '', [
            {
                text: I18n.t('chinese'), onPress: () => {
                this._switch('zh')

            }
            },
            {
                text: I18n.t('english'), onPress: () => {
                this._switch('en')

            }
            }
        ]);
    };

    componentWillReceiveProps(nextProps) {
        console.log('TABHOME', nextProps);
    }

    _switch = (language) => {
        setLocalLanguage(language);
        router.popToTopRefresh();


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

                this.props._getProfileNull();
                this.forceUpdate();
                this.props.setMsgUnreadNull();
                router.toLoginFirstPage()

            }
            }
        ]);

    }
}

const bindAction = dispatch => ({
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _getProfileNull: () => dispatch(_getProfileOk({})),
    setMsgUnreadNull: () => dispatch(_getMsgNumOk())
});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(SettingPage);