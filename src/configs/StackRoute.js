import { StackNavigator} from 'react-navigation'

//Pages
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


const MyApp = {
    AddVerified: {
        screen: AddVerified,
        navigationOptions: {
            header: null
        }
    },
    VerifiedPage: {
        screen: VerifiedPage,
        navigationOptions: {
            header: null
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    InputPwdPage: {
        screen: InputPwdPage,
        navigationOptions: {
            header: null
        }
    },
    DrawerPage: {
        screen: DrawerPage,
        navigationOptions: {
            header: null
        }
    },
    PersonPage: {
        screen: PersonPage,
        navigationOptions: {
            header: null
        }
    },
    SettingPage: {
        screen: SettingPage,
        navigationOptions: {
            header: null
        }
    },
    RegisterPage: {
        screen: RegisterPage,
        navigationOptions: {
            header: null
        }
    },
    ForgetPage: {
        screen: ForgetPage,
        navigationOptions: {
            header: null
        }
    },
    RacesInfoPage: {
        screen: RacesInfoPage,
        navigationOptions: {
            header: null
        }
    },
    LoginFirstPage: {
        screen: LoginFirstPage,
        navigationOptions: {
            header: null
        }
    },
    LoginCodePage: {
        screen: LoginCodePage,
        navigationOptions: {
            header: null
        }
    },
    EmailRegisterPage: {
        screen: EmailRegisterPage,
        navigationOptions: {
            header: null
        }
    },
    ImageGallery: {
        screen: ImageGallery,
        navigationOptions: {
            header: null
        }
    },
    ForgetEmailPage: {
        screen: ForgetEmailPage,
        navigationOptions: {
            header: null
        }
    },
    BuyTicketPage: {
        screen: BuyTicketPage,
        navigationOptions: {
            header: null
        }
    },
    OrderInfoPage: {
        screen: OrderInfoPage,
        navigationOptions: {
            header: null
        }
    },
    BuyKnowPage: {
        screen: BuyKnowPage,
        navigationOptions: {
            header: null
        }
    },
    CertificationPage: {
        screen: CertificationPage,
        navigationOptions: {
            header: null
        }
    },
    OrderListPage: {
        screen: OrderListPage,
        navigationOptions: {
            header: null
        }
    },
    SecurityPage: {
        screen: SecurityPage,
        navigationOptions: {
            header: null
        }
    },
    ModifyPwdPage: {
        screen: ModifyPwdPage,
        navigationOptions: {
            header: null
        }
    },
    SearchRacesPage: {
        screen: SearchRacesPage,
        navigationOptions: {
            header: null
        }
    },
    BusinessPage: {
        screen: BusinessPage,
        navigationOptions: {
            header: null
        }
    },
    SearchKeywordPage: {
        screen: SearchKeywordPage,
        navigationOptions: {
            header: null
        }
    },
    ChildRaceInfoPage: {
        screen: ChildRaceInfoPage,
        navigationOptions: {
            header: null
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null
        }
    },
    PokerPersonPage: {
        screen: PokerPersonPage,
        navigationOptions: {
            header: null
        }
    },
    MainNewsPage: {
        screen: MainNewsPage,
        navigationOptions: {
            header: null
        }
    },
    NewsInfoPage: {
        screen: NewsInfoPage,
        navigationOptions: {
            header: null
        }
    },
    SearchNewsPage: {
        screen: SearchNewsPage,
        navigationOptions: {
            header: null
        }
    },
    TicketPage: {
        screen: TicketPage,
        navigationOptions: {
            header: null
        }
    },
    ApiSettingPage: {
        screen: ApiSettingPage,
        navigationOptions: {
            header: null
        }
    },
    BindingPhonePage: {
        screen: BindingPhonePage,
        navigationOptions: {
            header: null
        }
    },
    ChangePhonePage: {
        screen: ChangePhonePage,
        navigationOptions: {
            header: null
        }
    },
    MessagePage: {
        screen: MessagePage,
        navigationOptions: {
            header: null
        }
    },
    MainVideoPage: {
        screen: MainVideoPage,
        navigationOptions: {
            header: null
        }
    },
    VideoInfoPage: {
        screen: VideoInfoPage,
        navigationOptions: {
            header: null
        }
    },
    TicketSearchPage: {
        screen: TicketSearchPage,
        navigationOptions: {
            header: null
        }
    },
    ChoiseTicketPage: {
        screen: ChoiseTicketPage,
        navigationOptions: {
            header: null
        }
    },
    TicketInfoPage: {
        screen: TicketInfoPage,
        navigationOptions: {
            header: null
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null
        }
    },
    NewAddressPage: {
        screen: NewAddressPage,
        navigationOptions: {
            header: null
        }
    },
    AdrListPage: {
        screen: AdrListPage,
        navigationOptions: {
            header: null
        }
    },
    DrawerRank: {
        screen: DrawerRank,
        navigationOptions: {
            header: null
        }
    },
    FocusPlayer: {
        screen: FocusPlayer,
        navigationOptions: {
            header: null
        }
    },
    PokerRankPage: {
        screen: PokerRankPage,
        navigationOptions: {
            header: null
        }
    },
    PokerRacePage: {
        screen: PokerRacePage,
        navigationOptions: {
            header: null
        }
    },
    SearchPoker: {
        screen: SearchPoker,
        navigationOptions: {
            header: null
        }
    },
    WebViewPay: {
        screen: WebViewPay,
        navigationOptions: {
            header: null
        }
    },
    Protocol: {
        screen: Protocol,
        navigationOptions: {
            header: null
        }
    },
    Suggest: {
        screen: Suggest,
        navigationOptions: {
            header: null
        }
    },
    WxRegister: {
        screen: WxRegister,
        navigationOptions: {
            header: null
        }
    },
    InputPwd: {
        screen: InputPwd,
        navigationOptions: {
            header: null
        }
    },
    MessageCenter: {
        screen: MessageCenter,
        navigationOptions: {
            header: null
        }
    },
    ActivityCenter: {
        screen: ActivityCenter,
        navigationOptions: {
            header: null
        }
    },
    ActivityInfo: {
        screen: ActivityInfo,
        navigationOptions: {
            header: null
        }
    },


};
export const Stacks = StackNavigator(MyApp, {
    initialRouteName: 'DrawerPage'
});