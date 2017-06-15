/**
 * Created by lorne on 2017/3/8.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, ListView,
    TouchableOpacity, Image
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {
    strNotNull, getLoginUser,
    convertDate, YYYY_MM_DD, racesStatusImage,
    sellable
} from '../../utils/ComonHelper';

export default class RaceRowView extends Component {

    static propTypes = {
        rowData: PropTypes.object,
        router: PropTypes.object,
        rowID: PropTypes.string
    }

    render() {
        const {rowData} = this.props;

        return (
            <TouchableOpacity
                disabled={!rowData.describable}
                activeOpacity={1}
                testID={'btn_races_'+rowData.race_id}
                onPress={()=>this._itemClick(rowData)}>

                {this._lineView()}

                <View style={{flexDirection:'row',alignItems:'center'}}>

                    {this.describableView(rowData.describable)}
                    {/*月份*/}
                    {this.monthView(rowData.begin_date)}

                    <View style={{ flex: 1}}>

                        <Text style={[Fonts.H17,{color:'#BBBBBB',marginTop:20,
                        marginRight:24,lineHeight:22}]}
                              numberOfLines={2}>{rowData.name}</Text>

                        {this.tabRaces(rowData.followed, rowData.status)}


                        <View style={{alignItems:'center',
                      justifyContent: 'space-between',
                      flexDirection:'row',
                      marginTop:12}}>
                            <View>
                                {strNotNull(rowData.prize) ? this.prizeView(rowData.prize) : null}
                            </View>


                            <View>
                                {this.orderedView(rowData)}
                            </View>


                        </View>

                        <Text
                            numberOfLines={1}
                            style={[Fonts.H13,{color:Colors.txt_666,marginTop:4}]}>{I18n.t('address') + rowData.location}</Text>
                        {this.racesTimeView(rowData.begin_date, rowData.end_date)}

                    </View>
                </View>
            </TouchableOpacity>)
    }

    _itemClick = (rowData) => {
       router.toRacesInfoPage(this.props, rowData.race_id, false);
    };

    describableView = (describable) => {
        if (describable)
            return ( <View style={{height:42,width:2,backgroundColor:'#B89A5D'}}/>)
    };

    _lineView = () => {
        const {rowID} = this.props;
        if (rowID !== '0')
            return (<View style={{height:1,backgroundColor:'#1F2326',marginLeft:82}}/>)
    }

    racesTimeView = (begin_date, end_date) => {
        let start = convertDate(begin_date, YYYY_MM_DD);
        let end = convertDate(end_date, YYYY_MM_DD);
        return ( <Text style={[Fonts.H12,{color:Colors.txt_666,marginTop:3,marginBottom:18}]}>
            {start + "-" + end}</Text>)

    };

    prizeView = (prize) => {
        return (
            <View style={{flexDirection:'row',
                        alignItems:'center'}}>
                <Image style={{height:12,width:12,
                            marginRight:10}}
                       source={Images.home_prize}/>
                <Text style={[Fonts.H14,{color:'#B89A5D'}]}>{I18n.t('prize') + prize}</Text>
            </View>
        )
    };

    orderedView = (rowData) => {

        const {ticket_sellable, ordered, ticket_status} = rowData;

        if (ordered || sellable(ticket_status, ticket_sellable))
            return (
                <TouchableOpacity
                    testID={"btn_races_"+rowData.race_id}
                    style={{height:30,width:60,alignItems:'center',justifyContent:'center'}}
                    activeOpacity={1}
                    onPress={()=>this._buyTicket(rowData)}>
                    <Image style={{height:20,width:40,
                        marginRight:17,justifyContent:'center'
                       ,alignItems:'center'}}
                           source={rowData.ordered?Images.home_ordered:Images.home_gold}>
                        <Text style={rowData.ordered?
            styles.txtOrder:styles.txtBuy}>{rowData.ordered ? '已购' : '购票'}</Text >
                    </Image>
                </TouchableOpacity>)

    };


    _buyTicket = (rowData) => {
        if (strNotNull(getLoginUser().user_id)) {
            if (!rowData.ordered)
                this.props.router.toChoiseTicketPage(this.props, rowData.race_id);
        }
        else
            this.props.router.toLoginFirstPage();
    };

    statusView = (status) => {
        return (<Image style={[{height:16,width:37,
                        marginRight:6,marginTop:7},ApplicationStyles.center]}
                       source={racesStatusImage(status)}/>)
    };


    followView = () => {
        return (<Image style={{height:16,width:37,
                        marginRight:6,marginTop:7,
                        marginBottom:17}}
                       source={Images.home_follow}/>)
    };

    tabRaces = (followed, status) => {

        if (strNotNull(followed) || strNotNull(status))
            return (
                <View style={{flexDirection:'row'}}>
                    {strNotNull(status) ? this.statusView(status) : null}
                    {followed ? this.followView() : null}

                </View>)
    };

    monthView = (start_time) => {

        let month = convertDate(start_time, 'MM月');
        let day = convertDate(start_time, 'DD日');

        return (
            <View style={{width:82,alignItems:'center'}}>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={[Fonts.H21,{color:'#999999'}]}>{day}</Text>
                    <Text style={[Fonts.H15,{color:'#666666'}]}>{month}</Text>
                </View>
            </View>)
    };
}

const styles = StyleSheet.create({
    txtBuy: {
        color: '#161718',
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    txtOrder: {
        color: '#F8DA9E',
        fontSize: 12,
        backgroundColor: 'transparent'
    }

})