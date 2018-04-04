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
import {ImageLoad, NavigationBar} from '../../components'
import I18n from "react-native-i18n";
import {Colors, Images, Metrics} from '../../Themes';
import HTML from 'react-native-render-html';
import {topics_like, topics_details} from "../../services/SocialDao";
import {getDateDiff} from "../../utils/ComonHelper";

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
    }
})

export default class LongArticle extends PureComponent {

    componentDidMount() {
        const {id} = this.props.params.article;
        topics_details(id)
    }

    render() {

        const {user, created_at, likes, comments, id, body_type, body, title, page_views} = this.props.params.article;

        return <View style={{flex: 1}}>
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
            <View style={{marginRight: 17, marginLeft: 17, backgroundColor: 'white'}}>
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

                <View style={styles.btn_like}>
                    <View style={{flex: 1}}/>

                    <Text style={styles.time}>阅读</Text>
                    <Text style={[styles.time, {marginLeft: 4, marginRight: 20}]}>{page_views}</Text>
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
                        <Text style={[styles.time, {marginLeft: 4}]}>{likes}</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    <Text>全部评论</Text>
                </View>

            </View>


        </View>
    }
}