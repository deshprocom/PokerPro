import React, {Component} from 'react';
import {
    View, Text, Button, Alert, DatePickIOS,
    Image, StyleSheet, ActivityIndicator,
    TouchableOpacity, ScrollView,Dimensions,
    ListView,Animated,Easing
}
    from 'react-native';
import {Images} from '../../Themes';
import Races from './Races';
import {styles} from './Styles';

const onButtonPress=()=>{

};

const texts=['2017WSOP欧洲站来袭，保底100W欧元...',
    'qqwqw2017WSOP欧洲站来袭，保底100W欧元qwqq...',
    'SOP欧洲站来袭，保底100W欧元sdsdsdsdsds...',
    'asdhsdnskldhsydsldjsdyuaso'];
var i=1;
var touch=true;
var deviceWidth = Dimensions.get('window').width;



export default class RaceInfoPage extends Component {
    state={
      text:texts[0]
    };
    constructor () {
        super()
        this.animatedValue = new Animated.Value(0)
    }
    componentDidMount() {
        // Animated.timing(texts, {
        //     toValue: 1, // 目标值
        //     duration: 2500, // 动画时间
        //     easing: Easing.linear // 缓动函数
        // }).start();
        if(touch){
            this.showText();

        }
        this.animate()

    };
    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    };

    showText =() => {
        setInterval(() => {
            if(i === texts.length-1){
                i=0;
            }
            i++;
            this.setState({
                text:texts[i-1]
            });
        },4000);
    };


    render() {
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 5, 0]
        });
        return (
            <ScrollView>
                <View style={styles.scrollImg}>

                </View>
                {/*<View*/}
                    {/*style={{height:100,flexDirection:'row',flexWrap:'nowrap',justifyContent:'space-around',alignItems:'center'}}>*/}
                    {/*<View style={styles.ticket}>*/}
                        {/*<Image source={Images.icon_spot}/>*/}
                        {/*<Text>票务</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.ticket}>*/}
                        {/*<Image source={Images.icon_spot}/>*/}
                        {/*<Text>商城</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.ticket}>*/}
                        {/*<Image source={Images.icon_spot}/>*/}
                        {/*<Text>资讯</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.ticket}>*/}
                        {/*<Image source={Images.icon_spot}/>*/}
                        {/*<Text>排行</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <View style={styles.pukes}>
                    <View style={styles.puke}>
                        <Image style={styles.pukeText} source={Images.pukes}/>
                        <View style={{width:1,height:16,backgroundColor:'#E5E5E5',marginLeft:15}}/>
                        <Animated.View style={{opacity}}>
                            <Text style={[styles.pukeText2,{marginLeft:15}]}
                           >{this.state.text}</Text>
                        </Animated.View>
                    </View>
                </View>
                <Races/>
                <View>
                    <View style={[styles.more,{marginLeft:20}]}>
                        <ActivityIndicator/>
                        <Text style={styles.raceText}>即将到来</Text>
                        <TouchableOpacity style={{marginLeft:150}}
                                          onPress={onButtonPress}>
                            <Text style={[styles.raceText]}>更多 ></Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.moreTwos}>
                        <View style={styles.moreTwo}>
                            <Image source={Images.icon_spot}/>
                            <Text style={[styles.raceText,{marginTop:10}]}>如果你无法简洁的表达你...</Text>
                        </View>
                        <View style={styles.moreTwo}>
                            <Image source={Images.icon_spot}/>
                            <Text style={[styles.raceText,{marginTop:10}]}>如果你无法简洁的表达你...</Text>
                        </View>
                        <View style={styles.moreTwo}>
                            <Image source={Images.icon_spot}/>
                            <Text style={[styles.raceText,{marginTop:10}]}>如果你无法简洁的表达你...</Text>
                        </View>
                        <View style={styles.moreTwo}>
                            <Image source={Images.icon_spot}/>
                            <Text style={[styles.raceText,{marginTop:10}]}>如果你无法简洁的表达你...</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <View style={[styles.more,{marginLeft:20,marginTop:20}]}>
                        <ActivityIndicator/>
                        <Text style={styles.raceText}>热门资讯</Text>
                        <TouchableOpacity style={{marginLeft:150}}
                                          onPress={onButtonPress}>
                            <Text style={[styles.raceText]}>更多 ></Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.information}>
                        <View style={styles.informationTwo}>
                            <Text style={[styles.raceText,{marginTop:10}]}>如果你无法简洁的表达你...</Text>
                            <Image style={styles.informationImg} source={Images.icon_spot}/>
                        </View>
                        <View style={styles.informationTwo}>
                            <Text style={[styles.raceText,{marginTop:10}]}>如果你无法简洁的表达你...</Text>
                            <Image style={styles.informationImg} source={Images.icon_spot}/>
                        </View>
                    </View>
                </View>
                <View
                    style={{height:0.5,backgroundColor:'#000000',marginTop:10,marginBottom:20,width:359,marginLeft:5}}></View>

                <View style={{marginTop:5,marginLeft:20,marginRight:20}}>
                    <Text numberOfLines={3} >如果你无法简洁的表达你的想法，那只说明你还不够了解它。{'\n'}-- 阿尔伯特·爱因斯坦</Text>
                </View>
            </ScrollView>
        );
    }
}

