/**
 * Created by lorne on 2017/4/21.
 */
import React from 'react';
import {Image, ActivityIndicator} from 'react-native';
import {Images} from '../Themes';
import {strNotNull} from '../utils/ComonHelper'

class ImageLoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isError: false
        };
    }

    onLoadEnd() {
        this.setState({
            isLoaded: true
        });
    }

    onError() {
        this.setState({
            isError: true
        });
    }

    render() {
        const {uri} = this.props.source;

        if (strNotNull(uri))
            return (
                <Image
                    onLoadEnd={this.onLoadEnd.bind(this)}
                    onError={this.onError.bind(this)}
                    style={[this.props.style, { alignItems: 'center' }]}
                    source={this.props.source}
                >
                    {
                        this.state.isLoaded && !this.state.isError ? null :
                            <Image
                                style={[styles.imagePlaceholderStyles, this.props.placeholderStyle]}
                                source={this.props.placeholderSource ? this.props.placeholderSource :Images.empty_image}
                            >

                            </Image>
                    }
                </Image>
            );
        else {
            return (<Image
                style={[this.props.style, { alignItems: 'center' }]}
                source={Images.empty_image}/>)
        }
    }
}

const styles = {
    imagePlaceholderStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    }
}

export default ImageLoad;