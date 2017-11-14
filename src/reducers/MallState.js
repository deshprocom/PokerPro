import {ADD_CART, DELETE_CART} from '../actions/ActionTypes';

const initialState = {
    actionType: '',
    loading: false,
    hasData: false,
    error: false,
};


export default function MallState(state = initialState, action) {
    switch (action.type) {
        case ADD_CART:
            return handleNoData(state, action);
        case DELETE_CART:
            return handleNoData(state, action);

        default:
            return {
                ...state,
                actionType: '',
                hasData: false
            };
    }
}

function handleNoData(state, action) {
    if (action.type === ADD_CART)
        return {
            ...state,
            actionType: action.type,
            hasData: true
        };
    else if (action.type === DELETE_CART) {
        return {
            ...state,
            actionType: action.type,
            hasData: true
        };
    }
}


