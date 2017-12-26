/**
 * Created by lorne on 2017/4/21.
 */
import React from 'react';
import {Image, ActivityIndicator, View} from 'react-native';
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
        const {emptyBg} = this.props;

        if (strNotNull(uri))
            return (
                <Image
                    {...this.props}
                    onLoadEnd={this.onLoadEnd.bind(this)}
                    onError={this.onError.bind(this)}
                    defaultSource={emptyBg ? emptyBg : Images.empty_image}
                >
                    {
                        emptyBg && this.state.isError ? <View style={{flex: 1, backgroundColor: '#cccccc'}}/> : null

                    }

                </Image>

            );
        else {
            return (<Image
                style={[this.props.style, {alignItems: 'center'}]}
                source={emptyBg ? emptyBg : Images.empty_image}/>)
        }
    }
}


export default ImageLoad;