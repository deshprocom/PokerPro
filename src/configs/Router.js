/**
 * Created by lorne on 2016/12/20.
 */

import {ActionConst, Actions} from 'react-native-router-flux';
import {NavigationActions} from 'react-navigation';
import {getDispatchAction} from '../utils/ComonHelper';
import UserTopicPage from "../pages/socials/UserTopicPage";
import Crowdfunding from "../pages/crowdfundings/crowds/Crowdfunding";


const customFloatFromRight = '';


export default class Router {
    toCamera(params) {
        this.stackPush({
            name: "CameraVideo",
            params
        })
    }

    toSocialContact(params) {
        this.stackPush({
            name: "SocialContact",
            params: params
        })
    }

    toBlackList() {
        this.stackPush({
            name: "Blacklist",
        })
    }

    toLocation(params) {
        this.stackPush({
            name: "Location",
            params
        })
    }


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

    replace(route) {
        Actions.replace(route.name, {params: route.params})
    }


    pop() {
        Actions.pop();
        console.log(Actions.currentScene)

    }


    popToTop() {
        getDispatchAction()['BACK_TOP']();
        Actions.popTo('tab_home')
    }

    toNearFriend() {
        this.stackPush({
            name: 'NearFriend'
        })
    }

    toCrowdfunding() {
        this.stackPush({
            name: 'Crowdfunding'
        })
    }

    toMallPage() {
        this.stackPush({
            name: 'MallPage'
        })
    }

    toSquare() {
        this.stackPush({
            name: 'Square'
        })
    }

    popToAriticle() {
        Actions.popTo('tab_home');
        this.toSquare()
    }


    toUserTopicPage(userInfo) {
        this.stackPush({
            name: 'UserTopicPage',
            params: {
                userInfo
            }
        })
    }


    toArticleRelease(articleKey, articleInfo, reloadInfo) {
        this.stackPush({
            name: "ArticleRelease",
            params: {
                articleKey,
                articleInfo,
                reloadInfo,
            },
        })
    }

    toSendMood() {
        this.stackPush({
            name: "MoodRelease"
        })
    }

    toLongArticle(article, isComment) {
        this.stackPush({
            name: 'LongArticle',
            params: {
                article,
                isComment
            }
        })
    }

    toArticleList() {
        this.stackPush({
            name: "ArticleList",
        })
    }


    replaceCrowdOrder(order_number) {
        this.replace({
            name: 'SubscriptionInfoPage',
            params: {
                order_number
            }
        })
    }

    toRecordList() {
        this.stackPush({name: 'RecordList'})
    }


    toPokerB() {
        this.stackPush({name: 'PokerB'})
    }

    toSubscriptionInfoPage(order_number) {
        this.stackPush({
            name: 'SubscriptionInfoPage',
            params: {
                order_number
            }
        })
    }

    toRiskWarningPage(sumMoney, order_info, clickImg, order) {
        this.stackPush({
            name: 'RiskWarningPage',
            params: {
                sumMoney: sumMoney,
                order_info: order_info,
                clickImg: clickImg,
                order: order
            }
        })
    }

    toSubscriptionConfirmPage(order_info, verified) {
        this.stackPush({
            name: 'SubscriptionConfirmPage',
            params: {
                order_info, verified
            }
        })
    }

    toSubscriptionPage(crowd, player) {

        this.stackPush({
            name: 'SubscriptionPage',
            params: {
                crowd: crowd,
                player: player
            }

        })
    }

    toPokerInfo(crowd, player) {
        this.stackPush({
            name: 'PokerInfo',
            params: {
                crowd,
                player
            }
        })
    }


    toCrowdDetailPage(crowd) {
        this.stackPush({
            name: 'CrowdDetail',
            params: {
                crowd
            }
        })
    }

    toSelectPlayer(crowd) {
        this.stackPush({
            name: 'SelectPlayerPage',
            params: {
                crowd
            }
        })
    }

    toReportPage(crowd) {
        this.stackPush({
            name: 'ReportPage',
            params: {
                crowd: crowd
            }
        })
    }

    toDeletePage() {
        this.stackPush({
            name: 'DeletePage',

        })
    }

    toReceivedReply() {
        this.stackPush({
            name: 'ReceivedReplyPage',

        })
    }

    toPersonDynamic(userInfo) {
        this.stackPush({
            name: 'PersonDynamicPage',
            params: {
                userInfo
            }
        })
    }

    toMallSelectPage(orderItem, mallRefresh) {
        this.stackPush({
            name: 'MallSelectPage',
            params: {
                orderItem,
                mallRefresh
            }
        })
    }


    toLogisticsWeb(shipments) {
        this.stackPush({
            name: 'LogisticsWeb',
            params: {shipments: shipments}
        })
    }

    /*物流查看*/
    toLogisticsPage(orderItem) {
        this.stackPush({
            name: 'LogisticsPage',
            params: {
                orderItem: orderItem
            }
        })
    }


    toMallResult(categories) {
        this.stackPush({
            name: 'MallSearchResult',
            params: {category: categories}
        })
    }

    replaceProductInfo(product) {
        Actions.replace('MallInfoPage', {
            params: product
        })
    }

    replaceShoppingCart() {
        Actions.replace('ShoppingCart')
    }

    toSearchMallPage() {
        this.stackPush({
            name: 'SearchMallPage'
        })
    }

    popToTopRefresh() {
        Actions.reset('Main');

    }

    toTabNews() {
        Actions.tab_news({type: ActionConst.REPLACE})
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

    toPokerRankPage(player_id) {
        this.stackPush({
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


    toSearchKeywordPage() {
        this.stackPush({
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

    toImageGalleryPage(images, index) {
        this.stackPush({
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

    toMallInfoPage(product) {
        this.stackPush({
            name: 'MallInfoPage',
            params: product
        })
    }


    toSettingPage(props) {
        this.push(props, {

            name: 'SettingPage',

        })
    }


    toMessageList(userInfo) {
        this.stackPush({
            name: 'ChatRoom',
            params: {
                userInfo
            }
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

    toWebPage(url, body) {
        this.stackPush({
            name: 'WebPage',
            params: {url: url, body: body}
        })
    }

    toShippingCart() {
        this.stackPush({
            name: 'ShoppingCart',
        })
    }

    toOrderConfirm(selectedData) {
        this.stackPush({
            name: 'OrderSubmitPage',
            params: selectedData
        })
    }

    toMallOrderInfo(item, listRefresh) {
        this.stackPush({
            name: 'MallOrderInfo',
            params: {
                orderDetail: item,
                listRefresh: listRefresh
            }
        })
    }

    replaceMallOrderInfo(item) {
        this.replace({
            name: 'MallOrderInfo',
            params: {orderDetail: item}
        })
    }

    toReturnPage(orderItems, order_number) {
        this.stackPush({
            name: 'ReturnPage',
            params: {
                order_items: orderItems,
                order_number: order_number
            }
        })
    }

    toReturnSucceedPage(refund_number) {
        this.stackPush({
            name: 'ReturnSucceedPage',
            params: {
                refund_number: refund_number
            }
        })
    }

    toMallOrderPage() {
        this.stackPush({
            name: 'MallOrderPage'
        })
    }

    toCommentInfoPage(item) {
        this.stackPush({
            name: 'CommentInfoPage',
            params: {
                item: item
            }
        })
    }


}
