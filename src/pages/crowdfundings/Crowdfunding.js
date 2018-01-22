/**
 * Created by lorne on 2018/1/6
 * Function:
 * Desc:众筹主页
 */
import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Carousel from './Carousel';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import CrowItem from './CrowItem';
import I18n from 'react-native-i18n';
import {getCrowdfundingsList} from '../../services/CrowdfundingsDao';

export default class Crowdfunding extends PureComponent {

    state={
        crowdList:{},
    };

    componentDidMount() {
    }

    render() {
        return <View style={ApplicationStyles.bgContainer}>
            {this.renderFlatList()}
        </View>
    }

    renderFlatList = () => {
        return <UltimateFlatList
            header={() => <Carousel/>}
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            keyExtractor={(item, index) => `crowd${index}`}  //this is required when you are using FlatList
            item={this.renderItem}  //this takes two params (item, index)
            refreshableTitlePull={I18n.t('pull_refresh')}
            refreshableTitleRelease={I18n.t('release_refresh')}
            dateTitle={I18n.t('last_refresh')}
            allLoadedText={I18n.t('no_more')}
            separator={() => <View style={{height: 10, backgroundColor: Colors._ECE}}>

            </View>}
            waitingSpinnerText={I18n.t('loading')}
        />

    };


    renderItem = (item, index) => {
        return <CrowItem
            item={item}/>
    };


    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            getCrowdfundingsList({page:page}, data => {
                console.log("crowdList:",data)

                if (data.length > 0) {
                    this.setState({
                        crowdList: data
                    })
                }
                startFetch(data, 9)
            }, err => {
            });

        }catch (err) {
            abortFetch();
        }

    }
}

