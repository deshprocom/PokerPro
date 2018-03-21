/**
 * Created by lorne on 2017/1/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View,
    ListView, TouchableOpacity, Image
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {BtnLong} from '../components';

export default class LoadErrorPage extends Component {

    static propTypes = {
        btnRefresh: PropTypes.func
    }

    render() {
        return (
            <View style={{
                height: 200, alignItems: 'center',
                justifyContent: 'center'
            }}>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{height: 64, width: 64}}
                           source={Images.home_fail}/>

                    <Text style={{
                        fontSize: 19, marginTop: 21,
                        color: '#2d2e30'
                    }}>{I18n.t('load_error')}</Text>

                    <BtnLong
                        name={I18n.t('retry')}
                        onPress={() => this.props.btnRefresh()}
                        touchableType={Button.constants.touchableTypes.fadeContent}
                        testID="btn_refresh"
                        textStyle={{color: '#2D2E30', fontSize: 17}}
                        style={{
                            borderColor: '#2D2E30', borderWidth: 1,
                            height: 41, width: 240, marginTop: 21, justifyContent: 'center'
                        }}/>


                </View>

            </View>
        )
    }
}