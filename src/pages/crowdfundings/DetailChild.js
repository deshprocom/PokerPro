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
        marginTop: 3
    },
    tabView: {
        width: '100%', height: 50, flexDirection: 'row',
        borderTopWidth: 1, borderTopColor: Colors._ECE
    },
    tabFloatView: {
        width: '100%', height: 50, flexDirection: 'row',
        borderTopWidth: 1, borderTopColor: Colors._ECE,
        position: 'absolute', top: 0, backgroundColor: 'white',
        zIndex: 9
    }
});

export default class DetailChild extends PureComponent {


    state = {
        floatTabView: false
    };

    onScroll = (event) => {
        const offsetHeight = 400;
        let offsetY = event.nativeEvent.contentOffset.y;

        this.setState({
            floatTabView: offsetY >= offsetHeight
        })
    };

    render() {
        const {image, race, crowd_sale, crowd_num,mark_desc} = this.props.info;
        let percent = crowd_sale / crowd_num;
        return <View style={{backgroundColor: 'white'}}>
            {this.state.floatTabView ? this.renderTabView(styles.tabFloatView) : null}
            <ScrollView
                scrollEventThrottle={10}
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
                        {this.renderTotal(crowd_num + '万', '赞助总额')}
                        {this.renderTotal(crowd_sale + '万', '认购金额')}
                    </View>
                </View>

                {this.renderTabView(styles.tabView)}

                <View style={{height: 10, width: '100%', backgroundColor: Colors._ECE}}/>

                <MarkdownPlat
                    markdownStr={mark_desc}/>
            </ScrollView>
        </View>


    }

    renderTabView = (tabView) => {
        return <View style={tabView}>
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