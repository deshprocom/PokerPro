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
import {ActionPay, BaseComponent} from '../../components';
import {getCrowdfundingsInfo} from '../../services/CrowdfundingsDao';
import {isEmptyObject} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';

export const footer = () => {
    return <View style={styles.footer}>
        <TouchableOpacity
            onPress={() => {
                global.router.toReportPage()

            }}
            style={styles.btnLeft}>
            <Image
                style={{height: 12, width: 10, marginRight: 5}}
                source={Images.black_fire}/>

            <Text style={styles.txtLeft}>{I18n.t('timely_match')}</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}/>
        <TouchableOpacity
            onPress={() => {
                global.router.toPokerInfo()

            }}
            style={styles.btnRight}>
            <Text style={styles.txtRight}>{I18n.t('subscribe')}</Text>
        </TouchableOpacity>
    </View>
};

export default class CrowdDetail extends Component {
    state = {
        info: {}
    };

    componentDidMount() {
        const {id} = this.props.params.crowd;
        getCrowdfundingsInfo({id: id}, data => {
            console.log("crowdfundingsInfo:", data);
            this.setState({
                info: data
            })
        }, err => {

        })

    };

    render() {
        const {info} = this.state;

        return <View style={ApplicationStyles.bgContainer}>

            {isEmptyObject(info) ? null : <Navbar
                    info={info}/>}

            <DetailChild
                info={info}/>

            {/*{footer()}*/}
            <ActionPay
                ref={ref => this.actionPay = ref}/>
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
        height: 34, width: 97, borderColor: Colors.txt_444, borderWidth: 1, alignItems: 'center',
        borderRadius: 2, justifyContent: 'center', flexDirection: 'row'
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
        color: Colors.txt_444,
        fontSize: 14
    }
})