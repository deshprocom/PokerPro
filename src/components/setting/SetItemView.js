/**
 * Created by lorne on 2017/2/28.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {strNotNull} from '../../utils/ComonHelper';
import {SecurityText} from '../index';
const SWITCH_BTN = 'SWITCH_BTN';
import PropTypes from 'prop-types';

export default class SetItemView extends Component {

    static propTypes = {
        name: PropTypes.string,
        styles: PropTypes.object,
        rightText: PropTypes.string,
        testID: PropTypes.string,
        onPress: PropTypes.func,
        securityOptions: PropTypes.object,
        rightType: PropTypes.string
    }

    _rightView = () => {
        const {rightText, securityOptions, rightType} = this.props;

        if (rightType === SWITCH_BTN) {
            return (<Image style={{width: 51, height: 31}}
                           source={Images.set_closed}/>)
        } else if (strNotNull(this.props.rightText))
            return (<View style={{
                alignItems: 'center', justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <SecurityText
                    securityOptions={securityOptions}
                    style={[Fonts.H16, {
                        color: Colors._AAA,
                        marginRight: 10
                    }]}>
                    {rightText}
                </SecurityText>
                <Image style={{height: 15, width: 8}}
                       source={Images.set_more}/>
            </View>)
        else
            return (<Image style={{height: 15, width: 8}}
                           source={Images.set_more}/>)
    };


    render() {
        const {name, styles, testID, onPress} = this.props;
        return ( <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            testID={testID}
            style={[{
                height: 50, justifyContent: 'space-between',
                alignItems: 'center', flexDirection: 'row', backgroundColor: Colors.setting,
                width: Metrics.screenWidth, paddingRight: 17, paddingLeft: 17
            }, styles]}>
            <Text style={[Fonts.H17, {
                color: Colors._333,
                marginRight: 24
            }]}>
                {name}
            </Text>

            {this._rightView()}

        </TouchableOpacity>)
    }

}