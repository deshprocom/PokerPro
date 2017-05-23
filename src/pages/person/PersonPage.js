/**
 * Created by lorne on 2017/1/4.
 */
import React, {PropTypes}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images} from '../../Themes';
import I18n from 'react-native-i18n';
import {fetchGetProfile, fetchPutProfile, fetchPostAvatar} from '../../actions/PersonAction'
import PersonInfo from './PersonInfo';
import {PUT_PROFILE, GET_CERTIFICATION} from '../../actions/ActionTypes'
import {NavigationBar} from '../../components'
import {getLoginUser, strNotNull, getDispatchAction} from '../../utils/ComonHelper';

class PersonPage extends React.Component {

    state = {
        user_id: null
    };

    componentDidMount() {
        this._loadProfile();
        getDispatchAction()[GET_CERTIFICATION]();
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
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20
    }}>
                <ActivityIndicator
                    color={Colors._E0C294}
                />
                <Text style={{marginLeft: 10, color: Colors._E0C294}}>获取中...</Text>
            </View>
        );
    }

    shouldComponentUpdate(newProps, nextState) {
        const {router} = this.props;
        if (newProps.actionType === PUT_PROFILE && newProps.hasData) {
            router.pop();
            return false;
        }
        return true;
    }

    render() {

        const {loading, error, hasData, profile, actionType, router} = this.props;


        return (
            <View
                testID="page_profile"
                style={{backgroundColor:'#161718',flex:1}}>
                <NavigationBar
                    title={I18n.t('edit_info')}
                    rightBtnText={I18n.t('complete')}
                    leftBtnText={I18n.t('cancel')}
                    leftBtnPress={()=>this.props.router.pop()}
                    rightBtnPress={this._putProfile}/>

                <View>
                    {loading ? this._renderLoading() : null}
                    <PersonInfo
                        postAvatar={this.props._postAvatar}
                        ref={ref=>this.Profile = ref}
                        profile={profile}/>


                </View>
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