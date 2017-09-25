/**
 * Created by lorne on 2016/12/20.
 */

import {Actions} from 'react-native-router-flux';


export default class Router {
    constructor(navigator) {
        this.navigator = navigator;

    }


    log(...msg) {
        if (__DEV__)
            console.log(...msg)
    }

    stackPush(route) {

        const navigateAction = NavigationActions.navigate({
            routeName: route.name,
            params: route.params
        });

        this.navigator.dispatch(navigateAction)
    }

    push(props, route) {

        const navigateAction = NavigationActions.navigate({
            routeName: route.name,
            params: route.params
        });

        this.navigator.dispatch(navigateAction)
    }


    pop() {
        Actions.pop()
    }

    popToTop() {
        Actions.DrawerPage();

    }

    toAddVerified(cert_type, refresh, verified) {
        const params = {
            params: {
                cert_type: cert_type,
                verified_refresh: refresh,
                verified: verified
            }
        };
        Actions.AddVerified(params);

    }

    toVerifiedPage(backRefresh) {
        Actions.VerifiedPage({
            params: {
                backRefresh: backRefresh
            }
        });

    }

    toActivityInfo(props, activity) {
        Actions.ActivityInfo({
            params: {
                activity: activity
            }
        });
    }

    toActivityCenter(props, activities) {
        Actions.ActivityCenter({
            params: {
                activities: activities
            }
        });

    }


    toMessageCenter(props) {
        Actions.MessageCenter();

    }


    toInputPwd(props, wx) {

        Actions.InputPwd({
            params: {
                wx: wx
            }
        });

    }

    toWxRegister(props, wxAuth) {
        Actions.WxRegister({
            params: {
                access_token: wxAuth
            }
        });

    }

    toSuggest(props) {
        Actions.Suggest();

    }

    toProtocol(props, _protocol) {
        Actions.Protocol({
            params: {
                _protocol: _protocol
            }
        })

    }


    replaceOrder(order_id, price) {

        router.pop();
        setTimeout(() => {
            Actions.OrderInfoPage({
                params: {
                    order_id: order_id,
                    price: price
                }
            })

        }, 100)


    }


    toWebViewPay(props, pay, orderRefresh) {
        Actions.WebViewPay({
            params: {
                pay: pay,
                orderRefresh: orderRefresh
            }
        });

    }


    toSearchPoker(props) {
        Actions.SearchPoker();

    }

    toPokerRacePage(props, race_id) {
        Actions.PokerRacePage({
            params: {
                race_id: race_id
            }
        });

    }

    toPokerRankPage(props, player_id) {
        Actions.PokerRankPage({
            params: {
                player_id: player_id
            }
        });
    }

    toAdrListPage(props, selectAdr, adrData) {
        Actions.AdrListPage({
            params: {
                selectAdr: selectAdr,
                adrData: adrData
            }
        });

    }

    toNewAddressPage(props, getList, address) {
        Actions.NewAddressPage({
            params: {
                getList: getList,
                address: address
            }
        });

    }

    toWebViewPage(props, url) {
        Actions.WebViewPage({
            params: {
                url: url
            }
        });
    }


    toTicketInfoPage(props, race_id, ticket_id, isBuy) {
        Actions.TicketInfoPage({
            params: {
                race_id: race_id,
                ticket_id: ticket_id,
                isBuy: isBuy
            }
        });

    }

    toChoiseTicketPage(props, race_id) {
        Actions.ChoiseTicketPage({
            params: {
                race_id: race_id
            }
        });
    }


    toTicketSearchPage(props) {
        Actions.TicketSearchPage()

    }

    toVideoPage(props) {
        Actions.MainVideoPage()

    }

    toDrawerRank(props) {
        Actions.DrawerRank()

    }

    toMessagePage(props) {
        Actions.MessagePage()

    }


    toChangePhonePage(props) {
        Actions.ChangePhonePage()

    }


    toBindingPhonePage(props) {
        Actions.BindingPhonePage()

    }


    toApiSettingPage(props) {
        Actions.ApiSettingPage()

    }

    toTicketPage(props) {

        Actions.TicketPage()
    }


    toSearchNewsPage(props) {
        Actions.SearchNewsPage();

    }

    toVideoInfoPage(props, info) {
        Actions.VideoInfoPage({
            params: {
                info: info
            }
        })

    }

    toNewsInfoPage(props, newsInfo) {
        Actions.NewsInfoPage({
            params: {
                newsInfo: newsInfo
            }
        })

    }


    toMainNewsPage(props) {
        Actions.MainNewsPage()

    }


    toAboutPage(props) {
        Actions.AboutPage()

    }


    toSearchKeywordPage(props) {
        Actions.SearchKeywordPage()

    }

    toChildRaceInfoPage(props, race_ids) {
        Actions.ChildRaceInfoPage({
            params: {
                race_ids: race_ids
            }
        })

    }

    toBusinessPage(props) {

        Actions.BusinessPage()
    }


    toSearchRacesPage(props) {
        Actions.SearchRacesPage()

    }


    toModifyPwdPage(props) {
        Actions.ModifyPwdPage()

    }

    toSecurityPage(props) {
        Actions.SecurityPage()

    }


    toOrderListPage(props) {
        Actions.OrderListPage()

    }

    toCertificationPage(props) {
        Actions.CertificationPage()

    }

    toBuyKnownPage(props) {
        Actions.BuyKnowPage();

    }

    toOrderInfo(props, order_id, price, isPay) {
        Actions.OrderInfoPage({
            params: {
                order_id: order_id,
                isPay: isPay,
                price: price
            }
        });

    }

    toOrderInfoPage(props, order_id, price, onRefresh) {
        Actions.OrderInfoPage({
            params: {
                order_id: order_id,
                price: price,
                onRefresh: onRefresh
            }
        });

    }

    toBuyTicketPage(props, race_id, ticket_id) {
        Actions.BuyTicketPage({
            params: {
                race_id: race_id,
                ticket_id: ticket_id
            }
        });
    }

    toForgetEmailPage(props) {
        Actions.ForgetEmailPage()

    }

    toImageGalleryPage(props, images, index) {
        Actions.ImageGallery({
            params: {
                images: images,
                index: index
            }
        })

    }

    popToLoginFirstPage() {
        Actions.LoginFirstPage()


    }

    toEmailRegisterPage(props) {
        Actions.EmailRegisterPage()

    }

    toLoginFirstPage(props) {
        Actions.LoginFirstPage()

    }

    toLoginCodePage(props) {
        Actions.LoginCodePage()

    }

    toRacesInfoPage(props, race_id, fromBuy) {
        Actions.RacesInfoPage({
            params: {
                race_id: race_id,
                fromBuy: fromBuy
            }
        })

    }

    toFocusPlayer(props) {
        Actions.FocusPlayer()

    }

    toForgetPage(props) {
        Actions.ForgetPage()

    }

    toRegisterPage(props) {
        Actions.RegisterPage()

    }

    forgetPhoneToPwdPage(props, phone, code) {
        Actions.InputPwdPage({
            params: {
                phone: phone,
                isEmailOrMobile: 'mobile',
                code: code,
                isRegisterOrForget: 'forget'

            }
        })

    }

    forgetEmailToPwdPage(props, email, code) {
        Actions.InputPwdPage({
            params: {
                email: email,
                isEmailOrMobile: 'email',
                code: code,
                isRegisterOrForget: 'forget'

            }
        })

    }


    toInputPwdPage(props, phone, code) {
        Actions.InputPwdPage({
            params: {
                phone: phone,
                code: code,
                isEmailOrMobile: 'mobile',
                isRegisterOrForget: 'register'
            }
        });

    }


    toPersonPage(props) {
        Actions.PersonPage()

    }


    toSettingPage(props) {
        Actions.SettingPage()

    }

    popToLogin() {
        this.popToTop();
    }

    popToDrawerRank() {
        this.popToTop();

    }


}
