/**
 * Created by lorne on 2017/4/25.
 */
import React, {PropTypes, Component,createElement}from 'react';
import {
    TouchableOpacity, View, ScrollView,
    StyleSheet, Text, Platform
} from 'react-native';
import Markdown from './simple';
import {MarkdownView} from './markview';
import ImageMark from './simple/ImageMark';
import {strNotNull,FontSize} from '../utils/ComonHelper';

export default class MarkdownPlat extends Component {

    static propTypes = {
        markdownStr: PropTypes.string,
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
        if (strNotNull(markdownStr))
            if (Platform.OS === 'ios') {

                return (<MarkdownView
                    styles={{
                        heading1: {
                            color: '#555555',
                            fontSize: FontSize.h19,
                        },
                        heading2: {
                            color: '#555555',
                            fontSize: FontSize.h17,
                        },
                        heading3: {
                            color: '#555555',
                            fontSize: FontSize.h16,
                        },
                        heading4: {
                            color: '#555555',
                            fontSize:  FontSize.h15,
                        },
                        paragraph: {
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize:  FontSize.h15,
                            lineHeight: 25,
                            letterSpacing: 0.3,
                            color: '#777777'
                        },
                    }}
                    onLinkPress={url=>{

                        router.toWebViewPage(this.props,url);
                    }}>
                    {markdownStr}
                </MarkdownView>)

            } else {

                return ( <Markdown
                    rules={{
                        image: {
                            react: (node, output, state) => (
                                <ImageMark
                                    key={state.key}
                                    src={ node.target }
                                />
                            ),
                        },
                        link: {
                            react: (node, output, state) => {
                                state.withinText = true
                                const openUrl = (url) => {
                                    router.toWebViewPage(this.props,url);
                                };
                                return createElement(Text, {
                                    style: {
                                        color: '#4990E2',
                                        textDecorationLine: 'underline',
                                    },
                                    key: state.key,
                                    onPress: () => openUrl(node.target)
                                }, output(node.content, state))
                            }
                        },
                    }}
                    styles={{
                        view: {
                            padding: 20,
                            paddingBottom: 40
                        },
                        text: {
                            color: '#777777',
                            fontSize:  FontSize.h15,
                            lineHeight: 25,
                            letterSpacing: 0.3
                        },
                        heading1: {
                            color: '#555555',
                            fontSize: FontSize.h19,
                        },
                        heading2: {
                            color: '#555555',
                            fontSize: FontSize.h17,
                        },
                        heading3: {
                            color: '#555555',
                            fontSize: FontSize.h16,
                        },
                        heading4: {
                            color: '#555555',
                            fontSize:  FontSize.h15,
                        },
                    }}>
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
    link: {
        react: (node, output, state) => {
            state.withinText = true
            const openUrl = (url) => {
                Linking.openURL(url).catch(error => console.warn('An error occurred: ', error))
            }
            return createElement(Text, {
                style: node.target.match(/@/) ? styles.mailTo : styles.link,
                key: state.key,
                onPress: () => openUrl(node.target)
            }, output(node.content, state))
        }
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
    },
};