/**
 * Created by lorne on 2017/4/25.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, ScrollView,
    StyleSheet, Text, Platform, Alert,
} from 'react-native';
import {strNotNull, FontSize, showToast} from '../utils/ComonHelper';

import FitImage from './ImageMark';
import createMarkdownRenderer from 'rn-markdown'
// pass in `marked` opts, e.g. gfm: true for Github Flavored Markdown
const EasyMarkdown = createMarkdownRenderer({gfm: false});

// define a custom renderer for links
EasyMarkdown.renderer.link = props => {
    const {markdown} = props;
    const {href} = markdown;
    return (
        <TouchableOpacity onPress={() => global.router.toWebViewPage(props, href)}>
            <View>
                {props.children}
            </View>
        </TouchableOpacity>
    )
};

EasyMarkdown.renderer.image = props => {
    const {markdown} = props;
    const {href} = markdown;

    return (
        <FitImage
            src={href}/>
    )
};

EasyMarkdown.renderer.table = props => {
    console.log('list', props)
    const {markdown} = props;
    const {href} = markdown;
}


export default class MarkdownPlat extends Component {


    render() {
        const {markdownStr, markStyle} = this.props;
        try {
            if (strNotNull(markdownStr))
                return (
                    <EasyMarkdown
                        contentContainerStyle={styles.container}
                        markdownStyles={markStyle ? markStyle : markdownStyles}>
                        {markdownStr}
                    </EasyMarkdown>

                );
            else
                return <View/>
        } catch (e) {
            return <View/>
        }
    }


}


const markdownStyles = {
    container: {
        padding: 17
    },
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
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
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});