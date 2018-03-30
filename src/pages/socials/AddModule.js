import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {reallySize} from "./Header";
import {Images} from "../../Themes";
import I18n from "react-native-i18n";

export default class ImageView extends Component{
    static props = {
        insertImage:null,//插入图片
        insertTakePhoto:null,//拍照
        insertText:null,//插入文字
        edit:null,//编辑
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.subView,{justifyContent:"space-between"}]}>
                    <View style={{flexDirection:"row"}}>

                        <TouchableOpacity onPress={() => {
                            if (this.props.insertText === null) return;
                            this.props.insertText();
                        }}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{I18n.t('socials_content')}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (this.props.insertImage === null) return;
                            this.props.insertImage();
                        }}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{I18n.t('socials_picture')}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (this.props.insertTakePhoto === null) return;
                            this.props.insertTakePhoto();
                        }}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{I18n.t('socials_takephoto')}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <TouchableOpacity onPress={() => {
                        if (this.props.edit === null) return;
                        this.props.edit();
                    }}>
                        <View style={[styles.textView,{marginRight:reallySize(9)}]}>
                            <Text style={styles.text}>{I18n.t('socials_edit')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subView}>
                    <Image source={Images.social.address} style={[{width:reallySize(7)},{height:reallySize(9)}]}/>
                    <Text style={[{color:"#AAAAAA"},{fontSize:14},{marginLeft:5}]}>{I18n.t('show_address')}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#ECECEE",
        justifyContent: "flex-start",
        alignItems:"flex-start",
        height:reallySize(50),

    },
    subView:{
        flexDirection:"row",
        alignItems:"center",
        flex:1,
        width:reallySize(188),
        paddingLeft:reallySize(9),
    },
    textView:{
        backgroundColor:"#4A90E2",
        height:reallySize(14),
        borderRadius:reallySize(7),
        justifyContent: "center",
        alignItems:"center",
        marginRight:15,
    },
    text:{
        color:"white",
        paddingLeft:reallySize(5),
        paddingRight:reallySize(5),
    }
});