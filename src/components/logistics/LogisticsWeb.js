/**
 * Created by lorne on 2017/11/22.
 */
import React, {Component} from 'react';
import {
    View, WebView, StyleSheet, Text, ActivityIndicator,
    Platform, TouchableOpacity
} from 'react-native';
import {NavigationBar} from '../../components';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';

export default class LogisticsWeb extends Component {


    render() {
        const source = (Platform.OS === 'ios') ? require('./LogisticsHtml.html')
            : {uri: 'file:///android_asset/pages/demo.html'};

        return <View style={{flex: 1}}>
            {this.topBarView()}
            <WebView

                ref={(ref) => {
                    this.webView = ref
                }}
                style={styles.webView}
                scalesPageToFit={true}
                source={require('./LogisticsHtml.html')}
                renderLoading={this._renderLoading}
                renderError={this._renderError}
                startInLoadingState={true}
                injectedJavaScript={this.bootstrapJS()}
            />
        </View>
    }

    topBarView = () => {

        return (
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                title={I18n.t('app_name')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
            />)

    };

    bootstrapJS() {
        const {shipments} = this.props.params;
        console.log(shipments);
        const data = {
            serviceType: "A",
            expCode: shipments.express_code,
            expNo: shipments.shipping_number,
        };
        return `init(${JSON.stringify(data)})`
    }

    _renderLoading = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={Colors._CCC} size="large"/>

            </View>
        );
    }

    _renderError = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.webView.reload();
                }}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> 出错了, 重新刷新下吧～</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    webView: {
        flex: 1
    },
    barTitle: {
        fontSize: 18,
        color: Colors._161817
    },
});