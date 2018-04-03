import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import I18n from "react-native-i18n";
import {Colors,Images} from "../../Themes";
import {NavigationBar} from '../../components';
import {isEmptyObject,utcDate,strNotNull} from '../../utils/ComonHelper';
import {reallySize} from "./Header";

export default class MoodRelease extends Component{
    render(){
        return(
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar barStyle={'dark-content'}
                               titleStyle={{fontSize: 17, color: Colors._333}}
                               toolbarStyle={{backgroundColor: 'white'}}
                               title={I18n.t('article_list')}
                               leftBtnIcon={Images.set_back}
                               leftImageStyle={{height:19,width:11, marginLeft: 20, marginRight: 20}}
                               leftBtnPress={() => {
                                   router.pop()
                               }}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
    },
});