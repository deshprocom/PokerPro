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
    },
    arrow: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: 30,
        borderTopColor: Colors._F34,//下箭头颜色
        borderLeftColor: Colors._F34,//右箭头颜色
        borderBottomColor: 'transparent',//上箭头颜色
        borderRightColor: 'transparent',//左箭头颜色
        position: 'absolute',
        top: 0
    }


});

export default class CrowItem extends PureComponent {

    render() {
        const {endDate, image, race, crowd_num, crowd_sale, status} = this.props.item;
        let percent = crowd_sale / crowd_num;

        return <TouchableOpacity
            onPress={() => global.router.toCrowdDetailPage(this.props.item)}
            style={styles.itemContainer}>

            {this.renderComing(status, endDate)}

            <View style={{marginTop: 12}}>
                <ImageLoad
                    style={styles.img}
                    source={{uri: image}}/>
                <View style={styles.arrow}>

                </View>


            </View>


            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.75}}>
                        <Text style={styles.txtName}>{race.name}</Text>
                        <Text style={styles.txtTime}>{`入赛资格：¥${race.buy_in}  ${race.end_start_time}`}</Text>
                        <Text style={styles.txtTime}>地点：{race.location}</Text>
                    </View>

                    <View style={styles.separator}/>

                    <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                        <Text style={styles.txtPrize}>{race.prize}</Text>
                        <Text style={styles.txtTime}>奖励圈</Text>
                    </View>
                </View>


                <ProgressBar
                    backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                    style={{width: Metrics.screenWidth - 34}}
                    initialProgress={percent}/>

                <View style={styles.saleStyle}>

                    {this.renderCrowd('赞助总额', crowd_num)}
                    {this.renderCrowd('认购金额', crowd_sale)}
                </View>
            </View>


        </TouchableOpacity>
    }

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

