import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal,Platform} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import propTypes from 'prop-types';
import {Badge} from '../../components';
import {util} from '../../utils/ComonHelper';
import {NavigationBar,BaseComponent} from '../../components';
import UltimateFlatList from '../../components/ultimate';

export default class PersonDynamicPage extends Component {

    componentDidMount() {

    };

    personTop=()=>{
        return(
            <View style={styles.topPage}>
                <Image style={styles.TopImg} source={Images.business}/>
                <View style={styles.TopTxt}>
                    <Text style={{fontSize:20,color:'#444444'}}>Deshpro</Text>
                    <Text style={{fontSize:14,color:'#888888',marginTop:5}}>还未填写个性签名，介绍下自己吧</Text>
                </View>
            </View>
        )
    };
    _separator = () => {
        return <View style={{height: 1, marginLeft: 78, marginRight: 17, backgroundColor: '#DDDDDD',marginBottom:16}}/>;
    };
    _separator1 = () => {
        return <View style={{height: 1, marginLeft: 16, marginRight: 17, backgroundColor: '#DDDDDD'}}/>;
    };

    renderItem=()=>{
        return (
            <View style={styles.itemPage}>
                <Text style={styles.itemTxt1}>在资讯回复了一个话题</Text>
                <View style={styles.itemView}>
                    <Image style={styles.image} source={Images.business}/>
                    <View style={styles.TxtRight}>
                        <Text style={styles.itemTxt1} numberOfLines={1}>Deshpro：哈哈哈哈哈哈哈哈哈wrferewrwrwr.</Text>
                        <Text style={styles.TxtRight2} numberOfLines={1}>德州扑克技巧教学</Text>
                    </View>
                </View>
            </View>
        )
    };

    content=()=>{
        return (
            <UltimateFlatList
                header={()=>{
                            return  <Text style={styles.time}>今天</Text>
                        }}
                arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                ref={ref => this.ultimate = ref}
                onFetch={this.onFetch}
                keyExtractor={(item, index) => `replies${index}`}
                item={this.renderItem}
                refreshableTitlePull={I18n.t('pull_refresh')}
                refreshableTitleRelease={I18n.t('release_refresh')}
                dateTitle={I18n.t('last_refresh')}
                allLoadedText={I18n.t('no_more')}
                waitingSpinnerText={I18n.t('loading')}
                separator={this._separator}
            />
        )
    };

    onFetch = (page, postRefresh, endFetch) => {
        if (page === 1) {
            postRefresh([1,2,3,4,5,6])
        } else {
            endFetch()
        }

    };

    render() {
        return (
            <BaseComponent style={ApplicationStyles.bgContainer}>
                <NavigationBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    toolbarStyle={{backgroundColor: Colors.white}}
                    title={I18n.t('person_dynamic')}
                    titleStyle={{color: Colors._161}}
                    leftBtnIcon={Images.mall_return}
                    rightBtnIcon={Images.commentWhite}
                    leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                    rightImageStyle={{height: 20, width: 22, marginLeft: 20, marginRight: 20}}
                    leftBtnPress={() => router.pop()}/>
                <ScrollView>
                    {this.personTop()}

                    <View style={{backgroundColor:'#FFFFFF'}}>
                        <UltimateFlatList
                            arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                            ref={ref => this.ultimate = ref}
                            onFetch={this.onFetch}
                            keyExtractor={(item, index) => `replies${index}`}
                            item={this.content}
                            refreshableTitlePull={I18n.t('pull_refresh')}
                            refreshableTitleRelease={I18n.t('release_refresh')}
                            dateTitle={I18n.t('last_refresh')}
                            allLoadedText={I18n.t('no_more')}
                            waitingSpinnerText={I18n.t('loading')}
                            separator={this._separator1}
                        />
                    </View>
                </ScrollView>


            </BaseComponent>
        );
    }


}

const styles = StyleSheet.create({

    topPage:{
        width:Metrics.screenWidth,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:18,
        paddingBottom:24,
        backgroundColor:'#DEDEDE',
    },
    TopImg:{
        width:74,
        height:74,
        marginLeft:24
    },
    TopTxt:{
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:21
    },
    itemsView:{
        paddingTop:5
    },
    time:{
        fontSize: 20,
        color: '#444444',
        marginLeft:17,
        marginTop:11,
        marginBottom:10,
        fontWeight:'bold'
    },
    itemPage:{
        marginLeft:78,
        marginTop:1,
        marginRight:17,
        marginBottom:15
    },
    itemTxt1:{
        fontSize: 14,
        color: '#444444',
        marginRight:50
    },
    itemView:{
        height:60,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#F5F5F5',
        borderRadius:1,
        marginTop:10
    },
    image:{
        width:48,height:48,
        marginLeft:6
    },
    TxtRight:{
        flexDirection:'column',
        alignItems:'flex-start',
        marginTop:10,
        marginLeft:12,
        marginRight:8
    },
    TxtRight2:{
        fontSize: 14,
        color: '#AAAAAA',
        marginTop:2
    }

});