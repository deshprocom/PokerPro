import React, {PureComponent} from 'react';
import {
    StyleSheet, Image, Platform,
    View, TextInput, Text, TouchableOpacity,
    KeyboardAvoidingView, Modal,FlatList
} from 'react-native';
import {NavigationBar} from '../../components'
import {Colors, Images} from "../../Themes";
import I18n from "react-native-i18n";
import {reallySize,screenWidth,screenHeight,toolBarHeight} from "./Header";
import TitleView from "./TitleView";
import ContentView from "./ContentView";
import ImageView from "./ImageView";
import AddModule from "./AddModule";
import Swipeout from "react-native-swipeout";
import ImagePicker from 'react-native-image-crop-picker';


export default class ArticleRelease extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            data : [
                {
                    type:"title",
                },
                {
                    type:"content",
                },
                {
                    type:"addModule",
                },
            ],
        };
    }

    ///插入图片
    insetrtImageAction = () => {
        let newData = [...this.state.data];
        ImagePicker.openPicker({
            width: screenWidth,
            height: screenHeight,
            cropping: true
        }).then(image => {
            console.log(image);
            let rowData = {
                type:"image",
            };
            rowData.imagePath = image.path;
            rowData.imageWidth = image.width;
            rowData.imageHeight = image.height;
            // newData.push(rowData);
            // console.log("============");
            // console.log(newData);
            newData.splice(newData.length-1,0,rowData);
            this.setState({data:newData});
        });
    };

    ///插入文本
    // insertText


    ///创建侧滑左侧编辑按钮
    createEditComponent = () => {
        return(
            <View style={styles.editIcon}>
                <Image style={styles.imageIcon} source={Images.social.row_delete}/>
            </View>
        );
    };
    ///创建侧滑右侧排序按钮
    createArrangeComponent = () => {
        return(
            <View style={styles.editIcon}>
                <Image style={styles.imageIcon} source={Images.social.row_arrange}/>
            </View>
        );
    };

    ///渲染行
    _renderItem = (item) => {
        let type = item.item.type;
        if (type === "title"){
            ///标题
            return (
                <TitleView/>
            );
        }
        else if(type === "addModule"){
            ///添加模块
            return (
                <AddModule insertImage={this.insetrtImageAction}/>
            );
        }
        else
        {
            console.log(item.item);
            return (
                <Swipeout
                    right={[{component:this.createArrangeComponent()},{text:"删除",backgroundColor:"red"}]}
                    left={[{component:this.createEditComponent(),backgroundColor:"#ECECEE"}]}
                    backgroundColor={"#ECECEE"}
                    onClose={() => console.log('===close') }
                    scroll={event => console.log('scroll event') }
                    buttonWidth={reallySize(25)}
                >
                    {/*文字*/}
                    {type === "content"?<ContentView/>:null}
                    {/*图片*/}
                    {type === "image"?<ImageView imageInfo={item.item}/>:null}
                </Swipeout>
            );
        }
    };

    render() {
        let data = this.state.data;
        return (
                <View style={styles.container}>

                    {/*导航栏*/}
                    <NavigationBar
                    barStyle={'dark-content'}
                    titleStyle={{fontSize: 17, color: Colors._333}}
                    toolbarStyle={{backgroundColor: 'white'}}
                    title={I18n.t('release_article')}
                    leftBtnText={I18n.t('cancel')}
                    rightBtnText={I18n.t('draft_box')}
                    btnTextStyle={{fontSize: 14, color: Colors._333}}
                    leftBtnPress={() => {
                    router.pop()
                    }}/>


                    <KeyboardAvoidingView style={{flex:1}}>
                        <FlatList data={data}
                                  keyExtractor={(item, index) => index + ""}
                                  renderItem={this._renderItem}
                        />
                    </KeyboardAvoidingView>


                    {/*保存到草稿箱、发布*/}
                    <View style={styles.toolBar}>
                        <View style={styles.save}>
                            <Text style={[{color:"#444444"},{fontSize:15}]}>{I18n.t("social_save")}</Text>
                        </View>
                        <View style={styles.send}>
                            <Text style={[{color:"#FFFFFF"},{fontSize:15}]}>{I18n.t("social_send")}</Text>
                        </View>
                    </View>

                </View>
)
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
    },
    editIcon:{
        flex:1,
        backgroundColor:"#ECECEE",
        alignItems:"center",
        justifyContent:"center",
    },
    imageIcon:{
        width:reallySize(13),
        height:reallySize(13),
        resizeMode:"contain",
    },
    toolBar:{
        width:screenWidth,
        height:toolBarHeight,
        backgroundColor:"white",
        flexDirection:"row",
    },
    save:{
        width:reallySize(93),
        height:reallySize(17),
        backgroundColor:"#ECECEE",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:4,
        marginLeft:reallySize(9),
        marginTop:reallySize(4),
        marginRight:reallySize(7),
    },
    send:{
        width:reallySize(71),
        height:reallySize(17),
        backgroundColor:"#4A90E2",
        borderRadius:4,
        marginTop:reallySize(4),
        justifyContent:"center",
        alignItems:"center",
    }
});
