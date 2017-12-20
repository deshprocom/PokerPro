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


    render() {
        const {item} = this.props.params;
        console.log('CommentItem', item)

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
                        item={item}/>
                </View>

                <UltimateFlatList
                    header={() => {
                        return <Text style={styles.allComment}>全部评论（{this.state.totalComment}）</Text>
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
                />

                <CommentBottom
                    info={item}
                    topic_type={CommentBottom.replies}/>
            </BaseComponent>
        )
    }

    renderItem = (item, index) => {
        return (
            <View>
                <CommentItem item={item}/>
            </View>
        )
    };

    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            getReplies({comment_id: this.props.params.item.id}, data => {
                console.log("replies:", data);
                this.setState({
                    totalComment: data.total_count
                });
                postRefresh(data.items, 6);
            }, err => {
                endFetch()
            });

        } else {

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
    }

});