import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {strNotNull, util} from '../../utils/ComonHelper';
import CommentBottom from './CommentBottom';
import CommentItem from './CommentItem';
import ReleaseCommentInfo from './ReleaseCommentInfo';
import {NavigationBar} from '../../components';

export default class CommentInfoPage extends Component {
    state={
        releaseShow:false
    };

    releaseInfo = () => {
        this.setState({
            releaseShow: !this.state.releaseShow
        });
        console.log("releaseShow:",this.state.releaseShow);
    };

    _renderItem=()=>{
        return(
            <CommentItem releaseInfo={this.releaseInfo}/>
        )
    };
    _separator = () => {
        return <View style={{height: 1, marginLeft: 68, marginRight: 17, backgroundColor: '#DDDDDD'}}/>;
    };

    _renderBottomNav = () => {
        const {bottomNav, info} = this.props.params.item;
        if (strNotNull(bottomNav)) {
            switch (bottomNav) {
                case 'commentNav':
                    return <CommentBottom
                        ref={ref => this.commentNav = ref}
                        topic_type={'info'}
                        info={info}/>

            }
        }
    };

    render(){
        let dataHosts =[1,2,3,4,5,6,7,8];
        const{releaseShow} = this.state;
        const {bottomNav, info} = this.props.params.item;
        console.log("item:",this.props.params.item);
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

                <View style={{backgroundColor:'#FFFFFF',marginTop:1,paddingBottom:16}}>
                    <CommentItem releaseInfo={this.releaseInfo}/>
                </View>

                {this._renderBottomNav()}

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

                {releaseShow ? <ReleaseCommentInfo
                        releaseInfo={this.releaseInfo}/> : null}
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