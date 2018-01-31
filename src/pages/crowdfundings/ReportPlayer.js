/**
 * Created by lorne on 2018/1/31
 * Function:
 * Desc: 牌手赛报页面
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,FlatList,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import I18n from 'react-native-i18n';
import {report_player} from '../../services/CrowdDao';
import moment from 'moment';
import {isEmptyObject} from '../../utils/ComonHelper';

const styles = StyleSheet.create({
    page:{
        marginTop:5,

    },
    topBar:{
        backgroundColor:'white',
        flexDirection:'row'
    },
    image:{
        width:61,
        height:77
    }
});

export default class ReportPlayer extends PureComponent {
    state = {
        reportPlayer: {}
    };

    componentDidMount() {
        console.log("ssss:",this.props);
        const {crowd,player} = this.props;
        report_player({crowdfunding_id: crowd.id, crowdfunding_player_id: player.cf_player_id,page:1}, data => {
            console.log("reportPlayer:", data)
            this.setState({
                reportPlayer: data
            })
        }, err => {

        })
    };

    render(){
        const {reportPlayer} = this.state;
        return(
            <View style={styles.page}>
                <View style={styles.topBar}>
                    {/*<FlatList*/}
                        {/*horizontal={true}*/}
                        {/*data={isEmptyObject(reportPlayer) ? [] : reportPlayer}*/}
                        {/*renderItem={({item}) => <ImageLoad style={styles.image} source={{uri: item.avatar}}/>}*/}
                        {/*keyExtractor={(item, index) => `report_player${index}`}/>*/}
                </View>
            </View>
        )
    }
}