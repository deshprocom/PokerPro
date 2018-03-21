/**
 * Created by lorne on 2017/7/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import RaceView from './RaceView';
import RankListView from './RankListView';
import {getRacesInfo} from '../../../services/RacesDao';
import {rankGameShare} from '../../../utils/ComonHelper';

export default class PokerRacePage extends Component {

    state = {
        race: {},
        ranks: [],
        parent_race: {}
    };

    componentDidMount() {
        const {race_id} = this.props.params;

        const body = {
            race_id: race_id
        };
        getRacesInfo(body, data => {
            const {ranks, race, parent_race} = data;
            this.setState({
                race: race,
                ranks: ranks,
                parent_race: parent_race
            })
        }, err => {
        })
    }

    render() {
        const {race, ranks, parent_race} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
            {this._topView(race)}
            <ScrollView>
                <RaceView
                    parent_race={parent_race}
                    race={race}/>
                {ranks.length > 0 ? <RankListView
                    ranks={ranks}/> : null}

            </ScrollView>

        </View>)
    }

    _topView = (race) => {
        return (<View style={styles.topBar}>

            <TouchableOpacity
                testID="btn_bar_left"
                onPress={() => router.pop()}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_return}
                    style={styles.topImgLeft}/>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={
                    () => {
                        router.popToDrawerRank(this.props.navigation);
                    }
                }
                testID="btn_bar_close"
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_close}
                    style={styles.imgClose}/>
            </TouchableOpacity>

            <View style={{flex: 1}}/>

            <View style={styles.right}>
                <TouchableOpacity
                    testID="btn_bar_close"
                    style={styles.topBtn}
                    activeOpacity={1}
                    onPress={() => {
                        rankGameShare(race.name, race.begin_date + '\n' + race.location, race.logo, race.race_id)
                    }}>
                    <Image
                        source={Images.share}
                        style={styles.imgShare}/>
                </TouchableOpacity>
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: Colors._161
    },
    topImgLeft: {
        height: 19,
        width: 11,
        marginLeft: 20,
        marginRight: 10
    },
    topBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgClose: {
        height: 18,
        width: 18,
        marginLeft: 15,
        marginRight: 15
    },

    right: {
        width: 90,
        flexDirection: 'row-reverse'
    },
    imgShare: {
        height: 22,
        width: 23,
        marginRight: 20,
        marginLeft: 10
    },
});