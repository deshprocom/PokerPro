/**
 * Created by lorne on 2017/3/6.
 */
import I18n from 'react-native-i18n';
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
