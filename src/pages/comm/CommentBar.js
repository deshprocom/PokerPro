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
        height: 48, width: Metrics.screenWidth,
        backgroundColor: 'white',
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
        width: 22,
        marginTop: 7
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
        share: propType.func,
        count: propType.number
    }


    showInput = () => {
        this.inputModal && this.inputModal.toggle()
    }

    render() {
        return <View style={styles.bar}>

            <TouchableOpacity
                onPress={this.showInput}
                style={styles.comment}>
                <Image
                    style={styles.c_pen}
                    source={Images.pen}/>
                <Text style={styles.c_input}>{I18n.t('write_comment')}</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-around'}}>
                <View style={{
                    height: 30, width: 30
                }}>


                    <Image style={styles.c_comment}
                           source={Images.commentWhite}/>

                    {this.props.count > 0 ? <View style={{
                        backgroundColor: '#F24A4A',
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 10
                        }}>{this.props.count}</Text>
                    </View> : null}

                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.like && this.props.like()
                    }}>
                    <Image style={styles.c_like}
                           source={Images.like}/>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.share && this.props.share()
                    }}>
                    <Image style={styles.c_share}
                           source={Images.forward}/>
                </TouchableOpacity>


            </View>

            <InputModal
                send={(comment) => this.props.send && this.props.send(comment)}
                ref={ref => this.inputModal = ref}/>


        </View>
    }

}