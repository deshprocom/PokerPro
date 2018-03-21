/**
 * Created by lorne on 2017/4/10.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, FlatList, ScrollView
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {singleOrdouble} from '../../utils/ComonHelper';


export default class RaceResultList extends Component {



    render() {

        return (<View>

            <FlatList
                ListHeaderComponent={this._listHeader}
                keyExtractor={this._keyExtractor}
                data={this.props.raceRanks}
                renderItem={this._renderRow}/>

        </View>)

    }

    _listHeader = () => {
        return ( <View style={styles.tableTitle}>
            <Text style={styles.title}>{I18n.t('ranking')}</Text>
            <Text style={styles.title}>{I18n.t('contestant')}</Text>
            <Text style={styles.title}>{I18n.t('bonus')}</Text>
            <Text style={styles.title}>POY Points</Text>
        </View>)
    }

    _keyExtractor = (item) => {
        return item.rank_id;
    }


    _renderRow = (rowData) => {
        const {item, index} = rowData;
        const {player} = item;

        return (<View
            style={singleOrdouble(index) ? styles.item1 : styles.item2}>
            <Text
                testID={"txt_ranking_" + index}
                style={styles.txtInfo}>{item.ranking}</Text>
            <Text
                onPress={() => {
                    router.toPokerRankPage( player.player_id)
                }}
                testID={"txt_name_" + index}
                style={styles.txtPerson}>{player.name}</Text>
            <Text
                testID={"txt_earning_" + index}
                style={styles.txtInfo}>{item.earning}</Text>
            <Text
                testID={"txt_score_" + index}
                style={styles.txtInfo}>{item.score}</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tableTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CECDBB',
        height: 32
    },
    title: {
        color: Colors.white,
        fontSize: 14,
        flex: 1,
        textAlign: 'center'
    },
    item1: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item2: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5'
    },
    txtInfo: {
        fontSize: 14,
        color: Colors.txt_666,
        flex: 1,
        textAlign: 'center'
    },
    txtPerson: {
        fontSize: 14,
        color: '#3F9FFF',
        flex: 1,
        textAlign: 'center'

    }
})