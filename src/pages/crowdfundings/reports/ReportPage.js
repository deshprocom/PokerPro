/**
 * Created by lorne on 2018/1/15
 * Function:
 * Desc:
 */

import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes/index';
import ReportTimely from './ReportTimely';
import ReportPlayer from './ReportPlayer';

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
    nav: {
        height: Metrics.navBarHeight,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: Metrics.statusBarHeight,

    },
    selected: {
        alignItems: 'center',
        marginLeft: 18,
        height: 44
    },
    txtTitle: {
        fontSize: 14,
        color: Colors._F34,
        marginTop: 14
    },

});

export default class ReportPage extends PureComponent {

    state = {
        matchShow: 0
    };


    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <View
                style={styles.nav}>
                <StatusBar barStyle={"dark-content"}/>
                {this.renderBtn(true, Images.mall_return, styles.imgLeft)}
                <View style={{
                    flex: 1, alignItems: 'center', height: 44, justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    {this.reportBtn(0, '及时赛报')}
                    {this.reportBtn(1, '牌手赛报')}
                </View>
                {this.renderBtn(false)}
            </View>

            {this.select_page()}

        </View>
    }

    select_page = () => {
        const {player, matchShow} = this.state;
        switch (matchShow) {
            case 0:
                return <ReportTimely
                    choise_player={this.choise_player}
                    crowd={this.props.params.crowd}/>;
            case 1:
                return <ReportPlayer
                    player={player}
                    crowd={this.props.params.crowd}/>
        }
    };


    choise_player = (player) => {
        this.setState({
            player,
            matchShow: 1
        })
    };


    renderBtn = (isLeft, image, imgStyle) => {
        return <TouchableOpacity
            onPress={() => {
                isLeft && global.router.pop()
            }}
            style={styles.btnLeft}>
            <Image style={imgStyle} source={image}/>
        </TouchableOpacity>
    };

    reportBtn = (matchShow, title) => {
        let select = matchShow === this.state.matchShow;
        return <TouchableOpacity style={styles.selected}
                                 onPress={() => {
                                     this.setState({
                                         matchShow
                                     })
                                 }}>
            <Text
                style={[styles.txtTitle, {
                    color: select ? '#161718' : '#666666',
                    fontSize: select ? 16 : 14
                }]}>{title}</Text>
            <View style={{flex: 1}}/>
            {select ? <View style={{backgroundColor: '#161718', width: 50, height: 3, marginTop: 7}}/> : null}
        </TouchableOpacity>
    }


}