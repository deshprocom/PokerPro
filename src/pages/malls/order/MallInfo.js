import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4},{id:5}];

export default class MallInfo extends PureComponent {
    state={
        dataHosts:[],
        startIndex:1,
        endIndex:2,
        showExpand:true,
    };
    componentDidMount() {

        const{startIndex,endIndex,dataHosts,showExpand} = this.state;
        let newDataHosts = [...dataHosts];
        let newShowexpand = showExpand;

        data.forEach(function(x){

            if(x.id <= endIndex && endIndex < data.length && x.id >= startIndex){
                if(endIndex >= data.length){
                    newShowexpand=false;
                }else{
                    newDataHosts.push(x)
                }

            }
        });
        this.setState({
            dataHosts:newDataHosts,
            showExpand:newShowexpand
        });

    };

    _expandData=()=>{
        const{startIndex,endIndex,dataHosts,showExpand} = this.state;

        let newDataHosts = [...dataHosts];
        let newShowexpand = showExpand;
        let newStartIndex = startIndex;
        let newEndIndex = endIndex;

        newStartIndex=newStartIndex+2;
        newEndIndex=newEndIndex+2;

        data.forEach(function(x){
            if(x.id <= newEndIndex && newEndIndex <= data.length && x.id >= newStartIndex){
                if(newEndIndex > data.length){
                    newShowexpand=false;
                    newEndIndex=data.length;
                }else if(newEndIndex === data.length){
                    newShowexpand=false;
                    newDataHosts.push(x)
                }else{
                    newDataHosts.push(x)
                }

            }else if(x.id === newStartIndex){
                newShowexpand=false;
                newDataHosts.push(x)
            }
        });
        this.setState({
            dataHosts:newDataHosts,
            showExpand:newShowexpand,
            startIndex:newStartIndex,
            endIndex:newEndIndex
        });


    };

    _renderItem = ({item}) => {

        return (
            <View style={styleM.renderItem}>

                <Image style={styleM.mallImg} source={Images.empty_image}/>
                <View style={styleM.TxtView}>
                    <Text numberOfLines={2} style={styleM.mallTextName}>筹码14克皇冠粘土百家乐德州扑克筹码币</Text>
                    <Text style={styleM.mallAttributes}>{I18n.t('weight')}：1.62KG {I18n.t('weight')}：黑 {I18n.t('quantity')}：500</Text>
                    <View style={styleM.returned}>
                        <Text style={styleM.returnedTxt}>{I18n.t('returned')}</Text>
                    </View>
                    <View style={styleM.PriceView}>
                        <Text style={styleM.Price}>¥555555.55</Text>
                        <Text style={styleM.originPrice}>¥999999</Text>
                        <View style={{flex:1}}/>
                        <Text style={styleM.quantitys}>X2</Text>
                    </View>
                </View>
            </View>

        )
    };

    _separator = () => {
        return <View style={{height: 1, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    };
    _keyExtractor = (item, index) => item.id;

    render(){
        return(
            <View style={styleM.infoView}>
                <View style={styleM.infoName}>
                    <Text style={styleM.infoLeft}>{I18n.t('mallInfo')}</Text>
                    <View style={{flex:1}}/>
                    <Text style={styleM.infototal}>{I18n.t('total')}:5{I18n.t('pieces')}</Text>
                </View>
                <View style={styleM.infoImgView}>
                    <FlatList

                        data={this.state.dataHosts}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                {this.state.showExpand?<TouchableOpacity
                        style={styleM.expandView}
                        onPress={()=>{
                            this._expandData()
                        }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styleM.expandTxt}>{I18n.t('expandMore')}</Text>
                            <TouchableOpacity style={styleM.expandTouch}>
                                <Image style={styleM.expandImg} source={Images.expand}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>:null}

            </View>
        )}
}
const styleM = StyleSheet.create({
    infoView:{
        marginTop:10
    },
    infoName:{
        height:40,
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center'
    },
    infoLeft:{
        fontSize: 14,
        color: '#333333',
        marginLeft:17
    },
    infototal:{
        fontSize: 14,
        color: '#333333',
        marginRight:17
    },
    infoImgView:{
        marginTop:1,
        backgroundColor:'#FFFFFF'
    },
    renderItem: {
        flexDirection: 'row', backgroundColor: '#FFFFFF',paddingBottom: 11
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 17,
        marginTop:12,
    },
    TxtView: {
        flex: 1,
        marginLeft: 12,
        marginTop:15,
    },
    mallTextName: {
        fontSize: 14,
        color: '#333333',
        marginRight: 17
    },
    mallAttributes: {
        fontSize: 10,
        color: '#AAAAAA',
        marginRight: 27,
        marginTop: 5
    },
    PriceView: {
        flexDirection: 'row',
        marginTop:5,
        alignItems:'center',

    },
    Price: {
        fontSize: 14,
        color: '#F34A4A',
    },
    originPrice:{
        fontSize: 12,
        color: '#AAAAAA',
        textDecorationLine:'line-through',
        textDecorationColor:'#979797',
        marginLeft:17
    },
    quantitys:{
        fontSize: 17,
        color: '#161718',
        marginRight:17
    },
    returned:{
        backgroundColor: '#F34A4A',
        borderRadius: 2,
        width:48,
        height:18,
        alignItems:'center',
        justifyContent:'center',
        marginTop:2
    },
    returnedTxt:{
        fontSize: 10,
        color:'#FFFFFF'
    },
    expandView:{
        height:30,
        marginTop:3,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
    expandTxt:{
        fontSize: 14,
        color:'#333333',
    },
    expandTouch:{

    },
    expandImg:{
        width:19,
        height:10,
        marginLeft:6
    }
})