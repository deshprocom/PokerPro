/**
 * Created by lorne on 2017/6/9.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, StatusBar, InteractionManager,
    Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView, NavigationBar, ImageLoad, MarkdownPlat} from '../../components';
import {getBuyRaceTicket} from '../../services/OrderDao';

export default class TicketInfoPage extends Component {

    state = {
        opacity: 0,
        ordered: false,
        race: {},
        tickets: {}
    };


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {race_id, ticket_id} = this.props.params;
            router.log('ticket', race_id, ticket_id);
            const body = {
                race_id: race_id,
                ticket_id: ticket_id
            };
            getBuyRaceTicket(body, data => {
                const {tickets, ordered, race} =data;
                this.setState({
                    tickets: tickets,
                    ordered: ordered,
                    race: race
                })
            }, err => {
            });
        })

    }


    render() {
        return ( <View
            testID="page_ticket"
            style={ApplicationStyles.bgContainer}>

            {this._topBar()}

            {this._content()}


        </View>)

    }

    _viewGoBuy = () => {
        return ( <TouchableOpacity
            onPress={()=>{
                 const {race_id, ticket_id} = this.props.params;
                 router.toBuyTicketPage(this.props, race_id, ticket_id)
            }}
            style={styles.btnBuy}>
            <Text style={styles.txtGoBuy}>{I18n.t('goBuy')}</Text>

        </TouchableOpacity>)
    };

    _content = () => {
        const {race, tickets, ordered} = this.state;
        const {description, title, price} = tickets;
        const {name, logo} = race;
        return (  <ScrollView
            iosalwaysBounceVertical={false}
            scrollEventThrottle={16}
            onScroll={this._onScroll}
        >

            <Image
                resizeMode={'cover'}
                defaultSource={Images.empty_image}
                source={{uri:logo}}
                style={styles.imgLogo}>

            </Image>

            <View style={styles.margin}>
                <Text
                    numberOfLines={2}
                    style={styles.txtName}>{name} {title}</Text>

                <View style={styles.viewSell}>
                    <Text style={styles.txtPrice}>{price}</Text>
                    <Text style={styles.lbPrice}>{I18n.t('part')}</Text>
                </View>


            </View>

            <View style={styles.margin108}>
                <MarkdownPlat
                    markdownStr={description}
                    noScroll={false}/>
            </View>

            { this._viewGoBuy() }
        </ScrollView>)
    };

    _topBar = () => {
        const {opacity} = this.state;
        return ( <View style={[styles.topBar,{ backgroundColor: 'rgba(255,255,255,'+opacity+')'}]}>
            <StatusBar barStyle="dark-content"/>
            <TouchableOpacity
                testID="btn_bar_left"
                onPress={()=>router.pop()}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.ic_back}
                    style={styles.topImgLeft}/>

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
    },
    txtName: {
        color: '#444444',
        fontSize: 16,
        marginTop: 12,
        marginBottom: 16
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
        alignItems: 'center',
        marginBottom: 18,
    },
    lbPrice: {
        fontSize: 14,
        color: '#F24A4A',

    },
    markdown: {
        backgroundColor: 'white',
        marginTop: 6
    },
    btnBuy: {
        height: 49,
        width: 344,
        position: 'absolute',
        bottom: 22,
        right: 17,
        left: 17,
        backgroundColor: '#161718',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    txtGoBuy: {
        color: '#D2C476',
        fontSize: 18
    },
    margin108: {
        marginBottom: 108,
        backgroundColor: 'white',
        marginTop: 6
    }
});