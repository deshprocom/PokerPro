/**
 * Created by lorne on 2017/6/9.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, StatusBar, InteractionManager,
    Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {MarkdownPlat} from '../../components';
import {getBuyRaceTicket, getUnpaidOrder} from '../../services/OrderDao';
import {isEmptyObject, strNotNull, uShareTicket} from '../../utils/ComonHelper';

export default class TicketInfoPage extends Component {

    state = {
        opacity: 0,
        ordered: false,
        race: {},
        tickets: {}
    };


    componentDidMount() {
        const {race_id, ticket_id} = this.props.params;
        console.log('ticket', race_id, ticket_id);
        const body = {
            race_id: race_id,
            ticket_id: ticket_id
        };
        getBuyRaceTicket(body, data => {
            const {tickets, ordered, race} = data;
            this.setState({
                tickets: tickets,
                ordered: ordered,
                race: race
            })
        }, err => {
        });

    }


    render() {
        return (<View
            testID="page_ticket"
            style={styles.bgPage}>

            {this._topBar()}

            {this._content()}
            {this._viewGoBuy()}

        </View>)

    }

    _ticketNum = (ticket_info) => {
        if (!isEmptyObject(ticket_info)) {
            const {e_ticket_number, e_ticket_sold_number, entity_ticket_number, entity_ticket_sold_number} = ticket_info;
            return e_ticket_number + entity_ticket_number - e_ticket_sold_number - entity_ticket_sold_number;
        }

    };


    _showBuy = () => {
        const {tickets} = this.state;
        if (!isEmptyObject(tickets)) {
            let num = this._ticketNum(tickets.ticket_info);
            return !this.props.params.isBuy && num > 0;
        } else
            return false;

    };


    _buy = () => {

        if (isEmptyObject(global.login_user)) {
            router.toLoginFirstPage()
        } else {
            const {race_id, ticket_id} = this.props.params;

            const body = {
                race_id: race_id,
                ticket_id: ticket_id
            };

            getUnpaidOrder(body, data => {
                if (strNotNull(data.order_number))
                    router.toOrderInfoPage(this.props, data.order_number)
                else
                    router.toBuyTicketPage(this.props, race_id, ticket_id)

            }, err => {
                router.toBuyTicketPage(this.props, race_id, ticket_id)
            });
        }


    };

    _viewGoBuy = () => {

        if (this._showBuy())
            return (<TouchableOpacity
                onPress={this._buy}
                style={styles.btnBuy}>
                <Text style={styles.txtGoBuy}>{I18n.t('goBuy')}</Text>

            </TouchableOpacity>)
    };

    _content = () => {
        const {race, tickets, ordered} = this.state;
        const {description, title, price, banner} = tickets;
        const {name, logo} = race;
        return (<ScrollView
            style={this._showBuy() ? {marginBottom: 70} : {}}
            iosalwaysBounceVertical={false}
            scrollEventThrottle={16}
            onScroll={this._onScroll}
        >

            <Image
                resizeMode={'cover'}
                source={{uri: banner}}
                style={styles.imgLogo}>

            </Image>

            <View style={styles.margin}>
                <Text
                    numberOfLines={2}
                    style={styles.txtName}>{name} {title}</Text>

                <View style={styles.viewSell}>
                    <Text style={styles.lbPrice}>{I18n.t('price')}: </Text>
                    <Text style={styles.txtPrice}>¥{price}</Text>

                </View>


            </View>
            <View style={styles.viewLine}/>

            <View style={styles.margin108}>
                <MarkdownPlat
                    markdownStr={description}
                    noScroll={false}/>
            </View>


        </ScrollView>)
    };

    _topBar = () => {
        const {opacity} = this.state;
        return (<View style={[styles.topBar, {backgroundColor: 'rgba(0,0,0,' + opacity + ')'}]}>
            <StatusBar/>
            <TouchableOpacity
                testID="btn_bar_left"
                onPress={() => router.pop()}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.sign_return}
                    style={styles.topImgLeft}/>

            </TouchableOpacity>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{
                    color: 'rgba(228,213,127,' + opacity + ')',
                    fontSize: 17,
                    alignSelf: 'center'
                }}>{I18n.t('ticket_info')}</Text>
            </View>


            <TouchableOpacity
                testID="btn_bar_left"
                onPress={() => {
                    const {race, tickets} = this.state;
                    if (!isEmptyObject(race) && !isEmptyObject(tickets)) {
                        const {id, title, price, banner} = tickets;
                        uShareTicket(title, I18n.t('price') + ":" + price, banner, race.race_id, id)
                    }

                }}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image style={styles.imgShare}
                       source={Images.share}/>

            </TouchableOpacity>

        </View>)
    };


    _onScroll = (event) => {
        let offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= 200) {
            let opacity = offsetY / 200;
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }


    };
}

const styles = StyleSheet.create({
    topImgLeft: {height: 19, width: 11, marginLeft: 20, marginRight: 20},
    topBtn: {
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 3,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight
    },
    imgLogo: {
        height: 220,
        width: Metrics.screenWidth,
        backgroundColor: Colors._ECE
    },
    txtName: {
        color: '#444444',
        fontSize: 17,
        marginTop: 16,
        marginBottom: 12,
        fontWeight: 'bold'
    },
    margin: {
        paddingRight: 17,
        paddingLeft: 17,
        backgroundColor: 'white'
    },
    txtPrice: {
        color: '#DF1D0F',
        fontSize: 20,
    },
    viewSell: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    lbPrice: {
        fontSize: 12,
        color: Colors._161,

    },
    markdown: {
        backgroundColor: 'white',
        marginTop: 6
    },
    btnBuy: {
        height: 49,
        position: 'absolute',
        bottom: 22,
        backgroundColor: '#161718',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        alignSelf: 'center',
        width: '90%'
    },
    txtGoBuy: {
        color: '#D2C476',
        fontSize: 18
    },
    margin108: {
        backgroundColor: 'white',
    },
    bgPage: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewLine: {
        height: 6,
        backgroundColor: Colors._ECE
    },
    imgShare: {
        height: 22,
        width: 23,
        marginRight: 24.8
    }
});