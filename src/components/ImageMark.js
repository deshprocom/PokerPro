/**
 * Created by lorne on 2017/4/21.
 */
import React, {Component} from 'react';
import {ActivityIndicator, TouchableOpacity, View, Image} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes/index';
import PropTypes from 'prop-types';
import {util} from '../utils/ComonHelper';


export default class ImageMark extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired
    };


    state = {
        success: false,
        width: Metrics.screenWidth - 40,
        height: 320
    };

    componentDidMount() {
        Image.getSize(this.props.src, (width, height) => {
            let screenWidth = Metrics.screenWidth - 40;
            height = screenWidth * height / width; //按照屏幕宽度进行等比缩放
            this.setState({width: screenWidth, height});
        });
    }

    imageClick = (source) => {

        if (!util.isEmpty(source)) {
            let index = 0;

            let images = [{url: source}];

            router.toImageGalleryPage(images, index)
        }

    };


    render() {
        const {success} = this.state;

        const {src} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.imageClick(src)}
                style={{backgroundColor: Colors._ECE}}>
                <Image
                    style={{
                        width: this.state.width,
                        height: this.state.height,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    source={{uri: src}}>

                </Image>


            </TouchableOpacity>


        );
    }
}
