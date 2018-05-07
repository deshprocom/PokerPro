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
import {
    topics_like, topics_details, topics_comments,
    follow, report_topic
} from "../../services/SocialDao";
import {
    getDateDiff, isEmptyObject, showToast, strNotNull,
    alertOrder, isFollowed, sharePage, shareHost
} from "../../utils/ComonHelper";
import CommentBar from '../comm/CommentBar';
import {postComment, postRelaies, delDeleteComment} from '../../services/CommentDao'
import PopAction from '../comm/PopAction';
import LoadingView from "../../components/load/LoadingView";

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        color: Colors.txt_444,
        fontWeight: 'bold',
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
    },
    btn_focus: {
        height: 26,
        width: 80,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.txt_444,
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        width: '100%',
        paddingLeft: 17,
        paddingRight: 17
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
        paddingBottom: 2,
        marginLeft: 8,
        borderRadius: 2
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
    },
    long_cover: {
        height: reallySize(200),
        width: '100%',
        marginTop: reallySize(10)
    },
    short_image: {
        height: 108,
        width: 108,
        marginTop: 9,
        marginLeft: 9
    },
    body: {
        color: Colors.txt_444,
        fontSize: 16,
        marginLeft: 17,
        marginRight: 17,
        marginTop: 10
    }
})

export default class LongArticle extends PureComponent {

    state = {
        comments_count: 0,
        article: {},
        followed: false
    }

    componentDidMount() {
        this.comment_id = '';
        const {article, isComment} = this.props.params;

        topics_details(article.id, data => {
            this.setState({
                article: data
            })
        });
        if (isComment) {
            setTimeout(() => {
                this.commentBar && this.commentBar.showInput()
            }, 500)

        }
        this.setState({
            followed: isFollowed(article.user.user_id)
        })
    }

    render() {
        const {id, title, user, cover_link, is_like, body, body_type} = this.state.article;

        if (isEmptyObject(this.state.article)) {
            return <LoadingView/>
        }

        return <View style={{flex: 1, backgroundColor: 'white'}}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors._ECE}}
                title={I18n.t('social.detail')}
                titleStyle={{color: Colors._333}}
                leftBtnIcon={Images.ic_back}
                leftImageStyle={{height: 20, width: 10, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.social.more_3}
                rightImageStyle={{height: 4, width: 20, marginLeft: 20, marginRight: 20}}
                rightBtnPress={() => {
                    this.popAction && this.popAction.toggle();
                }}/>


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
            />

            <View style={{position: 'absolute', bottom: 0}}>
                <CommentBar
                    placeholder={strNotNull(this.comment_id) ?
                        I18n.t('reply') : I18n.t('write_comment')}
                    isLike={is_like}
                    ref={ref => this.commentBar = ref}
                    count={this.state.comments_count}
                    send={comment => {

                        if (strNotNull(this.comment_id)) {

                            postRelaies({comment_id: this.comment_id, body: comment},
                                data => {
                                    this.comment_id = '';
                                    showToast(I18n.t('reply_success'));
                                    this.listView && this.listView.refresh()
                                }, err => {
                                })


                        } else {
                            let body = {
                                topic_type: 'user_topic',
                                topic_id: id,
                                body: comment
                            };
                            postComment(body, data => {
                                showToast(I18n.t('comment_success'));
                                this.listView && this.listView.refresh()
                            }, err => {
                                showToast(err)
                            })
                        }

                    }}
                    share={() => {

                        sharePage(user.nick_name,
                            body_type === 'short' ? body : title, user.avatar, shareHost() + 'topics/' + id)
                    }}
                    like={() => {

                        topics_like(id, data => {
                            let article = {...this.state.article};
                            article.likes = data.total_likes;
                            article.is_like = !is_like;
                            this.setState({
                                article
                            })

                        }, err => {
                            console.log(err)
                        })

                    }}
                />
            </View>

            <PopAction
                ref={ref => this.popAction = ref}
                btnArray={this.popActions()}/>


        </View>
    }

    //举报原因
    report = (index) => {
        const {id} = this.state.article;
        let reportList = global.reportList;
        let data = reportList[index];
        let body = {
            "body": data.name,
        };
        report_topic(id, body, (ret) => {
            showToast(I18n.t('report_success'));
        }, (err) => {
            console.log(err);
        });
        this.popAction && this.popAction.toggle();
    };

    //弹窗
    popActions = () => {
        let reportList = global.reportList;
        let resultArray = [];
        reportList.forEach((data, index) => {
            let item = {name: data.name, txtStyle: {color: '#4A90E2'}, onPress: () => this.report(index)};
            resultArray.push(item);
        });
        resultArray.push({
            name: I18n.t('cancel'),
            txtStyle: {color: Colors._AAA},
            onPress: () => this.popAction.toggle()
        });

        return resultArray;
    };

    //长帖 个人信息
    flatHeader = () => {


        const {
            user, created_at, likes, comments, id, body_type,
            body, title, page_views, location, is_like
        } = this.state.article;
        const {address_title} = location;
        return <View>
            <View style={{backgroundColor: 'white'}}>
                <View style={styles.info}>
                    {strNotNull(title) ? <View style={{height: 46, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.title}>{title}</Text>
                    </View> : <View style={{height: 15}}/>}


                    <View style={styles.btn_like}>
                        <TouchableOpacity
                            onPress={() => {
                                this.toUserPage(user)
                            }}>
                            <ImageLoad
                                emptyBg={Images.home_avatar}
                                style={styles.avatar}
                                source={{uri: user.avatar}}/>
                        </TouchableOpacity>


                        <View style={{marginLeft: 12}}>
                            <Text
                                onPress={() => {
                                    this.toUserPage(user)
                                }}
                                style={styles.nick_name}>{user.nick_name}</Text>
                            <Text
                                style={[styles.time, {marginTop: 5}]}
                            >{getDateDiff(created_at)}{strNotNull(address_title) ? `·${address_title}` : ""}</Text>
                        </View>

                        <View style={{flex: 1}}/>

                        {this.isMine(user.user_id) ? null : <TouchableOpacity
                            onPress={() => {
                                follow(this.state.followed, {target_id: user.user_id}, data => {
                                        this.setState({
                                            followed: !this.state.followed
                                        })
                                    },
                                    err => {
                                    }
                                )
                            }}
                            style={styles.btn_focus}>
                            < Text
                                style={styles.focus}>{this.state.followed ?
                                I18n.t('rank_focused') : I18n.t('rank_focus')}</Text>
                        </TouchableOpacity>
                        }


                    </View>

                </View>


                {body_type === 'long' ? <View style={{paddingLeft: 17, paddingRight: 17}}>
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
                </View> : this.short(this.state.article)}


                <View style={[styles.btn_like, {
                    height: 44, width: Metrics.screenWidth - 34,
                    marginLeft: 17,
                    marginRight: 17
                }]}>
                    <Text style={styles.comment}>{`${I18n.t('social.comments')} (${this.state.comments_count})`}</Text>

                    <View style={{flex: 1}}/>

                    <Text style={styles.time}>{I18n.t('social.read')}</Text>
                    <Text style={[styles.time, {marginLeft: 4, marginRight: 20}]}>{page_views}</Text>
                    <View
                        style={styles.btn_like}>
                        <Image
                            style={styles.like}
                            source={is_like ? Images.social.like_red : Images.social.like_gray}/>
                        <Text style={[styles.time, {marginLeft: 4}]}>{likes}</Text>
                    </View>
                </View>

            </View>
            <View style={{height: 1, backgroundColor: Colors._ECE}}/>
        </View>
    }

    short = (item) => {
        const {images, body} = item;
        return <View>
            {strNotNull(body) ? <Text style={styles.body}>{body}</Text> : null}

            {images && images.length > 0 ? this.shortImage(images) : null}


        </View>
    }

    previewImage = (images, index) => {
        let gallery = images.map(item => {
            return {url: item.image_url}
        })
        global.router.toImageGalleryPage(gallery, index)
    }

    shortImage = (images) => {
        if (images.length === 1) {
            return <TouchableOpacity
                onPress={() => {
                    this.previewImage(images, 0)
                }}>
                <ImageLoad
                    style={styles.long_cover}
                    source={{uri: images[0].image_url}}/>
            </TouchableOpacity>

        }

        let imageViews = images.map((item, index) => {
            return <TouchableOpacity
                onPress={() => {
                    this.previewImage(images, index)
                }}
                key={'short' + index}>
                <ImageLoad
                    style={styles.short_image}
                    source={{uri: item.image_url}}/>
            </TouchableOpacity>

        });

        return <View style={{
            flexWrap: 'wrap', flexDirection: 'row',
            alignItems: 'center', marginTop: 14,
            marginLeft: 8
        }}>
            {imageViews}
        </View>

    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {id} = this.props.params.article;
        topics_comments(id, data => {
            startFetch(data.items, 15)
            this.setState({
                comments_count: data.comments
            })
        }, err => {
            abortFetch()
        }, {page, page_size: 20})
    };


    isMine = (user_id) => {
        if (isEmptyObject(global.login_user)) {
            return false
        }

        return global.login_user.user_id === user_id
    }

    toUserPage = (user) => {
        if (!isEmptyObject(login_user) && user.user_id === login_user.user_id) {
            global.router.toPersonDynamic(user)
        } else {
            global.router.toUserTopicPage(user)
        }

    };

    itemView = (item) => {
        const {
            avatar, nick_name, created_at, official,
            recommended, body, id, total_count, user_id,
            is_like
        } = item;
        return <View style={{
            width: '100%', paddingLeft: 17, paddingRight: 17,
            paddingTop: 12
        }}>
            <View style={styles.btn_like}>
                <TouchableOpacity
                    onPress={() => this.toUserPage(item)}>
                    <ImageLoad style={styles.c_avatar}
                               source={{uri: avatar}}/>
                </TouchableOpacity>


                <View style={{marginLeft: 10}}>
                    <View style={{flexDirection: 'row'}}>

                        <Text
                            onPress={() => this.toUserPage(item)}
                            style={styles.c_nick}>{nick_name}</Text>

                        {official ? <Text style={[styles.c_tag, {
                            backgroundColor: '#161718',
                            color: '#FFE9AD'
                        }]}>{I18n.t('social.official')}</Text> : null}

                        {recommended ? <Text style={[styles.c_tag, {
                            backgroundColor: '#161718',
                            color: '#FFE9AD'
                        }]}>{I18n.t('social.select')}</Text> : null}

                        {this.isMine(user_id) ? <Text
                            onPress={() => {
                                alertOrder(I18n.t('confirm_delete'), () => {
                                    delDeleteComment({comment_id: id}, data => {
                                        this.listView && this.listView.refresh()
                                    }, err => {

                                    })
                                })

                            }}
                            style={{color: Colors._CCC, marginLeft: 8}}>{I18n.t('delete')}</Text> : null}


                    </View>

                    <Text style={[styles.c_time, {marginTop: 5}]}>{getDateDiff(created_at)}</Text>
                </View>


                <View style={{flex: 1}}/>

                <TouchableOpacity
                    onPress={() => {
                        this.comment_id = id;
                        this.commentBar && this.commentBar.showInput()
                    }}>
                    <Image style={styles.c_comment}
                           source={Images.social.reply}/>
                </TouchableOpacity>


            </View>

            <Text
                onPress={() => {
                    this.comment_id = id;
                    this.commentBar && this.commentBar.showInput()
                }}
                style={styles.c_body}>{body}</Text>

            {total_count > 0 ? <TouchableOpacity
                onPress={() => {
                    global.router.toCommentInfoPage(item);
                }}
                style={{
                    height: 20,
                    backgroundColor: '#ECECEE',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 54,
                    marginTop: 8
                }}>
                <Text
                    style={[styles.c_nick, {marginLeft: 6}]}>{`${I18n.t('look_detail')}${total_count}${I18n.t('social.replay')}`}</Text>


            </TouchableOpacity> : null}


            <View style={{height: 1, backgroundColor: Colors._ECE, marginTop: 8}}/>


        </View>

    }
}