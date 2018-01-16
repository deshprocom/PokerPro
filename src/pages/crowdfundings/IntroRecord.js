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

const styles = StyleSheet.create({
    tab_menu: {
        height: 33,
        width: 260,
        borderRadius: 3,
        borderColor: Colors._ECE,
        borderWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row'
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
        menu: 0,
        desc: `今天QPT趣凡扑克锦标赛进行了主赛Day1D组的最后一场比赛，4天下来一共是413人报名主赛，竞争是残酷的，最后有84人晋级day2，恭喜他们！

![微信图片_20180116001533.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/0982d389e468bb3952d6830c8a19aa22.jpg)

今天参赛人数爆棚。美女牌手张晨旭、趣凡战队成员陈昊、游戏美女解说沐沐、Soulight潮流品牌创办人张春光、扑克王形象大使赖佩佩、广州知名选手虾仔、知名牌手邓哲、德州解说安子、美女发牌员圈圈、知名选手鲍骏.....等等今天可谓是大咖云集，

就趣扑克战队成员也到场了4位之多，（有刘志刚，夏军，陈伟生，陈昊）。比赛桌上大家碰撞出了很多火花，比赛很激烈。

![微信图片_20180116000633.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/433de85fc351d3fefd13d03a4da1ad94.jpg)

精彩手牌：

小编在赛场到处跑，突然一桌爆发出了一阵惊呼，小编赶过去就见到了这局**精（gou）彩（xue）**的牌局。

话不多说，先上图：

![微信图片_20180115233552.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/cc1dd9cecaab96a08312b8ce968387d8.jpg)

听桌上的选手说，这局是翻牌3家ALL IN的，翻牌是5♦ 9♦ 6♦，有一家是A♦4♦,天nuts花，有一家是5♠9♠，翻牌两对，有一家是Q♦10♦。

3位选手在翻牌all in，结果最后公共牌发出了：5♦ 9♦ 6♦ 8♦ J♦ ，

Q♦ 10♦组成了同花顺，收获了巨大底池，试问天nuts花的那位选手的心理过程和最后的心理阴影.....

* * *

**其实不要怕被BB，玩的好该赢的迟早会赢！**

盲注级别 6 200/400 ante 50

沐沐手持AA，在大盲位与CO位的选手翻前打光，CO位选手是A♣ 9♣，CO位玩家被压制。

公共牌：10♥ 9♦ 10♠ 4♣ 5♠

沐沐将选手淘汰，但是就在前几手牌中，她的AA就被对手KK Bad Beat了，虽然这就是扑克的魅力，但是时间会将数据拉到理论值。所以只要你打的好，不要害怕被逆袭！

![微信图片_20180115233605.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/d9ca5a441269a1e8b0461d00ef0a9e35.jpg)

美女选手沐沐

* * *

小编抓拍：

![微信图片_20180115232557.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/352c217b36c1a1e4e48caf8de2f03a3c.jpg)

安子说“筹码真好吃~”

* * *

晋级选手名单及座位表：

![微信图片_20180116013622.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/d45a96fc6caa6e20df8f91a7013f3cd0.png)

* * *

今天Day1D组一共153人报名，一共34晋级。鲁阳再次成为CL记分牌数量为205900，他也是day1A组的记分牌领先者。这就是实力的象征！他已经获得了双倍的奖励，恭喜！

![luyang.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/87e3731974eddf80c6f768a2c4e8f444.jpg)

今日选手风采：

![微信图片_20180116000639.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/d3a37633d002b4579fe16201d6b0f472.jpg)

直播链接：（day1d组直播有一位神秘美女嘉宾出现哦！点击链接即可观看！）

2018年QPT趣凡扑克锦标赛

直播TV：[http://www.zhibo.tv/10003](http://www.zhibo.tv/10003)

斗鱼：[https://www.douyu.com/4049892](https://www.douyu.com/4049892)

章鱼：[http://www.zhangyu.tv/1599903](http://www.zhangyu.tv/1599903)

熊猫:[https://www.panda.tv/1762718](https://www.panda.tv/1762718)

企鹅:[http://live.qq.com/10000149](http://live.qq.com/10000149)

微博直播：[http://live.weibo.com](http://live.weibo.com/show?id=1042152%3A3b8a8186c5bd3cf8d2458dbf84f1f864&luicode=20000061&lfid=4195377701713666)

* * *

![微信图片_20171213141649.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/6890d91189ebee80dfae446d17f5d652.png)`,
        rank: {
            name: '2017年扑克王杯',
            rank: 12,
            buy_in: '¥34,344',
            participants: 2800,
            prize: '¥824,344',
            time: '2017.04.23-2017.05.12',
            location: '澳大利亚墨尔本皇冠娱乐场澳大是寿...'

        }
    };

    render() {

        return <View style={{backgroundColor: 'white'}}>
            <View style={styles.tab_menu}>
                {this.btnMenu('牌手简介', 0)}
                {this.btnMenu('牌手战绩', 1)}
            </View>

            {this.pageMenu()}
        </View>
    }

    pageMenu = () => {
        if (this.state.menu === 0) {
            return <MarkdownPlat markdownStr={this.state.desc}/>
        } else {

            return <FlatList
                data={[1, 2, 3, 5, 6, 7]}
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

    renderItem = () => {
        const {name, rank, buy_in, participants, prize, time, location} = this.state.rank;
        return <View style={styles.item}>

            <View style={styles.view1}>
                <Text style={styles.title}>{name}</Text>

                <Badge
                    textStyle={{fontSize: 12}}>第12名</Badge>
            </View>

            <View style={styles.view2}>
                {this.renderTag('买入', buy_in)}
                {this.renderTag('参赛人数', participants)}
                {this.renderTag('奖金', prize)}
            </View>

            <View style={{
                backgroundColor: Colors._ECE, height: 1, width: '100%',
                marginTop: 17, marginBottom: 11
            }}/>

            {this.renderFooter(Images.home_clock, styles.img_time, time)}
            {this.renderFooter(Images.home_adr, styles.img_loc, location)}

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