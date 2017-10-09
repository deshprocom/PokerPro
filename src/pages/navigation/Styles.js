import {
    StyleSheet,Dimensions
}
    from 'react-native';
var deviceWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    scrollImg:{
        flex: 1,
        height: 200,
        backgroundColor:'red'
    },
    ticket: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pukes: {
        height: 49,
        justifyContent: 'center',
        backgroundColor:'#fff'
    },
    puke: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
        marginRight: 50
    },

    pukeText: {
        width:62,
        height:15

    },
    pukeText2:{
        width:247,
        fontSize:13
    },
    races: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center'
    },
    raceText1: {
        fontSize: 14,
        color: '#333333',
        fontFamily:'PingFangSC-Regular',
        fontWeight:'bold'
    },
    raceText: {
        fontSize: 14,
        color: '#333333'
    },
    racesTwo: {
        flexDirection: 'row',
        marginLeft: 224,
        alignItems:'center'
    },
    racesTwoRight: {
        flexDirection: 'column',
        marginLeft: 20,
        alignItems: 'center'
    },
    more: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    moreTwos: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    moreTwo: {
        width: 89,
        flexDirection: 'column',
        alignItems: 'center'
    },
    information: {
        flexDirection: 'column',

    },
    informationTwo: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center'
    },
    informationImg: {
        marginLeft: 100,

    },
    page: {
        width: deviceWidth,
    },
    headerItem: {
        flex: 1,
        height: 200,
        flexDirection: 'row',
    },
    headerTitleContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10,
    }
});