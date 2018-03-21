import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import RenderItem from './RenderItem';
import {util} from '../../../utils/ComonHelper'


export default class MallInfo extends PureComponent {
    state = {
        dataHosts: [],
        showExpand: true,
    };

    componentDidMount() {

        let lists = this.props.selectedData;

        this.setState({
            dataHosts: lists.length > 2 ? lists.slice(0, 2) : lists,
            showExpand: lists.length > 2
        });

    };

    _expandData = () => {

        this.setState({
            dataHosts: this.props.selectedData,
            showExpand: false
        });


    };

    _renderItem = ({item}) => {

        return (
            <RenderItem item={item}/>

        )
    };

    _separator = () => {
        return <View style={{height: 1, marginLeft: 17, marginRight: 17, backgroundColor: '#ECECEE'}}/>;
    };
    _keyExtractor = (item, index) => `mallInfo${index}`;

    count = () => {
        const {selectedData} = this.props;

        let count = 0;

        if (util.isEmpty(selectedData))
            return;
        selectedData.forEach(item => {
            count += item.number;
        });

        return `${count}`;
    };

    render() {
        return (
            <View style={styleM.infoView}>
                <View style={styleM.infoName}>
                    <Text style={styleM.infoLeft}>{I18n.t('mallInfo')}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styleM.infototal}>{I18n.t('total')}{this.count()}{I18n.t('pieces')}</Text>
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
                {this.state.showExpand ? <TouchableOpacity
                    style={styleM.expandView}
                    onPress={() => {
                        this._expandData()
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styleM.expandTxt}>{I18n.t('expandMore')}</Text>
                        <View style={styleM.expandTouch}>
                            <Image style={styleM.expandImg} source={Images.expand}/>
                        </View>
                    </View>
                </TouchableOpacity> : null}

            </View>
        )
    }
}
const styleM = StyleSheet.create({
    infoView: {
        marginTop: 10
    },
    infoName: {
        height: 40,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoLeft: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        fontWeight: 'bold'
    },
    infototal: {
        fontSize: 14,
        color: '#333333',
        marginRight: 17
    },
    infoImgView: {
        marginTop: 1,
        backgroundColor: '#FFFFFF'
    },
    renderItem: {
        flexDirection: 'row', backgroundColor: '#FFFFFF', paddingBottom: 11
    },
    mallImg: {
        width: 100,
        height: 96,
        marginLeft: 17,
        marginTop: 12,
    },
    TxtView: {
        flex: 1,
        marginLeft: 12,
        marginTop: 15,
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
        marginTop: 5,
        alignItems: 'center',

    },
    Price: {
        fontSize: 14,
        color: '#F34A4A',
    },
    originPrice: {
        fontSize: 12,
        color: '#AAAAAA',
        textDecorationLine: 'line-through',
        textDecorationColor: '#979797',
        marginLeft: 17
    },
    quantitys: {
        fontSize: 17,
        color: '#161718',
        marginRight: 17
    },
    returned: {
        backgroundColor: '#F34A4A',
        borderRadius: 2,
        width:65,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap:'nowrap',
        marginTop: 2
    },
    returnedTxt: {
        fontSize: 10,
        color: '#FFFFFF'
    },
    expandView: {
        height: 30,
        marginTop: 3,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    expandTxt: {
        fontSize: 14,
        color: '#333333',
    },
    expandTouch: {},
    expandImg: {
        width: 19,
        height: 10,
        marginLeft: 6
    }
})