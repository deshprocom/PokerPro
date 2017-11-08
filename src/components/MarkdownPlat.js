/**
 * Created by lorne on 2017/4/25.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, ScrollView,
    StyleSheet, Text, Platform, Alert, Image
} from 'react-native';
import {strNotNull, FontSize, showToast} from '../utils/ComonHelper';


import Markdown, {getUniqueID} from 'react-native-markdown-renderer';
import FitImage from './ImageMark';


const imageClick = (source) => {

    if (strNotNull(source)) {
        let index = 0;

        let images = [{url: source}];

        router.toImageGalleryPage( images, index)
    }

};


const rules = {
    a: (node, children, parent, styles) => {
        return (
            <Text key={node.key} style={styleMark.a}
                  onPress={() => router.toWebViewPage(parent, node.attributes.href)}>
                {children}
            </Text>
        );
    },
    img: (node, children, parent, styles) => {

        return <TouchableOpacity key={node.key} style={{flex: 1}}
                                 activeOpacity={1}
                                 onPress={() => imageClick(node.attributes.src)}>
            <FitImage
                src={node.attributes.src}/>
        </TouchableOpacity>;
    },
};

export default class MarkdownPlat extends Component {


    render() {
        const {markdownStr} = this.props;
        try {
            if (strNotNull(markdownStr))
                return (
                    <View style={{padding: 20}}>
                        <Markdown style={styleMark} rules={rules}>
                            {markdownStr}
                        </Markdown>
                    </View>

                );
            else
                return <View/>
        } catch (e) {
            return <View/>
        }
    }


}


const styleMark = StyleSheet.create({
    view: {
        padding: 20
    },
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    a: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    mail_to: {
        color: 'orange',
    },
    text: {
        color: '#444444',
        fontSize: FontSize.h15,
        lineHeight: 25,
        letterSpacing: 0.3
    },
    heading5: {
        alignSelf: 'center',
        fontSize: FontSize.h15,
    },
    tableHeader: {
        backgroundColor: 'yellow'
    },
    table: {
        borderWidth: 0.5,
        borderColor: '#000000',
    },
    tableHeaderCell: {
        flex: 1,
        padding: 5,
        borderRightColor: '#000000',
        borderRightWidth: 0.5
    },
    tableRowCell: {
        flex: 1,
        padding: 5,
        borderRightColor: '#000000',
        borderRightWidth: 0.5
    },
    tableRow: {
        borderBottomWidth: 0.5,
        borderColor: '#000000',
        flexDirection: 'row',
    },
});