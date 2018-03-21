/**
 * Created by lorne on 2017/4/25.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput, FlatList,
    StyleSheet, Image, Text, Platform
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class RaceTypeView extends Component {



    render() {
        const {dataHosts, selectAll} = this.props;
        return (<View
            testID="page_race_hosts"
            style={styles.container}>
            <View style={styles.content}>

                <TouchableOpacity
                    onPress={this.props.pressAll}
                    style={styles.all}>
                    <Text style={styles.allTxt}>{I18n.t('AllGame')}</Text>

                    <Image style={styles.typeSelect}
                           source={selectAll ?
                               Images.race_type_selected :
                               Images.race_type_unselect}/>

                </TouchableOpacity>

                <View style={styles.listView}>
                    <FlatList
                        ItemSeparatorComponent={this._itemSeparatorComponent}
                        keyExtractor={item => item.id}
                        data={dataHosts}
                        renderItem={this._itemListView}/>
                </View>


                <View style={styles.all}>
                    <Text />

                    <TouchableOpacity
                        testID="btn_hosts_complete"
                        onPress={() => this.props.pressHostOk()}
                        style={styles.completeView}>
                        <Text style={styles.completeTxt}>{I18n.t('Finsh')}</Text>
                    </TouchableOpacity>


                </View>


            </View>

            <View style={styles.btnBottom}/>

        </View>)
    }


    _itemSeparatorComponent = () => {
        return <View style={styles.itemSeparator}/>
    };


    _itemListView = ({item}) => {

        return (<TouchableOpacity
            testID={'btn_host_' + item.id}
            onPress={() => this.props.pressItem(item)}
            style={styles.itemListView}>
            <Text style={styles.allTxt}>{item.name}</Text>

            <Image style={styles.typeSelect}
                   source={item.select ?
                       Images.race_type_selected :
                       Images.race_type_unselect}/>


        </TouchableOpacity>)
    };


}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Metrics.navBarHeight,
        flex: 1,
        zIndex: 4
    },
    btnBottom: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 300
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    all: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Metrics.screenWidth,
        backgroundColor: Colors.bg_ec
    },
    allTxt: {
        fontSize: 17,
        color: Colors._161817,
        marginLeft: 20
    },
    typeTxt: {
        fontSize: 15,
        color: Colors._161817
    },
    typeSelect: {
        height: 19,
        width: 19,
        marginRight: 25
    },
    itemListView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Metrics.screenWidth,

    },
    itemSeparator: {
        height: 1,
        backgroundColor: Colors.bg_ec,
        marginLeft: 20
    },
    listView: {
        height: 265
    },
    completeTxt: {

        color: '#d9cb7a',
        fontSize: 15

    },
    completeView: {
        width: 60,
        height: 27,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        backgroundColor: Colors._161817
    }

});