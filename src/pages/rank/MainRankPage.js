import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Colors, Images, Metrics} from '../../Themes'
import {NavigationBar} from '../../components';
import RankList from './RankList';

export default class MainRankPage extends Component {
    static propTypes = {
        openRank: PropTypes.func
    };

    topHeader = () => {
        return (<View style={styles.header_bar}>
            <TouchableOpacity onPress={() => router.pop()}
                              style={styles.topBtn}>
                <Image source={Images.sign_return}
                       style={styles.back_image}/>
            </TouchableOpacity>

            <View style={styles.topBtn}></View>

            <View style={styles.header_title}>
                <Text style={styles.title_color}>排行榜</Text>
            </View>

            <View style={styles.right_btn}>
                <TouchableOpacity onPress={()=> this.props.openRank()}
                                  style={styles.topBtn}>
                    <Image source={Images.race_type}
                           style={styles.right_image1}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    router.toFocusPlayer()
                }}
                                  style={styles.topBtn}>
                    <Image source={Images.shape}
                           style={styles.right_image2}/>
                </TouchableOpacity>
            </View>
        </View>)
    };

    render() {
        return (<View>
            {this.topHeader()}
            <RankList/>
        </View>)
    };

}

const styles = StyleSheet.create({
    header_bar: {
        width: Metrics.screenWidth,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.bg_09,
        paddingTop: Metrics.statusBarHeight
    },
    topBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    back_image: {
        height: 19,
        width: 11
    },
    header_title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_color: {
        color: Colors.txt_E0C,
        fontSize: 18
    },
    right_btn: {
        flexDirection: 'row',
        height: 44,
        marginRight: 10
    },
    right_image1: {
        width: 20,
        height: 20
    },
    right_image2: {
        width: 20.9,
        height: 20
    }
})