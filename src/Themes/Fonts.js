// @flow
import StorageKey from '../configs/StorageKey';
const type = {
    base: 'PingFangSC-Light',
};

const size = {
    h1: 38,
    h36: 36,
    h30: 30,
    h26: 26,
    h24: 24,
    h17: 17,
    h18: 18,
    input: 18,
    h16: 16,
    h15: 15,
    h14: 14,
    h13: 13,
    h12: 12,
    h9: 9,
    tiny: 8.5
};


const style = {
    h1: {
        fontFamily: type.base,
        fontSize: size.h1
    },
    h36: {
        fontFamily: type.base,
        fontSize: size.h36
    },
    h30: {
        fontFamily: type.base,
        fontSize: size.h30
    },
    h26: {
        fontSize: size.h26
    },
    h24: {
        fontSize: size.h24
    },
    h18: {
        fontSize: size.h18
    },
    normal: {
        fontFamily: type.base,
        fontSize: size.h15
    },
    description: {
        fontFamily: type.base,
        fontSize: size.h14
    }
}

export default {
    H11: {
        fontFamily: type.base,
        fontSize: 11
    },
    H12: {
        fontFamily: type.base,
        fontSize: 12
    },
    H13: {
        fontFamily: type.base,
        fontSize: 13
    },
    H14: {
        fontFamily: type.base,
        fontSize: 14
    },
    H15: {
        fontFamily: type.base,
        fontSize: 15
    },
    H16: {
        fontFamily: type.base,
        fontSize: 16
    },
    H17: {
        fontFamily: type.base,
        fontSize: 17
    },
    H18: {
        fontFamily: type.base,
        fontSize: 18
    },
    H19: {
        fontFamily: type.base,
        fontSize: 19
    },
    H20: {
        fontFamily: type.base,
        fontSize: 20
    },
    H21: {
        fontFamily: type.base,
        fontSize: 21
    },
    type,
    size,
    style,
}

