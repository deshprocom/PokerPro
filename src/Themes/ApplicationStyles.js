// @flow

import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    screen: {
        mainContainer: {
            flex: 1,
            marginTop: Metrics.navBarHeight,
            backgroundColor: Colors.transparent
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        container: {
            backgroundColor: Colors.bg_20232b
        },
        section: {
            margin: Metrics.section,
            padding: Metrics.baseMargin,
            borderTopColor: Colors.frost,
            borderTopWidth: 0.5,
            borderBottomColor: Colors.frost,
            borderBottomWidth: 1
        },
        sectionText: {
            color: Colors.snow,
            marginVertical: Metrics.smallMargin,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        subtitle: {
            color: Colors.snow,
            padding: Metrics.smallMargin,
            marginBottom: Metrics.smallMargin,
            marginHorizontal: Metrics.smallMargin
        }
    },
    darkLabelContainer: {
        backgroundColor: Colors.cloud,
        padding: Metrics.smallMargin
    },
    darkLabel: {
        fontFamily: Fonts.type.bold,
        color: Colors.snow
    },
    groupContainer: {
        margin: Metrics.smallMargin,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sectionTitle: {
        ...Fonts.style.h26,
        backgroundColor: Colors.ricePaper,
        padding: Metrics.smallMargin,
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
        borderWidth: 1,
        borderColor: Colors.ember,
        alignItems: 'center',
        textAlign: 'center'
    },
    navHeader: {
        backgroundColor: Colors.bg_20232b
    },
    navTitle: {
        color: Colors.white
    },
    setItem44: {
        height: 44,
        backgroundColor: Colors._414450,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    setItemLine: {
        height: 1,
        backgroundColor: Colors.line_16181D,
        marginLeft: 15
    },
    setItemView: {
        backgroundColor: Colors._414450
    },
    setItemLeft: {
        marginLeft: 15
    },
    setItemRight: {
        marginRight: 15
    },
    setItemText: {
        color: Colors._B7B7B7,
        fontSize: Fonts.size.h15
    },
    setItemMoreIcon: {
        width: 7,
        height: 10
    },
    setItemInput: {
        height: 44,
        color: Colors.white,
        flex: 1,
        fontSize: Fonts.size.h15
    },
    setItemSwitch: {
        width: 52,
        height: 32
    },
    bg_20232b: {
        backgroundColor: Colors.bg_20232b
    },
    loginBtn: {
        alignSelf: 'center',
        backgroundColor: Colors._E0C294,
        height: 45,
        width: 278,
        justifyContent: 'center'
    },
    loginBtnText: {
        alignSelf: 'center',
        color: Colors._414450
    },
    statusHeight: {
        marginTop: Metrics.statusBarHeight
    },
    navBar: {
        height: Metrics.navBarHeight,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    homeBar: {
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbar: {
        position: 'absolute',
        width: Metrics.screenWidth,
        zIndex: 1
    },
    bgContainer: {
        flex: 1,
        backgroundColor: Colors.bg_f5
    },
    bg_black: {
        flex: 1,
        backgroundColor: Colors.bg_ec
    }


}

export default ApplicationStyles
