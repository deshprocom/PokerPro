/**
 * Created by lorne on 2017/4/21.
 */
import React, {PropTypes, Component} from 'react';
import {Image, TouchableOpacity, Platform, Text} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {pixel, strNotNull} from '../../utils/ComonHelper'

export default class ImageMark extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired
    };

    state = {
        width: Metrics.screenWidth - 40,
        height: 320,
        originWidth: 320,
        originHeight: 320
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const {src} = this.props;

        if (Image.getSize && strNotNull(src)) {
            Image.getSize(src, (originWidth, originHeight) => {

                const simple = this.state.width / originWidth;
                const high = simple * originHeight;

                this.setState({
                    height: high,
                    originWidth: originWidth,
                    originHeight: originHeight
                });
            });
        }
    }


    imageClick = (source) => {

        if (strNotNull(source)) {
            let index = 0;

            let images = [{url: source}];

            router.toImageGalleryPage(this.props, images, index)
        }

    };


    render() {
        const {width, height, originWidth, originHeight} = this.state;

        const {src} = this.props;
        if (Platform.OS === 'ios')
            return (
                <Image
                    resizeMode={'cover'}
                    source={{uri: src}}
                    style={{width, height,
                    marginTop:10,backgroundColor:Colors._EEE}}
                >
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={()=>this.imageClick(src)}/>
                </Image>
            );
        else
            return (
                <Text
                    onPress={()=>this.imageClick(src)}
                    style={{marginTop:10,flexDirection:'column'}}>
                    <Image
                        resizeMode={'cover'}
                        source={{uri: src}}
                        style={{width:pixel(height),
                 height:pixel(width)}}/>

                    <Text> </Text>
                </Text>)
    }
}
