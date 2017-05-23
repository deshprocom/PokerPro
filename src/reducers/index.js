/**
 * Created by lorne on 2016/12/19.
 */
import {combineReducers} from 'redux';

import RegisterRedux from './RegisterRedux';
import DrawerRedux from './DrawerRedux';
import SideBarNavRedux from './SideBarNavRedux';
import AccountRedux from './AccountRedux';
import PersonState from './PersonState';
import AccountState from './AccountState';
import HomeState from './HomeState';
import RaceState from './RaceState';
import TicketOrderState from './TicketOrderState';
import OrderState from './OrderState';
import NewsState from './NewsState';

const rootReducer = combineReducers({
    RegisterRedux,
    DrawerRedux,
    SideBarNavRedux,
    AccountRedux,
    PersonState,
    AccountState,
    HomeState,
    RaceState,
    TicketOrderState,
    OrderState,
    NewsState


});

export default rootReducer;