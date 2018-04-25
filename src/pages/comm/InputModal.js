import React, {Component} from 'react';
import {
    View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, Modal,
    KeyboardAvoidingView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject} from "../../utils/ComonHelper";


export default class InputModal extends Component {

    state = {
        comment: '',
        height: 0,
        visible: false
    };


    toggle = () => {
        if (isEmptyObject(global.login_user)) {
            global.router.toLoginFirstPage()
        } else
            this.setState({
                visible: !this.state.visible
            })
    }


    render() {
        return <Modal
            onRequestClose={() => {

            }}
            transparent
            visible={this.state.visible}
        >

            <KeyboardAvoidingView
                behavior={'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
                style={{flex: 1}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.toggle}
                    style={styles.inputModal}>

                </TouchableOpacity>

                <View style={styles.bottom}>
                    <View style={{
                        width: '80%', marginLeft: 17,
                        borderWidth: 0, padding: 5
                    }}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.inputComment}
                            autoGrow={true}
                            placeholder={I18n.t('write_comment')}
                            placeholderTextColor={Colors._CCC}
                            returnKeyType={'done'}
                            autoFocus={true}
                            multiline={true}
                            maxHeight={70}
                            onChangeText={comment => this.setState({
                                comment
                            })}
                        />

                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.send(this.state.comment);
                            this.toggle()
                        }}
                        style={styles.release}>
                        <Text style={{color: Colors.txt_444, fontSize: 15}}>发送</Text>
                    </TouchableOpacity>


                </View>
            </KeyboardAvoidingView>
        </Modal>
    }


}

const styles = StyleSheet.create({
    bottom: {
        height: 48,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        backgroundColor: '#ECECEE',
        borderRadius: 40,
        fontSize: 14,
        color: '#CCCCCC'
    },
    search: {
        marginLeft: 17,
        height: 30,
        width: '48%',
        backgroundColor: Colors._ECE,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 14,
        width: 14,
        marginLeft: 15,
        marginRight: 30,
    },
    commentWhiteView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    commentWhite: {
        width: 22,
        height: 20
    },
    likeView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    like: {
        width: 20,
        height: 19
    },
    forwardView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        marginRight: 17,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    forward: {
        width: 20,
        height: 20
    },
    inputModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    release: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 40,
        justifyContent: 'center',
        marginRight: 17
    },
    inputComment: {
        backgroundColor: Colors._ECE,
        borderRadius: 15,
        paddingLeft: 20,
        fontSize: 14,
        minHeight: 30
    },

});