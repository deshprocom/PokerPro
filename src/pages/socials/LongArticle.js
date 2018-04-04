import React, {PureComponent} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import {reallySize} from "./Header";
import {ImageLoad, NavigationBar, UltimateListView} from '../../components'
import I18n from "react-native-i18n";
import {Colors, Images, Metrics} from '../../Themes';
import HTML from 'react-native-render-html';
import {topics_like, topics_details, topics_comments} from "../../services/SocialDao";
import {getDateDiff, showToast} from "../../utils/ComonHelper";
import {NoDataView} from '../../components/load';
import CommentBar from '../comm/CommentBar';
import {postComment} from '../../services/CommentDao'

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        color: Colors.txt_444,
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 12
    },
    avatar: {
        height: 44,
        width: 44,
        borderRadius: 22
    },
    nick_name: {
        fontSize: 15,
        color: Colors._666
    },
    time: {
        fontSize: 12,
        color: Colors._AAA
    },
    focus: {
        fontSize: 14,
        color: Colors.txt_444,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.txt_444
    },
    info: {
        width: '100%'
    },
    btn_like: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    like: {
        height: reallySize(15),
        width: reallySize(15)
    },
    comment: {
        fontSize: 14,
        color: Colors._AAA
    },
    c_avatar: {
        height: 38,
        width: 38,
        borderRadius: 19
    },
    c_nick: {
        color: '#4A90E2',
        fontSize: 12
    },
    c_time: {
        color: Colors._CCC,
        fontSize: 10
    },
    c_comment: {
        height: 18,
        width: 20
    },
    c_content: {
        fontSize: 14,
        color: Colors.txt_444
    },
    c_tag: {
        paddingRight: 7,
        paddingLeft: 7,
        color: 'white',
        fontSize: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    c_reply: {
        height: 20,
        width: '100%'
    },
    c_body: {
        fontSize: 16,
        color: Colors.txt_444,
        marginLeft: 54,
        marginTop: 6
    }
})

export default class LongArticle extends PureComponent {

    state = {
        comments_count: 0,
        article: this.props.params.article
    }

    componentDidMount() {
        const {id} = this.props.params.article;
        topics_details(id)
    }

    render() {
        const {id} = this.state.article;

        return <View style={{flex: 1, backgroundColor: 'white'}}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors._ECE}}
                title={'详情'}
                titleStyle={{color: Colors._333}}
                leftBtnIcon={Images.ic_back}
                leftImageStyle={{height: 20, width: 10, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.social.more_3}
                rightImageStyle={{height: 4, width: 20, marginLeft: 20, marginRight: 20}}/>


            <UltimateListView
                style={{marginBottom: 50}}
                header={() => this.flatHeader()}
                keyExtractor={(item, index) => index + "longArticle"}
                ref={(ref) => this.listView = ref}
                onFetch={this.onFetch}
                item={this.itemView}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                emptyView={() => {
                    return <NoDataView/>
                }}
            />

            <View style={{position: 'absolute', bottom: 0}}>
                <CommentBar
                    count={this.state.comments_count}
                    send={comment => {
                        let body = {
                            topic_type: 'user_topic',
                            topic_id: id,
                            body: comment
                        }
                        postComment(body, data => {
                            showToast(I18n.t('comment_success'));
                        }, err => {
                            showToast(err)
                        })
                    }}
                    share={() => {

                    }}
                    like={() => {

                        topics_like(id, data => {
                            let article = {...this.state.article};
                            article.likes = data.total_likes;
                            this.setState({
                                article
                            })

                        }, err => {
                            console.log(err)
                        })

                    }}
                        />
                        </View>


                        </View>
                        }

                    flatHeader=() => {


                const {user, created_at, likes, comments, id, body_type, body, title, page_views} = this.state.article;
                return <View>
                <View style={{paddingLeft: 17, paddingRight: 17, backgroundColor: 'white'}}>
                <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.btn_like}>
                <ImageLoad style={styles.avatar}
                source={{uri: user.avatar}}/>

                <View style={{marginLeft: 12}}>
                <Text style={styles.nick_name}>{user.nick_name}</Text>
                <Text style={[styles.time, {marginTop: 5}]}>{getDateDiff(created_at)}·深圳</Text>
                </View>

                <View style={{flex: 1}}/>

                <Text style={styles.focus}>关注</Text>

                </View>

                </View>


                <HTML
                imagesMaxWidth={Metrics.screenWidth - 34}
                html={body}
                tagsStyles={{
                    p: {
                        color: Colors.txt_444,
                        fontSize: 15,
                        lineHeight: 25,
                        marginTop: 14,
                        marginBottom: 14
                    }
                }}/>

                <View style={[styles.btn_like, {marginTop: 15}]}>
                <View style={{flex: 1}}/>

                <Text style={styles.time}>阅读</Text>
                <Text style={[styles.time, {marginLeft: 4, marginRight: 20}]}>{page_views}</Text>
                <View
                style={styles.btn_like}>
                <Image
                style={styles.like}
                source={Images.social.like_gray}/>
                <Text style={[styles.time, {marginLeft: 4}]}>{likes}</Text>
                </View>

                </View>

                <View style={[styles.btn_like, {
                    height: 44, width: '100%',
                    borderTopWidth: 1, borderTopColor: Colors._ECE,
                    marginTop: 10
                }]}>
                <Text style={styles.comment}>{`全部评论 (${this.state.comments_count})`}</Text>
                </View>

                </View>
                <View style={{height: 1, backgroundColor: Colors._ECE}}/>
                </View>
            }

                  onFetch=(page = 1, startFetch, abortFetch) => {
                const {id} = this.props.params.article;
                topics_comments(id, data => {
                startFetch(data.items, 15)
                this.setState({
                comments_count: data.comments
            })
            }, err => {
                abortFetch()
            }, {page, page_size: 20})
            }

                  itemView=(item) => {
                const {
                avatar, nick_name, created_at, official,
                recommended, body
            } = item;
                return <View style={{
                    width: '100%', paddingLeft: 17, paddingRight: 17,
                    paddingTop: 12
                }}>
                <View style={styles.btn_like}>
                <ImageLoad style={styles.c_avatar}
                source={{uri: avatar}}/>

                <View style={{marginLeft: 10}}>
                <Text style={styles.c_nick}>{nick_name}</Text>
                <Text style={[styles.c_time, {marginTop: 5}]}>{getDateDiff(created_at)}</Text>
                </View>

                {official ? <Text style={[styles.c_tag, {
                    backgroundColor: '#161718',
                    color: '#FFE9AD'
                }]}>官方</Text> : null}

                {recommended ? <Text style={[styles.c_tag, {
                    backgroundColor: '#161718',
                    color: '#FFE9AD'
                }]}>精选</Text> : null}

                <View style={{flex: 1}}/>

                <Image style={styles.c_comment}
                source={Images.social.reply}/>


                </View>

                <Text style={styles.c_body}>{body}</Text>

                <TouchableOpacity style={{
                    height: 20,
                    backgroundColor: '#ECECEE',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 54,
                    marginTop: 8
                }}>
                <Text style={[styles.c_nick, {marginLeft: 6}]}>查看34条回复></Text>

                </TouchableOpacity>

                <View style={{height: 1, backgroundColor: Colors._ECE, marginTop: 8}}/>


                </View>

            }
                }