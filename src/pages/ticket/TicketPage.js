/**
 * Created by lorne on 2017/5/8.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ImageLoad} from '../../components';
import {RACE_TICKET} from '../../actions/ActionTypes';
import {fetchTickets} from '../../actions/RacesAction';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {isEmptyObject, strNotNull, convertDate, ticketStatusConvert} from '../../utils/ComonHelper';
import UltimateListView from "react-native-ultimate-listview";

class TicketPage extends Component {


    constructor(props) {
        super(props);

        let dataList = [];
        this.state = {
            listTicket: dataList,
            layout: 'list'
        };

        this.last_id = '0';
        this.keyword = '';
        this.listPage = 1;

    }

    componentWillReceiveProps(newProps) {

        const {actionType, raceTickets, loading} = newProps;
        if (actionType === RACE_TICKET
            && loading !== this.props.loading
            && !isEmptyObject(raceTickets)) {

            const {items, last_id} = raceTickets;
            if (last_id != '0')
                this.last_id = last_id;

            if (this.listPage == 1) {
                this.listView.postRefresh(items, 1);
            } else {
                this.listView.postPaginate(items, 1)
            }

            this.setState({
                listTicket: this.listView.getRows()
            })


        }
    }

    render() {
        const {listTicket} = this.state;

        return (<View
            testID="page_ticket"
            style={ApplicationStyles.bgContainer}>

            {this.topBar()}

            <UltimateListView
                ref={(ref) => this.listView = ref}
                key={this.state.layout}
                keyExtractor={(item, index) => `${this.state.layout} - ${item.race_id}`}
                onFetch={this.onFetch}
                refreshableMode="advanced"
                rowView={this._itemListView}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={()=>{
                    return <NoDataView/>;
                }}
            />

            {isEmptyObject(listTicket) && this.props.error ? <LoadErrorView/> : null}


        </View>)
    }

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            this.listPage = page;
            console.log('listPage:', page)
            if (page === 1) {
                this._onRefresh();
            } else {
                this._onLoadMore();
            }

        } catch (err) {
            abortFetch();
            console.log(err);
        }

    }

    _onRefresh = () => {
        this.last_id = '0';
        if (strNotNull(this.keyword)) {
            const body = {
                keyword: this.keyword,
            };
            this.props.getRaceTicket(body);
        } else
            this.props.getRaceTicket({});
    };

    _onLoadMore = () => {
        if (strNotNull(this.keyword)) {
            const body = {
                seq_id: this.last_id,
                keyword: this.keyword
            };
            this.props.getRaceTicket(body);
        } else {
            const body = {
                seq_id: this.last_id,
            };
            this.props.getRaceTicket(body);
        }
    }

    _itemListView = (item, index) => {
        const {
            begin_date, logo, describable, end_date,
            followed, location, name, ordered, prize, race_id,
            status, ticket_status, ticket_sellable
        } = item;
        return (
            <TouchableOpacity
                testID={'btn_ticket_row_'+index}
                onPress={()=>
                router.toRacesInfoPage(this.props, race_id, false)}
                disabled={!describable}
                activeOpacity={1}>
                <View style={styles.itemView}>

                    <ImageLoad
                        source={{uri:logo}}
                        style={styles.itemImg}/>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>{name}</Text>
                        <Text style={styles.itemTime}>
                            {convertDate(begin_date, 'YYYY.MM.DD') + '-' + convertDate(end_date, 'YYYY.MM.DD')}</Text>
                        <Text style={styles.itemAddr}>地址:{location}</Text>

                        <View style={styles.itemTab}>
                            <Text style={styles.itemPrice}>{prize}</Text>

                            <View style={styles.itemStatus}>
                                <Text style={styles.StatusTxt}>{ticketStatusConvert(ticket_status)}</Text>
                            </View>


                        </View>


                    </View>
                </View>
                <View style={styles.marginLine}/>

            </TouchableOpacity>
        )
    }


    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                title={I18n.t('home_ticket')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>this.props.router.pop()}/>
            <View style={styles.searchView}>
                <View style={styles.searchBar}>

                    <Image
                        source={Images.news_outline}
                        style={styles.searchImg}/>

                    <TextInput
                        testID="input_ticket_search"
                        onChangeText={(text)=>{
                            this.last_id = '0';
                            this.keyword = text;

                              const body = {
                                    keyword:text,
                                };
                               this.props.getRaceTicket(body);
                        }}
                        style={Platform.OS==='ios'?
                        styles.searchInput:styles.searchInputAnd}
                        returnKeyType="search"
                        clearButtonMode="always"
                        underlineColorAndroid='transparent'
                        placeholderTextColor={Colors.txt_666}
                        placeholder={I18n.t('ticket_placeholder')}
                    />


                </View>


            </View>
        </View>)
    }
}


const bindAction = dispatch => ({
        getRaceTicket: (body) => dispatch(fetchTickets(body))
    })
    ;

const mapStateToProps = state => ({
    loading: state.RaceState.loading,
    error: state.RaceState.error,
    hasData: state.RaceState.hasData,
    actionType: state.RaceState.actionType,
    raceTickets: state.RaceState.raceTickets

});

export default connect(mapStateToProps, bindAction)(TicketPage);

const styles = StyleSheet.create({
    searchView: {
        height: 53,
    },
    searchBar: {
        height: 32,
        width: 308,
        backgroundColor: '#212325',
        borderRadius: 3,
        marginTop: 5,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'

    },
    topView: {
        backgroundColor: Colors._161817
    },
    searchInput: {
        height: 32,
        color: Colors.white,
        fontSize: 14,
        flex: 1
    },
    searchInputAnd: {
        height: 40,
        color: Colors.white,
        fontSize: 14,
        flex: 1
    },
    searchImg: {
        height: 17,
        width: 17,
        marginLeft: 10,
        marginRight: 10
    },
    itemImg: {
        width: 80,
        height: 104,
        marginLeft: 17,
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: 140
    },
    itemTitle: {
        height: 44,
        width: 260,
        color: '#444444',
        fontSize: 16,
        alignSelf: 'flex-start',
        lineHeight: 20
    },
    itemTime: {
        color: Colors._AAA,
        fontSize: 12,
        marginTop: 6
    },
    itemAddr: {
        color: Colors._AAA,
        fontSize: 12
    },
    itemPrice: {
        color: Colors._161817,
        fontSize: 16,
    },
    itemInfo: {
        marginLeft: 12,
        height: 104,
    },
    itemTab: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemStatus: {
        height: 21,
        width: 61,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginRight: 14

    },
    StatusTxt: {
        color: Colors.txt_666,
        fontSize: 12
    },
    marginLine: {
        height: 5,
    }

})

