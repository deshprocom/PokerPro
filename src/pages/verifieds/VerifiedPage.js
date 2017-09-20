import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {NavigationBar} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ItemVerified from './ItemVerified';
import {listVerified} from '../../services/AccountDao';

export default class VerifiedPage extends Component {

    state = {
        chinese_ids: [],
        passports: [],
        currentPage: 0
    };

    componentDidMount() {
        listVerified(data => {
            const {chinese_ids, passport_ids} = data.items;
            this.setState({
                chinese_ids: chinese_ids,
                passports: passport_ids
            })
        }, err => {

        })
    }

    render() {
        const {chinese_ids, passports} = this.state;

        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: '#161718'}}
                title={I18n.t('verified_list')}
                rightBtnText={I18n.t('certain')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
            />
            <ScrollableTabView
                onChangeTab={(page) => {
                    this.setState({
                        currentPage: page.i
                    })
                }}
                renderTabBar={() => <ScrollableTabBar
                    backgroundColor={Colors.white}
                    activeTextColor="#161718"
                    inactiveTextColor={Colors._AAA}
                    textStyle={{fontSize: 17}}
                    style={{borderColor: Colors._EEE}}
                    underlineStyle={{backgroundColor: '#161718', height: 4}}
                />}>
                <FlatList
                    tabLabel={I18n.t('identification')}
                    data={chinese_ids}
                    keyExtractor={(item, index) => `${index}`}
                    ItemSeparatorComponent={this.renderSeparatorView}
                    renderItem={this.renderItem}
                />

                <FlatList
                    tabLabel={I18n.t('passport')}
                    data={passports}
                    keyExtractor={(item, index) => `${index}`}
                    ItemSeparatorComponent={this.renderSeparatorView}
                    renderItem={this.renderItem}/>

            </ScrollableTabView>

            {this.renderAdd()}


        </View>)
    }


    renderSeparatorView = () => {
        return (<View style={{height: 1}}/>)
    };

    renderItem = (item, index, separator) => {

        return (<ItemVerified/>)
    };

    renderAdd = () => {
        return <TouchableOpacity
            onPress={this._toAddVerified}
            style={{
                height: 44, position: 'absolute', backgroundColor: Colors._161,
                bottom: 60, right: 17, left: 17, alignItems: 'center',
                justifyContent: 'center', flexDirection: 'row'
            }}>
            <Image
                style={{height: 20, width: 20}}
                source={Images.verified_add}/>
            <Text style={{
                fontSize: 17, color: Colors._F4E,
                marginLeft: 9
            }}>{this.state.currentPage === 0 ? I18n.t('verified_add') : I18n.t('verified_pass')}</Text>

        </TouchableOpacity>
    };

    _toAddVerified = () => {
        router.toAddVerified();
    }
}