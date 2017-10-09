/**
 * Created by lorne on 2017/4/25.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, ScrollView,
    StyleSheet, Text, Platform, Alert, Image
} from 'react-native';
import {strNotNull, FontSize, showToast} from '../utils/ComonHelper';
import createMarkdownRenderer from 'rn-markdown';
import FitImage from './ImageMark';


const imageClick = (source) => {

    if (strNotNull(source)) {
        let index = 0;

        let images = [{url: source}];

        router.toImageGalleryPage(this.props, images, index)
    }

};


const Markdown = createMarkdownRenderer({gfm: false});
Markdown.renderer.link = props => {
    const {markdown} = props;
    const {href} = markdown;
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.toWebViewPage(props, href)}>
            <View>
                {props.children}
            </View>
        </TouchableOpacity>
    )
};

Markdown.renderer.image = props => {
    const {markdown} = props;
    const {href} = markdown;
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => imageClick(href)}>
            <View>
                <FitImage
                    src={href}/>
            </View>
        </TouchableOpacity>
    )
};

export default class MarkdownPlat extends Component {


    render() {
        const {markdownStr} = this.props;
        try {
            if (strNotNull(markdownStr))
                return (
                    <Markdown contentContainerStyle={styles.container} markdownStyles={{
                        container: {
                            padding: 20
                        },
                        heading1: {
                            fontSize: 24,
                            color: 'purple',
                        },
                        link: {
                            color: 'blue',
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
                    }}>
                        {markdownStr}
                    </Markdown>
                );
            else
                return <View/>
        } catch (e) {
            return <View/>
        }
    }


}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1
    }
});