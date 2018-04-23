/**
 * Created by lorne on 2017/1/4.
 */
import React, {Component} from 'react';
import {
    ActivityIndicator, View, Text, Alert
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Images} from '../../Themes';
import I18n from 'react-native-i18n';
import {fetchGetProfile, fetchPutProfile, fetchPostAvatar} from '../../actions/PersonAction'
import PersonInfo from './PersonInfo';
import {NavigationBar} from '../../components'
import {getLoginUser, strNotNull} from '../../utils/ComonHelper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class PersonPage extends Component {

    state = {
        user_id: null
    };

    componentDidMount() {
        this._loadProfile();

    }

    _loadProfile() {

        const {user_id} = getLoginUser();
        if (strNotNull(user_id)) {
            this.props._getProfile(user_id);
            this.setState({user_id: user_id})
        }

    }


    _putProfile = () => {
        const {profile} = this.Profile.props;
        this.props._putProfile(profile.user_id, profile);
    };

    _renderLoading() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <ActivityIndicator
                    color={Colors._E0C294}
                />
                <Text style={{marginLeft: 10, color: Colors._E0C294}}>{I18n.t('person_page')}</Text>
            </View>
        );
    }


    render() {

        const {loading, error, hasData, profile, actionType} = this.props;


        return (
            <View
                testID="page_profile"
                style={{backgroundColor: '#ECECEE', flex: 1}}>
                <NavigationBar
                    toolbarStyle={{backgroundColor: '#161718'}}
                    title={I18n.t('edit_info')}
                    rightBtnText={I18n.t('save_s')}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    rightBtnPress={() => {

                        Alert.alert(
                            I18n.t("save_title"),
                            '',
                            [
                                {text: I18n.t("save_n"), onPress: () => router.pop()},
                                {
                                    text: I18n.t("save_s"), onPress: () => {
                                        this._putProfile();
                                        router.pop();
                                    }
                                },
                            ],
                            {cancelable: false}
                        )
                    }}/>

                <KeyboardAwareScrollView>
                    {loading ? this._renderLoading() : null}
                    <PersonInfo
                        postAvatar={this.props._postAvatar}
                        ref={ref => this.Profile = ref}
                        profile={profile}/>


                </KeyboardAwareScrollView>
            </View>
        )
    }
}


function bindAction(dispatch) {
    return {
        _getProfile: (user_id) => dispatch(fetchGetProfile(user_id)),
        _putProfile: (user_id, body) => dispatch(fetchPutProfile(user_id, body)),
        _postAvatar: (body) => dispatch(fetchPostAvatar(body))
    };
}


const mapStateToProps = state => ({
    loading: state.PersonState.loading,
    profile: state.PersonState.profile,
    error: state.PersonState.error,
    hasData: state.PersonState.hasData,
    actionType: state.PersonState.actionType,
    user_extra: state.TicketOrderState.user_extra

});

export default connect(mapStateToProps, bindAction)(PersonPage);