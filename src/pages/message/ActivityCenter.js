/**
 * Created by lorne on 2017/9/5.
 */
import React, { Component} from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    FlatList, View, Text, ScrollView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, UltimateListView} from '../../components';
import {getDateDiff, strNotNull} from '../../utils/ComonHelper';


export default class ActivityCenter extends Component {

    render() {
        const {activities} = this.props.params;
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                title="活动中心"
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <FlatList
                keyExtractor={(item, index) => index+"item"}
                renderItem={this._renderItem}
                data={activities}

            />

        </View>)
    }

    _renderItem = ({item}) => {
        return (<TouchableOpacity
            onPress={() => {
                if (strNotNull(item.link))
                    router.toWebViewPage(this.props, item.link)
                else
                    router.toActivityInfo(this.props, item);
            }}
            activeOpacity={0.5}
            style={styles.listItem}>
            <Image style={styles.banner}
                   source={{uri: item.banner}}
            />
            <View style={styles.content}>
                <Text
                    numberOfLines={2}
                    style={styles.title}>{item.title}</Text>
                <View style={styles.typeTimeBar}>
                    <Text style={styles.desc}>{item.tag}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.time}>{getDateDiff(item.activity_time)}</Text>
                </View>


                <View style={styles.line}/>

            </View>

        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white'
    },
    banner: {
        height: 212,
        width: '100%',
        resizeMode: 'cover',
        backgroundColor: Colors._ECE
    },
    content: {
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 13,
        paddingBottom: 9,
        minHeight: 78
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors._333,
        marginRight: 60
    },
    desc: {
        fontSize: 12,
        color: Colors._AAA,

    },
    line: {
        height: 1,
        backgroundColor: Colors._ECE,
        marginTop: 12
    },
    time: {
        fontSize: 12,
        color: Colors._AAA,
    },
    typeTimeBar: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }

});