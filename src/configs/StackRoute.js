import {Actions, Scene, ActionConst, Tabs} from 'react-native-router-flux';
import React from 'react';
import {
    View, StatusBar
} from 'react-native';
//Pages
import SearchVideo from '../pages/videos/SearchVideo';
import HomePage from '../pages/HomePage';
import InputPwdPage from '../pages/InputPwdPage';
import DrawerPage from '../pages/DrawerPage';
import PersonPage from '../pages/person/PersonPage';
import SettingPage from '../pages/setting/SettingPage';
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
import VerifiedPage from '../pages/verifieds/VerifiedPage';
import AddVerified from '../pages/verifieds/AddVerified';
import RaceScene from '../pages/races/RaceScene';
import MallInfoPage from '../pages/mallInfo/MallInfoPage';
import TabIcon from '../pages/navigation/TabIcon';
import RaceInfoPage from '../pages/navigation/RaceInfoPage';
import {Navigation} from '../pages/navigation/Navigation';


export const Stacks = Actions.create(
    <Scene key="root">
        <Scene key="SearchVideo" component={SearchVideo} hideNavBar/>
        <Scene key="RaceScene" component={RaceScene} hideNavBar/>
        <Scene key="DrawerPage" component={DrawerPage} hideNavBar/>
        <Scene key="AddVerified" component={AddVerified} hideNavBar/>
        <Scene key="VerifiedPage" component={VerifiedPage} hideNavBar/>
        <Scene key="HomePage" component={HomePage} hideNavBar/>
        <Scene key="InputPwdPage" component={InputPwdPage} hideNavBar/>
        <Scene key="PersonPage" component={PersonPage} hideNavBar/>
        <Scene key="SettingPage" component={SettingPage} hideNavBar/>
        <Scene key="RegisterPage" component={RegisterPage} hideNavBar/>
        <Scene key="ForgetPage" component={ForgetPage} hideNavBar/>
        <Scene key="RacesInfoPage" component={RacesInfoPage} hideNavBar/>
        <Scene key="LoginFirstPage" component={LoginFirstPage} hideNavBar/>
        <Scene key="LoginCodePage" component={LoginCodePage} hideNavBar/>
        <Scene key="EmailRegisterPage" component={EmailRegisterPage} hideNavBar/>
        <Scene key="ImageGallery" component={ImageGallery} hideNavBar/>
        <Scene key="ForgetEmailPage" component={ForgetEmailPage} hideNavBar/>
        <Scene key="BuyTicketPage" component={BuyTicketPage} hideNavBar/>
        <Scene key="OrderInfoPage" component={OrderInfoPage} hideNavBar/>
        <Scene key="BuyKnowPage" component={BuyKnowPage} hideNavBar/>
        <Scene key="CertificationPage" component={CertificationPage} hideNavBar/>
        <Scene key="OrderListPage" component={OrderListPage} hideNavBar/>
        <Scene key="SecurityPage" component={SecurityPage} hideNavBar/>
        <Scene key="ModifyPwdPage" component={ModifyPwdPage} hideNavBar/>
        <Scene key="SearchRacesPage" component={SearchRacesPage} hideNavBar/>
        <Scene key="BusinessPage" component={BusinessPage} hideNavBar/>
        <Scene key="SearchKeywordPage" component={SearchKeywordPage} hideNavBar/>
        <Scene key="ChildRaceInfoPage" component={ChildRaceInfoPage} hideNavBar/>
        <Scene key="AboutPage" component={AboutPage} hideNavBar/>
        <Scene key="PokerPersonPage" component={PokerPersonPage} hideNavBar/>
        <Scene key="MainNewsPage" component={MainNewsPage} hideNavBar/>
        <Scene key="NewsInfoPage" component={NewsInfoPage} hideNavBar/>
        <Scene key="SearchNewsPage" component={SearchNewsPage} hideNavBar/>
        <Scene key="TicketPage" component={TicketPage} hideNavBar/>
        <Scene key="ApiSettingPage" component={ApiSettingPage} hideNavBar/>
        <Scene key="BindingPhonePage" component={BindingPhonePage} hideNavBar/>
        <Scene key="ChangePhonePage" component={ChangePhonePage} hideNavBar/>
        <Scene key="MessagePage" component={MessagePage} hideNavBar/>
        <Scene key="MainVideoPage" component={MainVideoPage} hideNavBar/>
        <Scene key="VideoInfoPage" component={VideoInfoPage} hideNavBar/>
        <Scene key="TicketSearchPage" component={TicketSearchPage} hideNavBar/>
        <Scene key="ChoiseTicketPage" component={ChoiseTicketPage} hideNavBar/>
        <Scene key="TicketInfoPage" component={TicketInfoPage} hideNavBar/>
        <Scene key="WebViewPage" component={WebViewPage} hideNavBar/>
        <Scene key="NewAddressPage" component={NewAddressPage} hideNavBar/>
        <Scene key="AdrListPage" component={AdrListPage} hideNavBar/>
        <Scene key="DrawerRank" component={DrawerRank} hideNavBar/>
        <Scene key="FocusPlayer" component={FocusPlayer} hideNavBar/>
        <Scene key="PokerRankPage" component={PokerRankPage} hideNavBar/>
        <Scene key="PokerRacePage" component={PokerRacePage} hideNavBar/>
        <Scene key="SearchPoker" component={SearchPoker} hideNavBar/>
        <Scene key="WebViewPay" component={WebViewPay} hideNavBar/>
        <Scene key="Protocol" component={Protocol} hideNavBar/>
        <Scene key="Suggest" component={Suggest} hideNavBar/>
        <Scene key="WxRegister" component={WxRegister} hideNavBar/>
        <Scene key="InputPwd" component={InputPwd} hideNavBar/>
        <Scene key="MessageCenter" component={MessageCenter} hideNavBar/>
        <Scene key="ActivityCenter" component={ActivityCenter} hideNavBar/>
        <Scene key="ActivityInfo" component={ActivityInfo} hideNavBar/>
        <Scene key="MallInfoPage" component={MallInfoPage} hideNavBar/>

        <Scene type={ActionConst.RESET}
               initial={true}
               hideNavBar
               key="Main">
            {Navigation()}
        </Scene>


    </Scene>
);