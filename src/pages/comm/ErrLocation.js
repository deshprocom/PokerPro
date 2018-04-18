import React, {PureComponent} from 'react';
import {
    TouchableOpacity, ScrollView,
    StyleSheet, Platform,
    Text, Image,
    View, Linking
} from 'react-native';
import {Images, Colors, Metrics, ApplicationStyles} from '../../Themes';


const styles = StyleSheet.create({
    txt1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.txt_444
    },


})

export default class ErrLocation extends PureComponent {


    render() {
        return <View style={{
            flex: 1, backgroundColor: Colors._ECE,
            alignItems: 'center'
        }}>

            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.txt_444,
                marginTop: 120
            }}>无法获取你的位置信息</Text>

            <TouchableOpacity
                onPress={() => {
                    Linking.openURL('prefs:root=LOCATION_SERVICES')
                }}>
                <Text
                    style={{
                        fontSize: 14, color: Colors.txt_444, marginLeft: 40, marginRight: 40,
                        marginTop: 36, textAlign: 'center', lineHeight: 20
                    }}
                >请到手机系统的<Text style={{color: 'blue'}}>【设置】</Text>-【定位服务】中打开定位服务，并允许扑客使用定位服务</Text>
            </TouchableOpacity>


        </View>
    }
}