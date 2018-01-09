/**
 * Created by lorne on 2018/1/9
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, StatusBar,
    StyleSheet, Image, Text, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {ImageLoad, ProgressBar, MarkdownPlat} from '../../components';

const styles = StyleSheet.create({
    cover: {
        height: 170,
        width: '100%'
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
    txtRed: {
        fontSize: 18,
        color: Colors._F34,
        fontWeight: 'bold',
        lineHeight: 25
    },
    txtCrowd: {
        fontSize: 12,
        color: Colors._888,
        lineHeight: 17
    },
    txtSelect: {
        fontSize: 15,
        color: Colors._AAA,
        fontWeight: 'bold',
        lineHeight: 21
    },
    txtSelected: {
        fontSize: 15,
        color: Colors.txt_444,
        fontWeight: 'bold',
        lineHeight: 21
    },
    lineSelected: {
        height: 3,
        width: 60,
        backgroundColor: Colors._F34,
        marginTop: 5
    },
    tabView: {
        width: '100%', height: 50, flexDirection: 'row',
        borderTopWidth: 1, borderTopColor: Colors._ECE
    }
});

export default class DetailChild extends PureComponent {


    state = {
        floatTabView: false
    };

    onScroll = (event) => {
        const offsetHeight = 350;
        let offsetY = event.nativeEvent.contentOffset.y;
        console.log(offsetY);
        this.setState({
            floatTabView: offsetY >= offsetHeight
        })
    };

    render() {
        const {image, race, crowd_sale, crowd_num} = this.props.info;
        let percent = crowd_sale / crowd_num;
        return <View style={{backgroundColor: 'white'}}>
            {this.state.floatTabView ? this.renderTabView() : null}
            <ScrollView
                onScroll={this.onScroll}>
                <ImageLoad style={styles.cover}
                           source={{uri: image}}/>
                <View style={{marginLeft: 17, marginRight: 17}}>
                    <Text style={styles.txtName}>{race.name}</Text>
                    <Text style={styles.txtTime}>{`入赛资格：¥${race.buy_in}  ${race.end_start_time}`}</Text>
                    <Text style={styles.txtTime}>地点：{race.location}</Text>
                    <ProgressBar
                        backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                        style={{width: Metrics.screenWidth - 34}}
                        initialProgress={percent}/>

                    <View style={{width: '100%', height: 70, flexDirection: 'row'}}>
                        {this.renderTotal('5人', '选手人数')}
                        {this.renderTotal('200万', '赞助总额')}
                        {this.renderTotal('20万', '认购金额')}
                    </View>
                </View>

                {this.renderTabView()}

                <View style={{height: 10, width: '100%', backgroundColor: Colors._ECE}}/>

                <MarkdownPlat
                    markdownStr={`群星荟萃的超级碗豪客赛已经举行了三届了，第一届和第二届的参赛人数分别为43人和49人，第三届增加到56人——刚好坐满七张八人桌。

综观三届豪客赛，无论是参赛人数还是参赛买入等都不尽相同，唯一相同的是每一届豪客赛阵容均是超级强大，人数也在逐步提升中。

众多知名牌手： Phil Hellmuth， Erik Seidel ，Daniel Colman ，John Morgan， “魔术师”Antonio Esfandiari ，Jason Mercier ，Daniel Negreanu， Fedor Holz 均在赛场大展风采。

![d7f1a4f04a.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/e5dd04d0ef9e1c926330d058a91e6d40.jpg)

三届赛事奖励圈

![0e3aaed561.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/0e8a1392e99ac6ed72eecc59104d59d3.jpg)

2017超级碗冠军：Christoph Vogelsang

2017超高额超级碗豪客赛钱圈玩家结果：

1\\. Christoph Vogelsang - $6,000,000

2\\. Jake Schindler - $3,600,000

3\\. Stefan Schillhabel - $2,400,000

4\\. Leon Tsoukernik - $1,800,000

5\\. Byron Kaverman - $1,400,000

6\\. Pratyush Buddiga - $1,000,000

7\\. Justin Bonomo - $600,000

8\\. jason konn - $600,00

![4a2181888c.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/cc5077b3feb9be47f15c761fdfcc040d.jpg)

2016超级碗冠军：Rainer Kempe

2016 超高额超级碗豪客赛钱圈玩家结果：

1st Rainer Kempe $5,000,000

2nd Fedor Holz $3,500,000

3rd Erik Seidel $2,400,000

4th Phil Hellmuth $1,600,000

5th Matt Berkey $1,100,000

6th Bryn Kenney $800,000

7th Dan Shak $600,000

![965655ea0d.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/202f4b86c86328d4c2ea5bfe8aefbc49.jpg)

2015超级碗冠军： Brian Rast

2015 超高额超级碗豪客赛钱圈玩家结果：

1st Brian Rast $7,525,000

2nd Scott Seiver $5,160,000

3rd Connor Drinan $3,225,000

4th Timofey Kuznetsov $2,150,000

5th David Peters $1,505,000

6th Thomas Marchese $1,075,000

7th Erik Seidel $860,000

* * *

**最重要的来了，来了**

**超级碗赛事即将登陆中国，今年三月 ，超级碗中国赛即将在澳门巴比伦开赛，一亿港币保底，史无前例。**

![微信图片_20180105014001.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/95c2b625393444e6bbe51139f3ec1b8e.jpg)

超级碗中国赛将会有哪些人参与呢，最终谁会登顶夺冠呢，让我们拭目以待。

* * *

![appxiaztu.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/a74e6ffc25ac326616a8f0ce611d33e3.png)`}/>
            </ScrollView>
        </View>


    }

    renderTabView = () => {
        return <View style={styles.tabView}>
            {this.renderTab(true, '项目介绍')}
            {this.renderTab(false, '众筹概况')}
            {this.renderTab(false, '项目公告')}
            {this.renderTab(false, '投资风险')}
        </View>
    };

    renderTab = (selected, name) => {
        return <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={selected ? styles.txtSelected : styles.txtSelect}>{name}</Text>
            {selected ? <View style={styles.lineSelected}/> : null}
        </TouchableOpacity>
    };

    renderTotal = (number, label) => {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.txtRed}>{number}</Text>
            <Text style={styles.txtCrowd}>{label}</Text>
        </View>
    }
}