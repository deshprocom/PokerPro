import React,{Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ListView} from 'react-native';

import {Metrics, Colors} from '../../Themes';


class RankList extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row1','row2'])
        };
    }

    // headerList = () => {
    //     return(<View style={{flexDirection: 'row',width: Metrics.screenWidth, backgroundColor: '#a23def'}}>
    //         <View style={styles.list_header}><Text >排名</Text></View>
    //         <View style={styles.list_header}><Text >姓名</Text></View>
    //         <View style={styles.list_header}><Text >奖金</Text></View>
    //     </View>)
    // }
    listRenderRow = (data) => {
        return(<View style={styles.row_view}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.list_row}><Text>{data}</Text></View>
                <View style={styles.list_row}><Text>{data}</Text></View>
            </View>
            <View style={{height:1,backgroundColor: Colors.bg_f5,marginLeft: 16}}></View>
        </View>)
    }

    render(){
        return(<View style={styles.rank_list}>
            {/*{this.headerList()}*/}
            <ListView dataSource={this.state.dataSource}
                renderRow={this.listRenderRow}/>
        </View>)
    }

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
        height: 69,
        flex:1
    }

});