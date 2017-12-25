import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, Image, TouchableOpacity, TextInput, Modal, Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {NavigationBar, BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';
import {getPersonDynamics} from '../../services/CommentDao';
import {getDateDiff, isEmptyObject, strNotNull, util, utcDate,convertDate} from '../../utils/ComonHelper';
import DynamicEmpty from './DynamicEmpty';
import DynamicTopBar from './DynamicTopBar';


export default class PersonDynamicPage extends Component {
    state = {
        dynamics: {}
    };

    componentDidMount() {
        this.dynamicList = [];
        this.page = 1;
    }

    _avatar = (avatar) => {
        if (isEmptyObject(avatar))
            return Images.home_avatar;
        else if (strNotNull(avatar))
            return {uri: avatar}
        else
            return Images.home_avatar;
    };
    personTop = () => {
        const {avatar, nick_name, signature} = global.login_user;
        return (
            <View style={styles.topPage}>
                <Image style={styles.TopImg} source={this._avatar(avatar)}/>
                <View style={styles.TopTxt}>
                    <Text style={{fontSize: 20, color: '#444444'}}>{nick_name}</Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#888888',
                            marginTop: 5
                        }}>{isEmptyObject(signature) ? I18n.t('ple_sign') : signature}</Text>
                </View>
            </View>
        )
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

    myComment=(item)=>{
        const {typological} = item;
        const {my_comment_body} = typological;
        return(
            <Text style={styles.itemTxt1} numberOfLines={1}>{my_comment_body}</Text>
        )
    };

    renderItem = ({item}) => {
        const {topic, typological_type, topic_type} = item;
        const {topic_description, topic_id, topic_image, topic_title} = topic;

        return (
            <TouchableOpacity style={styles.itemPage}
                              onPress={() => {
                                  if (topic_type === "info") {
                                      let url = `${global.desh5}news/${topic_id}/${global.language}`;
                                      global.router.toWebPage(url, {
                                          bottomNav: 'commentNav',
                                          info: {id: topic_id},
                                          topic_type: topic_type
                                      })
                                  } else if (topic_type === "video") {
                                      let urlVideo = `${global.desh5}videos/${topic_id}/${global.language}`;
                                      global.router.toWebPage(urlVideo, {
                                          bottomNav: 'commentNav',
                                          info: {id: topic_id},
                                          topic_type: topic_type
                                      })
                                  } else {
                                      global.router.toDeletePage();
                                  }

                              }}>

                <Text style={styles.itemTxt1}>{this.txtType(item)}</Text>

                <View style={styles.itemView}>
                    <Image style={styles.image} source={{uri: topic_image}}/>
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


        return (
            <FlatList
                data={item.items}
                ListHeaderComponent={() => {
                    return <Text style={styles.time}>{this.parseDate(item.date,item)}</Text>
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

    parseDate=(date,item)=>{
        let today = new Date();
        if(convertDate(new Date(), 'YYYY-MM-DD') === date){
            return I18n.t('today');
        }else if(convertDate(today, 'YYYY-MM') === utcDate(date, 'YYYY-MM')
            && Number(convertDate(today, 'DD'))- Number(utcDate(date, 'DD')) <=1){
            return I18n.t('yesterday');
        }else{
            return utcDate(date, 'MM')+I18n.t('month');
        }
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

        console.log("dynamics:",dynamics);

        return dynamics;

    };


    loadDynamics = (page, postRefresh, endFetch) => {
        let body = {user_id: global.login_user.user_id, page, page_size: 20};
        getPersonDynamics(body, data => {
            console.log("PersonDynamics23232:", data.items)
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


    render() {
        return (
            <BaseComponent style={ApplicationStyles.bgContainer}>
                <DynamicTopBar count={this.state.dynamics.length}/>


                <UltimateFlatList
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
        borderRadius: 37
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
        marginRight: 50,
        marginBottom:3

    },
    itemView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F5F5F5',
        borderRadius: 1,

    },
    image: {
        width: 48, height: 48,
        marginLeft: 6,
        marginTop:6
    },
    TxtRight: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 12,
        marginRight: 8,
        marginTop:10
    },
    TxtRight2: {
        fontSize: 14,
        color: '#AAAAAA',
        marginTop:4

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