import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {strNotNull, util} from '../../utils/ComonHelper';
import CommentBottom from './CommentBottom';
import CommentItem from './CommentItem';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getReplies} from '../../services/CommentDao';

export default class CommentInfoPage extends Component {
    state = {
        totalComment: 0
    };

    _separator = () => {
        return <View style={{height: 1, marginLeft: 68, marginRight: 17, backgroundColor: '#DDDDDD'}}/>;
    };


    refreshList = () => {
        this.ultimate && this.ultimate.onRefresh();
    };

    componentDidMount() {
        const {item} = this.props.params;
        this.commentBottom && this.commentBottom.setNewsInfo(item)
    }


    render() {
        const {item} = this.props.params;

        return (
            <BaseComponent>
                <NavigationBar
                    barStyle={'dark-content'}
                    toolbarStyle={{backgroundColor: 'white'}}
                    leftBtnIcon={Images.mall_return}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 17, marginRight: 20}}
                    leftBtnPress={() => router.pop()}
                    titleStyle={{color: Colors._161}}
                    title={I18n.t('comment_info')}/>

                <View style={{backgroundColor: '#FFFFFF', paddingBottom: 10, marginTop: 1}}>
                    <CommentItem
                        refreshList={this.refreshList}
                        repliesReFunc={() => {
                            this.repliesReFunc(item, CommentBottom.replies)
                        }}
                        item={item}/>
                </View>

                <UltimateFlatList
                    header={() => {
                        return <Text style={styles.allComment}>{I18n.t('all_comment')}（{this.state.totalComment}）</Text>
                    }}
                    arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                    ref={ref => this.ultimate = ref}
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) => `replies${index}`}
                    item={this.renderItem}
                    refreshableTitlePull={I18n.t('pull_refresh')}
                    refreshableTitleRelease={I18n.t('release_refresh')}
                    dateTitle={I18n.t('last_refresh')}
                    allLoadedText={I18n.t('no_more')}
                    waitingSpinnerText={I18n.t('loading')}
                    separator={this._separator}
                    pagination={false}
                />
                <View style={{height: 60}}/>
                <View style={styles.bottom}>
                    <CommentBottom
                        onlyComment={true}
                        refreshList={this.refreshList}
                        ref={ref => this.commentBottom = ref}
                        info={item}
                        topic_type={CommentBottom.replies}/>
                </View>
            </BaseComponent>
        )
    }

    repliesReFunc = (item, repliesType) => {
        this.commentBottom && this.commentBottom.repliesBtn(item, repliesType)
    };

    renderItem = (item, index) => {
        return (<CommentItem
            refreshList={this.refreshList}
            repliesReFunc={this.repliesReFunc}
            commentType={CommentItem.RepliesReplies}
            item={item}/>)
    };

    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            getReplies({comment_id: this.props.params.item.id}, data => {
                console.log("replies:", data);
                this.setState({
                    totalComment: data.total_count
                });
                postRefresh(data.items, 9);
            }, err => {
                endFetch()
            });

        }

    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
    },
    allComment: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 17,
        marginTop: 11,
        marginBottom: 10
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }

});