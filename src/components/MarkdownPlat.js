/**
 * Created by lorne on 2017/4/25.
 */
import React, {PropTypes, Component}from 'react';
import {
    TouchableOpacity, View, ScrollView,
    StyleSheet, Text, Platform
} from 'react-native';
import Markdown from './simple';
import {MarkdownView} from './markview';
import ImageMark from './simple/ImageMark';

export default class MarkdownPlat extends Component {

    static propTypes = {
        markdownStr: PropTypes.string.isRequired,
        noScroll: PropTypes.bool
    };

    render() {
        if (this.props.noScroll)
            return (<View>
                {this._markdownView()}
            </View>);
        else
            return (<ScrollView
                testID="txt_markdown">
                {this._markdownView()}
            </ScrollView>)
    }

    _markdownView = () => {
        const {markdownStr} = this.props;
        if (Platform.OS === 'ios') {

            return (<MarkdownView>
                {markdownStr}
            </MarkdownView>)

        } else {

            return ( <Markdown
                rules={markRules}
                styles={markStyles}>
                {markdownStr}
            </Markdown>)
        }
    }
}

//markdown 解析规则扩展
export const markRules = {
    image: {
        react: (node, output, state) => (
            <ImageMark
                key={state.key}
                src={ node.target }
            />
        ),
    },
};
//markdown 样式
export const markStyles = {
    view: {
        padding: 20,
        paddingBottom: 40
    },
    text: {
        color: '#777777',
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: 0.3
    },
    heading1: {
        color: '#555555',
        fontSize: 19,
    },
    heading2: {
        color: '#555555',
        fontSize: 17,
    },
    heading3: {
        color: '#555555',
        fontSize: 16,
    },
    heading4: {
        color: '#555555',
        fontSize: 15,
    }
};