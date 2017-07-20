import React,{Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ListView, Image} from 'react-native';

import {Metrics, Colors, Images} from '../../Themes';
import {PullListView} from '../../components';


class RankList extends Component {

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(['1','2','3','4','5','6'])
        };
    }

    rankNum = (rowID) => {
        if(rowID == 0){
            return(
                <Image source={Images.gold}
                   style={{width: 25,height: 25}}/>
            )
        }else if(rowID == 1){
            return(
                <Image source={Images.silver}
                   style={{width: 25,height: 25}}/>
            )
        }else if(rowID == 2){
            return(
                <Image source={Images.copper}
                   style={{width: 25,height: 25}}/>
            )
        }else {
            return(
                <Text>{parseInt(rowID)+1}</Text>
            )
        }
    };

    listRenderRow = (data, sectionID, rowID) => {
        return(<View style={styles.row_view}>
            <View style={{flexDirection: 'row'}}>
                <View style={[{width: 53},styles.list_row]}>
                    {this.rankNum(rowID)}
                </View>
                <View style={styles.list_row}>
                    <Image source={Images.mask}
                           style={{width: 49.7,height: 49.7, marginLeft: 12, marginRight: 15.3}}>
                        <Image/>
                    </Image>
                </View>
                <View style={{flex: 1,alignItems: 'flex-start', justifyContent:'center',height: 69}}>
                    <Text style={{color: Colors._333, fontSize: 14, lineHeight: 20}}>{rowID}</Text>
                    <Text style={{color: Colors._AAA, fontSize: 12, lineHeight: 17}}>{data}</Text>
                </View>
                <View style={{flex: 1,alignItems: 'flex-end', justifyContent:'center',height: 69}}>
                    <Text style={{color: Colors._666, fontSize: 15, lineHeight: 21}}>{data}sdg</Text>
                    <Text style={{color: Colors._AAA, fontSize: 12, lineHeight: 17}}>{data}d</Text>
                </View>
                <View style={styles.list_row}>
                    <Image source={Images.set_more}
                        style={{width: 5.7,height: 11.6,marginLeft: 17.5,marginRight: 16.8}}/>
                </View>
            </View>
            <View style={{height:1,backgroundColor: Colors.bg_f5,marginLeft: 16}}></View>
        </View>)
    };

    render(){
        return(<View style={styles.rank_list}>
            {/*{this.headerList()}*/}
            {/*<ListView dataSource={this.state.dataSource}*/}
                {/*renderRow={this.listRenderRow}/>*/}
            <PullListView
                key="list"
                ref={ (component) => this._pullToRefreshListView = component }
                viewType={PullListView.constants.viewType.listView}
                dataSource={this.state.dataSource}
                renderRow={this.listRenderRow}/>
        </View>)
    }

    // headerList = () => {
    //     return(<View style={{flexDirection: 'row',width: Metrics.screenWidth, backgroundColor: '#a23def'}}>
    //         <View style={styles.list_header}><Text >排名</Text></View>
    //         <View style={styles.list_header}><Text >姓名</Text></View>
    //         <View style={styles.list_header}><Text >奖金</Text></View>
    //     </View>)
    // }
}

export default RankList;

const styles = StyleSheet.create({
    rank_list: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        backgroundColor: Colors.bg_f5,
        paddingTop: 6
    },
    row_view: {
        height: 70,
        backgroundColor: Colors.white
    },
    list_row: {
        alignItems:'center',
        justifyContent:'center',
        height: 69
    }

});