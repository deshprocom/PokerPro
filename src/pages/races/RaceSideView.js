/**
 * Created by lorne on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, Platform,
    FlatList
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {YYYY_MM_DD, convertDate, strValid, isEmptyObject} from '../../utils/ComonHelper';
import {NoDataView, NoNetWorkView, LoadErrorView} from '../../components/load';

export default class RaceSideView extends Component {


    render() {
        return (<View
            testID="page_race_side">
            {this._content()}
        </View>)
    }


    _content = () => {
        const {subRaces} = this.props;
        if (isEmptyObject(subRaces))
            return <NoDataView/>;
        const {items} = subRaces;
        if (items.length > 0) {
            return (<View style={styles.flatListView}>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={items}
                    renderItem={this._renderRow}/>
            </View>);
        } else {
            return <NoDataView/>
        }
    }

    _keyExtractor = (item) => {
        return item.race_id;
    }

    _renderRow = (rowData) => {

        const {item, index} = rowData;
        return (<TouchableOpacity
            onPress={()=>this.toInfoPage(item)}
            activeOpacity={1}
            testID={'btn_races_side_'+index}
            style={styles.item}>

            <View style={styles.leftLine}/>

            <View style={styles.dateView}>
                <View>
                    <Text style={styles.txtDate}>{this._beginDate(item.begin_date)}</Text>
                    <Text style={styles.txtDay}>{item.days + 'Days'}</Text>
                </View>

            </View>

            <View style={styles.content}>
                <Text style={styles.txtTitle}
                      numberOfLines={2}>{item.name}</Text>
                <View style={styles.buyView}>
                    <Text style={styles.txtBuy}>买入:{item.ticket_price}</Text>
                    {this._royView(item.roy)}
                </View>

            </View>

        </TouchableOpacity>)
    };

    _beginDate = (beiginDate) => {
        return convertDate(beiginDate, 'M月D日')
    };


    _royView = (roy) => {
        if (roy) {
            return (<View style={styles.roy}>
                <Text style={styles.txtRoy}>ROY</Text>
            </View>)
        }
    }


    toInfoPage = (row) => {
        const body = {
            race_id_1: this.props.raceId,
            race_id_2: row.race_id
        };

        router.toChildRaceInfoPage(this.props, body)
    }


}

const styles = StyleSheet.create({
    item: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: Colors._EEE,
        borderBottomWidth: 1
    },
    dateView: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txtDate: {
        fontSize: 20,
        color: Colors.txt_666
    },
    txtDay: {
        fontSize: 15,
        color: Colors.txt_666,
        marginTop: 3
    },
    txtTitle: {
        fontSize: 17,
        color: Colors.txt_444,
        lineHeight: 22,
        marginTop: 17,
        height: 44,
        width: 240
    },
    txtBuy: {
        fontSize: 14,
        color: Colors.txt_444,
    },
    content: {
        marginRight: 33,
        marginLeft: 10
    },
    roy: {
        width: 40,
        height: 18,
        backgroundColor: Colors._AAA,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 13
    },
    buyView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 9
    },
    txtRoy: {
        fontSize: 13,
        color: Colors.white
    },
    leftLine: {
        width: 2,
        backgroundColor: Colors.bg_09,
        height: 80,
        alignSelf: 'center'
    },
    flatListView: {
        backgroundColor: Colors.white,
    }

});