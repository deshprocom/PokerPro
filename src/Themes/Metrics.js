// @flow

import {Dimensions, Platform} from 'react-native'
import {screenHeight, screenWidth} from "../pages/socials/Header";

const {width, height} = Dimensions.get('window')


const navBarHeight = Platform.OS === "ios" ? width === 375 && height === 812 ? 88 : 64 : 44;
const toolMargin = Platform.OS === "ios" ? width === 375 && height === 812 ? 44 : 20 : 0;
const iPhone_X = Platform.OS === "ios" && screenWidth === 375 && screenHeight === 812;

//真实尺寸
export function reallySize(size) {
    return width / 375 * size;
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
    navBarHeight: navBarHeight,
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
    statusBarHeight: toolMargin,
    homeBar: 44,
    iPhone_X
}

export default metrics
