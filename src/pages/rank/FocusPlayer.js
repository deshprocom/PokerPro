import React,{Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ListView} from 'react-native';
import I18n from 'react-native-i18n';

import {Images, Colors, Metrics} from '../../Themes';
import {NavigationBar, UltimateListView} from '../../components';
import {NoDataView, LoadErrorView} from '../../components/load';
import {getFocusPlayer} from '../../services/RankDao';
import {uniqueArray} from '../../utils/ComonHelper';

class FocusPlayer extends Component {

    constructor(props){
        super(props);
        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.race_id !== r2.race_id
        });
        this.state = {
            dataSource: this._dataSource.cloneWithRows([]),
            focusData: [],
            nextID: '0'
        }
    }

    focusRow = (focusData, sectionID, rowID) => {
        const {avatar, country, dpi_total_earning, dpi_total_score, id, name} = focusData;
        return(<View style={styles.row_view}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginRight: 12.5}}>
                <Image defaultSource={Images.mask}
                       source={{uri: avatar}}
                       style={{width: 73.5, height: 73.5}}>
                </Image>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center',flex: 1}}>
                <Text style={styles.name_text}>{name}</Text>
                <Text style={styles.country_text}>{country}</Text>
            </View>
            <TouchableOpacity style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text>+ 关注</Text>
            </TouchableOpacity>
        </View>)
    };

    render(){
        return(<View>
            <NavigationBar leftBtnIcon={Images.sign_return}
               toolbarStyle={{backgroundColor:Colors.bg_09}}
               leftBtnPress = {() => this.props.router.pop()}
               leftImageStyle={{height:19,width:11,marginLeft:20,marginRight:20}}
                title={'我关注牌手'}/>
            <View style={styles.list_view}>
                <UltimateListView
                    key={this.state.layout}
                    keyExtractor={(item, index) => `${this.state.layout} - ${item.race_id}`}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    legacyImplementation
                    rowView={this.focusRow}
                    refreshableTitlePull={I18n.t('pull_refresh')}
                    refreshableTitleRelease={I18n.t('release_refresh')}
                    dateTitle={I18n.t('last_refresh')}
                    allLoadedText={I18n.t('no_more')}
                    waitingSpinnerText={I18n.t('loading')}
                    emptyView={() => {
                    return this.state.error ? <LoadErrorView
                        onPress={() => {
                            this.listView.refresh()
                        }}/> : <NoDataView/>;
                }}
                />
            </View>
        </View>)
    }

    onFetch = (page = 1,startFetch,abortFetch) => {
        try {
            this.listPage = page;
            if(page === 1){
                this.refresh(startFetch,abortFetch)
            }else{
                this.loadMore(startFetch,abortFetch)
            }
        }catch (err){
            abortFetch()
        }
    };

    refresh = (startFetch,abortFetch) => {
        let body = {
            next_id: '0'
        };
        getFocusPlayer(body, data => {
            let {followed_players, next_id} = data;
            let rows = uniqueArray(this.listView.getRows(),followed_players);
            startFetch(rows,10);
            this.setState({
                focusData: rows,
                nextID: next_id
            })
        },(err) => {
            this.setState({
                error: true
            });
            abortFetch()
        });
    };

    loadMore = (startFetch,abortFetch) => {
        const {nextID} = this.state;
        let body = {
            next_id: nextID
        };
        getFocusPlayer(body, data => {
            let {followed_players, next_id} = data;
            let rows = uniqueArray(this.listView.getRows(),followed_players);
            startFetch(rows,10);
            this.setState({
                focusData: rows,
                nextID: next_id === 0 ? nextID : next_id
            })
        },(err) => {
            abortFetch()
        })

    };
}

export default FocusPlayer;

const styles = StyleSheet.create({
    list_view: {
        backgroundColor: Colors.bg_f5,
        height:Metrics.screenHeight,
        paddingTop: 10
    },
    row_view: {
        backgroundColor: Colors.white,
        height: 105,
        flexDirection: 'row',
        paddingLeft: 19,
        paddingRight: 19,
        marginBottom: 5
    },
    name_text: {
        fontSize: 15,
        color: Colors._333,
        lineHeight: 21,
        marginBottom: 3
    },
    country_text: {
        fontSize: 14,
        color: Colors._AAA,
        lineHeight: 20
    }
});
