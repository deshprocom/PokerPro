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
import TabIcon from '../pages/navigation/TabIcon';
import RaceInfoPage from '../pages/navigation/RaceInfoPage';
import {Navigation} from '../pages/navigation/Navigation';


export const Stacks = Actions.create(
    <Scene key="root">
        <Scene key="SearchVideo" component={SearchVideo} navBar={() => null}/>
        <Scene key="RaceScene" component={RaceScene} navBar={() => null}/>
        <Scene key="DrawerPage" component={DrawerPage} navBar={() => null}/>
        <Scene key="AddVerified" component={AddVerified} navBar={() => null}/>
        <Scene key="VerifiedPage" component={VerifiedPage} navBar={() => null}/>
        <Scene key="HomePage" component={HomePage} navBar={() => null}/>
        <Scene key="InputPwdPage" component={InputPwdPage} navBar={() => null}/>
        <Scene key="PersonPage" component={PersonPage} navBar={() => null}/>
        <Scene key="SettingPage" component={SettingPage} navBar={() => null}/>
        <Scene key="RegisterPage" component={RegisterPage} navBar={() => null}/>
        <Scene key="ForgetPage" component={ForgetPage} navBar={() => null}/>
        <Scene key="RacesInfoPage" component={RacesInfoPage} navBar={() => null}/>
        <Scene key="LoginFirstPage" component={LoginFirstPage} navBar={() => null}/>
        <Scene key="LoginCodePage" component={LoginCodePage} navBar={() => null}/>
        <Scene key="EmailRegisterPage" component={EmailRegisterPage} navBar={() => null}/>
        <Scene key="ImageGallery" component={ImageGallery} navBar={() => null}/>
        <Scene key="ForgetEmailPage" component={ForgetEmailPage} navBar={() => null}/>
        <Scene key="BuyTicketPage" component={BuyTicketPage} navBar={() => null}/>
        <Scene key="OrderInfoPage" component={OrderInfoPage} navBar={() => null}/>
        <Scene key="BuyKnowPage" component={BuyKnowPage} navBar={() => null}/>
        <Scene key="CertificationPage" component={CertificationPage} navBar={() => null}/>
        <Scene key="OrderListPage" component={OrderListPage} navBar={() => null}/>
        <Scene key="SecurityPage" component={SecurityPage} navBar={() => null}/>
        <Scene key="ModifyPwdPage" component={ModifyPwdPage} navBar={() => null}/>
        <Scene key="SearchRacesPage" component={SearchRacesPage} navBar={() => null}/>
        <Scene key="BusinessPage" component={BusinessPage} navBar={() => null}/>
        <Scene key="SearchKeywordPage" component={SearchKeywordPage} navBar={() => null}/>
        <Scene key="ChildRaceInfoPage" component={ChildRaceInfoPage} navBar={() => null}/>
        <Scene key="AboutPage" component={AboutPage} navBar={() => null}/>
        <Scene key="PokerPersonPage" component={PokerPersonPage} navBar={() => null}/>
        <Scene key="MainNewsPage" component={MainNewsPage} navBar={() => null}/>
        <Scene key="NewsInfoPage" component={NewsInfoPage} navBar={() => null}/>
        <Scene key="SearchNewsPage" component={SearchNewsPage} navBar={() => null}/>
        <Scene key="TicketPage" component={TicketPage} navBar={() => null}/>
        <Scene key="ApiSettingPage" component={ApiSettingPage} navBar={() => null}/>
        <Scene key="BindingPhonePage" component={BindingPhonePage} navBar={() => null}/>
        <Scene key="ChangePhonePage" component={ChangePhonePage} navBar={() => null}/>
        <Scene key="MessagePage" component={MessagePage} navBar={() => null}/>
        <Scene key="MainVideoPage" component={MainVideoPage} navBar={() => null}/>
        <Scene key="VideoInfoPage" component={VideoInfoPage} navBar={() => null}/>
        <Scene key="TicketSearchPage" component={TicketSearchPage} navBar={() => null}/>
        <Scene key="ChoiseTicketPage" component={ChoiseTicketPage} navBar={() => null}/>
        <Scene key="TicketInfoPage" component={TicketInfoPage} navBar={() => null}/>
        <Scene key="WebViewPage" component={WebViewPage} navBar={() => null}/>
        <Scene key="NewAddressPage" component={NewAddressPage} navBar={() => null}/>
        <Scene key="AdrListPage" component={AdrListPage} navBar={() => null}/>
        <Scene key="DrawerRank" component={DrawerRank} navBar={() => null}/>
        <Scene key="FocusPlayer" component={FocusPlayer} navBar={() => null}/>
        <Scene key="PokerRankPage" component={PokerRankPage} navBar={() => null}/>
        <Scene key="PokerRacePage" component={PokerRacePage} navBar={() => null}/>
        <Scene key="SearchPoker" component={SearchPoker} navBar={() => null}/>
        <Scene key="WebViewPay" component={WebViewPay} navBar={() => null}/>
        <Scene key="Protocol" component={Protocol} navBar={() => null}/>
        <Scene key="Suggest" component={Suggest} navBar={() => null}/>
        <Scene key="WxRegister" component={WxRegister} navBar={() => null}/>
        <Scene key="InputPwd" component={InputPwd} navBar={() => null}/>
        <Scene key="MessageCenter" component={MessageCenter} navBar={() => null}/>
        <Scene key="ActivityCenter" component={ActivityCenter} navBar={() => null}/>
        <Scene key="ActivityInfo" component={ActivityInfo} navBar={() => null}/>

        <Scene type={ActionConst.RESET}
               initial={true} navBar={() => {
            return <View>
                <StatusBar barStyle={"light-content"}/>
            </View>
        }} key="Main">
            {Navigation()}
        </Scene>


    </Scene>
);