import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    View,
    Image,
} from 'react-native';
import {reallySize} from "./Header";

export default class ImageView extends Component{
    static props = {
        imageInfo:null,
    };
    render(){
        const {imagePath,imageWidth,imageHeight} = this.props.imageInfo;

        ///真实图片高度
        let reallyHeight = imageHeight * reallySize(342) / imageWidth;
        return(
            <View style={[styles.container,{height:reallyHeight + 8}]}>
                <Image source={{uri:imagePath}} style={[{width:reallySize(342)},{height:reallyHeight}]}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEE",
        justifyContent: "center",
        alignItems:"center",
    },
});