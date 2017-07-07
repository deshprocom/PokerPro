/**
 * Created by lorne on 2017/7/7.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ListView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SwipeListView, SecurityText} from '../../components';
import I18n from 'react-native-i18n';

export default class AdrListPage extends Component {

    constructor(props) {
        super(props);

        let dataList = [];
        this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList)
        };


    }


    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                refreshPage={this.refreshPage}
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('receive_adr')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <SwipeListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderHiddenRow={this.hiddenRow}
                renderRow={this._itemListView}
                disableRightSwipe={true}
                rightOpenValue={-75}
            />

        </View>)
    }

    _itemListView = () => {
        return (<View style={styles.itemView}>
            <View style={styles.rowView}>
                <Text style={styles.txtName}>张达标</Text>
                <SecurityText
                    testID="txt_phone_security"
                    securityOptions={{
                        isSecurity: true,
                        startIndex: 3,
                        endIndex: 7,
                    }}
                    style={styles.txtName}>
                    13556840809
                </SecurityText>
            </View>

            <View>
                <View style={styles.tabView}>
                    <Text style={styles.txtDefault}>默认</Text>
                </View>

            </View>

        </View>)
    };

    hiddenRow = () => {
        return (<View style={styles.hiddenView}>
            <View style={{flex: 1}}/>
            <View style={styles.btnHidden}>
                <Text>设为默认</Text>
            </View>
            <View style={styles.btnHidden}>
                <Text>删除</Text>
            </View>

        </View>)
    }
}

const styles = StyleSheet.create({
    hiddenView: {
        height: 90,
        flex: 1,
        flexDirection: 'row',
    },
    btnHidden: {
        height: 90,
        width: 70
    },
    itemView: {
        height: 90,
        flex: 1,
    },
    txtName: {
        fontSize: 15,
        color: '#666666'
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabView: {
        height: 15,
        width: 32,
        backgroundColor: '#AAAAAA',
        borderRadius: 3
    },
    txtDefault: {
        fontSize: 12,
        color: 'white'
    }
});