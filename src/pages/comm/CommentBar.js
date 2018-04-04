import React, {PureComponent} from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import propType from 'prop-types';
import {Colors, Metrics, Images} from "../../Themes";
import I18n from "react-native-i18n";
import InputModal from './InputModal'

const styles = StyleSheet.create({
    bar: {
        height: 48, width: Metrics.screenWidth, backgroundColor: 'white',
        alignItems: 'center', flexDirection: 'row'
    },
    comment: {
        height: Metrics.reallySize(30),
        width: Metrics.reallySize(187),
        backgroundColor: Colors._ECE,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 17
    },
    c_comment: {
        height: 19,
        width: 22
    },
    c_like: {
        height: 19,
        width: 19
    },
    c_share: {
        height: 24,
        width: 24
    },
    c_pen: {
        height: 14,
        width: 14,
        marginLeft: 15
    },
    c_input: {
        fontSize: 14,
        color: Colors._CCC,
        marginLeft: 8
    }
})

export default class CommentBar extends PureComponent {

    static propTypes = {
        send: propType.func,
        like: propType.func,
        topic_id:propType.string,


    }

    render() {
        return <View style={styles.bar}>

            <TouchableOpacity
                onPress={() => {
                    this.inputModal && this.inputModal.toggle()
                }}
                style={styles.comment}>
                <Image
                    style={styles.c_pen}
                    source={Images.pen}/>
                <Text style={styles.c_input}>{I18n.t('write_comment')}</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around'}}>
                <TouchableOpacity>
                    <Image style={styles.c_comment}
                           source={Images.commentWhite}/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.c_like}
                           source={Images.like}/>

                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={styles.c_share}
                           source={Images.forward}/>
                </TouchableOpacity>


            </View>

            <InputModal ref={ref => this.inputModal = ref}/>


        </View>
    }

}