import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView, Platform
} from 'react-native';
import {Images, ApplicationStyles, Metrics, Colors} from "../../Themes";
import I18n from "react-native-i18n";
import {NavigationBar} from '../../components';
import PersonDynamicPage from '../comment/PersonDynamicPage'

const styles = StyleSheet.create({
    topBar: {
        width: Metrics.screenWidth,
        alignItems: 'center',
        backgroundColor: Colors._161,
        height: 280
    },
    person1: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: '#FFE9AD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 6
    },
    follow: {
        color: Colors._CCC,
        fontSize: 14
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 12, width: 1, backgroundColor: '#979797',
        marginLeft: 9, marginRight: 9
    },
    intro: {
        fontSize: 12,
        color: Colors._AAA,
        marginTop: 7
    },
    btn_follow: {
        height: 28,
        width: 120,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#979797',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default class UserTopicPage extends PureComponent {

    render() {
        return <ScrollView>
            <View style={styles.topBar}>
                <Image
                    style={{position: 'absolute', height: 280, width: '100%'}}
                    source={Images.social.user_topic}/>

                <NavigationBar
                    barStyle={'light-content'}
                    rightBtnIcon={Images.social.more_4}
                    rightImageStyle={{height: 4, width: 28}}
                    leftBtnIcon={Images.sign_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <View
                    style={styles.person1}>
                    <Image style={{width: 72, height: 72, borderRadius: 36}}
                           source={Images.home_avatar}/>
                </View>

                <Text style={styles.name}>Deshpro</Text>

                <View style={[styles.row, {marginTop: 7}]}>
                    <Text style={styles.follow}>关注 2000</Text>
                    <View style={styles.line}/>
                    <Text style={styles.follow}>粉丝 2000</Text>
                </View>

                <Text style={styles.intro}>简介：职业德州教学 WX：2324245</Text>


                <View style={[styles.row, {marginTop: 17, marginBottom: 17}]}>
                    <TouchableOpacity
                        style={[styles.btn_follow, {marginRight: 26}]}>
                        <Text style={styles.follow}>{I18n.t('rank_focus')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn_follow, styles.row]}>
                        <Image style={{height: 14, width: 15, marginRight: 3}}
                               source={Images.social.reply}/>
                        <Text style={styles.follow}>私信</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <PersonDynamicPage
                params={this.props.params}/>

        </ScrollView>
    }
}