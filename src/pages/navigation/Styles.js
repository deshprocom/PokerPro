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
        alignItems: 'center'
    },
    racesTwo: {
        flexDirection: 'row',
        marginRight:14,
        alignItems:'center',
        paddingLeft:30
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
        marginLeft: 18,
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
    racesTwoRight: {
        flexDirection: 'column',
        marginLeft: 17,
        alignItems: 'center'
    },
    more: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    information: {
        height:103,
        marginLeft:20,
        marginRight:17,
        flexDirection:'row',
        alignItems:'center'
    },
    informationTwo: {

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
        marginLeft:17,
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


});