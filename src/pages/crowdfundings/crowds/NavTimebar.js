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
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import {CrowdCountDown} from '../../../components/index';
import {RaceStatus} from '../../../configs/Status';
import moment from 'moment';
import {sharePage} from '../../../utils/ComonHelper';

const styles = StyleSheet.create({
    btnLeft: {
        height: 44,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgLeft: {
        height: 23,
        width: 23
    },
    imgRight: {
        height: 20,
        width: 20
    },
    containerStyle: {
        height: 31,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    timeTexStyle: {
        fontSize: 18,
        color: '#438EE6'
    },
    timeStyle: {
        borderColor: Colors._ECE,
        borderWidth: 1,
        height: 31,
        width: 31,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    cardItemTimeRemainTxt: {
        fontSize: 14,
        margin: 5,
        color: Colors._333
    },
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: Metrics.statusBarHeight,

    }
});

export default class Navbar extends PureComponent {

    render() {
        return <View
            style={styles.nav}>
            <StatusBar barStyle={"dark-content"}/>
            {this.renderBtn(true, Images.mall_return, styles.imgLeft)}
            <View style={{flex: 1, alignItems: 'center', height: 44, justifyContent: 'center'}}>
                {this.renderComing()}
            </View>
            {this.renderBtn(false, Images.forward, styles.imgRight)}
        </View>
    }

    renderBtn = (isLeft, image, imgStyle) => {
        return <TouchableOpacity
            onPress={() => {
                if(isLeft){
                    global.router.pop()
                }else{
                    const {race,master_image} = this.props.info;
                    sharePage(race.name, race.location, master_image, this.props.url)
                }
            }}
            style={styles.btnLeft}>
            <Image style={imgStyle} source={image}/>
        </TouchableOpacity>
    };

    renderComing = () => {
        const {race, expire_date} = this.props.info;
        let utc = moment.utc(expire_date).valueOf();
        if (race.status === RaceStatus.unbegin)
            return <CrowdCountDown
                date={utc/1000}
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
}
