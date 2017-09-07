/**
 * Created by lorne on 2017/4/25.
 */
import React, {PropTypes, Component, createElement} from 'react';
import {
    TouchableOpacity, View, ScrollView,
    StyleSheet, Text, Platform, Alert, Image
} from 'react-native';
import {strNotNull, FontSize, showToast} from '../utils/ComonHelper';
import createMarkdownRenderer from 'rn-markdown';

const Markdown = createMarkdownRenderer({gfm: false});
Markdown.renderer.link = props => {
    const {markdown} = props
    const {href} = markdown
    return (
        <TouchableOpacity onPress={() => Alert.alert('check out this hot href', href)}>
            <View>
                {props.children}
            </View>
        </TouchableOpacity>
    )
};

Markdown.renderer.image = props => {
    const {markdown} = props
    const {href} = markdown
    return (
        <TouchableOpacity onPress={() => Alert.alert('check out this hot href', href)}>
            <View>
                <Image
                    source={{uri: href}}
                    style={{height: 400, width: 300}}/>
            </View>
        </TouchableOpacity>
    )
};

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
        try {
            if (strNotNull(markdownStr))
                return (
                    <Markdown contentContainerStyle={styles.container} markdownStyles={markdownStyles}>
                        {markdownStr}
                    </Markdown>
                )
        } catch (e) {
            showToast(e)
        }

    }
}

//markdown 解析规则扩展
export const markRules = {
    image: {
        react: (node, output, state) => (
            <ImageMark
                key={state.key}
                src={node.target}
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

const markdownStyles = {
    container: {
        padding: 10
    },
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mail_to: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});