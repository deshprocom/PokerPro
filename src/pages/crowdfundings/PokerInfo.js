/**
 * Created by lorne on 2018/1/16
 * Function:
 * Desc:
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, FlatList,
    StyleSheet, Image, Text, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar, ImageLoad, ProgressBar} from '../../components';
import IntroRecord from './IntroRecord';
import {footer} from './crowds/CrowdDetail';
import {poker_info} from '../../services/CrowdDao';
import {isEmptyObject, strNotNull,sharePage,shareHost} from '../../utils/ComonHelper';
import I18n from 'react-native-i18n';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    img_poker: {
        height: 200,
        width: 'auto'
    },
    view_info: {
        padding: 17,
        paddingTop: 11,
        backgroundColor: 'white'

    },
    view_info1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt_name: {
        fontSize: 15,
        color: Colors.txt_444,
        marginBottom: 5
    },
    lb_price: {
        fontSize: 14,
        color: Colors._888
    },
    txt_price: {
        fontSize: 14,
        color: Colors._F34
    },
    view_info2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt_entry: {
        fontSize: 20,
        color: '#4990E2'
    },
    lb_entry: {
        fontSize: 12,
        color: '#4990E2',
        marginTop: 5
    },
    txt_final: {
        fontSize: 20,
        color: Colors._F34
    },
    lb_final: {
        fontSize: 12,
        color: Colors._F34,
        marginTop: 5
    },
    lb_slogan: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.txt_444
    },
    txt_slogan: {
        fontSize: 14,
        color: Colors.txt_444
    },
    view_percent: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15
    },
    view_head: {
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingLeft: 17
    },
    img_head: {
        height: 44,
        width: 44,
        borderRadius: 22,
        marginRight: 10

    },
    activeDot: {
        backgroundColor: 'white',
        width: 18,
        height: 4,
        borderRadius: 2,
        marginBottom: -8
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 4,
        borderRadius: 2,
        marginBottom: -8
    }
});

export default class PokerInfo extends PureComponent {

    state = {
        pokerInfo: {}
    };

    componentDidMount() {
        const {crowd, player} = this.props.params;
        poker_info({id: crowd.id, player_id: player.cf_player_id}, data => {
            console.log("pokerInfo:", data);
            this.setState({
                pokerInfo: data
            })
        }, err => {

        })
    };

    numberToW = (str) => {
        if (str <= 0) {
            return `0${I18n.t('thousand')}`
        }

        if (str < 10000)
            return `¥${str}`;

        return str / 10000 + I18n.t('thousand');

    };

    pokerBanner = (logo, player_images) => {
        if (!isEmptyObject(player_images) && player_images.length > 0)
            return (
                <View style={{height: 200, marginBottom: 10}}>
                    <Swiper
                        activeDotStyle={styles.activeDot}
                        dotStyle={styles.dot}
                        autoplayTimeout={2}
                        autoplay>
                        {player_images.map((item, key) => {
                            return <TouchableOpacity
                                key={key}
                                activeOpacity={1}
                                onPress={()=>{
                                    global.router.toImageGalleryPage([item.image])
                                }}
                            >
                                <Image style={{height: 200, width: '100%'}} source={{uri: item.image.url}}/>
                            </TouchableOpacity>
                        })}


                    </Swiper>
                </View>


            );
        else
            return <ImageLoad style={styles.img_poker}
                              source={{uri: logo}}/>
    };

    render() {

        const {
            cf_player_id, race_rank, ordered, player_images, name, logo, stock_unit_price, cf_money, order_stock_number,
            stock_number, sell_stock, lairage_rate, final_rate, join_slogan, description
        } = this.state.pokerInfo;

        let percent = 0;
        if (stock_number !== 0) {
            percent = parseFloat(order_stock_number) / stock_number;
            if (isNaN(percent)) {
                percent = 0;
            }
        };
        let url = `${shareHost()}crowdfunding/${this.props.params.crowd.id}/players/${cf_player_id}`;

        return <View style={[ApplicationStyles.bgContainer,{backgroundColor:'white'}]}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white}}
                title={name}
                titleStyle={{color: Colors._161}}
                leftBtnIcon={Images.mall_return}
                leftImageStyle={{height: 23, width: 23, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => global.router.pop()}
                rightBtnIcon={Images.forward}
                rightImageStyle={{width:21,height:21,marginRight:16}}
                rightBtnPress={()=>{
                    const {name, join_slogan,logo} = this.state.pokerInfo;
                    sharePage(name, join_slogan, logo,url)
                }}
                />
            <ScrollView>

                {this.pokerBanner(logo, player_images)}


                <View style={styles.view_info}>
                    <View style={styles.view_info1}>
                        <View>
                            <Text style={styles.txt_name}>{I18n.t('sponsor_player')}：{name}</Text>
                            <Text style={styles.lb_price}>{I18n.t('part_price')}：<Text
                                style={styles.txt_price}>{stock_unit_price}元</Text></Text>
                        </View>

                        <View style={styles.view_info2}>
                            <View style={{alignItems: 'center', marginRight: 10}}>
                                <Text style={styles.txt_entry}>{lairage_rate}</Text>
                                <Text style={styles.lb_entry}>{I18n.t('into_ring_rate')}</Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.txt_final}>{final_rate}</Text>
                                <Text style={styles.lb_final}>{I18n.t('race_rate')}</Text>
                            </View>
                        </View>

                    </View>
                    {strNotNull(join_slogan) ? <View style={{
                        flexDirection: 'row', alignItems: 'center', marginTop: 12,
                        marginBottom: 8
                    }}>
                            <Text style={styles.lb_slogan}>{I18n.t('slogan')}：</Text>
                            <Text style={styles.txt_slogan}>{join_slogan}</Text>
                        </View> : null}


                    <ProgressBar
                        backgroundStyle={{backgroundColor: Colors._ECE, borderRadius: 2}}
                        style={{width: Metrics.screenWidth - 34}}
                        progress={percent}
                        initialProgress={percent}/>

                    <View style={styles.view_percent}>
                        {this.renderItem(`${sell_stock}%`, I18n.t('give_up_hares'))}
                        {this.renderItem(`${stock_number}份`, I18n.t('share_division'))}
                        {this.renderItem(this.numberToW(cf_money), I18n.t('total_crowdfunding'))}
                    </View>
                </View>
                <View style={{height: 7, backgroundColor: '#ECECEE'}}/>
                <View style={{height: 14, backgroundColor: 'white', marginTop: 7}}/>


                {!isEmptyObject(ordered) && ordered.users.length > 0 ? <View style={styles.view_head}>
                        <Text style={[styles.txt_slogan, {marginBottom: 14, alignSelf: 'center'}]}
                        >{I18n.t('currently_there')}<Text
                            style={{color: Colors._F34}}>{isEmptyObject(ordered) ? '' : ordered.number}</Text>{I18n.t('people')}{I18n.t('subscription')}
                        </Text>

                        <FlatList
                            horizontal={true}
                            data={isEmptyObject(ordered) ? [] : ordered.users}
                            renderItem={({item}) => <ImageLoad style={styles.img_head} source={{uri: item.avatar}}/>}
                            keyExtractor={(item, index) => `buy_person${index}`}/>
                    </View> : null}


                <IntroRecord
                    description={description}
                    race_rank={race_rank}/>
            </ScrollView>
            <View style={{height: 30}}/>

            {this.props.params.crowd.race.status === 'ended' ? null : footer(this.props.params.crowd, 'poker_info', this.state.pokerInfo)}

        </View>
    }


    renderItem = (percent, type) => {
        return <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: Colors._F34, fontWeight: 'bold'}}>{percent}</Text>
            <Text style={{fontSize: 12, color: Colors._888, marginTop: 5, fontWeight: 'bold'}}>{type}</Text>
        </View>
    }
}


