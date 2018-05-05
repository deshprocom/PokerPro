import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';


export class LeftAlignedImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            height: 200,
            width: 0,
            imageWidth: 0,
            imageHeight: 0,
            source: null,
        }
    }

    componentWillMount() {
        this._updateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this._updateState(nextProps)
    }

    _updateState(props) {
        const {source, height} = props;
        const width = props.width || Dimensions.get('window').width;

        Image.getSize(source.uri, (iw, ih) => {
            const {imageWidth, imageHeight} = this.calcDim(iw, ih, height, width - 34)

            this.setState({
                imageWidth,
                imageHeight,
                source,
                height: height,
                width: width,
            });
        });
    }

    render() {
        const {source, imageWidth, imageHeight} = this.state;


        return (
            <TouchableOpacity
                style={{
                    width: imageWidth, height: imageHeight,
                    backgroundColor: '#ECECEC'
                }}
                onPress={() => {
                    global.router.toImageGalleryPage([{url: source.uri}], 0)
                }}>
                {source && imageHeight > 0 ?
                    <Image
                        style={{
                            width: imageWidth, height: imageHeight
                        }}
                        resizeMode="center"
                        source={source}
                    />
                    :
                    null
                }
            </TouchableOpacity>
        )
    }

    calcDim = (imageWidth, imageHeight, maxHeight, maxWidth) => {

        const imageRatio = imageWidth / imageHeight;

        let newImageHeight = Math.min(maxHeight, imageHeight)
        let newImageWidth = newImageHeight * imageRatio;

        if (maxWidth > 0 && newImageWidth > maxWidth) {
            newImageWidth = maxWidth;
            newImageHeight = maxWidth / imageRatio
        }

        return {
            imageWidth: newImageWidth,
            imageHeight: newImageHeight,
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});