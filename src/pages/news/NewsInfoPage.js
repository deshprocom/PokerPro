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
import {isEmptyObject, convertDate,newShare} from '../../utils/ComonHelper';
import {LoadingView} from '../../components/load'
import {NavigationBar, MarkdownPlat} from '../../components';


export default class NewsInfoPage extends Component {
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

        const {date, description, source, title, id, image} = this.props.params.newsInfo;

        return (<View
            testID="page_news_info"
            style={styles.page}>
            <NavigationBar
                toolbarStyle={{backgroundColor:Colors.bg_09}}
                router={router}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={()=>router.pop()}
                rightBtnIcon={Images.match_share}
                rightImageStyle={{height:20,width:16,marginRight:15}}
                rightBtnPress={()=>{
                    newShare(title,date+'\n'+source,image,id);
                    {/*router.log(title,date+'\n'+source,image,id);*/}
                }}/>

            <ScrollView>

                <View style={styles.headerView}>
                    <Text
                        testID="txt_news_title"
                        style={styles.txtTitle}>{title}</Text>
                    <View style={styles.sourceView}>
                        <Text
                            testID="txt_news_date"
                            style={styles.txtTime}>{convertDate(date, 'YYYY-MM-DD')}</Text>
                        <Text
                            testID="txt_news_source"
                            style={styles.txtSource}>来源于 {source}</Text>
                    </View>

                </View>

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
    }
})