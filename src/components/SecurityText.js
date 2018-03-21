/**
 * Created by lorne on 2018/2/27
 * Function:
 * Desc:
 */
import React, {
    Component,
} from 'react'
import {
    Text,
} from 'react-native'
import PropTypes from 'prop-types';

export default class SecurityText extends Component {

    static propTypes = {
        ...Text.propTypes,
        securityOptions: PropTypes.shape({
            isSecurity: PropTypes.bool,
            startIndex: PropTypes.number,
            endIndex: PropTypes.number,
            length: PropTypes.number,
            securityChar: PropTypes.string,
        }),


    }

    render() {
        return (
            <Text
                {...this.props}>
                {this._renderContent(this.props.securityOptions)}
            </Text>
        )
    }

    _renderContent({isSecurity = false, startIndex = 0, endIndex, length, securityChar = '*'} = {}) {
        if(isSecurity) {
            let texts = []
            React.Children.forEach(this.props.children, (child) => {
                if(!React.isValidElement(child)) {
                    if(length > 0) {
                        child  = this._padEnd(length, securityChar)
                    }
                    else {
                        let textLength = child.length
                        if(Math.abs(startIndex) > textLength - 1) {
                            startIndex = textLength - 1
                        }
                        if(Math.abs(endIndex) > textLength) {
                            endIndex = textLength
                        }
                        child = child.slice(0, startIndex) + this._padEnd(endIndex - startIndex, securityChar) + child.slice(endIndex)
                    }
                    texts.push(child)
                }
            })
            return texts
        }
        else {
            return this.props.children
        }
    }

    _padEnd(length, string) {
        let text = ''
        for(let i = 0; i < length; i++) {
            text += string
        }
        return text
    }
}