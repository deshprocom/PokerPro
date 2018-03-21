/**
 * Created by lorne on 2017/4/12.
 */
import React, { Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import {isEmptyObject, strNotNull} from '../../utils/ComonHelper';
import {fetchPlayer} from '../../actions/AccountAction';

class PokerPersonPage extends Component {


    componentDidMount() {

        const player = this.props.params.player;
        const body = {
            player_id: player.player_id
        };

        this.props._getPlayer(body);


    }

    render() {


        return (<View
            testID="page_poker_player"
            style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={router}
                title={this.getPlayerName()}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

            <View style={styles.viewInfo}>
                <TouchableOpacity
                    testID="btn_big_avatar"
                    onPress={this._bigImage}>
                    <Image
                        source={this.getAvatar()}
                        style={styles.imgAvatar}/>
                </TouchableOpacity>


                <View>
                    <Text
                        testID="txt_poker_name"
                        style={styles.txtName}>{this.getPlayerName()}</Text>
                    <Text
                        testID="txt_poker_country"
                        style={styles.txtCountry}>{this.getCountry()}</Text>
                </View>


            </View>

        </View>)
    }

    _bigImage = () => {
        const {player} = this.props;
        if (!isEmptyObject(player) && strNotNull(player.avatar)) {
            let avatar = [{url: player.avatar}];
            router.toImageGalleryPage( avatar, 0);
        }
    }


    getPlayerName = () => {
        const player = this.props.params.player;
        if (!isEmptyObject(player))
            return player.name;
    }

    getCountry = () => {
        const {player} = this.props;
        if (!isEmptyObject(player))
            return player.country;
    }

    getAvatar = () => {
        const {player} = this.props;
        if (!isEmptyObject(player))
            return {uri: player.avatar};
        else
            return Images.home_avatar;
    }
}


function bindAction(dispatch) {
    return {
        _getPlayer: (body) => dispatch(fetchPlayer(body)),
    };
}

const mapStateToProps = state => ({
    loading: state.AccountState.loading,
    error: state.AccountState.error,
    hasData: state.AccountState.hasData,
    actionType: state.AccountState.actionType,
    player: state.AccountState.player

});

export default connect(mapStateToProps, bindAction)(PokerPersonPage);

const styles = StyleSheet.create({
    viewInfo: {
        height: 114,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5

    },
    imgAvatar: {
        height: 72,
        width: 72,
        borderRadius: 36,
        marginLeft: 18,
        marginRight: 28,
    },
    txtName: {
        fontSize: 18,
        color: Colors.txt_666
    },
    txtCountry: {
        fontSize: 18,
        color: Colors.txt_666,
        marginTop: 8
    }

});