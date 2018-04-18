import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Platform,
    TouchableOpacity,
    Text,
} from 'react-native';
import I18n from "react-native-i18n";
import {Colors, Images, ApplicationStyles, Metrics} from "../../Themes";
import {NavigationBar} from '../../components';
import ErrLocation from '../comm/ErrLocation';
import {getNearBys, postNearBys} from '../../services/SocialDao'
import {getDateDiff} from '../../utils/ComonHelper'

const styles = StyleSheet.create({
    avatar: {
        height: 54,
        width: 54,
        borderRadius: 54
    },
    name: {
        fontSize: 15,
        color: Colors._333
    },
    time: {
        fontSize: 12,
        color: Colors._AAA
    },
    gender: {
        height: 9,
        width: 9
    }
})

export default class NearFriend extends PureComponent {

    state = {
        geolocation: true,
        nearby_users: [],
        refreshing: false

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(data => {
            console.log('位置坐标：', data)
            if (Platform.OS === 'ios') {
                const {coords} = data;
                postNearBys(coords, data => {
                    console.log('更新位置', data)

                    getNearBys(ret => {
                        console.log('获取附近', ret)
                        this.setState({
                            nearby_users: ret.nearby_users
                        })
                    }, err => {
                    })
                }, err => {

                })
            }

        }, err => {
            this.setState({
                geolocation: false
            })
        })

    }


    render() {
        return <View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                barStyle={'dark-content'}
                titleStyle={{color: Colors._333}}
                toolbarStyle={{backgroundColor: 'white'}}
                title={'附近牌友'}
                leftBtnIcon={Images.social.back}
                leftImageStyle={{height: 19, width: 10, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            {this.state.geolocation ? <FlatList
                refreshing={this.state.refreshing}
                data={this.state.nearby_users}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `near` + index}
                ListEmptyComponent={() => <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 100
                }}>
                    <Text>附近没有人</Text>
                </View>}
                onRefresh={() => {
                    console.log('onRefresh')
                }
                }
            /> : <ErrLocation/>}

        </View>
    }

    renderItem = ({item}) => {
        const {nick_name, gender, avatar, signature, distance} = item;
        let sex = gender === 0 ? Images.social.male : gender === 1 ? Images.woman : "";

        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.avatar}
                   defualtSource={Images.home_avatar}
                   source={{uri: avatar}}/>

            <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>{nick_name}</Text>
                    <Image
                        source={sex}
                        style={styles.gender}/>
                </View>

                <Text>{`${distance} | 时间`}</Text>
            </View>

            <Text style={{
                fontSize: 12, color: Colors._888,
                backgroundColor: Colors._ECE, padding: 5,
                borderRadius: 5,
                maxHeight: 54,
                maxWidth: 110,
                marginRight: 17
            }}>{signature}</Text>

        </View>
    }
}