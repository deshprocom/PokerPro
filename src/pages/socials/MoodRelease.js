import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import I18n from "react-native-i18n";
import {Colors, Images} from "../../Themes";
import {NavigationBar} from '../../components';
import {reallySize, screenWidth, toolBarHeight} from "./Header";
import ImagePicker from 'react-native-image-crop-picker';
import PopAction from "../comm/PopAction";

import {getFileName,showToast} from "../../utils/ComonHelper";
import {uploadImage,postTopic} from '../../services/SocialDao';
import Loading from "../../components/Loading";
import {checkPermission} from "../comm/Permission";

let lastUpload = false;//是否需要上传最后一张

export default class MoodRelease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                {
                    imagePath: Images.social.icon_send_mood,
                }
            ],
            currentIndex: 0,
            mood: "",
            address: {
                name: I18n.t('show_address'),
                address: "",
                latitude: "",
                longitude: "",
            }
        }
    }

    ///从相册选择
    insetrtImageAction = () => {
        let currentIndex = this.state.currentIndex;
        let newImages = this.state.images;
        let imagePath = newImages[currentIndex];
        let multiple = imagePath.imagePath === Images.social.icon_send_mood;
        checkPermission("photo", result => {
            if (result) {
                ImagePicker.openPicker({
                    compressImageMaxWidth: 1024,
                    compressImageMaxHeight: 1024,
                    compressImageQuality: 0.5,
                    mediaType: "photo",
                    multiple: multiple,
                    maxFiles: 9 - currentIndex,
                }).then(image => {
                    this.popAction.toggle();
                    if (multiple) {
                        image.forEach((item,index) => {
                            let path = item.path;
                            let reIndex = index + currentIndex;
                            if (reIndex === 8){
                                //需要上传最后一张
                                lastUpload = true;
                                newImages.splice(reIndex, 1, {imagePath: path});
                            }
                            else{
                                newImages.splice(reIndex, 0, {imagePath: path});
                            }
                        });
                    }
                    else{
                        newImages.splice(currentIndex, 1, {imagePath: image.path});
                    }
                    this.setState({images: newImages});
                });
            }
        })
    };


    ///拍照
    insertTakePhotoAction = () => {
        checkPermission("camera", result => {
            if (result) {
                let currentIndex = this.state.currentIndex;
                let newImages = this.state.images;
                ImagePicker.openCamera({
                    compressImageMaxWidth: 1024,
                    compressImageMaxHeight: 1024,
                    compressImageQuality: 0.5,
                }).then(image => {

                    this.popAction.toggle();
                    let imagePath = newImages[currentIndex];

                    //需要上传最后一张
                    if (currentIndex === 8) {
                        lastUpload = true;
                    }

                    ///插入图片
                    if (imagePath.imagePath === Images.social.icon_send_mood && currentIndex !== 8) {
                        newImages.splice(currentIndex, 0, {imagePath: image.path});
                    }
                    ///覆盖图片
                    else {
                        newImages.splice(currentIndex, 1, {imagePath: image.path});
                    }
                    this.setState({images: newImages});
                });
            }
        });
    };


    ///删除图片
    deleteImage = (index) => {

        let newImages = this.state.images;
        ///9张图
        if (newImages.length === 9) {
            let lastImage = newImages[8];
            //最后一张不是占位图，删除后添加占位图
            if (lastImage.imagePath !== Images.social.icon_send_mood) {
                newImages.splice(index, 1);
                newImages.push({imagePath: Images.social.icon_send_mood});
                lastUpload = false;
            }
            else {
                newImages.splice(index, 1);
            }
        }
        else {
            newImages.splice(index, 1);
        }
        this.setState({images: newImages});
    };

    ///请求发说说接口
    fetchData = () => {
        let mood = this.state.mood;
        let images = [...this.state.images];
        let imageIds = [];

        if (mood === "" && images.length === 1) {
            showToast(I18n.t('article_null'));
            return;
        }

        if (mood === "") {
            showToast(I18n.t('social_content'));
            return;
        }
        //无需上传图片
        if (images.length === 1) {
            console.log("无需上传图片");
            this.sendMood(mood, imageIds);
            return;
        }

        this.loading && this.loading.open();


        images.forEach((image, index) => {
            let imagePath = image.imagePath;
            //不上传占位图
            if (imagePath !== Images.social.icon_send_mood) {
                this.uploadImageAction(imagePath, (data) => {
                    imageIds.push(data.id);
                    ///需要上传最后一张，等待所有图片上传完成
                    if (lastUpload) {
                        console.log("需要上传最后一张");
                        if (images.length === imageIds.length) {
                            this.sendMood(mood, imageIds);
                        }
                    }
                    ///不需要上传最后一张，等待除占位图外所有图片上传完成
                    else {
                        console.log("不需要上传最后一张");
                        if (images.length - 1 === imageIds.length) {
                            this.sendMood(mood, imageIds);
                        }
                    }
                })
            }
        });

    };
    ///发说说
    sendMood = (mood, images) => {
        const {name, address, latitude, longitude} = this.state.address;
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
            body_type: 'short',
            body: mood,
            images,
            published: true,
            lat: lat,
            lng: lng,
            address_title: address_title,
            address: addressDetail,
        };

        postTopic(body, data => {
            showToast(I18n.t('article_release_success'));
            setTimeout(() => this.loading && this.loading.close(), 500);
            router.popToAriticle();
        }, err => {
            this.loading && this.loading.close();
        })
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

    ///渲染图片
    _renderItem = (item) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                    this.setState({currentIndex: item.index})
                    this.popAction && this.popAction.toggle()
                }}>
                    {item.item.imagePath === Images.social.icon_send_mood ?
                        <Image style={styles.itemImage} source={item.item.imagePath}/> :
                        <Image style={styles.itemImage} source={{uri: item.item.imagePath}}/>}
                </TouchableOpacity>

                {item.item.imagePath !== Images.social.icon_send_mood ?
                    <TouchableOpacity style={styles.delete} onPress={() => {
                        this.deleteImage(item.index)
                    }}>
                        <View style={styles.deleteView}>
                            <Text style={styles.deleteText}>删除</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>
        )
    };

    render() {
        let images = this.state.images;
        const {name, address} = this.state.address;
        let result = name;
        if (address !== "") {
            result = result + " ● " + address;
        }

        return (
            <View style={styles.container}>
                <View>
                    {/*导航栏*/}
                    <NavigationBar barStyle={'dark-content'}
                                   titleStyle={{fontSize: 17, color: Colors._333}}
                                   toolbarStyle={{backgroundColor: 'white'}}
                                   title={I18n.t('article_mode')}
                                   leftBtnText={I18n.t('cancel')}
                                   btnTextStyle={{fontSize: 14, color: Colors._333}}
                                   leftBtnPress={() => {
                                       router.pop()
                                   }}
                    />

                    <TextInput placeholder={I18n.t('social_content')}
                               style={styles.textInput}
                               multiline={true}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(text) => {
                                   this.setState({
                                       mood: text
                                   })
                               }}
                    />

                    <FlatList data={images}
                              keyExtractor={(item, index) => index + ""}
                              renderItem={this._renderItem}
                              numColumns={3}
                              horizontal={false}
                              style={[styles.flatList]}
                              bounces={false}
                    />

                    <TouchableOpacity onPress={() => {
                        global.router.toLocation({
                            address: (addressInfo) => {
                                this.setState({address: addressInfo});
                            }
                        })
                    }}>
                        <View style={styles.subView}>
                            <Image source={Images.social.address}
                                   style={[{width: 19}, {height: 22}]}/>
                            <Text
                                style={[{color: "#AAAAAA"}, {fontSize: 14}, {marginLeft: 5}, {marginRight: 17}]}>{result}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/*取消、发布*/}
                <View style={styles.toolBar}>
                    <TouchableOpacity onPress={() => router.pop()}>
                        <View style={styles.save}>
                            <Text style={[{color: "#444444"}, {fontSize: 15}]}>{I18n.t("cancel")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.fetchData}>
                        <View style={styles.send}>
                            <Text style={[{color: "#FFFFFF"}, {fontSize: 15}]}>{I18n.t("social_send")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <PopAction
                    ref={ref => this.popAction = ref}
                    btnArray={this.popActions()}/>

                <Loading ref={ref => this.loading = ref} cancelable={true}/>

            </View>
        )
    }

    popActions = () => {
        return [
            {
                name: I18n.t("socials_takephoto"), txtStyle: {color: '#4A90E2'}, onPress: () => {
                    this.insertTakePhotoAction();
                }
            },
            {
                name: I18n.t("socials_picture"), txtStyle: {color: '#4A90E2'}, onPress: () => {
                    this.insetrtImageAction();
                }
            },
            {name: I18n.t("cancel"), txtStyle: {color: '#F24A4A'}, onPress: () => this.popAction.toggle()}
        ];
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        flex: 1,
        justifyContent: "space-between",
    },
    textInput: {
        width: reallySize(341),
        height: reallySize(132),
        marginTop: reallySize(15),
        marginLeft: reallySize(17),
        backgroundColor: "white",
        padding: 10,
    },
    flatList: {
        marginLeft: reallySize(17),
        marginTop: reallySize(14),
        marginRight: reallySize(17),
    },
    item: {
        width: (screenWidth - reallySize(50)) / 3,
        height: (screenWidth - reallySize(50)) / 3,
        marginRight: reallySize(8),
        marginBottom: reallySize(8),
    },
    itemImage: {
        width: (screenWidth - reallySize(50)) / 3,
        height: (screenWidth - reallySize(50)) / 3,
    },
    subView: {
        flexDirection: "row",
        alignItems: "center",
        width: reallySize(375),
        paddingLeft: reallySize(18),
    },
    toolBar: {
        width: screenWidth,
        height: toolBarHeight,
        backgroundColor: "white",
        flexDirection: "row",
    },
    save: {
        width: reallySize(160),
        height: reallySize(34),
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "#ECECEE",
        borderWidth: 1,
        marginLeft: reallySize(17),
        marginTop: reallySize(8),
        marginRight: reallySize(11),

    },
    send: {
        width: reallySize(160),
        height: reallySize(34),
        backgroundColor: "#4A90E2",
        borderRadius: 4,
        marginTop: reallySize(8),
        justifyContent: "center",
        alignItems: "center",
    },
    delete: {
        position: "absolute",
        marginLeft: (screenWidth - reallySize(50)) / 3 - 32,
        marginTop: 4,
    },
    deleteView: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 9,
    },
    deleteText: {
        color: "white",
        fontSize: 10,
        padding: 4,
    }
});