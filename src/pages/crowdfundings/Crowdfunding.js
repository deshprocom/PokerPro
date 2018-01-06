/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:众筹主页
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Carousel from './Carousel';
import {CrowdCountDown} from '../../components'

export default class Crowdfunding extends PureComponent {

    render() {
        return <View style={[ApplicationStyles.bgContainer, {backgroundColor: 'white'}]}>
            <Carousel/>
            <CrowdCountDown
                date="2018-01-28T00:00:00+00:00"
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

        </View>
    }
}

const styles = StyleSheet.create({

    cardItemTimeRemainTxt: {
        fontSize: 20,
        color: '#ee394b',
        margin: 5
    },
    containerStyle: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    timeTexStyle: {
        fontSize: 20,
        color: '#ee394b'
    },
    timeStyle: {
        borderColor: Colors._ECE,
        borderWidth: 1,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }


})