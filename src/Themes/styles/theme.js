/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Platform, Dimensions, PixelRatio} from 'react-native';

export default {
    //mainThemeColor: favoriteColor,
    pageBackgroundColor: '#f4f4f4',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
    segment: {
        color: '#ccc',
        width: 1 / PixelRatio.get()
    },
    tabButton: {
        normalColor: '#aaa'
    },
    toolbar: {
        height: 44,
        paddingTop: Platform.Version >= 21 ? 20 : 0,
        //barColor: favoriteColor,
        titleColor: '#F4E3A1',
        titleSize: 17,
        textBtnSize: 15
    }
}