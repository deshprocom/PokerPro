import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, util} from '../../utils/ComonHelper';
import CommentBottom from './CommentBottom';
import CommentItem from './CommentItem';
import {NavigationBar} from '../../components';

export default class CommentInfoPage extends Component {
    state:{

    };
    _renderItem=()=>{
        return(
            <CommentItem/>
        )
    };

    _separator = () => {
        return <View style={{height: 0.5, marginLeft: 68, marginRight: 17, backgroundColor: '#DDDDDD'}}/>;
    };

    render(){
        let dataHosts =[1,2,3,4,5,6,7,8];
        return(
            <View style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('comment_info')}/>

                <CommentItem/>

                <ScrollView  style={{backgroundColor:'#ECECEE',marginBottom:80}}>

                    <Text style={styles.allComment}>全部评论（333）</Text>
                    <FlatList
                        style={{marginTop: 16,backgroundColor:'#ECECEE'}}
                        data={dataHosts}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => `comment${index}`}
                    />

                    <View style={{height:80}}/>

                </ScrollView>
                <CommentBottom/>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        marginTop:1,
    },
    allComment:{
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft:17,
        marginTop:11
    }

});