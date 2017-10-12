import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image, Dimensions, ListView, Animated, Easing,
    View,TouchableOpacity
} from 'react-native';
import {styles} from './Styles';
import {Images} from '../../Themes';
import {getPukeNews} from '../../services/NewsDao';
import {BannerStatus} from '../../configs/Status';

var i = 0;
export default class PukeNews extends Component {
    state = {
        text: '',
        selected:{}
    };

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)

    }

    componentDidMount() {
        setTimeout(() => {
            getPukeNews(data => {
                console.log('headlines', data)
                this.texts = data.headlines;
                this.showText();
                this.animate();
            }, err => {
            })
        }, 300)


    };

    animate = () => {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    };

    showText = () => {
        setInterval(() => {

            if (this.texts.length > 0) {
                i = i + 1;
                this.setState({
                    text: this.texts[i - 1].title,
                    selected:this.texts[i - 1]
                });

                if (i === this.texts.length) {
                    i = 0;
                }
            }

        }, 4000);
    };


    render() {
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 5, 0]
        });
        return (
            <View style={styles.pukes}>
                <View style={styles.puke}>
                    <Image style={styles.pukeText} source={Images.pukes}/>
                    <View style={{width: 1, height: 16, backgroundColor: '#E5E5E5', marginLeft: 15}}/>
                    <TouchableOpacity
                        onPress={this._clickBanner}
                        activeOpacity={1}
                    >
                        <Animated.View style={{opacity}}>
                            <Text
                                numberOfLines={2}
                                style={[styles.pukeText2, {marginLeft: 15}]}
                            >{this.state.text}</Text>
                        </Animated.View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    _clickBanner = () => {
        const {selected} = this.state;
        switch (selected.source_type) {
            case BannerStatus.INFO:
                global.router.toNewsInfo(selected.source_id);
                break;
            case BannerStatus.RACE:
                global.router.toRacesInfoPage(this.props, selected.source_id, false);
                break;

            case BannerStatus.VIDEO:
                global.router.toVideoInfo(selected.source_id);
                break;
            case BannerStatus.LINK:
                global.router.toWebViewPage(this.props, selected.link);
                break;

        }
    }
}