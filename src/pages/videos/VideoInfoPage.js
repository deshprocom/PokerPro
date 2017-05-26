/**
 * Created by lorne on 2017/5/26.
 */
/**
 * Created by lorne on 2017/5/26.
 */
/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    TouchableOpacity, Image, StatusBar,
    ScrollView, Animated, InteractionManager
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, convertDate} from '../../utils/ComonHelper';
import {LoadingView} from '../../components/load'
import {NavigationBar, MarkdownPlat, VideoPlayer} from '../../components';


export default class VideoInfoPage extends Component {
    state = {renderPlaceholderOnly: true};

    componentDidMount() {
        router.log(this.props.params)
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                renderPlaceholderOnly: false
            });
        });
    }

    render() {

        const {description,} = this.props.params.info;

        return (<View
            testID="page_news_info"
            style={styles.page}>


            <VideoPlayer
                source={{ uri: 'http://v.yoai.com/femme_tampon_tutorial.mp4' }}
                videoStyle={styles.video}>

            </VideoPlayer>

            <ScrollView>


                <MarkdownPlat
                    noScroll={true}
                    markdownStr={description}
                />
            </ScrollView>


        </View>)
    }

}


const styles = StyleSheet.create({
    txtTitle: {
        fontSize: 17,
        color: Colors.txt_444,
        marginTop: 9
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
        marginBottom: 9
    },
    page: {
        flex: 1,
        backgroundColor: Colors.white
    },
    video: {
        height: 216
    }

})