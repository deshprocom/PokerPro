/**
 * Created by lorne on 2017/5/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, Image, StatusBar,
    ListView, Animated, Platform, InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ImageLoad, UltimateListView} from '../../components';
import {RACE_TICKET} from '../../actions/ActionTypes';
import {fetchTickets} from '../../actions/RacesAction';
import {NoDataView, LoadErrorView, LoadingView} from '../../components/load';
import {isEmptyObject} from '../../utils/ComonHelper';
import {itemListView} from './TicketRow';

class TicketPage extends Component {


    constructor(props) {
        super(props);

        let dataList = [];
        this.state = {
            listTicket: dataList,
            layout: 'list'
        };

        this.last_id = '0';
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
                this.listView.postRefresh(items, 5);
            } else {
                this.listView.postPaginate(items,5)
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
                key={this.state.layout}
                keyExtractor={(item, index) => `${this.state.layout} - ${item.race_id}`}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                legacyImplementation
                item={itemListView}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={()=>{
                    return this.props.error? <LoadErrorView/>: <NoDataView/>;
                }}
            />


        </View>)
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            this.listPage = page;

            if (page === 1) {
                this._onRefresh();
            } else {
                this._onLoadMore();
            }
        } catch (err) {
            abortFetch();
        }

    };

    _onRefresh = () => {
        this.last_id = '0';
        this.props.getRaceTicket({});
    };

    _onLoadMore = () => {

        const body = {
            seq_id: this.last_id,
        };
        this.props.getRaceTicket(body);

    };


    topBar = () => {
        return (<View style={styles.topView}>
            <NavigationBar
                title={I18n.t('home_ticket')}
                rightBtnIcon={Images.search}
                rightImageStyle={{height:20,width:20,resizeMode:'contain',
                marginLeft:20,marginRight:20}}
                rightBtnPress={()=>router.toTicketSearchPage()}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                leftBtnPress={()=>router.pop()}/>

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
    }


});

