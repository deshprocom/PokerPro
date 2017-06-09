/**
 * Created by lorne on 2017/6/9.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    TouchableOpacity, ScrollView,
    Animated, StatusBar, InteractionManager,
    Image
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {UltimateListView, NavigationBar, ImageLoad, ActionSide} from '../../components';


export default class TicketInfoPage extends Component {

    state = {
        opacity: 0
    };


    render() {
        return ( <View
            testID="page_ticket"
            style={ApplicationStyles.bgContainer}>

            {this._topBar()}

            <ScrollView
                onScroll={this._onScroll}
            >

                <Image
                    source={Images.empty_image}
                    style={styles.imgLogo}>



                </Image>


            </ScrollView>

        </View>)

    }

    _topBar = () => {
        const {opacity} = this.state;
        return ( <View style={[styles.topBar,{ backgroundColor: 'rgba(0,0,0,'+opacity+')'}]}>
            <StatusBar barStyle="dark-content"/>
            <TouchableOpacity
                testID="btn_bar_left"
                onPress={()=>router.pop()}
                style={styles.topBtn}
                activeOpacity={1}>
                <Image
                    source={Images.ic_back}
                    style={styles.topImgLeft}/>

            </TouchableOpacity>

        </View>)
    };


    _onScroll = (event) => {
        let offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= 220) {
            let opacity = offsetY / 220;
            this.setState({opacity: opacity});
        } else {
            this.setState({opacity: 1});
        }


    };
}

const styles = StyleSheet.create({
    topImgLeft: {height: 19, width: 11, marginLeft: 20, marginRight: 20},
    topBtn: {
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 3,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight
    },
    imgLogo: {
        height: 220
    }
});