import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {reallySize} from "./Header";
import {UltimateListView, ImageLoad} from '../../components'
import I18n from "react-native-i18n";
import {NoDataView, LoadErrorView} from '../../components/load';
import {Colors, Images} from '../../Themes';
import {getDateDiff, alertOrder} from '../../utils/ComonHelper';
import {
    topics_recommends, topics,
    topics_like, user_topics, topics_delete
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
        height: reallySize(4),
        width: reallySize(20)
    },
    body: {
        color: Colors.txt_444,
        fontSize: reallySize(16),
        paddingRight: reallySize(17),
        paddingLeft: reallySize(17),
        paddingBottom: reallySize(15),
        paddingTop: reallySize(5)
    },
    bottom: {
        height: reallySize(55),
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
        height: reallySize(10),
        backgroundColor: Colors._ECE,
        width: '100%'
    },
    like: {
        height: reallySize(15),
        width: reallySize(15)
    },
    long_cover: {
        height: reallySize(200),
        width: '100%'
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
        marginLeft: reallySize(9)
    }
})

export default class MomentList extends PureComponent {


    render() {
        return <UltimateListView
            keyExtractor={(item, index) => index + "_moment"}
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
            }}/>
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        if (this.props.type === 'topics')
            topics({page, page_size: 20}, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
            })
        if (this.props.type === 'recommends')
            topics_recommends({page, page_size: 20}, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
            })
        if (this.props.type === 'user_topics') {
            user_topics({page, page_size: 20, user_id: this.props.userId}, data => {
                startFetch(data.items, 15)
            }, err => {
                abortFetch()
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

    itemView = (item) => {
        const {user, created_at, likes, comments, id, body_type} = item;
        return <TouchableOpacity
            onPress={() => {
                router.toLongArticle(item)
            }}
            activeOpacity={1}
            style={styles.item}>
            <View style={styles.separator}/>
            <View/>
            {/*用户数据*/}
            <View style={styles.user}>
                <ImageLoad
                    style={styles.avatar}
                    source={{uri: user.avatar}}/>

                <Text style={styles.nick_name}>{user.nick_name}</Text>
                <View style={{flex: 1}}/>

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
                    }}
                >
                    {this.isDelete() ? <Image style={{height: 24, width: 20}}
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
                <Text style={styles.time}>{getDateDiff(created_at)}·深圳</Text>

                <View style={{flex: 1}}/>
                <TouchableOpacity
                    onPress={() => {
                        topics_like(id, data => {
                            item.likes = data.total_likes;
                            this.listView && this.listView.updateDataSource(this.listView.getRows())

                        }, err => {
                            console.log(err)
                        })
                    }}
                    style={styles.btn_like}>
                    <Image
                        style={styles.like}
                        source={Images.social.like_gray}/>
                    <Text style={[styles.time, {marginLeft: 4, marginRight: 25}]}>{likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        router.toLongArticle(item, true)
                    }}
                    style={styles.btn_like}>
                    <Image
                        style={styles.like}
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

            <ImageLoad
                style={styles.long_cover}
                source={{uri: item.cover_link}}/>
        </View>
    }

    short = (item) => {
        const {images, body} = item;
        return <View>
            <Text style={styles.body}>{body}</Text>
            {images && images.length > 0 ? this.shortImage(images) : null}


        </View>
    }

    shortImage = (images) => {
        if (images.length === 1) {
            return <ImageLoad
                style={styles.long_cover}
                source={{uri: images[0].image_url}}/>
        }

        let imageViews = images.map((item, key) => {
            return <ImageLoad
                key={'short' + key}
                style={styles.short_image}
                source={{uri: item.image_url}}/>
        });

        return <View style={{
            flexWrap: 'wrap', flexDirection: 'row',
            alignItems: 'center', marginLeft: 8
        }}>
            {imageViews}
        </View>

    }
}