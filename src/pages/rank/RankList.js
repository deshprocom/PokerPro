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

    render(){
        return(<View style={styles.test}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={(data) => <Text>{data}</Text>}/>
        </View>)
    }

    headerList = () => {
        return(<View>
            <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center'}}>
                <Text style={styles.list_header}>排名</Text>
                <Text style={styles.list_header}>姓名</Text>
                <Text style={styles.list_header}>奖金</Text>
            </TouchableOpacity>
        </View>)
    }

}

export default RankList;

const styles = StyleSheet.create({
    test: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        // backgroundColor: 'blue'
    },
    list_header: {
        width: Metrics.screenWidth,
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    }
});