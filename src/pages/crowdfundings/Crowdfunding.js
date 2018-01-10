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
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import CrowItem from './CrowItem';
import I18n from 'react-native-i18n';

export default class Crowdfunding extends PureComponent {

    state = {
        crowdList: [
            {
                status: 'coming',
                endDate: '1515652024',
                image: 'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/9d40289868efaae19dbacd261d8dc3a3.jpg',
                race: {
                    name: 'NCBP国家杯棋牌职业大师赛棋牌职业大师赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 101,
                crowd_sale: 32,
                mark_desc: `![Daniel Negreanu.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/9d40289868efaae19dbacd261d8dc3a3.jpg)

Daniel Negreanu近日在自己的博客上公布了自己的2017年成绩，而这个结果可能让很多人吃惊。

很多扑克玩家都很关心这些职业玩家的比赛奖金，而实际上旅游费用和比赛奖金并没有列在其中，所以说实际的盈利会少于统计网站公布的数据。

比如在2017年Negreanu的比赛买入费用总计2,874,164美元，而奖金是2,792,104，今年他的亏损是86,140美元。

“我今年的比赛平均买入是40481美元，也就是说实际上基本上打平吧。实际上我今年最高的奖金是93.6万美元，但是我在百乐宫打了很多场2.5万买入的比赛，重购了几次，所以今年是水下。”他在博客中写到。

在这篇博客中我分享了2017年的全部成绩，还有最近五年在比赛中的总成绩，包括买入费，奖金，进入钱圈比例，平均买入，收入，以及参加的比赛。— Daniel Negreanu (@RealKidPoker) 2017年12月29日

这些数目不包括他从赞助商手里获得代言费。Negreanu还说他在一些比赛中出售了股份–在比赛买入费比较高的时候出售给其他玩家，比如明年归来的100万美元买入一滴水慈善赛。

“我和扑克之星以及Poker Central有独立的协议，但是这和我的买入费无关。我用自己迎来的钱去参加比赛，做出风险投资。尽管如此，我还是想出售一些股份，比如明年的100万美元买入超级豪客赛，这个数目对于一场比赛的报名费来说太疯狂了。我想卖50%的股份，不会改变,，而且我不会提价。” Negreanu说。

Negreanu在博客中说，过去五年他在锦标赛上的总收益是870万美元左右。

以下是他在过去五年的比赛收入情况：

2013比赛 66钱圈次数 13ITM % 19.7买入金额 $1,211,883奖金 $3,203,423收益 $1,963,500平均买入 $18,363每小时收入 $3200

2014比赛 56钱圈次数 13ITM % 23.2买入金额 $3,183,926奖金 $10,284,090收益 $7,100,164平均买入 $56,855每小时收入 $14,045

2015比赛 49钱圈次数 11ITM % 22.4买入金额 $1,513,125奖金 $2,482,479收益 $952,920平均买入 $30,880每小时收入 $3388

2016比赛 49钱圈次数 10ITM % 20.4买入金额 $1,546,355奖金 $300,431收益 (-$1,246,693)平均买入 $31,558每小时收入 (-$3097)

2017比赛 71钱圈次数 21ITM % 29.6买入金额 $2,874,164奖金 $2,792,104收益 (-$86,140)平均买入 $40,481每小时收入 (-$144)

五年总计

比赛 291钱圈次数 68ITM % 23.4买入金额 $10,329,453奖金 $19,062,527收益 $8,733,074平均买入 $35,496每小时收入 (2565小时) $3405`
            },
            {
                status: 'coming',
                endDate: '1515727644',
                image: 'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/aa29fb0ad4c5c6f40f6cb09ac4b35674.jpg',
                race: {
                    name: '中国创投扑克联赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 200,
                crowd_sale: 32,
                mark_desc: `![tu1.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/e82c1061e0d68fe22f1eaf8cf0138568.jpg)‘

2018年1月16日，首届富龙•国家杯棋牌职业大师赛-传统棋牌赛，将在温暖如春的海南澄迈举办。这次大赛亮点多多，今天，小编将为大家“剧透”传统棋牌赛区的三大看点。

**01 中国智力运动产业基地**

![微信图片_20180103235149.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/f89af6a91bd6566fdfe070c0be0f7820.jpg)

**全国唯一**

富龙•国家杯棋牌职业大师赛举办地——中国智力运动产业基地。中国智力运动产业基地是中国第一个也是唯一一个国家级智力运动产业基地，坐落于海南省澄迈县海南生态软件园，是国家体育总局和海南省人民政府达成战略合作，由体育总局棋牌运动管理中心、海南省文化广电出版体育厅、海南省澄迈县人民政府具体落实，智力体育产业发展有限公司负责搭建，根据国家体育总局关于《体育产业发展“十三五”规划》相关要求建设的国家级体育产业示范基地，通过创新引导，配套相关特殊政策，并采取先行先试的特殊开放性政策，立足海南，服务全国，影响世界。

![微信图片_20180103235152.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/629337052fad86a529d52f58f3ae8c38.jpg)

**智力运动产业航母**

中国智力运动产业基地是以促进智力运动产业发展为目标而创立的空间载体，集智力运动研发、赛事、推广普及、孵化、投资等多功能为一体，融合互联网、物联网、人工智能、大数据等高科技的花园式智能化生态园区，致力于打造智力运动产业航母。

![微信图片_20180103235153.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/5a1e305f6c1bdf9603938740773ecf54.jpg)

**互联网+体育产业**

中国智力运动产业基地致力于促进体育产业融合发展、带动互联网+体育产业，并在此基础上探索建立智力运动产业发展示范区，培育一批智力运动产业的优秀项目和企业，引领智力运动产业在国内乃至国际上发展。

**02 八位象棋国手来助阵**

![微信图片_20180103235155.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/267c5a2675324045a96be5ab9b4650a8.jpg)

王天一

等级分：2702

1989年出生，北京人，象棋特级大师

所获荣誉：

两届全国象棋个人锦标赛冠军；

两届世界象棋锦标赛个人、团体冠军；

两次世界智力精英运动会冠军；

两次亚洲象棋团体锦标赛冠军；

两次全国象棋甲级联赛冠军及三次联赛最有价值棋手；

2015年亚洲象棋锦标赛个人冠军；

2014年全国团体锦标赛冠军。

![微信图片_20180103235158.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/c4195d7ad5b3feabc88cc62b42c220ef.jpg)

郑惟桐

等级分：2670

1994年出生，四川成都人，象棋特级大师

所获荣誉：

2008年亚洲锦标赛少年组冠军；

2014年首届世界象棋公开赛团体冠军；

2014年、2015年全国象棋锦标赛（个人）冠军；

第十四届世界象棋锦标赛个人冠军、团体冠军；

2016年首届世界棋王赛冠军。

![微信图片_20180103235159.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/7336297daa7cdf21b76ca4e6b2d2fa92.jpg)

赵鑫鑫

等级分：2621

1988年出生，浙江温岭人，象棋特级大师

所获荣誉：

2007年全国象棋锦标赛（个人）冠军；

第四届体育大会个人、团体三等奖；

2002年获全国少年锦标赛、第十二届亚洲象棋锦标赛少年组冠军；

第十一届世界锦标赛个人、团体冠军；

2017年获得亚洲个人锦标赛冠军；

成为中国第五位集世界冠军、亚洲冠军、全国冠军三项冠军于一身的大满贯得主。

![微信图片_20180103235201.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/adffeb9e9db7bcb5a65c7a66bd540ab8.jpg)

洪智

等级分：2618

1980年出生，湖北武汉人，象棋特级大师

所获荣誉：

2005年全国象棋锦标赛（个人）冠军；

2007、2009年全国象棋甲级联赛冠军；

首届全国智力运动会个人冠军；

第三届全国智力运动会男子快棋冠军；

第四届体育大会团体三等奖；

第十届世界象棋锦标赛团体冠军、个人亚军；

第十六届亚洲象棋锦标赛团体冠军；

第十六届亚运会男子个人冠军。

![微信图片_20180103235203.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/4c569a99b711ffcfc38a7b4bd644d011.jpg)

吕钦

等级分：2607

1962年出生，广东惠东人，象棋特级大师

所获荣誉：

获12次全国象棋团体锦标赛冠军；

五次全国象棋甲级联赛冠军；

五次全国个人锦标赛冠军；

五次世界象棋锦标赛个人和团体冠军。

![微信图片_20180103235204.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/006db88b23b4f72a63298396c2dd0a69.jpg)

汪洋

等级分：2602

1984年出生，湖北汉川人，象棋特级大师

所获荣誉：

2005年、2009年全国象棋甲级联赛冠军；

2007年第2届亚洲室内运动会快棋赛冠军；

2008年世界智力运动会中国象棋男子快棋赛冠军。

![微信图片_20180103235206.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/b6ed62f46a947c3c1c03ee289d6f8b65.jpg)

赵国荣

等级分：2589

1961年出生，黑龙江哈尔滨人，象棋特级大师

所获荣誉：

四届全国象棋锦标赛（个人）冠军；

一届全国象棋锦标赛（团体）冠军；

五届亚洲象棋锦标赛团体冠军；

两届世界象棋锦标赛团体冠军；

第四届亚洲城市名手赛(个人) 冠军；

第二届世界象棋锦标赛个人冠军；

首届世界智力运动会象棋团体冠军。

![微信图片_20180103235208.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/3cec935da54361b5cecda63dfe3c7774.jpg)

蒋川

等级分：2585

1984年出生，浙江永嘉人，象棋特级大师

所获荣誉：

2010年全国象棋锦标赛（个人）冠军；

2010年、2011年全国象棋甲级联赛冠军；

第二届体育大会个人第三名；

第十七届亚洲象棋锦标赛团体冠军；

第十二届世界象棋锦标赛团体、个人冠军；

首届世界智力精英运动会冠军。

**03 桥牌各大赛事获奖队**

**泛华俱乐部**

2017年A类俱乐部联赛冠军、2017年俱乐部锦标赛冠军。

**浙江（钱塘）**

2017年全国桥牌团体赛冠军、2017年全国锦标赛冠军。

**普得**

2017年A类俱乐部联赛亚军。

**华彬智运**

2017年A类俱乐部联赛季军。

**湖南-奥瑞金红牛**

2017年俱乐部锦标赛亚军、2017年全国桥牌团体赛亚军。

**北京京能**

2017年全国锦标赛亚军。

**先锋国际**

2017年A类俱乐部联赛第四名。

（注：象棋选手、桥牌队排名不分先后）

报名方式：国家杯棋牌职业大师赛组委会

咨询电话：010-85804994

咨询微信：ad022222

参赛选手大咖云集，比赛场地高端智能，这些只是富龙•国家杯棋牌职业大师赛的冰山一角，想了解更多比赛信息，那就扫描二维码，持续关注“国家杯”吧。

* * *

![微信图片_20180103235210.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/6db552cfe289e19219ee596e11e4314c.jpg)`
            },
            {
                status: 'coming',
                endDate: '1518330424',
                image: 'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/5ce576951d4892409ab02bf23146ce73.jpg',
                race: {
                    name: '中国创投扑克联赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 200,
                crowd_sale: 32,
                mark_desc: `北京杯主赛终于进入了尾声，今天day4开赛有18名选手参赛来争夺冠军。比赛从day1 A组到现在已经进行了9天！最终姜源 杀出重围，摘取桂冠！赢得2018年的第一个冠军! 恭喜他。

![封面.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/b10f8847636ed9e19fcb43310f26b48b.jpg)

大家在最后阶段都很认真，有些短码玩家为了变成深码进入FT搏命all in的，有的玩家为了生存下去变得牌风超紧，也有深码玩家接连操作剥削短码玩家的，大家如此认真就是为了那梦想的冠军！

选手风采：

![未命名.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/5b707d624f5fa1e20d40c23268d69929.png)

FT产生：

![FT.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/517b9ccd24a20d079c73d04ea4a70912.jpg)

* * *

前九名次产生手牌：

第九名 薛松

![薛松.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/605e1ef97f57f20eb595ac3695223059.jpg)

盲注级别 26 20000/40000 ante 5000（FT盲注回调）

翻牌前池桥在小盲位加注12万，薛松大盲位全下大约80万，池桥秒跟注。

双方秀牌。池桥：A♥ T♦ ，薛松：A♦ 8♦

公共牌： 7♥ 7♦ 3♥ 9♥ J♥；池桥河牌击中同花拿下底池，淘汰薛松。

很遗憾，薛松止步主赛事第9名，奖励98000.

* * *

第八名 张东燚

![微信图片_20180104223247.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/1d25c4c446fae853245b0d547361c3b4.jpg)

盲注级别 27 25000/50000 ante 5000

翻牌前张东燚在枪口位limp入池，UTG+1位的小新open到13万，HJ位及大盲位玩家跟注。

翻牌： K♥ Q♦ J♥

大盲过牌，UTG位的张东燚直接全下 78万筹码，UTG+1位玩家小新短考之后跟注。 小新筹码量cover 张东燚。其他人弃牌。

双方秀牌，UTG位张东燚：T♦ J♦，小新：K♠ K♦

转牌：2♥ 河牌：8♠ ，张东燚遭到淘汰遗憾离场。

张东燚获得北京杯主赛第8名，奖励128000.

* * *

第七名 史利

![史利.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/d5c623d68fbfba5d3b2cfa1a1d843db1.jpg)

盲注级别 27 25000/50000 ante 5000

翻牌前崔明在MP位open到11.5万，史利在小盲位跟注，大盲位 池桥 3bet到41.5万，崔明弃牌，史利跟注。

翻牌：Q♥ K♥ 4♦

史利直接全下56.5万，池桥跟注。

史利：A♦ Q♦ ，池桥：K♣ J♠

转牌：K♦ ；河牌 ：2♣ ；

史利止步主赛第七名，获得奖励168000.

* * *

第六名 丁丁

![丁丁.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/e488987dc1ead94c6ce6ec1bd2eaa08f.jpg)

盲注级别 27 25000/50000 ante 5000

翻牌前丁丁在小盲位直接all in 25万，大盲位的崔明跟注

丁丁：10♦ 8♠ 崔明：9♥ 9♦

公共牌：8♥ 7♦ K♠ 5♠ 7♣

丁丁止步主赛第六名，获得奖励220000.

* * *

第五名 游宁一

![游宁一.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/435187b26cc34f7918e02d7a328a9a94.jpg)

盲注级别 27 25000/50000 ante 5000

UTG位是游宁一 open到13万，庄位玩家小新跟注。

翻牌：3♥ K♠ 5♠

枪口位游宁一下注20.5万，庄位小新 再加注到50.5万，游宁一直接push all in 总共100.5万。小新跟注。小新的筹码量超过游宁一。

双方亮牌. 游宁一： K♥ J♠ 小新：K♣ Q♣

转牌：7♠；河牌：A♣

游宁心被淘汰，止步主赛第五名，收获27万奖励。

* * *

第四名 张雁冰

![微信图片_20180105005505.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/f5069ab83941863f028533d96292cf8c.jpg)

盲注级别 28 30000/60000 ante 10000

枪口位张雁冰 open到17万，小盲位玩家池桥和大盲位崔明跟注。

翻牌：3♣ J♠ 3♦ ；三家过牌

转牌：K♥

小盲位池桥过牌，大盲位崔明下注20万，枪口位张雁冰raise到40万，崔明直接全下，筹码量cover张雁冰。张雁冰跟注。

双方秀牌，崔明：3♠ 10♠ 张雁冰：K♠ 9♠

河牌一张A♣

张雁冰被淘汰，止步第四名，获得36万奖励。

* * *

季军 池桥

![微信图片_20180105020814.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/b64fe543caf69b7f0c216da132a7fdc4.jpg)

池桥因为一把牌损失惨重，变成只有30万的超短码，最后被淘汰 。

下面说一下池桥当时那把牌吧。

盲注级别 29 40000/80000 ante 10000

小新在庄位open 16万，池桥在小盲位3bet到59万，小新4bet到135万，池桥跟注 。

翻牌：7♣ 8♥ 5♥

池桥过牌，小新直接all in ，354万筹码，池桥的后手筹码只比小新的筹码多30多万。 池桥跟注。

双方秀牌。 小新： Q♣ Q♦ 池桥：5♠ 4♠

转牌：4♥ 池桥领先，但是河牌的一张8♠，池桥遭遇河杀。让小新成为更高的两对，池桥筹码损失惨重，只剩30万。

![微信图片_20180105020628.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/1b1afb260e015b18d2cb9beea4d81898.jpg)

超短码的池桥，最后只能all in 。被小新跟注。

池桥：6♥ 4♥ 小新：3♦ 7♦

公共牌：A♦ Q♣ J♠ T♥ 3♣

池桥遗憾出局，成为北京杯主赛季军。收获58万奖励。

* * *

比赛进入HU阶段，崔明与小新展开激烈对决！

![微信图片_20180105022644.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/8f91b95d0e4934ea3f96d48184f584d6.jpg)

冠军诞生手牌：

盲注级别 29 40000/80000 ante 10000

姜源（小新）在小盲位 open 20万，崔明在大盲位3bet到50万，姜源4bet到170万，崔明直接all in 总共700万，姜源跟注。姜源的筹码cover崔明。

崔明：7♣ J♣ 姜源： A♠ T♠

公共牌： 4♦ K♠ 5♦ K♦ 4♠

恭喜姜源（小新），成为2017年第六届中国北京市民扑克大赛 冠军！！！

![握手.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/67fe4fc67ea3a6590379c320a19c1678.jpg)

冠亚军握手！（左为亚军崔明，右为冠军姜源）

* * *

亚军 崔明

![崔明.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/90e64b71a10bc5cc364248fefca6f9c6.jpg)

崔明成为主赛 亚军，获得100万奖励！虽然遗憾但是也要恭喜他，毕竟亚军也是如此的来之不易！

* * *

![冠军.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/65537505f75c2aab13076d5c2a892202.jpg)

冠军姜源！！收获200万冠军奖励！

经过9天的激烈角逐，成为冠军是多么难的一件事情！姜源他证明了自己，获得了2018年给自己的最大的礼物！恭喜他！

* * *

重播链接：

2017 BPC-6

第六届中国北京市民扑克大赛

📹直播TV：[http://www.zhibo.tv/10777](http://www.zhibo.tv/10777)

📹企鹅：[http://live.qq.com/10000832](http://live.qq.com/10000832)

📹斗鱼：[http://www.douyu.com/3414886](http://www.douyu.com/3414886)

📹章鱼：[http://www.zhangyu.tv/1599903](http://www.zhangyu.tv/1599903)

📹梁主播:[http://www.zhibo.tv/9003](http://www.zhibo.tv/9003)

* * *

![微信图片_20171213141649.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/ae080b32367062bc24d2d97e8d10e935.png)`
            },
            {
                status: 'coming',
                endDate: '1515900444',
                image: 'https://cdn-upyun.deshpro.com/uploads/photo/2018/01/a5b4044a4d5a505cf66908724894e553.png',
                race: {
                    name: '中国创投扑克联赛',
                    buy_in: 9000,
                    end_start_time: '2017.09.11-2017.09.15',
                    location: '澳门',
                    prize: '800万'
                },
                crowd_num: 100,
                crowd_sale: 32,
                mark_desc: `![zhanduisaiguanjun.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/1c34bf81841411ab542bdf654693ea13.jpg)

![mvp.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/a631e47e1ab77d6e4b4683e3a9e89631.jpg)

**八大城市主力战队间的脑力角逐**

**恭喜扑克宗师战队**

**荣获城市俱乐部对抗赛冠军**

**恭喜裘劼丰荣获团队MVP**

* * *

**彩云杯温馨提示**

赛事当天请选手（票面已激活）携带有效身份证件原件入场

彩云杯温馨提示

1月5日赛程

#2 彩云杯版纳站主赛事A组第一轮 12:00

#3 小型猎人赛 16:00

#4 快速锦标赛 20:00

S1 主赛快速资格赛 21:00

票面需提前激活

比赛位置

版纳洲际度假酒店锦隆金殿

赛事流程

1.门票激活（点击了解）

2.前往YNPT彩云杯选手酒店入住登记处

3.套票凭彩云杯门票或门票激活界面办理酒店入住，每房两席早餐（侬香自助餐厅，截止每日早上10:30前）大赛期间套票选手每日可凭YNPT赛事组委会提供的餐券免费到酒店（玛麟宫）享用晚餐服务；

4.赛前请已激活票面的牌手前往YNPT赛事报名处领取选手证，赛事亦可现场报名，详情请咨询赛事报名处工作人员

5.前往YNPT主赛场

赛事热线：18725112715 李

接送机服务

联系人：13888999687 王

接机

1月3日-07日 09:00-24:00

送机

1月7日-10日 10:00-22:00

重要提示

自1月5日起至1月8日期间

早11:30-12:00

在会议前厅（锦隆金殿门口）安排自费/自助早点

60元/位，

1.2米-1.4米半价，1.4米以上全价

2018YNPT“彩云杯”智力运动巡回赛西双版纳站

时间: 2018.01.04-01.10

地点: 西双版纳洲际酒店

保底奖励

5,000,000

冠军保底

1,250,000

* * *

**彩云杯赛程**

![微信图片_20180101143603.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/f38bc518f53b49424ccfd37804b15345.jpg)

**主赛盲注表**

**![微信图片_20180101143605.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/92ecae62c39922bbb1c67bafd7c3cf74.png)**

**![微信图片_20180101143607.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/0ff97d6836da23ac4db8dec2ff6b4bcf.jpg)**

**![微信图片_20180101143608.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/48922bb9f5ea871f99702885199d4a98.jpg)**

**彩云杯奖杯**

**![caiyunbei.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/dce33f5225452956b0a573164c113f15.jpg)**

**![微信图片_20180101143612.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/975cac91e2755bd07d3efcb25ba080b0.jpg)**

**重要提示**

**由于彩云杯的邀请函为带邀请码的纸质票**

**激活前 请妥善保管好您的邀请码**

**门票激活后比赛当天您只需携带激活时填写的身份证原件即可参与赛事**

* * *

**新闻媒体**

![微信图片_20180101143614.png](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/e8e5c003887afb3e46bdc0f65bff4eb0.png)

* * *

**专业媒体**

**![微信图片_20180101143616.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/7cbb2f8be332de642c40830b5f7d7ab9.jpg)**

* * *

**直播合作**

**![微信图片_20180101143618.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/1f5c3eccd85c20f05f2919e859e72dd2.jpg)**

* * *

**特别鸣谢**

**红牛&唯他可可椰子水&三垛山**

**对2018YNPT“彩云杯”版纳站的大力支持**

![微信图片_20180101143621.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/83b0f3b567b5cb002c14a6c5773523bb.jpg)

![微信图片_20180101143623.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/d4acb770acf37d39c9e48afb9d929694.jpg)

![微信图片_20180101143625.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/08ced5f8de873929a3276179f7968d33.jpg)

* * *

长按识别下方二维码关注彩云杯赛事

![微信图片_20180101143627.jpg](https://cdn-upyun.deshpro.com/uploads/photo/2018/01/5486a03bc8a9195cd1998ea0d66cd18f.jpg)`

            }
        ]
    }

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            {this.renderFlatList()}
        </View>
    }

    renderFlatList = () => {
        return <UltimateFlatList
            header={() => <Carousel/>}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `crowd${index}`}  //this is required when you are using FlatList
            item={this.renderItem}  //this takes two params (item, index)
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            separator={() => <View style={{height: 10, backgroundColor: Colors._ECE}}>

            </View>}
            waitingSpinnerText={I18n.t('loading')}
        />

    };


    renderItem = (item, index) => {
        return <CrowItem
            item={item}/>
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        startFetch(this.state.crowdList, 9)

    }
}

