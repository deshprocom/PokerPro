import React, {PureComponent} from 'react';
import {
    StyleSheet, Image, Platform,
    View, TextInput, Text, TouchableOpacity,
    KeyboardAvoidingView, AsyncStorage, FlatList
} from 'react-native';
import {NavigationBar} from '../../components'
import {Colors, Images} from "../../Themes";
import I18n from "react-native-i18n";
import {reallySize, screenWidth, screenHeight, toolBarHeight} from "./Header";
import TitleView from "./TitleView";
import ContentView from "./ContentView";
import ImageView from "./ImageView";
import AddModule from "./AddModule";
import Swipeout from "react-native-swipeout";
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage,postTopic} from '../../services/SocialDao'
import {getFileName} from "../../utils/ComonHelper";


export default class ArticleRelease extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    type: "title",
                    text:"",
                },
                {
                    type: "content",
                    swipeOpen: false,
                    text:"",
                },
                {
                    type: "addModule",
                },
            ],
            swipeOpen: false,
        };
    }

    ///拼接图片上传后数据源
    createNewData = () => {
        let resultData = this.state.data;
        let imageCount = 0;//图片总数
        let successCount = 0;//上传成功数

        resultData.forEach((rowData,index) => {
            let type = rowData.type;
            if (type === "image"){

                imageCount ++;

                this.uploadImageAction(rowData.imagePath,((data)=>{
                    ///上传成功
                    let imageUrl = `![](${data.image_path})`;
                    rowData.imagePath = imageUrl;

                    successCount ++;

                    ///图片上传完毕
                    if (imageCount === successCount){
                        this.createBody();
                    }
                }));
            }

            ///最后一项且没有图片
            if (index === resultData.length - 2 && imageCount === 0){
                this.createBody();
            }
        });
    };

    ///拼接body
    createBody = () => {
        let resultData = this.state.data;
        let body = [];
        resultData.forEach((rowData) => {
            let type = rowData.type;
            if (type === "image"){
                body.push(rowData.imagePath);
            }
            if (type === "content"){
                body.push(rowData.text);
            }
        });
        let resultString = body.join("<br/>");
        console.log(resultString);
    };

    ///上传图片
    uploadImageAction = (imagePath,successCallBack) => {
        let formData = new FormData();
        let file = {uri: imagePath, type: "multipart/form-data", name: getFileName(imagePath)};
        formData.append("image",file);
        uploadImage(formData,data=>{
            successCallBack(data);
        },err =>{
            this.uploadImageAction(imagePath,successCallBack);
        });
    };

    ///发布长贴
    postTopic = () => {
        this.createNewData();
        // let body = {
        //     body_type: 'long',
        //     body: 'woaalskdjflkajlskdjflkajskldf',
        //     title: '长贴标题',
        //     published: true,
        //     lat:'',
        //     lng:'',
        //     location:'',
        // };
        // postTopic(body, data => {
        //     console.log(data);
        // }, err => {
        //
        // })
    };

    ///保存草稿
    saveDraft = () => {
        storage.save({
            key: 'loginState',   // Note: Do not use underscore("_") in key!
            data: {
                from: 'some other site',
                userid: 'some userid',
                token: 'some token'
            },

            // if not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: 1000 * 3600
        });
    };


    ///插入一行
    insertRow = (rowData) => {
        let newData = [...this.state.data];
        newData.splice(newData.length - 1, 0, rowData);
        this.setState({data: newData});
    };


    ///删除当前行
    deleteRow = (index) => {
        let newData = [...this.state.data];
        newData.splice(index, 1);
        this.setState({data: newData});
    };

    ///打开当前行、关闭其他行
    closeOtherRow = (currentIndex) => {
        let newData = [...this.state.data];
        newData.forEach((rowData, index) => {
            ///不为第一项和最后一项
            if (index !== 0 && index !== newData.length - 1) {
                //当前行
                if (index === currentIndex) {
                    rowData.swipeOpen = true;
                }
                else {
                    rowData.swipeOpen = false;
                }
            }
        });
        this.setState({data: newData});
    };


    ///插入图片
    insetrtImageAction = () => {
        ImagePicker.openPicker({
            width: screenWidth,
            height: screenWidth + 1,
            cropping: true
        }).then(image => {
            let rowData = {
                type: "image",
                swipeOpen: false,
            };
            rowData.imagePath = image.path;
            rowData.imageWidth = image.width;
            rowData.imageHeight = image.height;
            this.insertRow(rowData);
        });
    };


    ///拍照
    insertTakePhotoAction = () => {
        ImagePicker.openCamera({
            width: screenWidth,
            height: screenWidth + 1,
            cropping: true
        }).then(image => {
            let rowData = {
                type: "image",
                swipeOpen: false,
            };
            rowData.imagePath = image.path;
            rowData.imageWidth = image.width;
            rowData.imageHeight = image.height;
            this.insertRow(rowData);
        });
    };

    ///插入文本
    insertTextAction = () => {
        let rowData = {
            type: "content",
            swipeOpen: false,
        };
        this.insertRow(rowData);
    };

    ///打开、关闭侧滑
    editAction = () => {
        let newData = [...this.state.data];
        let swipeOpen = !this.state.swipeOpen;
        newData.forEach((rowData, index) => {
            ///不为第一项和最后一项
            if (index !== 0 && index !== newData.length - 1) {
                rowData.swipeOpen = swipeOpen;
            }
        });
        this.setState({
            data: newData,
            swipeOpen: swipeOpen,
        });
    };

    ///创建侧滑右侧排序按钮
    createArrangeComponent = () => {
        return (
            <View style={styles.editIcon}>
                <Image style={styles.imageIcon} source={Images.social.row_arrange}/>
            </View>
        );
    };

    ///渲染行
    _renderItem = (item) => {

        let type = item.item.type;
        if (type === "title") {
            ///标题
            return (
                <TitleView callbackTitle={(text) => {
                    let newData = [...this.state.data];
                    let titleData = newData[item.index];
                    titleData.text = text;
                    this.setState({data:newData});
                }}/>
            );
        }
        else if (type === "addModule") {
            ///添加模块
            return (
                <AddModule insertImage={this.insetrtImageAction}
                           insertTakePhoto={this.insertTakePhotoAction}
                           insertText={this.insertTextAction}
                           edit={this.editAction}
                           editState={this.state.swipeOpen}
                />
            );
        }
        else {
            let swipeOpen = item.item.swipeOpen;
            return (
                <Swipeout
                    right={[{component: this.createArrangeComponent()}, {
                        text: "删除",
                        backgroundColor: "red",
                        onPress:() => this.deleteRow(item.index)
                    }]}
                    backgroundColor={"#ECECEE"}
                    onClose={() =>{}} ///关闭
                    onOpen={() => {}} ///打开
                    scroll={event => console.log('scroll event') } ///滑动
                    autoClose={true} ///点击按钮关闭
                    openRight={swipeOpen}
                    close={!swipeOpen}
                >
                    {/*文字*/}
                    {type === "content" ? <ContentView callbackText={(text) =>{
                        let newData = [...this.state.data];
                        let titleData = newData[item.index];
                        titleData.text = text;
                        this.setState({data:newData});
                    }}/> : null}
                    {/*图片*/}
                    {type === "image" ? <ImageView imageInfo={item.item}/> : null}
                </Swipeout>
            );
        }
    };

    render() {
        let data = this.state.data;
        return (
            <View style={styles.container}>

                {/*导航栏*/}
                <NavigationBar barStyle={'dark-content'}
                               titleStyle={{fontSize: 17, color: Colors._333}}
                               toolbarStyle={{backgroundColor: 'white'}}
                               title={I18n.t('release_article')}
                               leftBtnText={I18n.t('cancel')}
                               rightBtnText={I18n.t('draft_box')}
                               btnTextStyle={{fontSize: 14, color: Colors._333}}
                               leftBtnPress={() => {
                                   router.pop()
                               }}
                />


                <KeyboardAvoidingView style={{flex: 1}}>
                    <FlatList data={data}
                              keyExtractor={(item, index) => index + ""}
                              renderItem={this._renderItem}
                    />
                </KeyboardAvoidingView>


                {/*保存到草稿箱、发布*/}
                <View style={styles.toolBar}>
                    <TouchableOpacity>
                        <View style={styles.save}>
                            <Text style={[{color: "#444444"}, {fontSize: 15}]}>{I18n.t("social_save")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.postTopic}>
                        <View style={styles.send}>
                            <Text style={[{color: "#FFFFFF"}, {fontSize: 15}]}>{I18n.t("social_send")}</Text>
                        </View>
                    </TouchableOpacity>

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
    editIcon: {
        flex: 1,
        backgroundColor: "#ECECEE",
        alignItems: "center",
        justifyContent: "center",
    },
    imageIcon: {
        width: reallySize(13),
        height: reallySize(13),
        resizeMode: "contain",
    },
    toolBar: {
        width: screenWidth,
        height: toolBarHeight,
        backgroundColor: "white",
        flexDirection: "row",
    },
    save: {
        width: reallySize(93),
        height: reallySize(17),
        backgroundColor: "#ECECEE",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginLeft: reallySize(9),
        marginTop: reallySize(4),
        marginRight: reallySize(7),
    },
    send: {
        width: reallySize(71),
        height: reallySize(17),
        backgroundColor: "#4A90E2",
        borderRadius: 4,
        marginTop: reallySize(4),
        justifyContent: "center",
        alignItems: "center",
    }
});
