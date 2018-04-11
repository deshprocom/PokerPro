import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {NavigationBar, BaseComponent, ImageLoad} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getPersonDynamics, getUnreadComments} from '../../services/CommentDao';
import {agoDynamicDate, isEmptyObject, strNotNull, util, utcDate, convertDate} from '../../utils/ComonHelper';
import DynamicEmpty from './DynamicEmpty';
import DynamicTopBar from './DynamicTopBar';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MomentList from '../socials/MomentList'

export default class PersonDynamicPage extends Component {
    state = {
        dynamics: {},
        unreadCount: 0
    };

    constructor(props) {
        super(props);
        const {userInfo} = this.props.params;
        if (userInfo) {
            this.userInfo = userInfo;
        } else {
            this.userInfo = global.login_user
        }

    }

    setUnreadCount = (unreadCount) => {
        this.unread();
        this.setState({
            unreadCount
        })
    };

    componentDidMount() {
        this.dynamicList = [];
        this.page = 1;
        this.unread()
    };

    unread = () => {
        if (this.isMine()) {
            let body = {user_id: this.userInfo.user_id};
            getUnreadComments(body, data => {
                console.log("unreadCount:", data.unread)
                this.setState({
                    unreadCount: data.unread
                })
            }, err => {

            });
        }

    };

    _avatar = (avatar) => {
        if (isEmptyObject(avatar))
            return Images.home_avatar;
        else if (strNotNull(avatar))
            return {uri: avatar}
        else
            return Images.home_avatar;
    };
    personTop = () => {

        const {avatar, nick_name, signature} = this.userInfo;
        return <View style={{height: 10, width: '100%', backgroundColor: Colors._ECE}}/>

        // return (
        //     <View>
        //         <LinearGradient
        //             colors={['#DEDEDE', '#FFFFFF', '#FFFFFF']}
        //             style={styles.topPage}>
        //             <TouchableOpacity
        //                 onPress={() => {
        //                     const images = [{url: avatar}];
        //                     global.router.toImageGalleryPage(images, 0)
        //                 }}>
        //                 <Image style={styles.TopImg} source={this._avatar(avatar)}/>
        //             </TouchableOpacity>
        //
        //             <View style={styles.TopTxt}>
        //                 <Text style={{fontSize: 20, color: '#444444'}}>{nick_name}</Text>
        //                 <Text
        //                     style={{
        //                         fontSize: 14,
        //                         color: '#888888',
        //                         marginTop: 5
        //                     }}>{isEmptyObject(signature) ? I18n.t('ple_sign') : signature}</Text>
        //             </View>
        //         </LinearGradient>
        //         <View style={{height: 6, width: '100%', backgroundColor: '#ECECEE'}}/>
        //     </View>
        // )
    };
    _separator = () => {
        return <View
            style={{height: 1, marginLeft: 78, marginRight: 17, backgroundColor: '#DDDDDD', marginBottom: 16}}/>;
    };
    _separator1 = () => {
        return <View style={{height: 1, marginLeft: 16, marginRight: 17, backgroundColor: '#DDDDDD'}}/>;
    };
    txtType = (item) => {
        const {topic_type, typological_type} = item;
        return I18n.t(topic_type + '_' + typological_type);
    };

    myComment = (item) => {
        const {typological, topic_type, typological_type} = item;
        const {my_name, my_comment_body, my_reply_body} = typological;
        return (
            <Text style={styles.itemTxt1}
                  numberOfLines={1}>{my_name}：{typological_type === "reply" ? my_reply_body : my_comment_body}</Text>
        )
    };

    renderItem = ({item}) => {
        const {topic, typological_type, topic_type} = item;
        const {topic_description, topic_id, topic_image, topic_title} = topic;

        return (
            <TouchableOpacity style={styles.itemPage}
                              onPress={() => {
                                  if (topic_type === "info") {
                                      let url = `news/${topic_id}`;
                                      global.router.toWebPage(url, {
                                          bottomNav: 'commentNav',
                                          info: {id: topic_id},
                                          topic_type: topic_type
                                      })
                                  } else if (topic_type === "video") {
                                      let urlVideo = `videos/${topic_id}`;
                                      global.router.toWebPage(urlVideo, {
                                          bottomNav: 'commentNav',
                                          info: {id: topic_id},
                                          topic_type: topic_type
                                      })
                                  } else {
                                      console.log('足迹', topic)
                                      global.router.toDeletePage();
                                  }

                              }}>
                <Text style={[styles.itemTxt1, {marginBottom: 10}]}>{this.txtType(item)}</Text>

                <View style={styles.itemView}>

                    <ImageLoad style={styles.image} source={{uri: topic_image}}/>
                    <View style={styles.TxtRight}>

                        {typological_type === "topiclike" ? null :
                            this.myComment(item)
                        }
                        <Text style={styles.TxtRight2} numberOfLines={1}>{topic_title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };


    content = (item, index, separators) => {

        let timestamp2 = Date.parse(new Date(item.date));
        timestamp2 = timestamp2 / 1000;


        return (
            <FlatList
                data={item.items}
                ListHeaderComponent={() => {
                    return <Text style={styles.time}>{agoDynamicDate(timestamp2)}</Text>
                }}
                keyExtractor={(item, index) => `topic${index}`}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this._separator}
            />


        )
    };


    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            this.dynamicList = [];
            this.page = 1;
        }
        this.loadDynamics(this.page, postRefresh, endFetch)

    };

    blobData = (items) => {

        let objArr = {};
        let dynamics = [];
        util.forEach(items, item => {
            let date = utcDate(item.created_at, 'YYYY-MM-DD');

            if (!objArr[date]) {
                objArr[date] = [];
            }
            objArr[date].push(item);
        });

        util.forEach(objArr, (value, key) => {
            let dynamic = {
                date: key,
                items: value
            };
            dynamics.push(dynamic)
        });

        console.log("dynamics:", dynamics);

        return dynamics;

    };


    loadDynamics = (page, postRefresh, endFetch) => {
        let body = {user_id: this.userInfo.user_id, page, page_size: 20};
        getPersonDynamics(body, data => {
            this.dynamicList = util.unionBy(this.dynamicList, data.items, 'id');
            if (this.ultimate) {
                if (data.items.length > 0) {
                    this.page += 1;
                }
                this.ultimate.setPage(this.page);
                this.ultimate.updateRows(this.blobData(this.dynamicList), data.items.length === 0 ? 2 : 1)
            }


        }, err => {
            endFetch();
        });
    };


    isMine = () => {
        const {userInfo} = this.props.params;
        if (userInfo !== undefined) {
            return userInfo.user_id === global.login_user.user_id;
        } else
            return true;
    };

    tabLabel = (type) => {
        if (type === 'user_topics')
            return '动态'
        else if (type === 'short')
            return '说说'
        else if (type === 'long')
            return '长帖'
    }

    render() {
        const {user_id} = this.userInfo;
        const lists = this.isMine() ? ['user_topics'] : ['user_topics', 'long', 'short'];
        let moments = lists.map((item, index) => {

            return <MomentList
                key={'moments' + index}
                userId={user_id}
                tabLabel={this.tabLabel(item)}
                type={item}/>
        });

        return (
            <BaseComponent style={ApplicationStyles.bgContainer}>


                <ScrollableTabView

                    onScroll={(e) => {

                        console.log('滚动:', e)

                    }}
                    renderTabBar={() => <DynamicTopBar
                        nickname={this.userInfo.nick_name}
                        setUnreadCount={this.setUnreadCount}
                        unreadCount={this.state.unreadCount}
                        hideReceived={this.isMine()}
                        count={this.state.dynamics.length}/>}>

                    {moments}

                    <UltimateFlatList
                        style={{backgroundColor: 'white'}}
                        tabLabel={'足迹'}
                        header={() => this.personTop()}
                        arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                        ref={ref => this.ultimate = ref}
                        onFetch={this.onFetch}
                        keyExtractor={(item, index) => `replies${index}`}
                        item={this.content}
                        refreshableTitlePull={I18n.t('pull_refresh')}
                        refreshableTitleRelease={I18n.t('release_refresh')}
                        dateTitle={I18n.t('last_refresh')}
                        allLoadedText={I18n.t('no_more')}
                        waitingSpinnerText={I18n.t('loading')}
                        separator={this._separator1}
                        emptyView={() => <DynamicEmpty/>}
                    />

                </ScrollableTabView>


            </BaseComponent>
        );
    }


}

const styles = StyleSheet.create({

    topPage: {
        width: Metrics.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 24,
        backgroundColor: '#DEDEDE',
        marginBottom: 6
    },
    TopImg: {
        width: 74,
        height: 74,
        marginLeft: 24,
        borderRadius: 37
    },
    TopTxt: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 21,
        backgroundColor: 'transparent'
    },
    itemsView: {
        paddingTop: 5
    },
    time: {
        fontSize: 20,
        color: '#444444',
        marginLeft: 17,
        marginTop: 15,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    itemPage: {
        marginLeft: 78,
        marginTop: 1,
        marginRight: 17,
        marginBottom: 15
    },
    itemTxt1: {
        fontSize: 14,
        color: '#444444',

    },
    itemView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F5F5F5',
        borderRadius: 1
    },
    image: {
        width: 48, height: 48,
        marginLeft: 6,
        marginTop: 6
    },
    TxtRight: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 12,
        marginTop: 10,
        marginRight: 55
    },
    TxtRight2: {
        fontSize: 14,
        color: '#AAAAAA',
        marginTop: 4

    },
    commentWhiteView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    commentWhite: {
        width: 22,
        height: 20
    }

});