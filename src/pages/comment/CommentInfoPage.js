import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {strNotNull, util} from '../../utils/ComonHelper';
import CommentBottom from './CommentBottom';
import CommentItem from './CommentItem';
import ReleaseCommentInfo from './ReleaseCommentInfo';
import {NavigationBar} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {BaseComponent} from '../../components';
import {postRelaies} from '../../services/CommentDao';

export default class CommentInfoPage extends Component {
    state={
        releaseShow:false
    };

    releaseInfo = () => {
        this.setState({
            releaseShow: !this.state.releaseShow
        });
    };

    _renderItem=(item, index)=>{
        return(
           <Text>{index}</Text>
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
    load = (body, postRefresh, endFetch) => {
        postRelaies(body, data => {
            this.contain && this.contain.close();
            this.next_id = data.next_id;
            console.log("data:",data)
            postRefresh(data.items, 6);

        }, err => {
            this.contain && this.contain.close();
            endFetch();
        });
    };
    onFetch = (page, postRefresh, endFetch) => {

        if (page === 1) {

           postRefresh([1,2,3,4,5],4)
        } else {
            this.load({
                next_id: this.next_id,
                status: this.props.status
            }, postRefresh, endFetch)
        }

    };

    render(){


        const{releaseShow} = this.state;
        const {item} = this.props.params;
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
                    <CommentItem releaseInfo={this.releaseInfo}
                                 item={item}/>
                </View>

                {this._renderBottomNav()}




                    <UltimateFlatList
                        header={()=>{
                            return  <Text style={styles.allComment}>全部评论（333）</Text>
                        }}
                        arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                        ref={ref => this.ultimate = ref}
                        onFetch={this.onFetch}
                        keyExtractor={(item, index) => `${this.props.status}${index}`}
                        item={this._renderItem}
                        refreshableTitlePull={I18n.t('pull_refresh')}
                        refreshableTitleRelease={I18n.t('release_refresh')}
                        dateTitle={I18n.t('last_refresh')}
                        allLoadedText={I18n.t('no_more')}
                        waitingSpinnerText={I18n.t('loading')}
                    />

                    <View style={{height:80}}/>



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