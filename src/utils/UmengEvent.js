/**
 * Created by lorne on 2017/6/21.
 */
import JAnalyticsModule from 'janalytics-react-native';

export function umengEvent(event) {
    let strEvnet = '';
    switch (event) {
        case "home_login":
            strEvnet = "home_login";
            break;
        case "home_ticket":
            strEvnet = "home_ticket";
            break;
        case "home_news":
            strEvnet = "home_news";
            break;
        case "home_videos":
            strEvnet = "home_videos";
            break;
        case "home_ranking":
            strEvnet = "home_ranking";
            break;
        case "home_more":
            strEvnet = "home_more";
            break;
        case "home_notification":
            strEvnet = "home_notification";
            break;
        case "race_buy_ticket":
            strEvnet = "race_buy_ticket";
            break;
        case "race_main_info":
            strEvnet = "race_main_info";
            break;
        case "race_side_info":
            strEvnet = "race_side_info";
            break;
        case "ticket_main":
            strEvnet = "ticket_main";
            break;
        case "ticket_side":
            strEvnet = "ticket_side";
            break;
        case "ticket_contain":
            strEvnet = "ticket_contain";
            break;
        case "ticket_buy_info":
            strEvnet = "ticket_buy_info";
            break;
        case "ticket_buy_know":
            strEvnet = "ticket_buy_know";
            break;
        case "ticket_buy_true_name":
            strEvnet = "ticket_buy_true_name";
            break;
        case "ticket_buy_contain":
            strEvnet = "ticket_buy_contain";
            break;
        case "ticket_buy_hotline":
            strEvnet = "ticket_buy_hotline";
            break;
        case "true_name_submit":
            strEvnet = "true_name_submit";
            break;
        case "true_password_submit":
            strEvnet = "true_password_submit";
            break;
        case "more_order":
            strEvnet = "more_order";
            break;
        case "more_business":
            strEvnet = "more_business";
            break;
        case "setting_security":
            strEvnet = "setting_security";
            break;
        case "setting_mobile":
            strEvnet = "setting_mobile";
            break;
        case "setting_modify_pwd":
            strEvnet = "setting_modify_pwd";
            break;
        case "setting_recommend":
            strEvnet = "setting_recommend";
            break;
        case "home_side":
            strEvnet = "home_side";
            break;
        default:
            break;

    }
    // JAnalyticsModule.postEvent({type:strEvnet});
}