/**
 * Created by lorne on 2018/1/9
 * Function:众筹详情
 * Desc:
 */

import React, {Component} from 'react';
import {
    TouchableOpacity, View, ScrollView, FlatList,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Navbar from './Navbar';
import DetailChild from './DetailChild';
import {crowd_detail} from '../../services/CrowdDao'
import I18n from 'react-native-i18n';

export const footer = (crowd, type, player, race) => {
    return <View style={styles.footer}>
        <TouchableOpacity
            onPress={() => {
                {/*global.router.toReportPage()*/}

            }}
            style={styles.btnLeft}>
            <Image
                style={{height: 12, width: 10, marginRight: 5,opacity:0.3}}
                source={Images.black_fire}/>

            <Text style={styles.txtLeft}>{I18n.t('timely_match')}</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}/>
        <TouchableOpacity
            onPress={() => {
                if(type === 'crowd_detail'){
                    global.router.toSelectPlayer(crowd);
                }else {
                    global.router.toSubscriptionPage(crowd.id,player,race)
                }
            }}
            style={styles.btnRight}>
            <Text style={styles.txtRight}>{I18n.t('subscribe')}</Text>
        </TouchableOpacity>
    </View>
}

export default class CrowdDetail extends Component {

    constructor(props) {
        super(props);
        const {crowd} = props.params;
        this.state = {
            crowd
        }
    }

    componentDidMount() {
        const {crowd} = this.state;
        crowd_detail({id: crowd.id}, data => {
            this.setState({
                crowd: data
            })
        }, err => {

        })
    }


    render() {
        const {crowd} = this.state;
        console.log("dd:", crowd)
        let url = `crowdfundings/${crowd.id}`;
        return <View style={ApplicationStyles.bgContainer}>
            <Navbar
                info={crowd}
                url={url}/>
            <DetailChild
                info={crowd}/>

            {crowd.race.status === 'ended' ? null : footer(crowd, 'crowd_detail', null, null)}

        </View>
    }


}

const styles = StyleSheet.create({
    footer: {
        height: 50, width: '100%', flexDirection: 'row', alignItems: 'center',
        borderTopColor: Colors._ECE, borderTopWidth: 1, position: 'absolute', bottom: 0,
        paddingLeft: 17, paddingRight: 17, backgroundColor: 'white'
    },
    btnLeft: {
        height: 34, width: 97, borderColor: Colors._ECE, borderWidth: 1, alignItems: 'center',
        borderRadius: 2, justifyContent: 'center', flexDirection: 'row',
    },
    btnRight: {
        height: 34,
        width: 224,
        backgroundColor: Colors._161,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'

    },
    txtRight: {
        color: '#FFE9AD',
        fontSize: 14
    },
    txtLeft: {
        color: '#ECECEE',
        fontSize: 14
    }
})