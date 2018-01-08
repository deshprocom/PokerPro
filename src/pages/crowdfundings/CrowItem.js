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
        fontSize: 16,
        color: '#ee394b',
        margin: 5
    },
    containerStyle: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10

    },
    timeTexStyle: {
        fontSize: 20,
        color: '#ee394b'
    },
    timeStyle: {
        borderColor: Colors._ECE,
        borderWidth: 1,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: 100,
        width: '100%'
    },
    saleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }


});

export default class CrowItem extends PureComponent {

    render() {
        return <View>
            {this.renderComing()}
        </View>
    }

    renderComing = () => {
        const {endDate, image, race, crowd_num, crowd_sale} = this.props.item;
        return <View style={{marginLeft: 17, marginRight: 17}}>
            <CrowdCountDown
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
            <ImageLoad
                style={styles.img}
                source={{uri: image}}/>

            <View>
                <Text>赛事名称:{race.name}</Text>
                <Text>入赛资格:{race.buy_in}</Text>
                <Text>{race.end_start_time}</Text>

                <ProgressBar
                    backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                    style={{marginTop: 10, width: 300, marginBottom: 10}}
                    initialProgress={0.5}/>

                <View style={styles.saleStyle}>

                    <Text>赞助总额 {crowd_num}</Text>

                    <Text>认购金额 {crowd_sale}</Text>

                </View>
            </View>


        </View>
    };

    renderStrating = () => {
        return <View>

        </View>
    };


    renderEnd = () => {

    }

}

