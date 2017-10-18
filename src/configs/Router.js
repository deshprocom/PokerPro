/**
 * Created by lorne on 2016/12/20.
 */

import {Actions} from 'react-native-router-flux';
import {NavigationActions} from 'react-navigation';
import {getDispatchAction} from '../utils/ComonHelper';


const customFloatFromRight = '';


export default class Router {


    log(...msg) {
        if (__DEV__)
            console.log(...msg)
    }

    stackPush(route) {
        Actions.push(route.name, {params: route.params})
    }

    push(props, route) {
        this.stackPush(route)

    }


    pop() {
        Actions.pop();
        console.log(Actions.currentScene)

    }

    popToTop() {
        getDispatchAction()['BACK_TOP']()
        Actions.popTo('tab_home')

    }

    popToTopRefresh() {
        Actions.reset('Main');

    }

    toTabNews() {
        Actions.tab_2();
    }

    toSearchVideo() {
        this.stackPush({name: 'SearchVideo'})
    }

    toAddVerified(cert_type, refresh, verified) {
        this.stackPush({
            name: 'AddVerified',
            params: {
                cert_type: cert_type,
                verified_refresh: refresh,
                verified: verified
            }
        })
    }

    toVerifiedPage(backRefresh) {
        this.stackPush({
            name: 'VerifiedPage',
            params: {
                backRefresh: backRefresh
            }
        })
    }

    toActivityInfo(props, activity) {
        this.push(props, {
            name: 'ActivityInfo',
            sceneConfig: customFloatFromRight,
            params: {
                activity: activity
            }
        })
    }

    toActivityCenter(props, activities) {
        this.push(props, {

            name: 'ActivityCenter',
            sceneConfig: customFloatFromRight,
            params: {
                activities: activities
            }
        })
    }


    toMessageCenter(props) {
        this.push(props, {

            name: 'MessageCenter',
            sceneConfig: customFloatFromRight
        })
    }


    toInputPwd(props, wx) {
        this.push(props, {

            name: 'InputPwd',
            sceneConfig: customFloatFromRight,
            params: {
                wx: wx
            }
        })
    }

    toWxRegister(props, wxAuth) {
        this.push(props, {

            name: 'WxRegister',
            sceneConfig: customFloatFromRight,
            params: {
                access_token: wxAuth
            }
        })
    }

    toSuggest(props) {
        this.push(props, {

            name: 'Suggest',
            sceneConfig: customFloatFromRight,
        })
    }

    toProtocol(props, _protocol) {
        this.push(props, {

            name: 'Protocol',
            sceneConfig: customFloatFromRight,
            params: {
                _protocol: _protocol
            }

        })
    }


    replaceOrder(order_id, price) {

        Actions.replace('OrderInfoPage', {
            params: {
                order_id: order_id,
                price: price
            }
        })


    }


    toWebViewPay(props, pay, orderRefresh) {
        this.push(props, {

            name: 'WebViewPay',
            sceneConfig: customFloatFromRight,
            params: {
                pay: pay,
                orderRefresh: orderRefresh
            }
        })
    }


    toSearchPoker(props) {
        this.push(props, {

            name: 'SearchPoker',
            sceneConfig: customFloatFromRight,

        })
    }

    toPokerRacePage(props, race_id) {
        this.push(props, {

            name: 'PokerRacePage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id
            }

        })
    }

    toPokerRankPage(props, player_id) {
        this.push(props, {
            name: 'PokerRankPage',
            params: {
                player_id: player_id
            }

        })
    }

    toAdrListPage(props, selectAdr, adrData) {
        this.push(props, {
            name: 'AdrListPage',
            params: {
                selectAdr: selectAdr,
                adrData: adrData
            }

        })
    }

    toNewAddressPage(props, getList, address) {
        this.push(props, {
            name: 'NewAddressPage',
            params: {
                getList: getList,
                address: address
            }

        })
    }

    toWebViewPage(props, url) {
        this.push(props, {
            name: 'WebViewPage',
            params: {
                url: url
            }

        })
    }


    toTicketInfoPage(props, race_id, ticket_id, isBuy) {
        this.push(props, {
            name: 'TicketInfoPage',
            params: {
                race_id: race_id,
                ticket_id: ticket_id,
                isBuy: isBuy
            }

        })
    }

    toChoiseTicketPage(props, race_id) {
        this.push(props, {
            name: 'ChoiseTicketPage',
            params: {
                race_id: race_id
            }

        })
    }


    toTicketSearchPage(props) {
        this.push(props, {
            name: 'TicketSearchPage',
        })
    }

    toVideoPage(props) {
        this.push(props, {
            name: 'MainVideoPage',

        })
    }

    toDrawerRank(props) {
        this.push(props, {
            name: 'DrawerRank',

        })
    }

    toMessagePage(props) {
        this.push(props, {
            name: 'MessagePage',

        })
    }


    toChangePhonePage(props) {
        this.push(props, {
            name: 'ChangePhonePage',

        })
    }


    toBindingPhonePage(props) {
        this.push(props, {
            name: 'BindingPhonePage',

        })
    }


    toApiSettingPage(props) {
        this.push(props, {
            name: 'ApiSettingPage',

        })
    }

    toTicketPage(props) {
        this.push(props, {

            name: 'TicketPage',


        })
    }


    toSearchNewsPage(props) {
        this.push(props, {

            name: 'SearchNewsPage',


        })
    }

    toVideoInfo(video_id) {
        this.stackPush({
            name: 'VideoInfoPage',
            params: {
                video_id: video_id
            }

        })
    }

    toVideoInfoPage(props, info) {
        this.push(props, {

            name: 'VideoInfoPage',
            params: {
                info: info
            }

        })
    }

    toNewsInfo(news_id) {
        this.stackPush({
            name: 'NewsInfoPage',
            params: {
                news_id: news_id
            }
        })
    }

    toNewsInfoPage(props, newsInfo) {
        this.push(props, {

            name: 'NewsInfoPage',
            params: {
                newsInfo: newsInfo
            }

        })
    }


    toMainNewsPage(props) {
        this.push(props, {

            name: 'MainNewsPage',

        })
    }


    toAboutPage(props) {
        this.push(props, {

            name: 'AboutPage',

        })
    }


    toSearchKeywordPage(props) {
        this.push(props, {

            name: 'SearchKeywordPage',

        })
    }

    toChildRaceInfoPage(props, race_ids) {
        this.push(props, {

            name: 'ChildRaceInfoPage',
            params: {
                race_ids: race_ids
            }
        })
    }

    toBusinessPage(props) {
        this.push(props, {

            name: 'BusinessPage',
        })
    }


    toSearchRacesPage(props) {
        this.push(props, {
            name: 'SearchRacesPage',
        })
    }


    toModifyPwdPage(props) {
        this.push(props, {
            name: 'ModifyPwdPage',
        })
    }

    toSecurityPage(props) {
        this.push(props, {

            name: 'SecurityPage',

        })
    }


    toOrderListPage(props) {
        this.push(props, {

            name: 'OrderListPage',

        })
    }

    toCertificationPage(props) {
        this.push(props, {

            name: 'CertificationPage',

        })
    }

    toBuyKnownPage(props) {
        this.push(props, {

            name: 'BuyKnowPage'

        })
    }

    toOrderInfo(props, order_id, price, isPay) {
        this.push(props, {

            name: 'OrderInfoPage',
            params: {
                order_id: order_id,
                isPay: isPay,
                price: price
            }

        })
    }

    toOrderInfoPage(props, order_id, price, onRefresh) {
        this.push(props, {

            name: 'OrderInfoPage',
            params: {
                order_id: order_id,
                price: price,
                onRefresh: onRefresh
            }
        })
    }

    toBuyTicketPage(props, race_id, ticket_id) {
        this.push(props, {

            name: 'BuyTicketPage',
            params: {
                race_id: race_id,
                ticket_id: ticket_id
            }
        })
    }

    toForgetEmailPage(props) {
        this.push(props, {

            name: 'ForgetEmailPage'
        })
    }

    toImageGalleryPage(props, images, index) {
        this.push(props, {

            name: 'ImageGallery',
            params: {
                images: images,
                index: index
            }
        })
    }

    popToLoginFirstPage() {
        this.stackPush({
            name: 'LoginFirstPage',
        })

    }

    toEmailRegisterPage(props) {
        this.push(props, {
            name: 'EmailRegisterPage',
        })
    }

    toLoginFirstPage(props) {
        this.push(props, {

            name: 'LoginFirstPage',
        })
    }

    toLoginCodePage(props) {
        this.push(props, {
            name: 'LoginCodePage',
        })
    }

    toRacesInfoPage(props, race_id, fromBuy) {
        this.push(props, {

            name: 'RaceScene',
            params: {
                race_id: race_id,
                fromBuy: fromBuy
            }
        })
    }

    toFocusPlayer(props) {
        this.push(props, {
            name: 'FocusPlayer',
        })
    }

    toForgetPage(props) {
        this.push(props, {
            name: 'ForgetPage',
        })
    }

    toRegisterPage(props) {
        this.push(props, {

            name: 'RegisterPage',
        })
    }

    forgetPhoneToPwdPage(props, phone, code) {
        this.push(props, {

            name: 'InputPwdPage',
            params: {
                phone: phone,
                isEmailOrMobile: 'mobile',
                code: code,
                isRegisterOrForget: 'forget'

            }
        })
    }

    forgetEmailToPwdPage(props, email, code) {
        this.push(props, {
            name: 'InputPwdPage',
            params: {
                email: email,
                isEmailOrMobile: 'email',
                code: code,
                isRegisterOrForget: 'forget'

            }
        })
    }


    toInputPwdPage(props, phone, code) {
        this.push(props, {

            name: 'InputPwdPage',
            params: {
                phone: phone,
                code: code,
                isEmailOrMobile: 'mobile',
                isRegisterOrForget: 'register'
            }
        })
    }


    toPersonPage(props) {
        this.push(props, {
            name: 'PersonPage',
        })
    }


    toSettingPage(props) {
        this.push(props, {

            name: 'SettingPage',

        })
    }

    popToLogin() {
        Actions.popTo('LoginFirstPage')
    }

    popToDrawerRank(navigation) {
        console.log(Actions._state.routes);

        let route = Actions._state.routes[1];
        const backTo = NavigationActions.back({
            key: route.key
        });

        navigation.dispatch(backTo)

    }


}
