import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
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
            const {imageWidth, imageHeight} = this.calcDim(iw, ih, height, width)

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
            <View>
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
            </View>
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
            imageWidth: newImageWidth - 10,
            imageHeight: newImageHeight - 10,
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});