import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {reallySize} from "./Header";
import {UltimateListView, ImageLoad, LeftAlignedImage} from '../../components'
import I18n from "react-native-i18n";
import {NoDataView, LoadErrorView} from '../../components/load';
import {Colors, Images} from '../../Themes';
import {
    getDateDiff, alertOrder, strNotNull, isEmptyObject,
    getFileMine
} from '../../utils/ComonHelper';
import {
    topics_recommends, topics,
    topics_like, user_topics, topics_delete,
    topics_search, my_foucs
} from '../../services/SocialDao';

export const styles = StyleSheet.create({
    avatar: {
        height: reallySize(38),
        width: reallySize(38),
        borderRadius: reallySize(19)
    },
    nick_name: {
        color: Colors._666,
        fontSize: reallySize(15),
        marginLeft: reallySize(14)
    },
    user: {
        height: reallySize(60),
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: reallySize(17),
        paddingLeft: reallySize(17)
    },
    item: {
        backgroundColor: 'white'
    },
    more_3: {
        height: reallySize(20),
        width: reallySize(20),
        resizeMode: "contain",
    },
    body: {
        color: Colors.txt_444,
        fontSize: reallySize(16),
        paddingRight: reallySize(17),
        paddingLeft: reallySize(17)
    },
    bottom: {
        height: reallySize(38),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: reallySize(17),
        paddingLeft: reallySize(17)
    },
    time: {
        fontSize: reallySize(12),
        color: Colors._AAA
    },
    separator: {
        height: reallySize(5),
        backgroundColor: Colors._ECE,
        width: '100%'
    },
    separator1: {
        height: reallySize(1),
        backgroundColor: Colors._ECE,
        width: '100%'
    },
    like: {
        height: reallySize(15),
        width: reallySize(15)
    },
    long_cover: {
        marginLeft: reallySize(17),
        marginTop: reallySize(8),
        marginRight: reallySize(17)
    },
    btn_like: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt_long: {
        color: '#F07F4D',
        borderRadius: 2,
        fontSize: reallySize(12),
        borderColor: '#F07F4D',
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        marginRight: 12
    },
    short_image: {
        height: reallySize(108),
        width: reallySize(108),
        marginTop: reallySize(9),
        marginLeft: reallySize(9),
        backgroundColor: Colors._ECE
    },
    comment: {
        height: reallySize(16),
        width: reallySize(17)
    },
});

export default class MomentList extends PureComponent {

    static props = {
        showMore: null,
    };


    render() {
        return <UltimateListView
            header={() => <View style={styles.separator1}/>}
            scrollEnabled={this.props.scrollEnabled}
            keyExtractor={(item, index) => index + "_moment"}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            separator={() => <View style={styles.separator}/>}
            item={this.itemView}
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            waitingSpinnerText={I18n.t('loading')}
            emptyView={() => {
                return <NoDataView/>
            }}/>
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {type, userId} = this.props
        if (type === 'topics')
            topics({page, page_size: 20}, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
            })
        if (type === 'recommends')
            topics_recommends({page, page_size: 20}, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
            })
        if (type === 'user_topics') {
            user_topics({page, page_size: 20, user_id: userId}, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
            })
        }
        if (type === 'long' ||
            type === 'short') {
            topics_search(userId, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
            }, {keyword: type})
        }

        if (type === 'follows') {
            my_foucs({page, page_size: 20}, data => {
                startFetch(data.items, 15)
            }, err => {
            })
        }

    };

    isDelete = () => {
        const {type, userId} = this.props;
        if (userId && userId === global.login_user.user_id &&
            type === 'user_topics')
            return true;
        else
            return false;
    };

    toUserPage = (user) => {
        if (!isEmptyObject(login_user) && user.user_id === login_user.user_id) {
            global.router.toPersonDynamic(user)
        } else {
            global.router.toUserTopicPage(user)
        }

    };

    itemView = (item) => {
        const {
            user, created_at, likes, comments, id, body_type, location, is_like,
            recommended
        } = item;
        const {address_title} = location;
        return <TouchableOpacity
            onPress={() => {
                router.toLongArticle(item)
            }}
            activeOpacity={1}
            style={styles.item}>

            <View/>
            {/*用户数据*/}
            <View style={styles.user}>
                <TouchableOpacity
                    onPress={() => {
                        this.toUserPage(user)
                    }}>
                    <ImageLoad
                        emptyBg={Images.home_avatar}
                        style={styles.avatar}
                        source={{uri: user.avatar}}/>
                </TouchableOpacity>


                <Text
                    onPress={() => {
                        this.toUserPage(user)
                    }}
                    style={styles.nick_name}>{user.nick_name}</Text>
                <View style={{flex: 1}}/>

                {recommended ?
                    <Text style={[styles.txt_long, {color: '#F24A4A', borderColor: '#F24A4A'}]}>精华</Text> : null}
                {body_type === 'long' ? <Text style={styles.txt_long}>长帖</Text> : null}

                <TouchableOpacity
                    onPress={() => {
                        if (this.isDelete()) {

                            alertOrder(I18n.t('verified_del'), () => {
                                topics_delete(id, data => {

                                    this.listView && this.listView.refresh()
                                }, err => {
                                })
                            })

                        }
                        else {
                            if (this.props.showMore === null) return;
                            this.props.showMore(id);
                        }
                    }}
                >
                    {this.isDelete() ? <Image style={{height: 19, width: 14, padding: 8}}
                                              source={Images.social.article_delete}/>
                        : <Image
                            style={styles.more_3}
                            source={Images.social.more_3}/>}
                </TouchableOpacity>


            </View>

            {/*内容*/}
            {this.bodyTypes(item)}

            {/*帖子时间、地点*/}
            <View style={styles.bottom}>
                <Text
                    style={styles.time}>{getDateDiff(created_at)}{strNotNull(address_title) ? `·${address_title}` : ""}</Text>

                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        topics_like(id, data => {
                            item.likes = data.total_likes;
                            item.is_like = !is_like;
                            this.listView && this.listView.updateDataSource(this.listView.getRows())

                        }, err => {
                            console.log(err)
                        })
                    }}
                    style={styles.btn_like}>
                    <Image
                        style={styles.like}
                        source={is_like ? Images.social.like_red : Images.social.like_gray}/>
                    <Text style={[styles.time, {marginLeft: 4, marginRight: 25}]}>{likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        router.toLongArticle(item, true)
                    }}
                    style={styles.btn_like}>
                    <Image
                        style={styles.comment}
                        source={Images.social.comment_gray}/>
                    <Text style={[styles.time, {marginLeft: 4}]}>{comments}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    }

    bodyTypes = (item) => {
        switch (item.body_type) {
            case "long":
                return this.long(item)
            case "short":
                return this.short(item)
        }
    }

    long = (item) => {
        return <View>
            <Text style={styles.body}>{item.title}</Text>

            {strNotNull(item.cover_link) ? <View
                style={styles.long_cover}
            >
                <LeftAlignedImage
                    height={200}
                    source={{uri: item.cover_link}}/>
            </View> : null}


        </View>
    }

    short = (item) => {
        const {images, body} = item;
        return <View>
            {strNotNull(body) ? <Text
                numberOfLines={6}
                style={styles.body}>{body}</Text> : null}


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
            return <View
                style={styles.long_cover}
                onPress={() => {
                    this.previewImage(images, 0)
                }}
            >
                <LeftAlignedImage
                    height={200}
                    source={{uri: images[0].image_url}}/>
            </View>

        }

        let imageViews = images.map((item, key) => {
            return <TouchableOpacity
                key={'short' + key}
                onPress={() => {
                    this.previewImage(images, key)
                }}
            >
                <ImageLoad
                    style={styles.short_image}
                    source={{uri: item.image_url}}/>
            </TouchableOpacity>

        });

        return <View style={{
            flexWrap: 'wrap', flexDirection: 'row',
            alignItems: 'center', marginLeft: 8
        }}>
            {imageViews}
        </View>

    }
}