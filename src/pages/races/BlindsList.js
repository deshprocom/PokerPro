/**
 * Created by lorne on 2017/5/9.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, FlatList, ScrollView
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {strNotNull, moneyFormat} from '../../utils/ComonHelper';
import {MarkdownPlat} from '../../components';

export default class BlindsList extends Component {

    render() {
        const {data, blinds} = this.props;
        return (<View testID="BlindsList">

            {this.startChipsView()}
            <MarkdownPlat
                markdownStr={data.blind_memo}/>
            {blinds.length > 0 ? <FlatList
                ListHeaderComponent={this._listHeader}
                keyExtractor={this._keyExtractor}
                data={this.props.blinds}
                renderItem={this._renderRow}/> : null}


        </View>)

    }

    startChipsView = () => {
        if (strNotNull(this.props.startChips))
            return <Text style={styles.record}>{I18n.t('staring_chips')}: {this.props.startChips}</Text>
    };

    _listHeader = () => {
        return ( <View style={styles.tableTitle}>
            <Text style={styles.title}>{I18n.t('Level')}</Text>
            <Text style={styles.title}>{I18n.t('Blinds')}</Text>
            <Text style={styles.title}>{I18n.t('Ante')}</Text>
            <Text style={styles.title}>{I18n.t('Duration')}</Text>
        </View>)
    }

    _keyExtractor = (item) => {
        return item.blind_id;
    }


    _renderRow = (rowData) => {
        const {item, index} = rowData;

        if (item.blind_type === "blind_struct") {
            return (<View
                style={styles.item1}>
                <Text
                    testID={"txt_level_" + item.blind_id}
                    style={styles.txtInfo}>{item.level}</Text>
                <Text
                    testID={"txt_blind_" + item.blind_id}
                    style={styles.txtInfo}>{moneyFormat(item.small_blind)
                + '-' + moneyFormat(item.big_blind)}</Text>
                <Text
                    testID={"txt_ante_" + item.blind_id}
                    style={styles.txtInfo}>{moneyFormat(item.ante)}</Text>
                <Text
                    testID={"txt_time_" + item.blind_id}
                    style={styles.txtInfo}>{item.race_time}</Text>
            </View>)
        } else if (item.blind_type === "blind_content") {

            return (<View style={styles.blind_content}>
                <Text
                    testID={"txt_blind_content_" + item.blind_id}
                    style={styles.txtInfo}>{item.content}</Text>
            </View>)

        }

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
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5'
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

    },
    blind_content: {
        height: 48,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    record: {
        fontSize: 14,
        color: Colors._333,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 17
    }
})