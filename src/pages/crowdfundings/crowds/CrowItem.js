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
import {CrowdCountDown, ImageLoad, ProgressBar} from '../../../components/index';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import {RaceStatus} from '../../../configs/Status';
import moment from 'moment';
import _ from 'lodash';
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
    },
    saleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
        marginTop: 12
    },
    txtName: {
        color: Colors._333,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4
    },
    txtTime: {
        fontSize: 12,
        color: Colors._AAA,
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
        color: Colors._888,
        fontWeight: 'bold'
    },
    txtCrowdPrize: {
        fontSize: 14,
        color: Colors._F34,
        marginLeft: 8,
        fontWeight: 'bold'
    },
    arrow: {
        position: 'absolute',
        top: 0,
        height: 55,
        width: 55
    }


});

export default class CrowItem extends PureComponent {

    render() {
        const {
            master_image, race, cf_cond, expire_date,
            cf_offer_money, cf_total_money
        } = this.props.item;
        let percent = 0;
        if (cf_total_money !== 0)
            percent = cf_offer_money / cf_total_money;

        return <TouchableOpacity
            onPress={() => global.router.toCrowdDetailPage(this.props.item)}
            style={styles.itemContainer}
            activeOpacity={1}>

            {this.renderComing(race.status, expire_date)}

            <View style={{marginTop: 12}}>
                <ImageLoad
                    style={styles.img}
                    source={{uri: master_image}}/>
                {this.crowd_status(race.status)}

            </View>


            <View>
                <View style={{flexDirection: 'row', marginBottom: 4}}>
                    <View style={{flex: 0.75}}>
                        <Text style={styles.txtName}>{race.name}</Text>
                        <Text style={styles.txtTime}>{`${I18n.t('qualification')}：¥${cf_cond}     `}
                            <Text>{this.race_time(race)}</Text></Text>
                        <Text style={styles.txtTime}>{I18n.t('crowAddress')}：{race.location}</Text>
                    </View>

                    <View style={styles.separator}/>

                    <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                        <Text style={styles.txtPrize}>{this.numToW(race.prize)}</Text>
                        <Text style={styles.txtTime}>{I18n.t('PrizePond')}</Text>
                    </View>
                </View>


                <ProgressBar
                    backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                    style={{width: Metrics.screenWidth - 34}}
                    initialProgress={percent}/>

                <View style={styles.saleStyle}>

                    {this.renderCrowd(I18n.t('total_sponsorship'), this.numberToW(cf_total_money))}
                    {this.renderCrowd(I18n.t('subscription_amount'), this.numberToW(cf_offer_money))}
                </View>
            </View>


        </TouchableOpacity>
    }

    crowd_status = (status) => {
        if (status === RaceStatus.unbegin)
            return;
        let src = Images.crowd_close;
        if (status === RaceStatus.go_ahead)
            src = Images.crowd_starting;
        return <Image style={styles.arrow}
                      source={src}/>
    };

    numToW = (str) => {
        if (str.length <= 0) {
            return `0${I18n.t('thousand')}`
        }
        let num = str.replace(/[^0-9]+/g, '');

        return num / 10000 + I18n.t('thousand');

    };
    numberToW = (str) => {
        if (str <= 0) {
            return `0${I18n.t('thousand')}`
        }
        if (str < 10000)
            return `¥${str}`;

        return str / 10000 + I18n.t('thousand');

    };

    race_time = (race) => {
        const {begin_date, end_date} = race;
        return moment(begin_date).format('YYYY.MM.DD') + '-' + moment(end_date).format('MM.DD')
    };

    renderCrowd = (label, prize) => {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.txtCrowd}>{label}</Text>
            <Text style={styles.txtCrowdPrize}>{prize}</Text>
        </View>
    };

    renderComing = (status, endDate) => {
        let utc = moment.utc(endDate).valueOf();

        if (status === RaceStatus.unbegin)
            return <CrowdCountDown
                date={utc / 1000}
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

