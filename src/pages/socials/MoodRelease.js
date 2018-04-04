import React, { Component } from 'react';
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
import {Colors,Images} from "../../Themes";
import {NavigationBar} from '../../components';
import {isEmptyObject,utcDate,strNotNull} from '../../utils/ComonHelper';
import {reallySize,screenWidth,toolBarHeight} from "./Header";
import images from "../../Themes/Images";

export default class MoodRelease extends Component{
    constructor(props){
        super(props);
        this.state = {
            images:[
                {
                    imagePath:Images.social.icon_send_mood,
                }
            ],
        }
    }

    ///渲染图片
    _renderItem = (item) => {
        return(
            <View style={styles.item}>
                <TouchableOpacity>
                    <Image style={styles.itemImage} source={item.item.imagePath}/>
                </TouchableOpacity>
            </View>
        )
    };

    render(){
        let images = this.state.images;
        let imageLine = images.length / 3;
        if (images.length % 3 !== 0) {
            imageLine = imageLine + 1;
        }
        let height = imageLine * (((screenWidth - reallySize(50)) / 3) + reallySize(8));
        console.log(height);

        return(
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

                    <TextInput  placeholder={I18n.t('social_content')}
                                style={styles.textInput}
                                multiline={true}
                    />

                    <FlatList data={images}
                              keyExtractor={(item, index) => index + ""}
                              renderItem={this._renderItem}
                              numColumns={3}
                              horizontal={false}
                              style={[styles.flatList]}
                              bounces={false}
                    />

                    <View style={styles.subView}>
                        <Image source={Images.social.address} style={[{width:reallySize(14)},{height:reallySize(18)}]}/>
                        <Text style={[{color:"#AAAAAA"},{fontSize:14},{marginLeft:5}]}>{I18n.t('show_address')}</Text>
                    </View>
                </View>

                {/*保存到草稿箱、发布*/}
                <View style={styles.toolBar}>
                    <TouchableOpacity>
                        <View style={styles.save}>
                            <Text style={[{color: "#444444"}, {fontSize: 15}]}>{I18n.t("cancel")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
        flex:1,
        justifyContent:"space-between",
    },
    textInput:{
        width:reallySize(341),
        height:reallySize(132),
        marginTop:reallySize(15),
        marginLeft:reallySize(17),
        backgroundColor:"white",
        padding:10,
    },
    flatList:{
        marginLeft:reallySize(17),
        marginTop:reallySize(14),
        marginRight:reallySize(17),
    },
    item:{
        width:(screenWidth - reallySize(50)) / 3,
        height:(screenWidth - reallySize(50)) / 3,
        marginRight:reallySize(8),
        marginBottom:reallySize(8),
    },
    itemImage:{
        width:(screenWidth - reallySize(50)) / 3,
        height:(screenWidth - reallySize(50)) / 3,
    },
    subView:{
        flexDirection:"row",
        alignItems:"center",
        width:reallySize(375),
        paddingLeft:reallySize(18),
        height:reallySize(30),
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
        backgroundColor:"white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "#ECECEE",
        borderWidth:1,
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
    }
});