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

        let dataList = [1, 2, 3, 4];
        this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList)
        };


    }


    render() {
        const {dataSource} = this.state;
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                refreshPage={this.refreshPage}
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('receive_adr')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{
                    height: 19, width: 11,
                    marginLeft: 20, marginRight: 20
                }}
                leftBtnPress={() => router.pop()}/>

            <View style={{height: 7}}/>
            <SwipeListView
                enableEmptySections={true}
                dataSource={dataSource}
                renderHiddenRow={this.hiddenRow}
                renderRow={this._itemListView}
                disableRightSwipe={true}
                rightOpenValue={-140}
            />


            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    router.toNewAddressPage()
                }}
                style={styles.viewAdd}>
                <Text style={styles.txtName}>+新建地址</Text>
            </TouchableOpacity>

        </View>)
    }

    _itemListView = (item) => {
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

            <View style={styles.rowView}>
                <View style={styles.tabView}>
                    <Text style={styles.txtDefault}>默认</Text>
                </View>
                <Text style={styles.txtAdr}
                      numberOfLines={2}
                >阿里巴巴集团服务有限公司香港铜锣湾勿地 臣街1号时代广场1座26楼</Text>

            </View>
            <View style={styles.viewEdit}>
                <Image
                    style={styles.imgEdit}
                    source={Images.edit}/>

                <Text style={styles.txtEdit}>编辑</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={styles.line}/>

        </View>)
    };

    hiddenRow = () => {
        return (<View style={styles.hiddenView}>
            <View style={{flex: 1}}/>
            <View style={[styles.btnHidden, {backgroundColor: '#BBBBBB'}]}>
                <Text>设为默认</Text>
            </View>
            <View style={[styles.btnHidden, {backgroundColor: '#F05656'}]}>
                <Text>删除</Text>
            </View>

        </View>)
    }
}

const styles = StyleSheet.create({
    hiddenView: {
        flex: 1,
        flexDirection: 'row'
    },
    btnHidden: {
        height: 87,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',

    },
    itemView: {
        height: 90,
        backgroundColor: 'white',

    },
    txtName: {
        fontSize: 15,
        color: '#666666'
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 14,
        marginLeft: 17
    },
    tabView: {
        height: 15,
        width: 32,
        backgroundColor: '#AAAAAA',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    txtDefault: {
        fontSize: 12,
        color: 'white'
    },
    line: {
        height: 3,
        backgroundColor: Colors.bg_f5
    },
    txtAdr: {
        height: 35,
        fontSize: 13,
        color: '#777777',
        width: 250
    },
    txtEdit: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 5
    },
    viewEdit: {
        position: 'absolute',
        top: 30,
        right: 17,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgEdit: {
        height: 14,
        width: 14
    },
    viewAdd: {
        height: 50,
        width: 340,
        position: 'absolute',
        bottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center'

    }

});