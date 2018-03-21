/**
 * Created by lorne on 2017/5/8.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, FlatList, ScrollView
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {singleOrdouble, convertDate, strNotNull, MM_DD, strRow} from '../../utils/ComonHelper';
import {MarkdownPlat} from '../../components';


export default class ScheduleList extends Component {

    render() {

        const {data, schedules} = this.props;

        return (<View
            testID="ScheduleList">

            <MarkdownPlat
                markdownStr={data.schedule_memo}/>

            {schedules.length > 0 ? <FlatList
                ListHeaderComponent={this._listHeader}
                keyExtractor={this._keyExtractor}
                data={this.props.schedules}
                renderItem={this._renderRow}/> : null}


        </View>)

    }

    _listHeader = () => {
        return ( <View style={styles.tableTitle}>
            <Text style={styles.title}>{I18n.t('race_day')}</Text>
            <Text style={styles.title}>{I18n.t('date')}</Text>
            <Text style={styles.title}>{I18n.t('beginDate')}</Text>
        </View>)
    }

    _keyExtractor = (item) => {
        return item.schedule_id;
    };


    _renderRow = (rowData) => {
        const {item, index} = rowData;

        return (<View
            style={singleOrdouble(index) ? styles.item1 : styles.item2}>
            <Text
                testID={"txt_day_" + item.schedule_id}
                style={styles.txtInfo}>{strRow(item.schedule)}</Text>

            <Text
                testID={"txt_month_" + item.schedule_id}
                style={styles.txtInfo}>{convertDate(item.begin_time, MM_DD)}</Text>
            <Text
                testID={"txt_begin_time_" + item.schedule_id}
                style={styles.txtInfo}>{convertDate(item.begin_time, "HH:mm")}</Text>
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
        backgroundColor: '#AEBABB',
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