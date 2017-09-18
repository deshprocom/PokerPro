/**
 * Created by lorne on 2016/12/20.
 */

import {NavigationActions} from 'react-navigation'

//Pages
import HomePage from '../pages/HomePage';
import InputPwdPage from '../pages/InputPwdPage';
import DrawerPage from '../pages/DrawerPage';
import PersonPage from '../pages/person/PersonPage';
import SettingPage from '../pages/setting/SettingPage';
import EventPage from '../pages/races/EventPage';
import RegisterPage from '../pages/account/RegisterPage';
import ForgetPage from '../pages/account/ForgetPage';
import RacesInfoPage from '../pages/races/RacesInfoPage';
import LoginFirstPage from '../pages/login/LoginFirstPage';
import LoginCodePage from '../pages/login/LoginCodePage';
import EmailRegisterPage from '../pages/account/EmailRegisterPage';
import ImageGallery from '../components/ImageGallery';
import ForgetEmailPage from '../pages/account/ForgetEmailPage';
import BuyTicketPage from '../pages/buy/BuyTicketPage';
import OrderInfoPage from '../pages/orders/OrderInfoPage';
import BuyKnowPage from '../pages/buy/BuyKnownPage';
import CertificationPage from '../pages/buy/CertificationPage';
import OrderListPage from '../pages/orders/OrderListPage';
import SecurityPage from '../pages/setting/SecurityPage';
import ModifyPwdPage from '../pages/setting/ModifyPwdPage';
import SearchRacesPage from '../pages/races/SearchRacesPage';
import BusinessPage from '../pages/setting/BusinessPage';
import SearchKeywordPage from '../pages/races/SearchKeywordPage';
import ChildRaceInfoPage from '../pages/races/ChildRaceInfoPage';
import AboutPage from '../pages/setting/AboutPage';
import PokerPersonPage from '../pages/person/PokerPersonPage';
import MainNewsPage from '../pages/news/MainNewsPage';
import NewsInfoPage from '../pages/news/NewsInfoPage';
import SearchNewsPage from '../pages/news/SearchNewsPage';
import TicketPage from '../pages/ticket/TicketPage';
import ApiSettingPage from '../pages/setting/ApiSettingPage';
import BindingPhonePage from '../pages/setting/BindingPhonePage';
import ChangePhonePage from '../pages/setting/ChangePhonePage';
import MessagePage from '../pages/message/MessagePage';
import MainVideoPage from '../pages/videos/MainVideoPage';
import VideoInfoPage from '../pages/videos/VideoInfoPage';
import TicketSearchPage from '../pages/ticket/TicketSearchPage';
import ChoiseTicketPage from '../pages/ticket/ChoiseTicketPage';
import TicketInfoPage from '../pages/ticket/TicketInfoPage';
import WebViewPage from '../components/WebViewPage';
import NewAddressPage from '../pages/buy/NewAddressPage';
import AdrListPage from '../pages/buy/AdrListPage';
import DrawerRank from '../pages/rank/DrawerRank';
import FocusPlayer from '../pages/rank/FocusPlayer';
import PokerRankPage from '../pages/rank/info/PokerRankPage';
import PokerRacePage from '../pages/rank/info/PokerRacePage';
import SearchPoker from '../pages/rank/SearchPoker';
import WebViewPay from '../components/WebViewPay';
import Protocol from '../pages/setting/ProtocolPage';
import Suggest from '../pages/setting/Suggest';
import WxRegister from '../pages/account/WxRegister';
import InputPwd from '../pages/account/InputPwd';
import MessageCenter from '../pages/message/MessageCenter';
import ActivityCenter from '../pages/message/ActivityCenter';
import ActivityInfo from '../pages/message/ActivityInfo';


const customFloatFromRight ='';


export default class Router {
    constructor(navigator) {
        this.navigator = navigator;
        console.log('Navigation', navigator)
    }


    log(...msg) {
        if (__DEV__)
            console.log(...msg)
    }

    push(props, route) {

        const navigateAction = NavigationActions.navigate({
            routeName: route.name,
            params: route.params
        });

        this.navigator.dispatch(navigateAction)
    }


    pop() {
        const backAction = NavigationActions.back({
            key: ''
        });
        this.navigator.dispatch(backAction)

    }

    popToTop() {

        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({routeName: 'DrawerPage'})]
        });
        this.navigator.dispatch(resetAction)

    }

    toActivityInfo(props, activity) {
        this.push(props, {
            page: ActivityInfo,
            name: 'ActivityInfo',
            sceneConfig: customFloatFromRight,
            params: {
                activity: activity
            }
        })
    }

    toActivityCenter(props, activities) {
        this.push(props, {
            page: ActivityCenter,
            name: 'ActivityCenter',
            sceneConfig: customFloatFromRight,
            params: {
                activities: activities
            }
        })
    }


    toMessageCenter(props) {
        this.push(props, {
            page: MessageCenter,
            name: 'MessageCenter',
            sceneConfig: customFloatFromRight
        })
    }


    toInputPwd(props, wx) {
        this.push(props, {
            page: InputPwd,
            name: 'InputPwd',
            sceneConfig: customFloatFromRight,
            params: {
                wx: wx
            }
        })
    }

    toWxRegister(props, wxAuth) {
        this.push(props, {
            page: WxRegister,
            name: 'WxRegister',
            sceneConfig: customFloatFromRight,
            params: {
                access_token: wxAuth
            }
        })
    }

    toSuggest(props) {
        this.push(props, {
            page: Suggest,
            name: 'Suggest',
            sceneConfig: customFloatFromRight,
        })
    }

    toProtocol(props, _protocol) {
        this.push(props, {
            page: Protocol,
            name: 'Protocol',
            sceneConfig: customFloatFromRight,
            params: {
                _protocol: _protocol
            }

        })
    }


    replaceOrder(order_id, price) {
        this.navigator.replace({
            page: OrderInfoPage,
            name: 'OrderInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                order_id: order_id,
                price: price
            }
        })
    }


    toWebViewPay(props, pay, orderRefresh) {
        this.push(props, {
            page: WebViewPay,
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
            page: SearchPoker,
            name: 'SearchPoker',
            sceneConfig: customFloatFromRight,

        })
    }

    toPokerRacePage(props, race_id) {
        this.push(props, {
            page: PokerRacePage,
            name: 'PokerRacePage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id
            }

        })
    }

    toPokerRankPage(props, player_id) {
        this.push(props, {
            page: PokerRankPage,
            name: 'PokerRankPage',
            sceneConfig: customFloatFromRight,
            params: {
                player_id: player_id
            }

        })
    }

    toAdrListPage(props, selectAdr, adrData) {
        this.push(props, {
            page: AdrListPage,
            name: 'AdrListPage',
            sceneConfig: customFloatFromRight,
            params: {
                selectAdr: selectAdr,
                adrData: adrData
            }

        })
    }

    toNewAddressPage(props, getList, address) {
        this.push(props, {
            page: NewAddressPage,
            name: 'NewAddressPage',
            sceneConfig: customFloatFromRight,
            params: {
                getList: getList,
                address: address
            }

        })
    }

    toWebViewPage(props, url) {
        this.push(props, {
            page: WebViewPage,
            name: 'WebViewPage',
            sceneConfig: customFloatFromRight,
            params: {
                url: url
            }

        })
    }


    toTicketInfoPage(props, race_id, ticket_id, isBuy) {
        this.push(props, {
            page: TicketInfoPage,
            name: 'TicketInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id,
                ticket_id: ticket_id,
                isBuy: isBuy
            }

        })
    }

    toChoiseTicketPage(props, race_id) {
        this.push(props, {
            page: ChoiseTicketPage,
            name: 'ChoiseTicketPage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id
            }

        })
    }


    toTicketSearchPage(props) {
        this.push(props, {
            page: TicketSearchPage,
            name: 'TicketSearchPage',
            sceneConfig: customFloatFromRight,

        })
    }

    toVideoPage(props) {
        this.push(props, {
            page: MainVideoPage,
            name: 'MainVideoPage',
            sceneConfig: customFloatFromRight,

        })
    }

    toDrawerRank(props) {
        this.push(props, {
            page: DrawerRank,
            name: 'DrawerRank',
            sceneConfig: customFloatFromRight
        })
    }

    toMessagePage(props) {
        this.push(props, {
            page: MessagePage,
            name: 'MessagePage',
            sceneConfig: customFloatFromRight,

        })
    }


    toChangePhonePage(props) {
        this.push(props, {
            page: ChangePhonePage,
            name: 'ChangePhonePage',
            sceneConfig: customFloatFromRight,

        })
    }


    toBindingPhonePage(props) {
        this.push(props, {
            page: BindingPhonePage,
            name: 'BindingPhonePage',
            sceneConfig: customFloatFromRight,

        })
    }


    toApiSettingPage(props) {
        this.push(props, {
            page: ApiSettingPage,
            name: 'ApiSettingPage',
            sceneConfig: customFloatFromRight,

        })
    }

    toTicketPage(props) {
        this.push(props, {
            page: TicketPage,
            name: 'TicketPage',
            sceneConfig: customFloatFromRight,

        })
    }


    toSearchNewsPage(props) {
        this.push(props, {
            page: SearchNewsPage,
            name: 'SearchNewsPage',
            sceneConfig: customFloatFromRight,

        })
    }

    toVideoInfoPage(props, info) {
        this.push(props, {
            page: VideoInfoPage,
            name: 'VideoInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                info: info
            }

        })
    }

    toNewsInfoPage(props, newsInfo) {
        this.push(props, {
            page: NewsInfoPage,
            name: 'NewsInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                newsInfo: newsInfo
            }

        })
    }


    toMainNewsPage(props) {
        this.push(props, {
            page: MainNewsPage,
            name: 'MainNewsPage',
            sceneConfig: customFloatFromRight,

        })
    }


    toPokerPersonPage(props, player) {
        this.push(props, {
            page: PokerPersonPage,
            name: 'PokerPersonPage',
            sceneConfig: customFloatFromRight,
            params: {
                player: player
            }
        })
    }


    toAboutPage(props) {
        this.push(props, {
            page: AboutPage,
            name: 'AboutPage',
            sceneConfig: customFloatFromRight,

        })
    }


    toSearchKeywordPage(props) {
        this.push(props, {
            page: SearchKeywordPage,
            name: 'SearchKeywordPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toChildRaceInfoPage(props, race_ids) {
        this.push(props, {
            page: ChildRaceInfoPage,
            name: 'ChildRaceInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                race_ids: race_ids
            }
        })
    }

    toBusinessPage(props) {
        this.push(props, {
            page: BusinessPage,
            name: 'BusinessPage',
            sceneConfig: customFloatFromRight,
        })
    }


    toSearchRacesPage(props) {
        this.push(props, {
            page: SearchRacesPage,
            name: 'SearchRacesPage',
            sceneConfig: customFloatFromRight,
        })
    }


    toModifyPwdPage(props) {
        this.push(props, {
            page: ModifyPwdPage,
            name: 'ModifyPwdPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toSecurityPage(props) {
        this.push(props, {
            page: SecurityPage,
            name: 'SecurityPage',
            sceneConfig: customFloatFromRight,
        })
    }


    toOrderListPage(props) {
        this.push(props, {
            page: OrderListPage,
            name: 'OrderListPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toCertificationPage(props) {
        this.push(props, {
            page: CertificationPage,
            name: 'CertificationPage',
            sceneConfig: customFloatFromRight
        })
    }

    toBuyKnownPage(props) {
        this.push(props, {
            page: BuyKnowPage,
            name: 'BuyKnowPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toOrderInfo(props, order_id, price, isPay) {
        this.push(props, {
            page: OrderInfoPage,
            name: 'OrderInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                order_id: order_id,
                isPay: isPay,
                price: price
            }

        })
    }

    toOrderInfoPage(props, order_id, price, onRefresh) {
        this.push(props, {
            page: OrderInfoPage,
            name: 'OrderInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                order_id: order_id,
                price: price,
                onRefresh: onRefresh
            }
        })
    }

    toBuyTicketPage(props, race_id, ticket_id) {
        this.push(props, {
            page: BuyTicketPage,
            name: 'BuyTicketPage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id,
                ticket_id: ticket_id
            }
        })
    }

    toForgetEmailPage(props) {
        this.push(props, {
            page: ForgetEmailPage,
            name: 'ForgetEmailPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toImageGalleryPage(props, images, index) {
        this.push(props, {
            page: ImageGallery,
            name: 'ImageGallery',
            sceneConfig: customFloatFromRight,
            params: {
                images: images,
                index: index
            }
        })
    }

    popToLoginFirstPage() {
        let routes = this.navigator.getCurrentRoutes();
        var isContainLogin = false;
        for (var route of routes) {
            if (route.name === 'LoginFirstPage') {
                isContainLogin = true;
            }
        }
        if (!isContainLogin) {
            this.toLoginFirstPage()
        }

    }

    toEmailRegisterPage(props) {
        this.push(props, {
            page: EmailRegisterPage,
            name: 'EmailRegisterPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toLoginFirstPage(props) {
        this.push(props, {
            page: LoginFirstPage,
            name: 'LoginFirstPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toLoginCodePage(props) {
        this.push(props, {
            page: LoginCodePage,
            name: 'LoginCodePage',
            sceneConfig: customFloatFromRight,
        })
    }

    toRacesInfoPage(props, race_id, fromBuy) {
        this.push(props, {
            page: RacesInfoPage,
            name: 'RacesInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id,
                fromBuy: fromBuy
            }
        })
    }

    toFocusPlayer(props) {
        this.push(props, {
            page: FocusPlayer,
            name: 'FocusPlayer',
            sceneConfig: customFloatFromRight
        })
    }

    toForgetPage(props) {
        this.push(props, {
            page: ForgetPage,
            name: 'ForgetPage',
            sceneConfig: customFloatFromRight,
        })
    }

    toRegisterPage(props) {
        this.push(props, {
            page: RegisterPage,
            name: 'RegisterPage',
            sceneConfig: customFloatFromRight,
        })
    }

    forgetPhoneToPwdPage(props, phone, code) {
        this.push(props, {
            page: InputPwdPage,
            name: 'InputPwdPage',
            sceneConfig: customFloatFromRight,
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
            page: InputPwdPage,
            name: 'InputPwdPage',
            sceneConfig: customFloatFromRight,
            params: {
                email: email,
                isEmailOrMobile: 'email',
                code: code,
                isRegisterOrForget: 'forget'

            }
        })
    }

    toInputEmailPwdPage(props, email) {
        this.push(props, {
            page: InputPwdPage,
            name: 'InputPwdPage',
            sceneConfig: customFloatFromRight,
            params: {
                email: email,
                isEmailOrMobile: 'email',
                isRegisterOrForget: 'register'
            }
        })
    }

    toInputPwdPage(props, phone, code) {
        this.push(props, {
            page: InputPwdPage,
            name: 'InputPwdPage',
            sceneConfig: customFloatFromRight,
            params: {
                phone: phone,
                code: code,
                isEmailOrMobile: 'mobile',
                isRegisterOrForget: 'register'
            }
        })
    }


    toDrawerPage() {
        this.navigator.replace({
            page: DrawerPage,
            name: 'DrawerPage',
            sceneConfig: customFloatFromRight
        })
    }

    toEventPage(props) {
        this.push(props, {
            page: EventPage,
            name: 'EventPage',
            sceneConfig: customFloatFromRight
        })
    }


    toPersonPage(props) {
        this.push(props, {
            page: PersonPage,
            name: 'PersonPage',
            sceneConfig: customFloatFromRight
        })
    }


    toSettingPage(props) {
        this.push(props, {
            page: SettingPage,
            name: 'SettingPage',
            sceneConfig: customFloatFromRight,
        })
    }

    popToLogin() {
        let routes = this.navigator.getCurrentRoutes();
        for (var route of routes) {
            if (route.name === 'LoginFirstPage') {
                this.navigator.popToRoute(route)
            }
        }

    }

    popToDrawerRank() {
        let routes = this.navigator.getCurrentRoutes();
        for (var route of routes) {
            if (route.name === 'DrawerRank' || route.name === 'RacesInfoPage') {
                this.navigator.popToRoute(route)
            }
        }

    }

    resetToHome() {
        this.navigator.resetTo({
            name: 'HomePage',
            page: HomePage,
            sceneConfig: customFloatFromRight,
        })
    }


}
