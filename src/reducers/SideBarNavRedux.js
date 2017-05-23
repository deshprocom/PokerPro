/**
 * Created by lorne on 2017/1/3.
 */
import {TO_IMAGE_PICKER} from '../actions/ActionTypes';
import {closeDrawer} from './DrawerRedux';

const initialRoute = {
    pageName: 'HomePage'
};

export default function sideBarNav(state = initialRoute, action) {
    switch (action.type) {
        case TO_IMAGE_PICKER:
            return {
                ...state,
                pageName:action.pageName
            };

        default:
            return {
                ...state,
                pageName:'HomePage'
            };
    }
}

export function navigateTo(pageName) {
    return (dispatch) => {

        dispatch(closeDrawer());
        dispatch(toSomePage(pageName));
    }
}

export function toSomePage(pageName) {
    return {
        type: TO_IMAGE_PICKER,
        pageName:pageName
    }
}

