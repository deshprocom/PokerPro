/**
 * Created by lorne on 2016/12/20.
 */
import React, {Navigator} from 'react-native'

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
import FocusPlayer from '../pages/rank/FocusPlayer'


const customFloatFromRight = Navigator.SceneConfigs.FadeAndroid;

// import {Actions, Scene} from 'react-native-router-flux'
//
// const scenes = Actions.create(
//     <Scene key="root">
//         <Scene key="DrawerPage" component={DrawerPage} initial/>
//         <Scene key="InputPwdPage" component={InputPwdPage}/>
//         <Scene key="PersonPage" component={PersonPage}/>
//         <Scene key="SettingPage" component={SettingPage}/>
//         <Scene key="EventPage" component={EventPage}/>
//         <Scene key="RegisterPage" component={RegisterPage}/>
//
//         <Scene key="ForgetPage" component={ForgetPage}/>
//         <Scene key="RacesInfoPage" component={RacesInfoPage}/>
//         <Scene key="LoginFirstPage" component={LoginFirstPage}/>
//         <Scene key="LoginCodePage" component={LoginCodePage}/>
//         <Scene key="EmailRegisterPage" component={EmailRegisterPage}/>
//         <Scene key="ImageGallery" component={ImageGallery}/>
//
//         <Scene key="ForgetEmailPage" component={ForgetEmailPage}/>
//         <Scene key="BuyTicketPage" component={BuyTicketPage}/>
//         <Scene key="OrderInfoPage" component={OrderInfoPage}/>
//         <Scene key="BuyKnowPage" component={BuyKnowPage}/>
//         <Scene key="CertificationPage" component={CertificationPage}/>
//         <Scene key="OrderListPage" component={OrderListPage}/>
//
//         <Scene key="SecurityPage" component={SecurityPage}/>
//         <Scene key="ModifyPwdPage" component={ModifyPwdPage}/>
//         <Scene key="SearchRacesPage" component={SearchRacesPage}/>
//         <Scene key="BusinessPage" component={BusinessPage}/>
//         <Scene key="SearchKeywordPage" component={SearchKeywordPage}/>
//         <Scene key="AboutPage" component={AboutPage}/>
//
//         <Scene key="PokerPersonPage" component={PokerPersonPage}/>
//         <Scene key="MainNewsPage" component={MainNewsPage}/>
//         <Scene key="NewsInfoPage" component={NewsInfoPage}/>
//         <Scene key="SearchNewsPage" component={SearchNewsPage}/>
//         <Scene key="SearchKeywordPage" component={SearchKeywordPage}/>
//         <Scene key="TicketPage" component={TicketPage}/>
//
//         <Scene key="ApiSettingPage" component={ApiSettingPage}/>
//         <Scene key="BindingPhonePage" component={BindingPhonePage}/>
//         <Scene key="ChangePhonePage" component={ChangePhonePage}/>
//         <Scene key="MessagePage" component={MessagePage}/>
//         <Scene key="MainVideoPage" component={MainVideoPage}/>
//         <Scene key="VideoInfoPage" component={VideoInfoPage}/>
//
//     </Scene>
// );
export default class Router {
    constructor(navigator) {
        this.navigator = navigator
    }


    log(...msg) {
        if (__DEV__)
            console.log(...msg)
    }

    push(props, route) {
        route.props = props
        this.navigator.push(route)
    }


    pop() {
        this.navigator.pop()
    }

    popToTop() {
        this.navigator.popToTop();
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


    toTicketInfoPage(props, race_id, ticket_id) {
        this.push(props, {
            page: TicketInfoPage,
            name: 'TicketInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                race_id: race_id,
                ticket_id: ticket_id
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

    toOrderInfo(props, order_id) {
        this.push(props, {
            page: OrderInfoPage,
            name: 'OrderInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                order_id: order_id
            }

        })
    }

    toOrderInfoPage(props, order_id, onRefresh) {
        this.push(props, {
            page: OrderInfoPage,
            name: 'OrderInfoPage',
            sceneConfig: customFloatFromRight,
            params: {
                order_id: order_id,
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

    toFocusPlayer(props){
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

    resetToHome() {
        this.navigator.resetTo({
            name: 'HomePage',
            page: HomePage,
            sceneConfig: customFloatFromRight,
        })
    }


}
