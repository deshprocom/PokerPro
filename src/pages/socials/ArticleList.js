import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import I18n from "react-native-i18n";
import {Colors,Images} from "../../Themes";
import {NavigationBar} from '../../components';
import {NoDataView} from '../../../src/components/load';
import {isEmptyObject,utcDate,strNotNull} from '../../utils/ComonHelper';
import {reallySize} from "./Header";

export default class ArticleList extends Component{

    constructor(props){
        super(props);
        this.state = {
            articleList:[],
        };
    }

    componentDidMount(){
        this.getData();
    }


    ///获取草稿箱列表数据
    getData = () => {
        ///获取草稿列表
        storage.load({key: "articleList"}).then(ret => {
            this.setState({articleList:ret});
        });
    };

    ///编辑长贴
    editArticle = (item) =>{
        global.router.toArticleRelease(item.key,item.data,()=>{
            this.getData();
        });
    };

    ///处理数据
    createData = (data) =>{
        let title = "";
        let contents = [];
        let images = [];
        data.forEach((rowData) => {
            let type = rowData.type;
            if (type === "title"){
                title = rowData.text;
            }
            if (type === "content"){
                contents.push(rowData.text);
            }
            if (type === "image"){
                images.push(rowData.imagePath);
            }
        });

        let resultContent = contents.join("\n");

        let rowInfo = {
            title:title,
            content:resultContent,
            images:images
        };
        return rowInfo;
    };


    ///渲染item
    _renderItem = (item) =>{
        ///取出title content image
        console.log("=====",item);
        let data = item.item.data;
        let itemInfo = this.createData(data);
        return (
            <View style={{backgroundColor:"white"}}>
                <View style={styles.subRow}>
                    <Text style={styles.dateText}>{utcDate(item.item.key,"YY.MM.DD")}</Text>
                    <TouchableOpacity onPress={() => this.editArticle(item.item)}>
                        <Image source={Images.social.icon_articleedit} style={styles.editImage}/>
                    </TouchableOpacity>
                </View>
                {strNotNull(itemInfo.title)?<Text style={styles.title} numberOfLines={1}>{itemInfo.title}</Text>:null}
                {strNotNull(itemInfo.content)?<Text style={styles.content} numberOfLines={6}>{itemInfo.content}</Text>:null}
                {!isEmptyObject(itemInfo.images)?<Image source={{uri:itemInfo.images[0]}} style={styles.image}/>:null}
                <View style={{height:reallySize(16)}}/>
            </View>
        );


    };

    render(){
        return(
            <View style={styles.container}>
                {/*导航栏*/}
                <NavigationBar barStyle={'dark-content'}
                               titleStyle={{fontSize: 17, color: Colors._333}}
                               toolbarStyle={{backgroundColor: 'white'}}
                               title={I18n.t('article_list')}
                               leftBtnIcon={Images.set_back}
                               leftImageStyle={{height:19,width:11, marginLeft: 20, marginRight: 20}}
                               leftBtnPress={() => {
                                   router.pop()
                               }}
                />

                {/*草稿箱列表*/}
                {!isEmptyObject(this.state.articleList)?
                    <FlatList data={this.state.articleList}
                              keyExtractor={(item, index) => index + ""}
                              renderItem={this._renderItem}
                              ItemSeparatorComponent={() => <View style={[{backgroundColor:"#ECECEE"},{height:reallySize(6)}]}/>}
                    />
                    :<NoDataView/>}

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
    },
    subRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:reallySize(375),
        height:reallySize(63),
    },
    dateText:{
        marginLeft:reallySize(17),
        fontSize:14,
        color:"#666666",
    },
    editImage:{
        width:reallySize(17),
        height:reallySize(17),
        marginRight:reallySize(17),
    },
    title:{
        fontSize:18,
        color:"#444444",
        marginLeft:reallySize(17),
        marginRight:reallySize(17),
    },
    content:{
        fontSize:14,
        color:"#666666",
        marginLeft:reallySize(17),
        marginRight:reallySize(17),
        marginTop:reallySize(16),
    },
    image:{
        marginTop:reallySize(16),
        width:reallySize(375),
        height:reallySize(200),
        resizeMode:"cover",
    }
});