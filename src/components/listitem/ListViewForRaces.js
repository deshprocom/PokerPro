/**
 * Created by lorne on 2017/1/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

import RaceRowView from './RaceRowView';


export default class ListViewForRaces extends Component {


    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }





    _renderRow = (rowData, sectionID, rowID, highlightRow) => {

        return (

                <RaceRowView
                    rowID={rowID}
                    rowData={rowData}/>
        )
    };



    render() {
        return (
            <View>
                <ListView
                    style={{backgroundColor:'#ececee'}}
                    removeClippedSubviews={false}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow}/>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    item_view_info: {
        flexDirection: 'column',
        marginLeft: 20,
        flex: 1
    },
    item_text_until: {
        color: Colors.txt_666,
        marginTop: 3,
        fontSize: 12
    },
    item_text_address: {
        color: '#666666',
        marginTop: 4,
        fontSize: 13
    },
    item_text_money: {
        color: '#b89a5d',
        fontSize: 14
    },
    item_text_title: {
        color: '#bbbbbb',
        fontSize: 17,
        width: 250,
        marginTop: 19
    },
    item_text_month: {
        color: Colors.txt_666,
        fontSize: 15,
        marginTop: 3
    },
    column_line_gray: {
        height: 156,
        width: 1,
        backgroundColor: '#333333',
    },
    home_list_view: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    home_item: {
        flex: 1,
    },

    item_center: {
        alignItems: 'center'
    },
    item_text_day: {
        color: '#999999',
        fontSize: 21
    },
    txt_order: {
        color: '#161718',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    txt_ordered: {
        color: Colors.txt_E0C,
        fontSize: 12,
        backgroundColor: 'transparent'
    }
});
