import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class ProductSpecificationInfo extends PureComponent {


    render() {
        return (
            <View
                style={styleP.page}>
                <View style={styleP.specificationInfo}>
                    <View style={styleP.specificationInfoTop}>
                        <Image style={styleP.specificationInfoTopImg} source={Images.home_bg}/>
                        <View style={styleP.specificationInfoTopM}>
                            <Text style={styleP.specificationInfoTopP}>
                                239.4
                            </Text>
                            <Text style={styleP.specificationInfoTopS}>
                                库存34件
                            </Text>
                        </View>

                    </View>
                </View>
            </View>

        );
    }
}
const styleP = StyleSheet.create({
    page: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    specificationInfo: {
        marginTop: 160,
        backgroundColor: '#EEEEEE'
    },
    specificationInfoTop: {
        height: 87,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    specificationInfoTopImg: {
        width: 124,
        height: 120,
        marginLeft: 17
    },
    specificationInfoTopM: {
        flexDirection: 'column',
        marginLeft: 17
    },
    specificationInfoTopP: {
        fontSize: 18,
        color: '#F34A4A'
    },
    specificationInfoTopS: {
        fontSize: 14,
        color: '#333333'
    }
})