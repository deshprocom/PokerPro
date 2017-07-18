import React,{Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ListView} from 'react-native';

import {Metrics} from '../../Themes';


class RankList extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row1','row2'])
        };
    }

    headerList = () => {
        return(<View style={{flexDirection: 'row',width: Metrics.screenWidth}}>
            <Text style={styles.list_header}>排名</Text>
            <Text style={styles.list_header}>姓名</Text>
            <Text style={styles.list_header}>奖金</Text>
        </View>)
    }

    render(){
        return(<View style={styles.rank_list}>
            {this.headerList()}
            <ListView dataSource={this.state.dataSource}
                      renderRow={(data) => <Text>{data}</Text>}/>
        </View>)
    }

}

export default RankList;

const styles = StyleSheet.create({
    rank_list: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        backgroundColor: '#fff',
        opacity: 1
    },
    list_header: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#acdf34'
    }
});