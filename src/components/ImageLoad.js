/**
 * Created by lorne on 2017/4/21.
 */
import React from 'react';
import {Image, ActivityIndicator, View} from 'react-native';
import {Images} from '../Themes';
import {strNotNull} from '../utils/ComonHelper'

class ImageLoad extends React.Component {


    render() {
        const {uri} = this.props.source;
        const {emptyBg} = this.props;

        if (strNotNull(uri))
            return (
                <Image
                    {...this.props}
                    defaultSource={emptyBg ? emptyBg : Images.empty_image}
                    loadingIndicatorSource={Images.empty_image}
                />)
        else
            return <Image
                {...this.props}
                source={Images.empty_image}
            />
    }
}


export default ImageLoad;