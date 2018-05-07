import React, {PureComponent} from 'react';
import {
    StyleSheet, Image, Platform,
    View, TextInput, Text, TouchableOpacity,
    KeyboardAvoidingView, AsyncStorage, FlatList, Alert, PanResponder
} from 'react-native';
import {NavigationBar} from '../../components'
import {Colors, Images} from "../../Themes";
import I18n from "react-native-i18n";
import {reallySize, screenWidth, toolBarHeight, screenHeight} from "./Header";
import TitleView from "./TitleView";
import ContentView from "./ContentView";
import ImageView from "./ImageView";
import AddModule from "./AddModule";
import Swipeout from "react-native-swipeout";
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage, postTopic} from '../../services/SocialDao'
import {getFileName, showToast} from "../../utils/ComonHelper";
import moment from 'moment';
import Loading from "../../components/Loading";
import {checkPermission} from "../comm/Permission";


let articleKey = "";//长贴标识
let swipeOpen = false;//侧滑是否打开

export default class ArticleRelease extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    type: "title",
                    text: "",
                },
                {
                    type: "content",
                    swipeOpen: false,
                    text: "",
                },
                {
                    type: "addModule",
                    address: {
                        name: I18n.t('show_address'),
                        address: "",
                        latitude: "",
                        longitude: "",
                    }
                },
            ],
        };

    }


    componentDidMount() {
        //长帖id
        articleKey = this.props.params.articleKey;
        if (articleKey !== undefined) {
            this.setState({data: this.props.params.articleInfo})
        }
    }

    ///拼接图片上传后数据源
    createNewData = () => {
        let resultData = [...this.state.data];
        let imageCount = 0;//图片总数
        let successCount = 0;//上传成功数
        let cover_link = "";

        resultData.forEach((rowData, index) => {
            let type = rowData.type;
            if (type === "image") {
                imageCount++;

                this.uploadImageAction(rowData.imagePath, ((data) => {
                    ///上传成功
                    ///如果封面图为空 取第一张图做封面图
                    if (cover_link === "") {
                        cover_link = data.image_path;
                    }
                    let imageUrl = `<img style="margin-top: 15px" src="${data.image_path}">`;
                    rowData.imagePath = imageUrl;

                    successCount++;

                    ///图片上传完毕
                    if (imageCount === successCount) {
                        this.createBody(cover_link);
                    }
                }));
            }

            ///最后一项且没有图片
            if (index === resultData.length - 2 && imageCount === 0) {
                this.createBody(cover_link);
            }
        });
    };

    ///拼接body
    createBody = (cover_link) => {
        let resultData = this.state.data;
        let title = "";
        let body = [];
        resultData.forEach((rowData) => {
            let type = rowData.type;
            if (type === "image") {
                body.push(rowData.imagePath);
            }
            if (type === "content" && rowData.text !== "") {
                body.push(`<p style="color:#444444;font-size: 15px;line-height: 25px;">${rowData.text}</p>`);
            }
            if (type === "title") {
                title = rowData.text;
            }
        });
        let resultString = body.join("&nbsp");
        this.fetchData(title, resultString, cover_link);
    };

    ///上传图片
    uploadImageAction = (imagePath, successCallBack) => {

        ///未登录先登录
        if (login_user.user_id === undefined) {
            router.toLoginFirstPage();
            return;
        }
        let formData = new FormData();
        let file = {uri: imagePath, type: "multipart/form-data", name: getFileName(imagePath)};
        formData.append("image", file);
        uploadImage(formData, data => {
            successCallBack(data);
        }, err => {
            this.uploadImageAction(imagePath, successCallBack);
        });
    };

    ///发布长贴
    postTopic = () => {
        this.contentView.blur()
        ///判断是否输入内容
        let resultData = this.state.data;
        let titleIsNull = true;
        let bodyIsNull = true;
        for (i = 0; i < resultData.length; i++) {
            let rowData = resultData[i];
            let type = rowData.type;
            if (type === "image") {
                bodyIsNull = false;
                break;
            }
            if (type === "content" && rowData.text !== "") {
                bodyIsNull = false;
                break;
            }
            if (type === "title" && rowData.text !== "") {
                titleIsNull = false;
            }
        }

        if (titleIsNull) {
            showToast(I18n.t('article_title_null'));
            return;
        }
        if (bodyIsNull) {
            showToast(I18n.t('article_content_null'));
            return;
        }

        ///开始动画，拼接内容
        setTimeout(() => this.loading && this.loading.open(), 100);
        this.closeAction();
        this.createNewData();
    };

    ///请求发长贴接口
    fetchData = (title, content, cover_link) => {
        let lastObj = this.state.data[this.state.data.length - 1];
        const {name, address, latitude, longitude} = lastObj.address;

        let lat = '';
        let lng = '';
        let address_title = '';
        let addressDetail = '';
        if (name !== I18n.t('show_address') && name !== I18n.t("hide_address")) {
            lat = latitude;
            lng = longitude;
            address_title = name;
            addressDetail = address;
        }

        let body = {
            body_type: 'long',
            body: content,
            title: title,
            published: true,
            cover_link: cover_link,
            lat: lat,
            lng: lng,
            address_title: address_title,
            address: addressDetail,
        };
        postTopic(body, data => {
            showToast(I18n.t('article_release_success'));
            setTimeout(() => this.loading && this.loading.close(), 100);

            ///草稿箱已经存在当前长帖 将其删除
            if (articleKey !== undefined) {

                ///获取草稿列表
                storage.load({key: "articleList"}).then(ret => {

                    let articleList = ret;

                    articleList.forEach((article, index) => {
                        let key = article.key;
                        ///删除当前草稿
                        if (key === articleKey) {
                            articleList.splice(index, 1);
                        }
                    });


                    ///存储草稿列表
                    storage.save({
                        key: 'articleList',
                        data: articleList,
                    }).then(() => {
                        router.popToAriticle();
                    }).catch(err => {
                        showToast("error");
                    });
                }).catch(err => {
                    showToast("error");
                });

            }
            else {
                router.popToAriticle();
            }


        }, err => {
            setTimeout(() => this.loading && this.loading.close(), 100);
            console.log(err)
            showToast(err)
        })
    };

    ///保存草稿
    saveDraft = () => {
        this.contentView.blur()
        this.closeAction();
        let resultData = this.state.data;
        let title = "";
        let content = "";
        let image = false;
        resultData.forEach((rowData) => {
            let type = rowData.type;
            if (type === "title") {
                title = rowData.text;
            }
            if (type === "image") {
                image = true;
            }
            if (type === "content") {
                content = rowData.text;
            }
        });
        if (title === "" && !image && content === "") {
            showToast(I18n.t('article_null'));
            return;
        }

        ///长帖信息
        let articleInfo = {data: resultData};


        ///获取草稿列表
        storage.load({key: "articleList"}).then(ret => {

            let articleList = ret;
            let currentKey = moment().format('X');//当前时间戳

            //如果是新文章
            if (articleKey === undefined) {
                ///如果是新文章，设置一个key,并添加进草稿列表
                articleInfo.key = currentKey;
                articleList.push(articleInfo);
            }
            ///从草稿箱编辑
            else {
                articleList.forEach((article, index) => {
                    let key = article.key;
                    ///替换当前的草稿,并覆盖时间戳
                    if (key === articleKey) {
                        articleInfo.key = currentKey;
                        articleList.splice(index, 1, articleInfo);
                    }
                });
            }


            ///存储草稿列表
            storage.save({
                key: 'articleList',
                data: articleList,
            }).then(() => {
                showToast(I18n.t('article_save_success'));
                articleKey = currentKey;
                if (this.props.params.reloadInfo === null) return;
                this.props.params.reloadInfo();
            });
        }).catch(err => {
            ///存储草稿列表
            let articleList = [];
            let currentKey = moment().format('X');//当前时间戳
            articleInfo.key = currentKey;
            articleList.push(articleInfo);
            storage.save({
                key: 'articleList',
                data: articleList,
            }).then(() => {
                articleKey = currentKey;
            }).catch(err => {
                showToast(I18n.t('article_save_failure'))
            });
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

    ///插入图片
    insetrtImageAction = () => {
        this.closeAction();
        checkPermission("photo", result => {
            if (result) {
                ImagePicker.openPicker({
                    compressImageMaxWidth: 1024,
                    compressImageMaxHeight: 1024,
                    mediaType: "photo",
                    compressImageQuality: 0.5
                }).then(image => {
                    if (image.mime.indexOf("image") !== -1) {
                        let rowData = {
                            type: "image",
                            swipeOpen: false,
                        };
                        rowData.imagePath = image.path;
                        rowData.imageWidth = image.width;
                        rowData.imageHeight = image.height;
                        this.insertRow(rowData);
                    }
                    else {
                        showToast(I18n.t("file_type_error"));
                    }
                });
            }
        })
    };


    ///拍照
    insertTakePhotoAction = () => {
        this.closeAction();
        checkPermission("camera", (result) => {
            if (result) {
                ImagePicker.openCamera({
                    compressImageMaxWidth: 1024,
                    compressImageMaxHeight: 1024,
                    compressImageQuality: 0.5
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
            }
        });
    };

    ///插入文本
    insertTextAction = () => {
        this.closeAction();
        let rowData = {
            type: "content",
            swipeOpen: false,
            text: "",
        };
        this.insertRow(rowData);
    };

    ///显示位置
    vistLocations = () => {
        router.toLocation({
            address: (addressInfo) => {
                let data = [...this.state.data];
                let newObj = {
                    type: "addModule",
                    address: addressInfo,
                };
                data.splice(data.length - 1, 1, newObj);
                this.setState({data: data});
            }
        });
    };

    ///打开、关闭侧滑
    editAction = () => {
        let newData = [...this.state.data];
        swipeOpen = !swipeOpen;
        newData.forEach((rowData, index) => {
            ///不为第一项和最后一项
            if (index !== 0 && index !== newData.length - 1) {
                rowData.swipeOpen = swipeOpen;
            }
        });
        this.setState({
            data: newData,
        });
    };
    //关闭侧滑
    closeAction = () => {
        let newData = [...this.state.data];
        swipeOpen = false;
        newData.forEach((rowData, index) => {
            ///不为第一项和最后一项
            if (index !== 0 && index !== newData.length - 1) {
                rowData.swipeOpen = false;
            }
        });
        this.setState({
            data: newData,
        });
    };

    ///创建侧滑右侧排序按钮
    createArrangeComponent = (index) => {
        return (
            <TouchableOpacity style={styles.editIcon} onPress={() => this.deleteRow(index)}>
                <View style={styles.editIcon}>
                    <Text style={{color: "white"}}>{I18n.t('delete')}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    ///渲染行
    _renderItem = (item) => {
        let type = item.item.type;
        if (type === "title") {
            ///标题
            return (
                <TitleView defaultValue={item.item.text}
                           beginEdit={() => {
                               this.closeAction();
                           }}
                           callbackTitle={(text) => {
                               let newData = [...this.state.data];
                               let titleData = newData[item.index];
                               titleData.text = text;
                               this.setState({data: newData});
                           }}/>
            );
        }
        else if (type === "addModule") {
            const {name, address} = item.item.address;
            let result = name;
            if (address !== "") {
                result = result + " ● " + address;
            }
            ///添加模块
            return (
                <AddModule insertImage={this.insetrtImageAction}
                           insertTakePhoto={this.insertTakePhotoAction}
                           insertText={this.insertTextAction}
                           edit={this.editAction}
                           editState={swipeOpen}
                           visitLocation={this.vistLocations}
                           address={result}
                />
            );
        }
        else {
            let swipeOpen = item.item.swipeOpen;
            return (
                <Swipeout
                    right={[
                        {
                            component: this.createArrangeComponent(item.index),
                            backgroundColor: "#ECECEE"
                        }
                    ]}
                    backgroundColor={"#ECECEE"}
                    autoClose={false} ///点击按钮关闭
                    openRight={swipeOpen}
                    close={!swipeOpen}
                    disabled={true}
                >
                    {/*文字*/}
                    {type === "content" ? <ContentView beginEdit={() => {
                        this.closeAction();
                        this.listView.scrollToIndex({index: item.index, viewPosition: 0.3});
                    }}
                                                       defaultValue={item.item.text}
                                                       ref={ref => this.contentView = ref}
                                                       callbackText={(text) => {
                                                           let newData = [...this.state.data];
                                                           let titleData = newData[item.index];
                                                           titleData.text = text;
                                                           this.setState({data: newData});
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
                <View
                    style={{
                        height: Platform.OS === 'ios' ?
                            screenHeight - toolBarHeight : screenHeight - toolBarHeight - 20
                    }}>
                    {/*导航栏*/}
                    <NavigationBar barStyle={'dark-content'}
                                   titleStyle={{fontSize: 17, color: Colors._333}}
                                   toolbarStyle={{backgroundColor: 'white'}}
                                   title={I18n.t('release_article')}
                                   leftBtnText={I18n.t('cancel')}
                                   rightBtnText={I18n.t('draft_box')}
                                   btnTextStyle={{fontSize: 14, color: Colors._333}}
                                   rightBtnPress={() => {
                                       this.closeAction();
                                       ///草稿箱
                                       global.router.toArticleList();
                                   }}
                                   leftBtnPress={() => {
                                       let resultData = this.state.data;
                                       let title = "";
                                       let content = "";
                                       let image = false;
                                       resultData.forEach((rowData) => {
                                           let type = rowData.type;
                                           if (type === "title") {
                                               title = rowData.text;
                                           }
                                           if (type === "image") {
                                               image = true;
                                           }
                                           if (type === "content") {
                                               content = rowData.text;
                                           }
                                       });
                                       if (title === "" && !image && content === "") {
                                           router.pop();
                                       }
                                       else {
                                           Alert.alert(
                                               I18n.t("save_title"),
                                               '',
                                               [
                                                   {text: I18n.t("save_n"), onPress: () => router.pop()},
                                                   {
                                                       text: I18n.t("save_s"), onPress: () => {
                                                           this.saveDraft();
                                                           router.pop();
                                                       }
                                                   },
                                               ],
                                               {cancelable: false}
                                           );
                                       }

                                   }}

                    />


                    <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
                        <FlatList data={data}
                                  keyExtractor={(item, index) => index + ""}
                                  renderItem={this._renderItem}
                                  ref={ref => this.listView = ref}
                                  keyboardShouldPersistTaps={"never"}
                        />
                    </KeyboardAvoidingView>
                </View>


                {/*保存到草稿箱、发布*/}
                <View style={styles.toolBar}>
                    <TouchableOpacity onPress={this.saveDraft}>
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

                <Loading ref={ref => this.loading = ref} cancelable={true}/>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
        justifyContent: "space-between",
    },
    editIcon: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red"
    },
    imageIcon: {
        width: reallySize(26),
        height: reallySize(26),
        resizeMode: "contain",
    },
    toolBar: {
        width: screenWidth,
        height: toolBarHeight,
        backgroundColor: "white",
        flexDirection: "row",
    },
    save: {
        width: reallySize(186),
        height: reallySize(34),
        backgroundColor: "#ECECEE",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginLeft: reallySize(18),
        marginTop: reallySize(8),
        marginRight: reallySize(14),
    },
    send: {
        width: reallySize(142),
        height: reallySize(34),
        backgroundColor: "#4A90E2",
        borderRadius: 4,
        marginTop: reallySize(8),
        justifyContent: "center",
        alignItems: "center",
    }
});
