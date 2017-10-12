import {
    StyleSheet,Dimensions
}
    from 'react-native';
import {Images} from '../../Themes';
var deviceWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    scrollImg:{
        flex: 1,
        height: 200
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
        fontSize:13,
        fontFamily:'PingFangSC-Regular',
        color:'#666666'

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
        marginTop: 16,
        marginLeft:17
    },
    moreTwo: {
        width:101,
        marginRight:10,
        flexDirection: 'column',

    },
    information: {
        height:103,
        marginLeft:20,
        marginRight:16,
        flexDirection:'row',
        alignItems:'center'
    },
    informationTwo: {
        width:194,
        flexDirection:'column'
    },
    informationImg: {
        marginLeft: 100,

    },
    informationText:{
        color:'#AAAAAA',fontSize:12
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
        marginBottom: 10
    },
    button:{
        width:68,
        height:28,
        alignItems:'center',
        justifyContent:'center'

    },
    oval:{
        width:317,
        height:160,
        marginLeft:20,
        flexDirection:'row'
    },
    ovalText:{
        fontSize: 12,
        color:'#888888'

    },
    ovalPrice:{
        fontSize: 15,
        color:'#DF1D0F'
    },
    personalText:{
        fontFamily: 'PingFangSC-Regular',
        fontSize: 16,
        color: '#444444',
        marginLeft:30
    },
    personalImg:{
        width:8,
        height:15,
        marginLeft:250
    },
    personalImgBusiness:{
        width:8,
        height:15,
        marginLeft:218
    },
    personalView:{
        flexDirection:'row',
        backgroundColor:'#ffffff'
    },
    personalView2:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:13,
        marginBottom:13,
        marginLeft:20,
        marginRight:17
    }
});