/**
 * Created by lorne on 2017/1/3.
 */
import * as TYPTES from '../actions/ActionTypes';



const initialState = {
    drawerState: 'closed',
    drawerDisabled: true,
};

export default function drawer(state = initialState,action) {
    switch (action.type){
        case TYPTES.CLOSE_DRAWER:
            return {
                ...state,
                drawerState: 'closed',
            };
        case TYPTES.OPEN_DRAWER:
            return {
                ...state,
                drawerState: 'opened',
            };
        default:
            return state;
    }
}


export function openDrawer() {
    return  {
        type:TYPTES.OPEN_DRAWER
    }
}

export function closeDrawer() {
    return {
        type:TYPTES.CLOSE_DRAWER
    }
}