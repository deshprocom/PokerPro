import React, {PureComponent} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableOpacity, Platform, ScrollView
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';

export default class MallCategories extends PureComponent {

    render() {
        return <Animatable.View animation={'slideInUp'}
                                style={styles.page}>
            <View style={styles.content}>
                <ScrollView style={styles.categories}>

                </ScrollView>
                <ScrollView style={{width: '100%', backgroundColor: 'white'}}>

                </ScrollView>

            </View>


        </Animatable.View>
    }
}

const styles = StyleSheet.create({
    page: {
        position: 'absolute', top: 104, left: 0, right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.72)'
    },
    content: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 442,
        width: '100%'
    },
    categories: {
        width: 150,
        backgroundColor: '#ECECEE',
    }


});