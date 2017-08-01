/**
 * Created by lorne on 2017/7/26.
 */
import React, {Component, PropTypes} from 'react';
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
        ranks: []
    };

    componentDidMount() {
        const {race_id} = this.props.params;

        const body = {
            race_id: race_id
        };
        getRacesInfo(body, data => {
            this.setState({
                race: data,
                ranks: data.ranks
            })
        }, err => {
        })
    }

    render() {
        const {race, ranks} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
            {this._topView(race)}
            <ScrollView>
                <RaceView
                    race={race}/>
                <RankListView
                    ranks={ranks}/>
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
                        router.popToDrawerRank();
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
                        rankGameShare(race.race.name, race.race.begin_date+'\n'+race.race.location, race.race.logo, race.race.race_id)
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