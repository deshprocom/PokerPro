/**
 * Created by lorne on 2018/1/9
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ImageLoad, ProgressBar} from '../../components';

const styles = StyleSheet.create({
    cover: {
        height: 170,
        width: '100%'
    },
    txtName: {
        color: Colors._333,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        marginTop: 8
    },
    txtTime: {
        fontSize: 12,
        color: Colors._666,
        marginTop: 5
    },
    txtRed: {
        fontSize: 18,
        color: Colors._F34,
        fontWeight: 'bold',
        lineHeight: 25
    },
    txtCrowd: {
        fontSize: 12,
        color: Colors._888,
        lineHeight: 17

    }
});

export default class DetailChild extends PureComponent {


    render() {
        const {image, race, crowd_sale, crowd_num} = this.props.info;
        let percent = crowd_sale / crowd_num;
        return <View style={{backgroundColor: 'white'}}>
            <ImageLoad style={styles.cover}
                       source={{uri: image}}/>
            <View style={{marginLeft: 17, marginRight: 17}}>
                <Text style={styles.txtName}>{race.name}</Text>
                <Text style={styles.txtTime}>{`入赛资格：¥${race.buy_in}  ${race.end_start_time}`}</Text>
                <Text style={styles.txtTime}>地点：{race.location}</Text>
                <ProgressBar
                    backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                    style={{width: Metrics.screenWidth - 34}}
                    initialProgress={percent}/>

                <View style={{width: '100%', height: 70, flexDirection: 'row'}}>
                    {this.renderTotal('5人', '选手人数')}
                    {this.renderTotal('200万', '赞助总额')}
                    {this.renderTotal('20万', '认购金额')}
                </View>
            </View>
            <View style={{height: 1, width: '100%', backgroundColor: Colors._ECE}}/>
        </View>
    }

    renderTotal = (number, label) => {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.txtRed}>{number}</Text>
            <Text style={styles.txtCrowd}>{label}</Text>
        </View>
    }
}