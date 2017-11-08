/**
 * Created by lorne on 2017/2/20.
 */
/**
 * Created by lorne on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';
import {strNotNull} from '../utils/ComonHelper'

export default class CoverImage extends React.Component {

    static propTypes = {
        ...Image.propTypes,
        router: PropTypes.object
    };

    state = {
        width: Metrics.screenWidth,
        height: 200
    };

    componentWillMount() {
        if (!this.props.source.uri) return;
        Image.getSize(this.props.source.uri, this.setStateSize)

    }

    setStateSize = (originalWidth, originalHeight) => {

        if (!strNotNull(originalHeight) && !strNotNull(originalWidth))
            return;
        const simple = this.state.width / originalWidth;
        const height = simple * originalHeight;
        console.log('MarkImage', originalWidth + ':' + originalHeight + ' : ' + simple);
        this.setState({
            height: height
        });
    }

    imageClick = (source) => {
        const images = [{url: source.uri}];
        router.toImageGalleryPage(images)
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: this.state.width,
                    height: this.state.height + 10,
                    marginTop: 10
                }}
                onPress={() => this.imageClick(this.props.source)}>
                <Image style={{
                    width: this.state.width,
                    height: this.state.height,
                    backgroundColor: '#eeeeee'
                }}
                       source={this.props.source}
                       resizeMode="cover">

                </Image>
            </TouchableOpacity>
        )
    }
}