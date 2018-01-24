/**
 * Created by lorne on 2018/1/16
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, FlatList
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {MarkdownPlat, Badge} from '../../components';
import moment from 'moment';
import {isEmptyObject} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';

const styles = StyleSheet.create({
    tab_menu: {
        height: 33,
        width: 260,
        borderRadius: 3,
        borderColor: Colors._ECE,
        borderWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    item: {
        borderRadius: 4,
        borderColor: Colors._ECE,
        borderWidth: 1,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 10,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 18
    },
    view1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 20
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors._333
    },
    view2: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt_tag1: {
        fontSize: 12,
        color: Colors._AAA,
        marginBottom: 6
    },
    txt_tag2: {
        fontSize: 15,
        color: Colors._666,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    txt_time: {
        fontSize: 13,
        color: Colors._666,
        marginLeft: 8
    },
    img_loc: {
        height: 11,
        width: 8
    },
    img_time: {
        height: 10,
        width: 10
    }

});

export default class IntroRecord extends PureComponent {
    state = {
        menu: 0
    };

    render() {
        const {description, race_rank} = this.props;
        return <View style={{backgroundColor: 'white'}}>
            <View style={styles.tab_menu}>
                {isEmptyObject(description) ? null : this.btnMenu(I18n.t('player_profile'), 0)}
                {isEmptyObject(race_rank) ? null : this.btnMenu(I18n.t('crowdfunding_record'), 1)}
            </View>

            {this.pageMenu(description, race_rank)}
            <View style={{height:30}}/>
        </View>
    }

    pageMenu = (description, race_rank) => {

        if (this.state.menu === 0) {
            return <MarkdownPlat markdownStr={description}/>
        } else {

            return <FlatList
                data={race_rank}
                keyExtractor={(item, index) => `record${index}`}
                renderItem={this.renderItem}
            />
        }
    };

    btnMenu = (btnTitle, menu) => {
        let select = this.state.menu === menu;
        return <TouchableOpacity
            onPress={() => {
                this.setState({menu})
            }}
            style={{
                flex: 1, alignItems: 'center', justifyContent: 'center',
                backgroundColor: select ? Colors._161 : 'white'
            }}>
            <Text style={{fontSize: 14, color: select ? '#FFE9AD' : Colors.txt_444}}>{btnTitle}</Text>

        </TouchableOpacity>
    };

    race_time = (race) => {
        const {begin_date, end_date} = race;
        return moment(begin_date).format('YYYY.MM.DD') + '-' + moment(end_date).format('YYYY.MM.DD')
    };

    renderItem = (item) => {
        const {rank, race, parent_race} = item;
        return <View style={styles.item}>

            <View style={styles.view1}>
                <Text style={styles.title}>{race.name}</Text>

                <Badge
                    textStyle={{fontSize: 12}}>第{rank.ranking}名</Badge>
            </View>

            <View style={styles.view2}>
                {this.renderTag(I18n.t('rank_buyIn'), race.ticket_price)}
                {this.renderTag(I18n.t('rank_participate'), race.participants)}
                {this.renderTag(I18n.t('bonus'), rank.earning)}
            </View>

            <View style={{
                backgroundColor: Colors._ECE, height: 1, width: '100%',
                marginTop: 17, marginBottom: 11
            }}/>

            {this.renderFooter(Images.home_clock, styles.img_time, this.race_time(race))}
            {this.renderFooter(Images.home_adr, styles.img_loc, race.location)}

        </View>
    };


    renderFooter = (img, img_style, value) => {
        return <View style={styles.footer}>
            <Image style={img_style}
                   source={img}/>

            <Text style={styles.txt_time}>{value}</Text>
        </View>
    };

    renderTag = (name, number) => {
        return <View style={styles.tag}>
            <Text style={styles.txt_tag1}>{name}</Text>
            <Text style={styles.txt_tag2}>{number}</Text>
        </View>
    }


}