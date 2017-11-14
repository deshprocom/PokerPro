import {ADD_CART, DELETE_CART, FETCH_START} from "./ActionTypes";

export {ADD_CART, DELETE_CART, FETCH_START} from './ActionTypes';

/*删除购物车*/
export function deleteCart() {
    console.log('deleteCart')
    return dispatch => {
        dispatch(start());
        setTimeout(() => dispatch(delCartType()), 500)

    }

}

/*添加购物车*/
export function addCart() {
    return dispatch => {
        dispatch(start());
        setTimeout(() => dispatch(addCartType()), 500)

    }
}

function addCartType() {
    return {
        type: ADD_CART
    }
}

function delCartType() {
    return {
        type: DELETE_CART
    }
}

function start() {
    return {
        type: FETCH_START
    }
}
