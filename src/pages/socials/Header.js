import {
    Dimensions,
    Platform
} from 'react-native';

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
