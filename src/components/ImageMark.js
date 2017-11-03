/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component} from 'react';
import { ActivityIndicator, View} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes/index';
import FitImage from 'react-native-fit-image';
import PropTypes from 'prop-types';

export default class ImageMark extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired
    };


    state = {
        success: false
    };


    render() {
        const {success} = this.state;

        const {src} = this.props;
        return (
            <View>
                <FitImage
                    onLoad={() => {
                        this.setState({
                            success: true
                        })
                    }}
                    source={{uri: src}}/>
                {success ? null : <View style={{
                    height: 300, width: '100%', backgroundColor: Colors._ECE, alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <ActivityIndicator/>

                </View>}

            </View>


        );
    }
}
