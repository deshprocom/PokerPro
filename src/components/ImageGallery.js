/**
 * Created by lorne on 2017/2/9.
 */
import React, {PropTypes}from 'react';
import {
    Modal, ActivityIndicator
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';

export default class ImageGallery extends React.Component {


    render() {

        const {images, index} = this.props.params;
        return (
            <ImageViewer
                loadingRender={()=>{
                    return <ActivityIndicator
                     color='#E0C675'
                     size="large"/>
                }}
                saveToLocalByLongPress={false}
                imageUrls={images}
                index={index}
                onClick={()=>router.pop()}/>
        )
    }
}