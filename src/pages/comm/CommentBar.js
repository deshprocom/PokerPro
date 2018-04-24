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
        marginLeft: 17,
        marginRight: 10
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
    },
    btn_center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        const {isLike, showCount, count,placeholder} = this.props;
        return <View style={styles.bar}>

            <TouchableOpacity
                onPress={this.showInput}
                style={styles.comment}>
                <Text style={styles.c_input}>{placeholder}</Text>
            </TouchableOpacity>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1
            }}>

                <TouchableOpacity
                    style={styles.btn_center}>
                    <View style={{
                        height: 30, width: 30
                    }}>


                        <Image style={styles.c_comment}
                               source={Images.commentWhite}/>

                        {count > 0 && showCount ? <View style={{
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
                            }}>{count}</Text>
                        </View> : null}

                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.btn_center}
                    onPress={() => {
                        this.props.like && this.props.like()
                    }}>
                    <Image style={styles.c_like}
                           source={isLike && isLike ? Images.likeRed : Images.like}/>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn_center}
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