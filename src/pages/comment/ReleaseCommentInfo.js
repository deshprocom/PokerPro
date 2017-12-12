import React,{Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView,TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {utcDate, util} from '../../utils/ComonHelper';

export default class ReleaseCommentInfo extends Component {
    state={
        releaseShow:false,
        text:""
    };


    render(){
        console.log("ReleaseCommentInfo")
        return(
            <View style={ApplicationStyles.bgContainer}>
                <Animatable.View
                    duration={300}
                    animation={'fadeInUp'}
                    style={styles.page}>

                    <View style={styles.content}>
                        <View style={styles.inputView}>
                            <Image
                                style={styles.searchImg}
                                source={Images.pen}/>
                            <TextInput
                                onChangeText={(text) => {
                            this.setState({text});
                        }}
                                placeholder={I18n.t('reply')}
                                placeholderTextColor="#CCCCCC"
                                multiline={false}
                                style={styles.input}
                                underlineColorAndroid='transparent'
                                returnKeyLabel={I18n.t('certain')}
                                placeholderColor={Colors._BBBB}
                                returnKeyType={'go'}/>
                            <View style={{flex:1}}/>

                        </View>
                        <Text style={styles.txt}>发布</Text>
                    </View>

                </Animatable.View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        marginTop:1,
    },
    page: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
    },
    content:{
      flexDirection:"row",
        alignItems:'center',
        height:48,
        backgroundColor:'#FFFFFF'
    },
    searchImg: {
        height: 14,
        width: 14,
        marginLeft: 15,
        marginRight:30,
    },
    input: {
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        backgroundColor: '#ECECEE',
        borderRadius: 40,
        fontSize: 14,
        color: '#CCCCCC'
    },
    inputView:{
        marginLeft: 17,
        height: 30,
        width: 187,
        backgroundColor: Colors._ECE,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt:{
        fontSize: 15,
        color: '#444444',
        marginRight:15
    }

});