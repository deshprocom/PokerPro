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
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import Navbar from './NavTimebar';
import DetailChild from './DetailChild';
import {crowd_detail} from '../../../services/CrowdDao'
import I18n from 'react-native-i18n';
import {isEmptyObject,shareHost} from '../../../utils/ComonHelper';
import {LoadingView} from '../../../components/load/index'

export const footer = (crowd, type, player) => {

    let status = crowd.race.status;
    return <View style={[styles.footer, {justifyContent: _justifyContent(status, type)}]}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                global.router.toReportPage(crowd, player)

            }}
            style={[styles.btnLeft, _width(status, type)]}>
            <Image
                style={{height: 12, width: 10, marginRight: 5}}
                source={Images.black_fire}/>

            <Text style={styles.txtLeft}>{I18n.t('timely_match')}</Text>
        </TouchableOpacity>
        {status === 'go_ahead' && type === 'poker_info' ? null : <View style={{flex: 1}}/>}
        {status === 'go_ahead' && type === 'poker_info' ? null :
            <TouchableOpacity
                onPress={() => {
                    if (type === 'crowd_detail') {
                        global.router.toSelectPlayer(crowd);
                    } else {
                        if (isEmptyObject(global.login_user)) {
                            global.router.toLoginFirstPage()
                        } else {
                            global.router.toSubscriptionPage(crowd, player)
                        }


                    }
                }}
                style={styles.btnRight}>
                <Text style={styles.txtRight}>{I18n.t('subscribe')}</Text>
            </TouchableOpacity>
        }

    </View>

};

export function _width(status, type) {
    if (status === 'go_ahead' && type === 'poker_info') {
        return {
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 84,
            paddingRight: 84
        }
    } else {
        return {
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 14,
            paddingRight: 14
        }
    }
}

export function _justifyContent(status, type) {

    if (status === 'go_ahead' && type === 'poker_info') {
        return 'center'
    } else {
        return 'flex-start'
    }
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
    };


    render() {
        const {crowd} = this.state;
        let url = `${shareHost()}crowdfundings/${crowd.id}`;
        if (crowd.award_date === undefined)
            return <LoadingView/>;
        return <View style={[ApplicationStyles.bgContainer, {backgroundColor: 'white'}]}>
            <Navbar
                info={crowd}
                url={url}/>
            <DetailChild
                info={crowd}/>

            {footer(crowd, 'crowd_detail', null)}

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
        height: 34, borderColor: '#444444', borderWidth: 1, alignItems: 'center',
        borderRadius: 2, justifyContent: 'center', flexDirection: 'row',
        flex: 2
    },
    btnRight: {
        height: 34,
        backgroundColor: Colors._161,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 5

    },
    txtRight: {
        color: '#FFE9AD',
        fontSize: 14
    },
    txtLeft: {
        color: '#444444',
        fontSize: 14
    }
})