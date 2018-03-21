/**
 * Created by lorne on 2017/4/6.
 */
import React, { Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {raceStatusConvert, isEmptyObject, markRules, markStyles} from '../../utils/ComonHelper'
import I18n from 'react-native-i18n';
import {Button} from '../../components';
import RaceResultList from './RaceResultList';
import {RACE_RANKS} from '../../actions/ActionTypes';
import {fetchRaceRanks, fetchSubRaceRanks} from '../../actions/RacesAction';
import {MarkdownPlat} from '../../components'

class RaceResultView extends Component {


    render() {
        const {btnRight, btnLeft} = this.state;
        return (<View
            style={styles.page}
            testID="page_race_result">
            <View style={styles.tab}>
                <Button
                    onPress={this.btnLeftClick}
                    activeOpacity={1}
                    testID="btn_race_info"
                    style={[btnLeft?styles.btnSelect:styles.btn,styles.btnLeft]}
                    textStyle={btnLeft?styles.txtBtnSelect:styles.txtBtn}
                >
                    {I18n.t('GameInformation')}
                </Button>

                <Button
                    onPress={this.btnRightClick}
                    activeOpacity={1}
                    testID="btn_race_result"
                    style={[btnRight?styles.btnSelect:styles.btn,styles.btnRight]}
                    textStyle={btnRight?styles.txtBtnSelect:styles.txtBtn}
                >
                    {I18n.t('GameResult')}
                </Button>
            </View>

            {this._content()}
        </View>)
    }

    state = {
        btnLeft: true,
        btnRight: false
    };

    componentDidMount() {
        const body = {
            race_id: this.props.race_id
        };
        if (this.props.isSub)
            this.props._getSubRaceRanks(body);
        else
            this.props._getRaceRanks(body)

    }


    btnLeftClick = () => {
        this.setState({
            btnLeft: true,
            btnRight: false
        })

    };

    btnRightClick = () => {
        this.setState({
            btnLeft: false,
            btnRight: true
        })
    };

    _content = () => {
        const {raceRanks, schedule, subRaceRanks} = this.props;

        let ranks;
        if (this.props.isSub)
            ranks = subRaceRanks;
        else
            ranks = raceRanks;
        const {items} = ranks;

        if (this.state.btnLeft)
            return (
                <MarkdownPlat
                    markdownStr={schedule}/>

            );
        else {
            if (!isEmptyObject(items))

                return <RaceResultList
                    raceRanks={items}/>;
        }
    }
}

const bindAction = dispatch => ({
    _getRaceRanks: (body) => dispatch(fetchRaceRanks(body)),
    _getSubRaceRanks: (body) => dispatch(fetchSubRaceRanks(body))
});

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    raceRanks: state.RaceState.raceRanks,
    subRaceRanks: state.RaceState.subRaceRanks
});

export default connect(mapStateToProps, bindAction)(RaceResultView);


const styles = StyleSheet.create({

    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginRight: 17,
        marginLeft: 17,
        marginBottom: 20
    },
    btn: {
        flex: 1,
        height: 36,
        borderWidth: 1,
        borderColor: Colors._161817,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSelect: {
        flex: 1,
        height: 36,
        backgroundColor: Colors._161817,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtBtn: {
        color: Colors._161817,
        fontSize: 14
    },
    txtBtnSelect: {
        color: Colors.white,
        fontSize: 14
    },
    btnLeft: {
        borderBottomLeftRadius: 2,
        borderTopLeftRadius: 2
    },
    btnRight: {
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2
    },
    txtTab: {
        color: Colors.txt_666,
        fontSize: 13,
        marginTop: 13,
        marginLeft: 17,
        marginBottom: 5
    },
    markView: {
        padding: 20,
        paddingBottom: 40,
        paddingTop: 0,
        backgroundColor: Colors.white
    },
    page: {
        backgroundColor: Colors.white,
        flex: 1
    },


});