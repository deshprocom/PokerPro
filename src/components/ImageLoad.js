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
                    {...this.props}
                    onLoadEnd={this.onLoadEnd.bind(this)}
                    onError={this.onError.bind(this)}
                    defaultSource={Images.empty_image}
                />

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