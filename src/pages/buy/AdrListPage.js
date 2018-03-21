/**
 * Created by lorne on 2017/7/7.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ListView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, SwipeListView, SecurityText} from '../../components';
import I18n from 'react-native-i18n';
import {getAddressList, postAdrDefault, postAdrDelete} from '../../services/OrderDao';
import {isEmptyObject, showToast} from '../../utils/ComonHelper';

export default class AdrListPage extends Component {

    constructor(props) {
        super(props);

        let dataList = [1, 2, 3, 4];
        this._dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList),
            selectAdrData: {}
        };


    }

    componentDidMount() {
        this._getAddressList();
    }

    _getAddressList = () => {
        getAddressList(data => {
            const {items} = data;
            const {adrData} = this.props.params;

            let buyAdr = {};
            if (!isEmptyObject(adrData))
                items.forEach(function (x) {
                    if (x.id === adrData.id)
                        buyAdr = x;
                });
            else
                items.forEach(function (x) {
                    if (x.default)
                        buyAdr = x;
                });


            this.setState({
                dataList: items,
                dataSource: this._dataSource.cloneWithRows(items),
                selectAdrData: buyAdr

            })
        })
    };


    render() {
        const {dataSource, selectAdrData} = this.state;
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
                leftBtnPress={() => {
                    if (this.props.params.selectAdr)
                        this.props.params.selectAdr(selectAdrData);
                    router.pop()
                }}/>

            <View style={{height: 7}}/>
            <SwipeListView
                ref={ref => this.swipeList = ref}
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
                    router.toNewAddressPage(this.props, this._getAddressList, {})
                }}
                style={styles.viewAdd}>
                <Text style={styles.txtName}>{I18n.t('buy_new_adr')}</Text>
            </TouchableOpacity>

        </View>)
    }

    _itemListView = (item) => {
        const {consignee, address, address_detail, mobile} = item;
        const {id} = this.state.selectAdrData;
        return (<TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                if(this.props.params.selectAdr){
                    this.props.params.selectAdr(item);
                    router.pop();
                }

            }}
            style={styles.itemView}>
            <View style={styles.rowView}>
                <Text
                    style={[styles.txtName,
                        {color: item.id === id ? Colors._DF1 : Colors._666}]}>{consignee}    </Text>
                <SecurityText
                    testID="txt_phone_security"
                    securityOptions={{
                        isSecurity: true,
                        startIndex: 3,
                        endIndex: 7,
                    }}
                    style={[styles.txtName,
                        {color: item.id === id ? Colors._DF1 : Colors._666}]}>
                    {mobile}
                </SecurityText>

                {item.default ? <View style={styles.tabView}>
                    <Text style={styles.txtDefault}>{I18n.t('buy_mo_ren')}</Text>
                </View> : null}
            </View>

            <View style={styles.rowView}>

                {item.id === id ? <Image style={styles.imgSelect}
                                         source={Images.adr_selected}/> : null}


                <Text style={styles.txtAdr}
                      numberOfLines={2}
                >{address} {address_detail}</Text>

            </View>
            <TouchableOpacity
                onPress={() => {
                    router.toNewAddressPage(this.props,
                        this._getAddressList,
                        item)
                }}
                style={styles.viewEdit}>
                <Image
                    style={styles.imgEdit}
                    source={Images.edit}/>

                <Text style={styles.txtEdit}>{I18n.t('buy_editor')}</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <View style={styles.line}/>

        </TouchableOpacity>)
    };

    hiddenRow = (data, secId, rowId, rowMap) => {
        return (<View style={styles.hiddenView}>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                onPress={() => {
                    this.swipeList.safeCloseOpenRow();
                    this._setAdrDefault(data.id)
                }}
                style={[styles.btnHidden, {backgroundColor: '#BBBBBB'}]}>
                <Text style={styles.txtDel}>{I18n.t('buy_set_mo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(`${I18n.t('buy_del_adr')}`, '', [
                        {
                            text: `${I18n.t('cancel')}`, onPress: () => {
                            this.swipeList.safeCloseOpenRow();
                        }
                        },
                        {
                            text: `${I18n.t('confirm')}`, onPress: () => {
                            this.swipeList.safeCloseOpenRow();
                            this._delAdr(data.id)
                        }
                        }
                    ]);

                }}
                style={[styles.btnHidden, {backgroundColor: Colors._DF1}]}>
                <Text style={styles.txtDel}>{I18n.t('buy_del')}</Text>
            </TouchableOpacity>

        </View>)
    };

    _setAdrDefault = (adr_id) => {
        const {selectAdrData} = this.state;
        postAdrDefault(adr_id, data => {
            showToast(`${I18n.t('buy_set_success')}`);
            if (adr_id === selectAdrData.id) {
                this.setState({
                    selectAdrData: {}
                })
            }
            this._getAddressList();
        })
    };

    _delAdr = (adr_id) => {
        postAdrDelete(adr_id, data => {
            showToast(`${I18n.t('buy_del_success')}`);
            this._getAddressList();
        }, err => {

        })
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
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors._DF1,
        marginLeft: 12
    },
    txtDefault: {
        fontSize: 12,
        color: Colors._DF1,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 4,
        marginRight: 4
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
        top: 10,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: 60
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
    },
    imgSelect: {
        height: 12,
        width: 12,
        marginRight: 10
    },
    txtDel: {
        color: 'white',
        fontSize: 14
    }

});