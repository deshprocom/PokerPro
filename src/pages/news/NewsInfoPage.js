/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, convertDate, newShare, strNotNull} from '../../utils/ComonHelper';
import {NavigationBar, MarkdownPlat} from '../../components';
import {getNewsDetail} from '../../services/NewsDao';
import CommentBottom from '../comment/CommentBottom';


export default class NewsInfoPage extends Component {
    state = {
        newsInfo: {}
    };

    componentDidMount() {
        const {newsInfo, news_id} = this.props.params;
        if (!isEmptyObject(newsInfo)) {
            this.setState({newsInfo})
        } else if (strNotNull(news_id)) {
            getNewsDetail({info_id: news_id}, data => {
                this.setState({
                    newsInfo: data
                })

            }, err => {

            })
        }

    }

    renderHeader = () => {
        const {date, description, source, title, id, image,image_thumb} = this.state.newsInfo;
        return <NavigationBar
            toolbarStyle={{backgroundColor: Colors.bg_09}}
            leftBtnIcon={Images.sign_return}
            leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
            leftBtnPress={() => router.pop()}
            rightBtnIcon={Images.share}
            rightImageStyle={{height: 22, width: 23, marginRight: 24.8}}
            rightBtnPress={() => {
                newShare(title, date + '\n' + source, image_thumb, id);

            }}/>
    }

    render() {

        const {date, description, source, title, id, image} = this.state.newsInfo;

        return (<View
            testID="page_news_info"
            style={styles.page}>

            {this.renderHeader()}

            <ScrollView>

                <View style={styles.headerView}>
                    <Text
                        numberOfLines={2}
                        testID="txt_news_title"
                        style={styles.txtTitle}>{title}</Text>
                    <View style={styles.sourceView}>
                        <Text
                            testID="txt_news_date"
                            style={styles.txtTime}>{convertDate(date, 'YYYY-MM-DD')}</Text>
                        <Text
                            testID="txt_news_source"
                            style={styles.txtSource}>{I18n.t('from_place')} {source}</Text>
                    </View>

                </View>

                <MarkdownPlat
                    noScroll={true}
                    markdownStr={description}
                />
            </ScrollView>
            <View style={{height:50}}/>

        </View>)
    }

}


const styles = StyleSheet.create({
    txtTitle: {
        fontSize: 17,
        color: Colors.txt_444,
        marginTop: 14,
        fontWeight: 'bold',
        lineHeight: 22
    },
    txtTime: {
        fontSize: 12,
        color: Colors._AAA
    },
    headerView: {
        borderBottomWidth: 1,
        borderBottomColor: Colors._EEE,
        marginRight: 17,
        marginLeft: 17
    },
    txtSource: {
        fontSize: 12,
        color: Colors._AAA,
        marginLeft: 17
    },
    sourceView: {
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: 12
    },
    page: {
        flex: 1,
        backgroundColor: Colors.white
    }
})