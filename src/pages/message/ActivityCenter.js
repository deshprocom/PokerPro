/**
 * Created by lorne on 2017/9/5.
 */
import React, {PropTypes, Component}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, Text, ScrollView, TouchableOpacity,
    InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar} from '../../components';
import {convertDate, utcDate} from '../../utils/ComonHelper';
import {getActivities, getNotifications} from '../../services/AccountDao';

export default class ActivityCenter extends Component{

}