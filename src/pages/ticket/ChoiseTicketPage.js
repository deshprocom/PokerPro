/**
 * Created by lorne on 2017/6/1.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, Platform, InteractionManager,
    Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView, NavigationBar, ImageLoad, ActionSide} from '../../components';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {getSelectRaceTicket} from '../../services/OrderDao';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';
import Picker from 'react-native-picker';

const RACE_MAIN = 'RACE_MAIN',
    RACE_SIDE = 'RACE_SIDE',
    ONLY_TICKET = 'ONLY_TICKET',
    TICKETS = 'TICKETS';

export default class ChoiseTicketPage extends Component {

    state = {
        selectRace: '',
        selectTicket: '',
        selectRaceData: {},
        selectSub: {}

    };

    componentDidMount() {
        const {race_id} = this.props.params;
        InteractionManager.runAfterInteractions(() => {
            let body = {
                race_id: 28
            };
            getSelectRaceTicket(body, (data) => {
                router.log('data', data);
                this.setState({
                    selectRaceData: data
                })
            }, (err) => {

            })
        })
    }

    componentWillUnmount() {
        Picker.hide();
    }

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            {this.topBar()}

            {this.listTicketView()}

            {this.bottomBar()}

        </View>)
    }

    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                barStyle="dark-content"
                title={I18n.t('selectTicket')}
                titleStyle={styles.barTitle}
                leftBtnIcon={Images.ic_back}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

        </View>)
    };

    showSubTicket = () => {
        const {selectRaceData} = this.state;
        const {sub_races} = selectRaceData;
        const array = [];
        if (!isEmptyObject(sub_races)) {
            sub_races.forEach(function (x) {
                array.push(x.name)
            })
        }


        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerData: array,
            pickerConfirmBtnColor: [68, 68, 68, 1],
            pickerCancelBtnColor: [68, 68, 68, 1],
            pickerTitleColor: [20, 20, 20, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarFontSize: 17,
            pickerFontSize: 21,
            pickerFontColor: [34, 34, 34, 1],
            onPickerConfirm: (data) => {

                for (i = 0; i < sub_races.length; i++) {
                    if (sub_races[i].name === data[0])
                        this.setState({
                            selectSub: sub_races[i]
                        })
                }


            },
            onPickerCancel: (data) => {

            },
            onPickerSelect: (data) => {

            }
        });
        Picker.show();
    };

    titleView = () => {

        return (<View style={styles.viewTitle}>
            {this.titleTxtView()}
        </View>)

    };

    titleTxtView = () => {
        const {race} = this.state.selectRaceData;
        if (!isEmptyObject(race)) {
            const {location, name} = race;
            return ( <Text style={styles.txtTitle}>[{location}]{name}</Text>)
        }


    };

    _selectSub = () => {
        const {selectSub} = this.state;
        if (isEmptyObject(selectSub))
            return '请选择赛事';
        else
            return selectSub.name
    };


    raceTypeView = () => {
        const {selectRace} = this.state;
        return (<View style={styles.viewRace}>
            <Text style={styles.txtSelectRace}>选择赛事</Text>
            <View style={styles.viewMainSide}>

                <TouchableOpacity
                    onPress={()=>this._selectRace(RACE_MAIN)}
                    style={this._selectedBg(selectRace === RACE_MAIN)}>
                    <Text style={this._selectTxt(selectRace === RACE_MAIN)}>主赛</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                         this.listView.updateDataSource([]);
                        this._selectRace(RACE_SIDE)
                    }}
                    style={[this._selectedBg(selectRace === RACE_SIDE),styles.marginLeft]}>
                    <Text style={this._selectTxt(selectRace === RACE_SIDE)}>边赛</Text>
                </TouchableOpacity>
            </View>

        </View>)
    };

    _raceList = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;
        if (!isEmptyObject(race)) {
            const {tickets} = race;
            return tickets
        }
    };

    ticketTypeView = () => {
        const {selectTicket} = this.state;

        return (<View style={styles.viewRace}>
            <Text style={styles.txtSelectRace}>选择票务类型</Text>
            <View style={styles.viewMainSide}>

                <TouchableOpacity
                    onPress={()=>{
                        this.listView.updateDataSource([]);

                        this._selectTicket(ONLY_TICKET)
                    }}
                    style={this._selectedBg(ONLY_TICKET === selectTicket)}>
                    <Text style={this._selectTxt(ONLY_TICKET === selectTicket)}>仅赛事</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                          this.listView.updateDataSource(this._raceList());
                        this._selectTicket(TICKETS)
                    }}
                    style={[this._selectedBg(TICKETS === selectTicket),styles.marginLeft]}>
                    <Text style={this._selectTxt(TICKETS === selectTicket)}>赛票套餐</Text>
                </TouchableOpacity>
            </View>
        </View>)
    };

    listTicketView = () => {
        const {selectRace} = this.state;
        return (<UltimateListView
            ref={(ref) => this.listView = ref}
            refreshable={false}
            firstLoader={false}
            onFetch={this.onFetch}
            rowView={this.itemListView}
            headerView={()=>{
              return(<View>
            {this.titleView()}

            {this.raceTypeView()}

            {selectRace===RACE_SIDE?this.selectSideView():null}

            {selectRace===RACE_MAIN?this.ticketTypeView():null}

            <View style={{height:10}}/>


</View>)
            }}
            separator={() => {
            return <View style={styles.separator}/>
        }}
            emptyView={()=>{
                    return this.props.error? <LoadErrorView/>: <View/>;
                }}
        />)
    };

    selectSubImg = () => {
        const {selectSub} = this.state;
        return isEmptyObject(selectSub) ? Images.down_triangle : Images.up_triangle
    };

    selectSideView = () => {
        return (<TouchableOpacity
            onPress={()=>{
               this.showSubTicket();
            }}
            style={styles.viewSide}>
            <View style={{flex:1}}/>
            <Text style={styles.lbSelect}>{this._selectSub()}</Text>
            <View style={{flex:1}}>
                <Image
                    resizeMode={'contain'}
                    style={styles.imgDown}
                    source={this.selectSubImg()}/>
            </View>
        </TouchableOpacity>)
    };

    _location = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;
        if (!isEmptyObject(race)) {
            const {location} = race;
            return location;
        }
    };

    _date = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;
        if (!isEmptyObject(race)) {
            const {end_date, begin_date} = race;
            return convertDate(begin_date, 'YYYY.MM.DD') + "-" + convertDate(end_date, 'YYYY.MM.DD')
        }
    };


    itemListView = (rowData) => {

        const {logo, original_price, price, ticket_class, title} = rowData;

        return (<View style={styles.itemView}>
            <ImageLoad
                source={{uri:logo}}
                style={styles.itemImg}/>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={2}
                    style={styles.txtItemTitle}>{title}</Text>

                <Text style={[styles.txtLabel,styles.top8]}>{this._date()}</Text>
                <Text style={styles.txtLabel}>地址: {this._location()}</Text>

                <View style={styles.viewInfo}>
                    <Text style={styles.txtPrice}>{price}</Text>

                    <View style={{flex:1}}/>

                    <View style={styles.btnInfo}>
                        <Text style={styles.btnTxt}>查看详情</Text>
                    </View>
                </View>


            </View>

        </View>)
    };

    onFetch = (page = 1, startFetch, abortFetch) => {

    };

    bottomBar = () => {


        return (<View style={styles.viewBottom}>
            <Text style={styles.txtMoney}>价格: </Text>
            <Text style={styles.txtMoneyNum}>{this._prize()}</Text>
            <View style={{flex:1}}/>
            <View style={[styles.viewBtnOk,styles.btnDisable]}>
                <Text style={styles.txtBtnOk}>选好了</Text>

            </View>

        </View>)
    };

    _prize = () => {
        const {selectRaceData} = this.state;
        const {race} = selectRaceData;


        if (!isEmptyObject(race)) {
            const {prize} = race;
            return prize;
        }


    };

    _selectedBg = (select) => {
        return select ? styles.viewSelected : styles.viewSelect;
    };

    _selectTxt = (select) => {
        return select ? styles.txtSelected : styles.txtSelect;
    };

    _selectRace = (race) => {
        this.setState({
            selectRace: race,
            selectTicket: ''
        })
    };

    _selectTicket = (ticket) => {
        this.setState({
            selectTicket: ticket
        })
    }


}


const styles = StyleSheet.create({
    topView: {
        backgroundColor: 'rgba(255,255,255,0.98)'
    },
    viewTitle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginTop: 5
    },
    txtTitle: {
        fontSize: 16,
        color: '#444444',
        marginLeft: 17
    },
    barTitle: {
        fontSize: 18,
        color: Colors._161817
    },
    viewRace: {
        height: 100,
        paddingLeft: 17,
        backgroundColor: 'white',
        marginTop: 5
    },
    txtSelectRace: {
        fontSize: 15,
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 13,
        marginBottom: 13
    },
    viewMainSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewSelected: {
        height: 36,
        width: 94,
        backgroundColor: '#000000',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSelected: {
        fontSize: 15,
        color: '#E4D57F'
    },
    viewSelect: {
        height: 36,
        width: 94,
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSelect: {
        fontSize: 15,
        color: '#444444'
    },
    txtDisabled: {
        fontSize: 15,
        color: '#AAAAAA'
    },
    marginLeft: {
        marginLeft: 20
    },
    itemView: {
        flexDirection: 'row',
        paddingLeft: 17,
        backgroundColor: 'white'
    },
    itemImg: {
        height: 104,
        width: 80,
        marginTop: 16,
        marginBottom: 20
    },
    itemContent: {
        flex: 1,
        marginTop: 16,
        marginLeft: 13,
        marginRight: 10
    },
    txtItemTitle: {
        fontSize: 16,
        color: '#444444',
        lineHeight: 20

    },
    txtLabel: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    top8: {
        marginTop: 8,
        marginBottom: 3
    },
    separator: {
        height: 4
    },
    txtPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors._161817,
    },
    viewBottom: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    },
    txtMoney: {
        fontSize: 14,
        color: Colors._161817,
        fontWeight: 'bold',
    },
    txtMoneyNum: {
        fontSize: 20,
        color: '#DF1D0F',
        fontWeight: 'bold',
    },
    viewBtnOk: {
        width: 92,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DF1D0F'
    },
    txtBtnOk: {
        fontSize: 18,
        color: 'white'
    },
    viewInfo: {
        marginTop: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnInfo: {
        height: 25,
        width: 66,
        borderRadius: 2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DDDDDD',
        marginRight: 7
    },
    btnTxt: {
        fontSize: 12,
        color: '#666666',
        fontWeight: 'bold',
    },
    viewSide: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    lbSelect: {
        color: '#CCCCCC',
        fontSize: 15,
    },
    imgDown: {
        width: 16,
        height: 10,
        alignSelf: 'flex-end',
        marginRight: 35
    },
    btnDisable: {
        backgroundColor: Colors.txt_666
    }
});