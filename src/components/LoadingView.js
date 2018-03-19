/**
 * Created by lorne on 2017/3/3.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ListView, Platform,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
} from 'react-native';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import I18n from 'react-native-i18n'

export function _renderHeader(viewState, headerStyle) {
    let {pullState, pullDistancePercent} = viewState
    let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
    pullDistancePercent = Math.round(pullDistancePercent * 100)
    switch (pullState) {
        case refresh_none:
            return (
                <View
                    style={headerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>{I18n.t('pull_refresh')}</Text>
                </View>
            )
        case refresh_idle:
            return (
                <View
                    style={headerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>{I18n.t('pull_refresh')}</Text>
                </View>
            )
        case will_refresh:
            return (
                <View
                    style={headerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>释放刷新</Text>
                </View>
            )
        case refreshing:
            return (
                <View
                    style={[headerStyle, {flexDirection: 'row'}]}>
                    {_renderActivityIndicator()}<Text
                    style={[Fonts.H15, {color: Colors._AAA}]}>{I18n.t('loading')}</Text>
                </View>
            )
    }
}

export function _renderFooter(viewState, footerStyle) {
    let {pullState, pullDistancePercent} = viewState
    let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState
    pullDistancePercent = Math.round(pullDistancePercent * 100)
    switch (pullState) {
        case load_more_none:
            return (
                <View
                    style={footerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>{I18n.t("pull_up_refresh")}</Text>
                </View>
            )
        case load_more_idle:
            return (
                <View
                    style={footerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>{I18n.t("pull_up_refresh")}</Text>
                </View>
            )
        case will_load_more:
            return (
                <View
                    style={footerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>释放加载</Text>
                </View>
            )
        case loading_more:
            return (
                <View
                    style={[{flexDirection: 'row'}, footerStyle]}>
                    {_renderActivityIndicator()}<Text
                    style={[Fonts.H15, {color: Colors._AAA}]}>{I18n.t('loading')}</Text>
                </View>
            )
        case loaded_all:
            return (
                <View
                    style={footerStyle}>
                    <Text style={[Fonts.H15, {color: Colors._AAA}]}>no more</Text>
                </View>
            )
    }
}

function _renderActivityIndicator() {
    return ActivityIndicator ? (
        <ActivityIndicator
            style={{marginRight: 10,}}
            animating={true}
            color={'#AAAAAA'}
            size={'small'}/>
    ) : Platform.OS == 'android' ?
        (
            <ProgressBarAndroid
                style={{marginRight: 10,}}
                color={'#AAAAAA'}
                styleAttr={'Small'}/>

        ) : (
            <ActivityIndicatorIOS
                style={{marginRight: 10,}}
                animating={true}
                color={'#AAAAAA'}
                size={'small'}/>
        )
}