import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {getActivityInfo} from '../../services/AccountDao';
import {NavigationBar, MarkdownPlat} from '../../components';
import {uShareActivity} from '../../utils/ComonHelper';

export default class ActivityInfo extends Component {

    state = {
        description: '',
        title: ''
    };

    componentDidMount() {
        const {activity} = this.props.params;
        getActivityInfo({id: activity.id}, data => {
            const {description} = data.activity;
            this.setState({
                description: description
            })
        }, err => {

        })
    }

    render() {
        const {activity} = this.props.params;
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                title={activity.title}
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                router={router}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.share}
                rightImageStyle={{height: 22, width: 23, marginRight: 24.8}}
                rightBtnPress={() => {
                    alert(22);
                    // uShareActivity(activity.title,activity.tag,activity.banner,activity.id)
                }}/>
            <MarkdownPlat
                markdownStr={this.state.description}
            />
        </View>)
    }
}