import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getPersonDynamics} from '../../services/CommentDao';
import {getDateDiff, isEmptyObject} from '../../utils/ComonHelper';

export default class PersonDynamicPage extends Component {
    state = {
        dynamics: {}
    };

    componentDidMount() {

    };

    personTop = () => {
        const {avatar, nick_name, signature} = global.login_user;
        return (
            <View style={styles.topPage}>
                <Image style={styles.TopImg} source={{uri:avatar}}/>
                <View style={styles.TopTxt}>
                    <Text style={{fontSize:20,color:'#444444'}}>{nick_name}</Text>
                    <Text
                        style={{fontSize:14,color:'#888888',marginTop:5}}>{isEmptyObject(signature) ? I18n.t('ple_sign') : signature}</Text>
                </View>
            </View>
        )
    };
    _separator = () => {
        return <View style={{height: 1, marginLeft: 78, marginRight: 17, backgroundColor: '#DDDDDD',marginBottom:16}}/>;
    };
    _separator1 = () => {
        return <View style={{height: 1, marginLeft: 16, marginRight: 17, backgroundColor: '#DDDDDD'}}/>;
    };
    txtType = () => {
        const {topic_type, typological_type} = this.state.dynamics;
        if (topic_type === "info") {
            if (typological_type === "topiclike") {
                return "在资讯点赞了一个话题";
            } else if (typological_type === "comment") {
                return "在资讯评论了一个话题";
            } else if (typological_type === "reply") {
                return "在资讯回复了一个话题";
            }
        }else if (topic_type === "video") {
            if (typological_type === "topiclike") {
                return "在视频点赞了一个话题";
            } else if (typological_type === "comment") {
                return "在视频评论了一个话题";
            } else if (typological_type === "reply") {
                return "在视频回复了一个话题";
            }
        }
    };

    renderItem = (topic) => {
        console.log("topic:",topic);
        // const {topic} = item;
        const {topic_description, topic_id, topic_image, topic_title} = topic;
        return (
            <View style={styles.itemPage}>

                <Text style={styles.itemTxt1}>{this.txtType()}</Text>

                <View style={styles.itemView}>
                    <Image style={styles.image} source={{uri:topic_image}}/>
                    <View style={styles.TxtRight}>
                        <Text style={styles.itemTxt1} numberOfLines={1}>{topic_description}</Text>
                        <Text style={styles.TxtRight2} numberOfLines={1}>{topic_title}</Text>
                    </View>
                </View>
            </View>
        )
    };

    content = (item) => {
        const {created_at, id, topic, topic_type, typological_type} = item;
        return (
            <UltimateFlatList
                header={()=>{
                            return  <Text style={styles.time}>{getDateDiff(created_at)}</Text>
                        }}
                arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                ref={ref => this.ultimate = ref}
                onFetch={this.onFetch2}
                keyExtractor={(item, index) => `replies${index}`}
                item={this.renderItem}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                separator={this._separator}
            />
        )
    };
    onFetch2 = (page, postRefresh, endFetch) => {
        if (page === 1) {
            // postRefresh(data.items,3)
        } else {
            endFetch()
        }

    };

    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            let body = {user_id: global.login_user.user_id, page: 1, page_size: 3};
            getPersonDynamics(body, data => {
                console.log("dynamics:", data);
                this.setState({
                    dynamics: data.items
                });
                postRefresh(data.items,3)
            }, err => {
            });

        } else {
            endFetch()
        }

    };

    render() {
        return (
            <BaseComponent style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('person_dynamic')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    rightBtnIcon={Images.commentWhite}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    rightImageStyle={{height: 20, width: 22, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <ScrollView>
                    {this.personTop()}

                    <View style={{backgroundColor:'#FFFFFF',marginTop:6}}>
                        <UltimateFlatList
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
                        />
                    </View>
                </ScrollView>


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
    },
    TopImg: {
        width: 74,
        height: 74,
        marginLeft: 24,
        borderRadius:37
    },
    TopTxt: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 21
    },
    itemsView: {
        paddingTop: 5
    },
    time: {
        fontSize: 20,
        color: '#444444',
        marginLeft: 17,
        marginTop: 11,
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
        marginRight: 50
    },
    itemView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 1,
        marginTop: 10
    },
    image: {
        width: 48, height: 48,
        marginLeft: 6
    },
    TxtRight: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
        marginLeft: 12,
        marginRight: 8
    },
    TxtRight2: {
        fontSize: 14,
        color: '#AAAAAA',
        marginTop: 2
    }

});