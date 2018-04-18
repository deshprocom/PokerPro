import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {Images, Metrics} from "../../Themes";

export default class OtherMessage extends Component {
    static props = {
        message:null,
        messageClick:null
    };

    createMessage = () => {
        const {type,text,image} = this.props.message;
        switch(type){
            case "text" :
                return (
                    <View style={[styles.superView,styles.textView]}>
                        <Text style={[{color:"white"},{fontSize:15}]}>{text}</Text>
                    </View>
                );
            case "image" :
                return (
                    <View style={[styles.superView,styles.imageView]}>
                        <Image source={{uri:image}} style={{flex:1}}/>
                    </View>
                );
            case "video":
                return (
                    <View style={[styles.superView,styles.imageView]}>
                        <Image source={{uri:image}} style={{flex:1}}/>
                    </View>
                );
            case "voice":
                return (
                    <View style={[styles.superView,styles.textView]}>
                        <Text style={[{color:"white"},{fontSize:15}]}>这是一条语音消息</Text>
                    </View>
                );
            default:
                return null;
        }

    };

    render(){
        console.log("这是其他人发过来的消息",this.props.message);
        const {user} = this.props.message;
        const {avatar} = user;
        return(
            <View style={styles.container}>
                <Image source={{uri:avatar}} style={styles.userIcon}/>
                <TouchableOpacity onPress={() => {
                    if (this.props.messageClick === null) return;
                    this.props.messageClick();
                }}>
                    {this.createMessage()}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:Metrics.screenWidth,
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"flex-end",
    },
    userIcon:{
        width:Metrics.reallySize(38),
        height:Metrics.reallySize(38),
        borderRadius:Metrics.reallySize(19),
        marginLeft:17,
        marginBottom:17,
    },
    superView:{
        backgroundColor:"#1D89FA",
        marginBottom:17,
        marginTop:17,
        marginLeft:10,
        borderRadius:6,
    },
    textView:{
        maxWidth:Metrics.screenWidth - (Metrics.reallySize(38) + 27) * 2,
        padding:10,
    },
    imageView:{
        width:Metrics.reallySize(120),
        height:Metrics.reallySize(150),
        padding:4,
    }
});