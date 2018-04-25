/**
 * Created by lorne on 2017/5/11.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, Modal
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {CountDownText} from '../../components/countdown/CountDownText';
import {checkPhone, showToast, clearLoginUser} from '../../utils/ComonHelper';
import {Password, SecurityText} from '../../components';
import {POST_CHANGE_BIND, POST_VERIFY_CODE, POST_V_CODE, POST_CHANGE_PERMISSION} from '../../actions/ActionTypes';
import {fetchChangBind, fetchPostVCode, fetchPostVerifyCode, fetchChangePermission} from '../../actions/AccountAction';
import {fetchGetRecentRaces, _getProfileOk} from '../../actions/RacesAction';
import {connect} from 'react-redux';

class ModalPrompt extends Component {


    constructor(props) {
        super(props);

        this.state = {
            popup: 1,
            codeDisable: false,
            phone: login_user.mobile,
            codeSend: false,
            old_code: '',
            new_code: ''
        };

        this.verifyType = '';
    }


    render() {
        return (<Modal
            onRequestClose={() => {

            }}
            style={styles.page}
            transparent={true}
            visible={this.props.modalVisible}>
            {this.showPopup()}

        </Modal>)
    }


    componentWillReceiveProps(newProps) {

        const {loading, actionType, hasData} = newProps;

        if (actionType === POST_VERIFY_CODE && hasData) {

            if (this.verifyType === 'change_old_account') {
                this.setState({
                    popup: 4,
                    phone: '',
                    codeDisable: false
                })
            }

        } else if (actionType === POST_CHANGE_BIND && hasData) {
            this._close();
            showToast(`${I18n.t('reLogin')}`);
            clearLoginUser();
            const recentRaces = {
                number: 5
            };
            this.props._getRecentRaces(recentRaces);
            this.props._getProfileNull();
            router.toLoginFirstPage();
        } else if (actionType === POST_V_CODE
            && hasData
        ) {

            if (this.countDownText) {
                this.setState({
                    codeDisable: !this.state.codeDisable
                });
                this.countDownText.start();
            }


        } else if (actionType === POST_CHANGE_PERMISSION && hasData) {
            this.setState({
                popup: 3,
            });
        }

    }


    showPopup = () => {
        const {codeDisable, popup, phone, codeSend} = this.state;
        console.log(this.state)

        switch (popup) {
            case 1:
                return (<View
                    testID="page_bind_know"
                    style={styles.popUp}>
                    <TouchableOpacity
                        testID="btn_bind_close"
                        onPress={this._close}
                        activeOpacity={1}
                        style={styles.btnClose1}>
                        <Image style={styles.imgClose1}
                               source={Images.set_fork}/>

                    </TouchableOpacity>
                    <Image
                        style={styles.imgExc}
                        source={Images.set_exclamation}/>
                    <View style={styles.item}>
                        <View style={styles.point}/>

                        <Text style={styles.txtLabel}>{I18n.t('once')}</Text>
                    </View>
                    <View style={styles.item1}>
                        <View style={styles.point}/>

                        <Text style={styles.txtLabel}>{I18n.t('noChange')}</Text>
                    </View>
                    <View style={styles.item1}>
                        <View style={styles.point}/>

                        <Text style={styles.txtLabel}>{I18n.t('useNewTle')}</Text>
                    </View>


                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        testID="btn_bind_know"
                        onPress={this._btnNext}
                        style={styles.btnKnow}>
                        <Text style={styles.txtKnow}>{I18n.t('konw')}</Text>

                    </TouchableOpacity>

                </View>);
            case 3:
                return (<View
                    testID="page_bind_old_code"
                    style={styles.popUp1}>
                    <View style={styles.itemClose}>
                        <TouchableOpacity
                            testID="btn_bind_back"
                            onPress={() => {
                                this.setState({
                                    popup: 1
                                })
                            }}
                            activeOpacity={1}
                            style={styles.btnClose}>
                            <Image style={styles.imgBack}
                                   source={Images.ic_back}/>

                        </TouchableOpacity>

                        <View style={{flex: 1}}/>
                        <TouchableOpacity
                            testID="btn_bind_close"
                            onPress={this._close}
                            activeOpacity={1}
                            style={styles.btnClose}>
                            <Image style={styles.imgClose}
                                   source={Images.set_fork}/>

                        </TouchableOpacity>

                    </View>
                    <Text style={styles.txtCode}>{I18n.t('please_input_code')}</Text>
                    <View style={styles.viewSend}>
                        <Text style={styles.txtSendCode}>{I18n.t('sendCode')}</Text>
                        <SecurityText
                            securityOptions={{
                                isSecurity: true,
                                startIndex: 3,
                                endIndex: 7,
                            }}
                            style={styles.txtSendCode}>
                            {phone}
                        </SecurityText>
                    </View>

                    <TouchableOpacity
                        testID="btn_get_code"
                        disabled={codeDisable}
                        activeOpacity={1}
                        onPress={this._countBtn}
                        style={styles.btnSend}>
                        <CountDownText
                            style={styles.codeText}
                            countType='seconds' // 计时类型：seconds / date
                            afterEnd={this._afterEnd} // 结束回调
                            auto={codeSend} // 自动开始
                            timeLeft={60} // 正向计时 时间起点为0秒
                            step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                            startText={I18n.t('get_vcode')} // 开始的文本
                            endText={I18n.t('reSend')} // 结束的文本
                            ref={ref => this.countDownText = ref}
                            intervalText={(sec) => sec + 's'} // 定时的文本回调
                        />
                    </TouchableOpacity>

                    <Password
                        onEnd={this._codeEnd}
                        style={styles.codeInput}
                        maxLength={6}/>


                </View>);
            case 4:
                return (<View
                    testID="page_bind_input_phone"
                    style={styles.popUp}>
                    <View style={styles.itemClose}>

                        <TouchableOpacity
                            testID="btn_bind_close"
                            onPress={this._close}
                            activeOpacity={1}
                            style={styles.btnClose}>
                            <Image style={styles.imgClose}
                                   source={Images.nav_close}/>

                        </TouchableOpacity>

                    </View>

                    <Text style={styles.txtPhone}>{I18n.t('changePhone')}</Text>

                    <View style={styles.inputView}>
                        <TextInput
                            testID="input_bind_phone"
                            onChangeText={(text) => {
                                this.setState({
                                    phone: text
                                })
                            }}
                            value={phone}
                            clearButtonMode="always"
                            placeholder={I18n.t('writeNewPhone')}
                            placeholderTextColor="#BBBBBB"
                            underlineColorAndroid='transparent'
                            style={styles.inputPhone}/>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity
                        testID="btn_bind_next"
                        onPress={this._btnNewNext}
                        style={styles.btnNext}>
                        <Text style={styles.txtNext}>{I18n.t('next')}</Text>

                    </TouchableOpacity>

                </View>);
            case 5:
                return (<View
                    testID="page_bind_new_code"
                    style={styles.popUp1}>
                    <View style={styles.itemClose}>
                        <TouchableOpacity
                            testID="btn_bind_back"
                            onPress={() => {
                                this.setState({
                                    popup: 4
                                })
                            }}
                            activeOpacity={1}
                            style={styles.btnClose}>
                            <Image style={styles.imgBack}
                                   source={Images.ic_back}/>

                        </TouchableOpacity>

                        <View style={{flex: 1}}/>
                        <TouchableOpacity
                            testID="btn_bind_close"
                            onPress={this._close}
                            activeOpacity={1}
                            style={styles.btnClose}>
                            <Image style={styles.imgClose}
                                   source={Images.set_fork}/>

                        </TouchableOpacity>

                    </View>
                    <Text style={styles.txtCode}>{I18n.t('please_input_code')}</Text>
                    <View style={styles.viewSend}>
                        <Text style={styles.txtSendCode}>{I18n.t('sendCode')}</Text>
                        <SecurityText
                            securityOptions={{
                                isSecurity: true,
                                startIndex: 3,
                                endIndex: 7,
                            }}
                            style={styles.txtSendCode}>
                            {phone}
                        </SecurityText>
                    </View>

                    <TouchableOpacity
                        testID="btn_get_code"
                        disabled={codeDisable}
                        activeOpacity={1}
                        onPress={this._countBtn}
                        style={styles.btnSend}>
                        <CountDownText
                            style={styles.codeText}
                            countType='seconds' // 计时类型：seconds / date
                            afterEnd={this._afterEnd} // 结束回调
                            auto={codeSend} // 自动开始
                            timeLeft={60} // 正向计时 时间起点为0秒
                            step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                            startText={I18n.t('get_vcode')} // 开始的文本
                            endText={I18n.t('reSend')} // 结束的文本
                            ref={ref => this.countDownText = ref}
                            intervalText={(sec) => sec + 's'} // 定时的文本回调
                        />
                    </TouchableOpacity>

                    <Password
                        onEnd={this._codeEnd}
                        style={styles.codeInput}
                        maxLength={6}/>


                </View>)

        }
    };

    _close = () => {
        this.state = {
            popup: 1,
            codeDisable: false,
            phone: login_user.mobile,
            codeSend: false,
            old_code: '',
            new_code: ''
        };
        this.props.modalShow()
    };


    _codeEnd = (vcode) => {
        if (this.verifyType === 'change_old_account') {
            this.setState({
                old_code: vcode
            })
        } else {
            this.setState({
                new_code: vcode
            })
        }

        if (this.state.popup === 5) {
            const body = {
                type: 'mobile',
                account: this.state.phone,
                old_code: this.state.old_code,
                new_code: this.state.new_code
            };
            this.props._postChangBind(body);
        } else {
            const body = {
                option_type: this.verifyType,
                vcode_type: 'mobile',
                account: this.state.phone,
                vcode: vcode
            };
            this.props._postVerifyCode(body)
        }


    };


    _btnNewNext = () => {
        if (checkPhone(this.state.phone)) {
            this.verifyType = 'bind_new_account';
            this.setState({
                popup: 5,
            });
        }
    };

    _sendNewCode = () => {
        const body = {
            option_type: 'bind_new_account',
            vcode_type: 'mobile',
            mobile: this.state.phone
        };
        this.props._postVCode(body)
    };

    _btnNext = () => {
        if (checkPhone(this.state.phone)) {

            this.verifyType = 'change_old_account';

            const body = {
                type: 'mobile'
            };
            this.props._changePermission(body)

        }
    };


    _sendOldCode = () => {
        const body = {
            option_type: 'change_old_account',
            vcode_type: 'mobile',
            mobile: this.state.phone
        };
        this.props._postVCode(body)
    };

    _afterEnd = () => {
        this.setState({
            codeDisable: false,
            codeSend: false
        });
    };
    _countBtn = () => {
        if (checkPhone(this.state.phone)) {

            if (this.verifyType === 'bind_new_account') {
                this._sendNewCode();
            } else if (this.verifyType === 'change_old_account') {
                this._sendOldCode();
            }
        }
    }


}

const bindAction = dispatch => ({
    _postChangBind: (body) => dispatch(fetchChangBind(body)),
    _postVerifyCode: (body) => dispatch(fetchPostVerifyCode(body)),
    _postVCode: (body) => dispatch(fetchPostVCode(body)),
    _changePermission: (body) => dispatch(fetchChangePermission(body)),
    _getRecentRaces: (body) => dispatch(fetchGetRecentRaces(body)),
    _getProfileNull: () => dispatch(_getProfileOk({}))
});

const mapStateToProps = state => ({
    loading: state.AccountState.loading,
    error: state.AccountState.error,
    hasData: state.AccountState.hasData,
    actionType: state.AccountState.actionType
});

export default connect(mapStateToProps, bindAction)(ModalPrompt);


const styles = StyleSheet.create({
    page: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    popUp: {
        height: 220,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 3,
        marginTop: 150,
        alignSelf: 'center'
    },
    popUp1: {
        height: 250,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 3,
        marginTop: 150,
        alignSelf: 'center'
    },
    imgExc: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        marginTop: 25
    },
    item: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    item1: {
        flexDirection: 'row',
        marginTop: 9,
        alignItems: 'center',
        maxWidth: '90%'
    },
    point: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: '#23262E',
        marginRight: 17,
        marginLeft: 30
    },
    txtLabel: {
        color: '#777777',
        fontSize: 13
    },
    btnKnow: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#666666'
    },
    txtKnow: {
        color: '#333333',
        fontSize: 16
    },
    itemClose: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    btnClose: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgClose: {
        height: 14,
        width: 14
    },
    txtPhone: {
        color: '#333333',
        fontSize: 15,
        marginTop: 15,
        alignSelf: 'center'
    },
    inputPhone: {
        fontSize: 13,
        height: 40,
        color: '#333333',
    },
    inputView: {
        marginRight: 20,
        marginLeft: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666666',
        height: 40,
    },
    btnNext: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#555555'
    },
    txtNext: {
        color: 'white',
        fontSize: 16
    },
    imgBack: {
        height: 19,
        width: 11
    },
    txtCode: {
        color: '#333333',
        fontSize: 15,
        alignSelf: 'center'
    },
    viewSend: {
        marginTop: 19,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtSendCode: {
        color: Colors._BBBB,
        fontSize: 13,

    },
    btnSend: {
        height: 45,
        width: 112,
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: '#090909'

    },
    codeText: {
        color: '#333333',
        fontSize: 15
    },
    codeInput: {
        alignSelf: 'center',
        marginTop: 20
    },

    btnClose1: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0
    },
    imgClose1: {
        height: 14,
        width: 14
    },

});

