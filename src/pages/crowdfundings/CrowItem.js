/**
 * Created by lorne on 2018/1/8
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {CrowdCountDown, ImageLoad, ProgressBar} from '../../components';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {convertDate} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';

const styles = StyleSheet.create({
    cardItemTimeRemainTxt: {
        fontSize: 14,
        margin: 5,
        color: Colors._333
    },
    containerStyle: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,

    },
    timeTexStyle: {
        fontSize: 18,
        color: '#438EE6'
    },
    timeStyle: {
        borderColor: Colors._ECE,
        borderWidth: 1,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    img: {
        height: 154,
        width: '100%',
        marginTop: 12,
    },
    saleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
        marginTop: 10
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
    itemContainer: {
        marginLeft: 5, marginRight: 5, paddingLeft: 12, paddingRight: 12,
        backgroundColor: 'white',
        borderRadius: 4
    },
    separator: {
        height: 42, width: 2, backgroundColor: Colors._ECE,
        marginTop: 16, marginLeft: 15
    },
    txtPrize: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F34A4A',
        marginTop: 8,
        lineHeight: 20,
    },
    txtCrowd: {
        fontSize: 12,
        color: Colors._888
    },
    txtCrowdPrize: {
        fontSize: 14,
        color: Colors._F34,
        marginLeft: 8
    }


});

export default class CrowItem extends PureComponent {
    render() {
        const {cf_cond, race,cf_total_money, cf_offer_money} = this.props.item;
        let percent = cf_offer_money / cf_total_money;

        return <TouchableOpacity
            onPress={() => global.router.toCrowdDetailPage(this.props.item)}
            style={styles.itemContainer}>

            {this.renderComing(race.status, race.end_date)}

            <Image
                style={styles.img}
                source={{uri: race.big_logo}}>
                {this.raceStatus(race.status)}
            </Image>

            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.75}}>
                        <Text style={styles.txtName}>{race.name}</Text>
                        <Text style={styles.txtTime}>{`${I18n.t('qualification')}：¥${cf_cond}  ${convertDate(race.begin_date,'YYYY.MM.DD')} - ${convertDate(race.end_date,'YYYY.MM.DD')}`}</Text>
                        <Text style={styles.txtTime}>${I18n.t('address')}：{race.location}</Text>
                    </View>

                    <View style={styles.separator}/>

                    <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                        <Text style={styles.txtPrize}>{race.prize}</Text>
                        <Text style={styles.txtTime}>{I18n.t('reward_circle')}</Text>
                    </View>
                </View>


                <ProgressBar
                    backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                    style={{width: Metrics.screenWidth - 34}}
                    initialProgress={percent}/>

                <View style={styles.saleStyle}>

                    {this.renderCrowd(I18n.t('total_sponsorship'), cf_total_money)}
                    {this.renderCrowd(I18n.t('subscription_amount'), cf_offer_money)}
                </View>
            </View>


        </TouchableOpacity>
    };
    raceStatus=(status)=>{
        if(status === 'ended'){
            return <Image style={{width:55,height:55}} source={Images.crowd_ended}/>
        }else if(status === 'coming'){
            return <Image style={{width:55,height:55}} source={Images.crowd_coming}/>
        }else return null
    };


    renderCrowd = (label, prize) => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.txtCrowd}>{label}</Text>
            <Text style={styles.txtCrowdPrize}>{prize}万</Text>
        </View>
    };

    renderComing = (status, endDate) => {
        if (status === 'coming')
            return <CrowdCountDown
                date={endDate}
                days={{plural: '天 ', singular: '天 '}}
                hours='时'
                mins='分'
                segs='秒'

                daysStyle={styles.timeTexStyle}
                hoursStyle={styles.timeTexStyle}
                minsStyle={styles.timeTexStyle}
                secsStyle={styles.timeTexStyle}
                firstColonStyle={styles.cardItemTimeRemainTxt}
                secondColonStyle={styles.cardItemTimeRemainTxt}
                containerStyle={styles.containerStyle}
                timeStyle={styles.timeStyle}
            />

    };

    renderStrating = () => {
        return <View>

        </View>
    };


    renderEnd = () => {

    }

}

