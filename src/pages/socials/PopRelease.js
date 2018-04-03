import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Modal, Text} from 'react-native';
import {Images, Colors} from '../../Themes';
import {createAnimatableComponent} from 'react-native-animatable';
import I18n from 'react-native-i18n';

const AniTouchableOpacity = createAnimatableComponent(TouchableOpacity);

const styles = StyleSheet.create({
    title: {
        fontSize: 14, color: 'white',
        marginTop: 8
    },
    icon: {height: 60, width: 60},
    btn: {
        alignItems: 'center'
    },
    release: {
        flexDirection: 'row', height: 100, width: '100%', justifyContent: 'space-around',
        position: 'absolute', bottom: 80
    }
})

export default class PopRelease extends PureComponent {

    state = {
        visible: false
    };

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        const {visible} = this.state;
        return (<Modal
            transparent={true}
            visible={visible}
            onRequestClose={() => {

            }}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>

                <View style={styles.release}>

                    <AniTouchableOpacity
                        onPress={() => {
                            this.toggle();
                            global.router.toArticleRelease()
                        }}
                        style={styles.btn}
                        delay={200}
                        animation={'zoomIn'}>
                        <Image source={Images.social.article}
                               style={styles.icon}/>
                        <Text style={styles.title}>{I18n.t('release_article')}</Text>

                    </AniTouchableOpacity>
                    <AniTouchableOpacity
                        onPress={() => {
                            this.toggle();
                            global.router.toSendMood()
                        }}
                        style={styles.btn}
                        delay={200}
                        onPress={() => {
                            this.toggle();
                            global.router.toMapPosition()
                        }}
                        animation={'zoomIn'}>
                        <Image source={Images.social.moment}
                               style={styles.icon}/>
                        <Text style={styles.title}>{I18n.t('release_moment')}</Text>

                    </AniTouchableOpacity>

                </View>

                <TouchableOpacity
                    activeOpacity={1}
                    style={{position: 'absolute', bottom: 0, left: '50%', marginLeft: -26}}
                    onPress={this.toggle}>
                    <Image source={Images.social.close}/>
                </TouchableOpacity>

            </View>


        </Modal>)
    }
}