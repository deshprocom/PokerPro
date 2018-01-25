/**
 * Created by lorne on 2017/3/6.
 */
import I18n from 'react-native-i18n';

//用户赞助状态
export class CrowdStatus{
    static ALL = 'all';
    static  UNPUBLISHED = 'unpublished';
    static SUCCESS = 'success';
    static  FAILED = 'failed';
}

export class WebAction {
    static REFRESH_COMMENT = 'REFRESH_COMMENT';
    static ADD_TOTAL_LIKES = 'ADD_TOTAL_LIKES';
    static SCROLL_COMMENT_TOP = 'SCROLL_COMMENT_TOP';
}

//邀请码折扣类型
export class CouponType {
    static no_discount = 'no_discount';
    static rebate = 'rebate';
    static reduce = 'reduce';
}

//首页Banner
export class BannerStatus {
    static INFO = 'info';
    static RACE = 'race';
    static VIDEO = 'video';
    static LINK = 'link';
}


//实名状态
export class Verified {
    static INIT = 'init';
    static PENDING = 'pending';
    static PASSED = 'passed';
    static FAILED = 'failed';
}

/*身份证验证状态*/
export function idCardStatus(status) {
    switch (status) {
        case Verified.PENDING:
            return I18n.t('pending');
        case Verified.PASSED:
            return I18n.t('passed');
        case Verified.FAILED:
            return I18n.t('failed');
    }
}

//订单状态
export class OrderStatus {
    static unpaid = 'unpaid';
    static paid = 'paid';
    static unshipped = 'unshipped';
    static completed = 'completed';
    static canceled = 'canceled';
    static delivered = 'delivered';
}

//售票状态
export class SellStatus {
    static unsold = 'unsold';
    static selling = 'selling';
    static end = 'end';
    static sold_out = 'sold_out';
}

//赛事状态
export class RaceStatus {
    static unbegin = 'unbegin';
    static go_ahead = 'go_ahead';
    static ended = 'ended';
    static closed = 'closed';
}

//商城订单状态
export class MallStatus {
    static unpaid = 'unpaid';
    static paid = 'paid';
    static delivered = 'delivered';
    static completed = 'completed';
    static canceled = 'canceled';
}

//商城订单状态
export class LogisticsStatus {
    static no_track = 'no_track';
    static on_the_way = 'on_the_way';
    static have_been_received = 'have_been_received';
    static question_piece = 'question_piece';
}
//商城订单状态
export class RefundStatus {
    static none = 'none';
    static open = 'open';
    static close = 'close';
    static completed = 'completed';
}

