import React, {PureComponent} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
    Dimensions
} from 'react-native';
import {reallySize} from "./Header";
import {ImageLoad, NavigationBar} from '../../components'
import I18n from "react-native-i18n";
import {Colors, Images} from '../../Themes';
import {styles} from './MomentList';
import HTML from 'react-native-render-html';
import {topics_like} from "../../services/SocialDao";
import {agoDynamicDate} from "../../utils/ComonHelper";

export default class LongArticle extends PureComponent {

    render() {

        const {user, created_at, likes, comments, id, body_type,body} = this.props.params.article;

        return <View style={{flex: 1, backgroundColor: 'white'}}>
            <NavigationBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                toolbarStyle={{backgroundColor: Colors.white}}
                title={'详情'}
                titleStyle={{color: Colors._333}}
                leftBtnIcon={Images.ic_back}
                leftImageStyle={{height: 20, width: 10, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                rightBtnIcon={Images.social.more_3}
                rightImageStyle={{height: 4, width: 20, marginLeft: 20, marginRight: 20}}/>
            <ScrollView>
                <View style={styles.user}>
                    <ImageLoad
                        style={styles.avatar}
                        source={{uri: user.avatar}}/>

                    <Text style={styles.nick_name}>{user.nick_name}</Text>
                    <View style={{flex: 1}}/>

                    {body_type === 'long' ? <Text style={styles.txt_long}>长帖</Text> : null}

                </View>

                <HTML html={body}
                      tagsStyles={{p: {marginLeft: 17, marginRight: 17}}}
                      imagesMaxWidth={Dimensions.get('window').width}/>
                {/*帖子时间、地点*/}
                <View style={styles.bottom}>
                    <Text style={styles.time}>{agoDynamicDate(created_at)}·深圳</Text>

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
                        style={styles.btn_like}>
                        <Image
                            style={styles.like}
                            source={Images.social.comment_gray}/>
                        <Text style={[styles.time, {marginLeft: 4}]}>{comments}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    }
}