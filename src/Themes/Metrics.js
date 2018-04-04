// @flow

import {Dimensions, Platform} from 'react-native'

const {width, height} = Dimensions.get('window')

///屏幕宽高
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const iOS = Platform.OS === "ios" ? "1" : "0";

const iPhone_X = iOS === "1" && screenWidth === 375 && screenHeight === 812 ? "1" : "0";

export const toolBarHeight = iPhone_X === "1" ? 83 : 49;


//真实尺寸
export function reallySize(size) {
    return size / 375 * screenWidth;
}

// Used via Metrics.baseMargin
const metrics = {
    reallySize: reallySize,
    marginHorizontal: 10,
    marginVertical: 10,
    section: 25,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    horizontalLineHeight: 1,
    searchBarHeight: 30,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 44,
    buttonRadius: 4,
    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 60
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 300
    },
    statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
    homeBar: 44,
}

export default metrics
