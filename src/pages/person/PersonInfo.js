/**
 * Created by lorne on 2017/1/6.
 */
import React, {PropTypes}from 'react';
import {
    StyleSheet, Image, Platform, ActivityIndicator,
    Dimensions, View, TextInput, Text, TouchableOpacity,
    KeyboardAvoidingView, Modal
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Picker from 'react-native-picker';
import {_createDateData} from '../../reducers/AccountModel';
import {Colors, Fonts, Images, Metrics} from '../../Themes';
import I18n from 'react-native-i18n';
import {isEmptyObject, getCurrentDate, strNotNull} from '../../utils/ComonHelper';
import {Verified} from '../../configs/Status';
import ActionSheet from 'react-native-actionsheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = [I18n.t('cancel'), I18n.t('camera'), I18n.t('pictures')];
const title = I18n.t('chose_image');

export default class PersonInfo extends React.Component {
    static propTypes = {
        profile: PropTypes.object,
        postAvatar: PropTypes.func,
    };

    state = {
        visible: false
    };

    _getGender(gender) {
        switch (gender) {
            case 0:
                return '男';
            case 1:
                return '女';
            default:
                return '';
        }
    }

    componentWillUnmount() {
        Picker.hide();
        this._hideModal();
    }

    _showSexPicker = () => {
        this._showModal();
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerData: ['男', '女'],
            pickerConfirmBtnColor: [224, 187, 117, 1],
            pickerCancelBtnColor: [102, 102, 102, 1],
            pickerTitleColor: [20, 20, 20, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarFontSize: 17,
            pickerFontSize: 21,
            pickerFontColor: [34, 34, 34, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this._hideModal();
                const {profile} = this.props;
                if (pickedValue == '男')
                    profile.gender = 0;
                else if (pickedValue == '女')
                    profile.gender = 1;

                console.log('sex', profile.gender);
                this.setState({
                    profile: profile
                });
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                this._hideModal();
                console.log('sex', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('sex', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    };

    _showModal = () => {
        this.setState({
            visible: true
        });
    };

    _hideModal = () => {
        this.setState({
            visible: false
        });
    };

    _showDatePicker = () => {
        this._showModal();
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerData: _createDateData(),
            isLoop: true,
            selectedValue: ['2016', '6', '6'],
            pickerConfirmBtnColor: [224, 187, 117, 1],
            pickerCancelBtnColor: [102, 102, 102, 1],
            pickerTitleColor: [20, 20, 20, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarFontSize: 17,
            pickerFontSize: 21,
            pickerFontColor: [34, 34, 34, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this._hideModal();
                const {profile: edit} = this.props;
                edit.birthday = pickedValue.toString().replace(',', '-')
                    .replace(',', '-').replace(',', '');
                this.setState({
                    profile: edit
                });
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                this._hideModal();
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    };

    selectPhotoTapped = () => {
        this.ActionSheet.show()
    };

    _update = (image) => {
        console.log(image);
        const {postAvatar} = this.props;
        let formData = new FormData();
        let file = {
            uri: image.path, type: 'multipart/form-data',
            name: this._fileName(image.fileName)
        };
        formData.append("avatar", file);
        postAvatar(formData);
    }

    _fileName = (filename) => {
        if (strNotNull(filename)) {
            return filename;
        } else {
            return getCurrentDate() + '.jpg'
        }
    }

    render() {
        const {profile} = this.props;

        return (
            <View style={{backgroundColor: '#FFF'}}>
                <View style={{marginLeft: 20}}>
                    {/*头像*/}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{height: 136, flexDirection: 'row', alignItems: 'center'}}
                        onPress={this.selectPhotoTapped}>
                        <Text style={[styles.text_label, {marginRight: '35%'}]}>{I18n.t('user_edit_avatar')}</Text>
                        <Image style={{
                            height: 86, width: 86,
                            alignItems: 'center', justifyContent: 'center', marginRight: '10%'
                        }}
                               source={Images.mask}>
                            <Image style={{
                                height: 70, width: 70,
                                borderRadius: 35
                            }}
                                   source={strNotNull(profile.avatar) ? {uri: profile.avatar} : Images.home_avatar}
                            />
                        </Image>

                        <Image style={{height: 20, width: 11, marginLeft: 5}}
                               source={Images.set_more}/>


                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <View style={styles.item_view}>

                        <Text style={styles.text_label}>{I18n.t('nick')}</Text>
                        <TextInput style={styles.text_value}

                                   underlineColorAndroid='transparent'
                                   onChangeText={text => {
                                       const edit = profile;
                                       edit.nick_name = text;
                                       this.setState({
                                           profile: edit
                                       })

                                   }}
                                   value={profile.nick_name}
                                   testID="input_nick"/>
                    </View>

                    <View style={styles.line}/>

                    <TouchableOpacity activeOpacity={1}
                                      style={styles.item_view}
                                      onPress={this._showSexPicker}>
                        <Text style={styles.text_label}>{I18n.t('gender')}</Text>

                        <Text style={styles.text_value}>
                            {this._getGender(profile.gender)}</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>
                    <TouchableOpacity activeOpacity={1}
                                      style={styles.item_view}
                                      onPress={this._showDatePicker}>
                        <Text style={styles.text_label}>{I18n.t('birth')}</Text>

                        <Text style={styles.text_value}>
                            {profile.birthday ? profile.birthday : ''}</Text>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <KeyboardAvoidingView style={{height: 94}}>

                        <View style={styles.item_view}>

                            <Text style={[styles.text_label, {marginRight: 20}]}>{I18n.t('signature')}</Text>
                            <TextInput style={[styles.text_value]}
                                       placeholderTextColor="#CCC"
                                       underlineColorAndroid='transparent'
                                       maxLength={20}
                                       onChangeText={text => {
                                           const edit = profile;
                                           edit.signature = text;
                                           this.setState({
                                               profile: edit
                                           })

                                       }}

                                       value={profile.signature}
                                       testID="input_signature"
                                       placeholder={I18n.t('user_signature')}/>
                        </View>

                    </KeyboardAvoidingView>
                </View>

                <View style={[styles.line, {height: 8}]}/>

                {this._addrView()}
                <TouchableOpacity
                    testID="btn_real_name"
                    onPress={this._toRealName}
                    activeOpacity={1}
                    style={styles.set_view}>
                    <Text style={styles.text_label}>{I18n.t('real_name_manager')}</Text>

                    <View style={styles.view_real}>
                        <Text style={this._colorRealStatus()}>{this._txtRealStatus()}</Text>
                        <Image style={{height: 20, width: 11, marginLeft: 5}}
                               source={Images.set_more}/>
                    </View>

                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={this.state.visible}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.38)'
                    }}/>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={title}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />
                </Modal>


            </View>
        )
    }

    _addrView = () => {
        return false ? ( <View style={styles.set_view}>
            <Text style={styles.text_label}>{I18n.t('addr_manager')}</Text>
            <Image style={{height: 20, width: 11}}
                   source={Images.set_more}/>
        </View>) : null
    };


    handlePress = (i) => {
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(image => {
                    this._update(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
                break
            case 2: {
                ImagePicker.openPicker(picker).then(image => {
                    this._update(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
            }
        }
    }

    _toRealName = () => {
        router.toCertificationPage();
    }

    _txtRealStatus = () => {
        if (!isEmptyObject(user_extra)) {
            switch (user_extra.status) {
                case Verified.FAILED:
                    return I18n.t('real_fail');
                // case Verified.PASSED:
                //     return I18n.t('real_pass');
                case Verified.PENDING:
                    return I18n.t('pending')
            }
        } else if (isEmptyObject(user_extra)) {
            return I18n.t('init');
        }
    }

    _colorRealStatus = () => {
        if (!isEmptyObject(user_extra)) {
            switch (user_extra.status) {
                case Verified.FAILED:
                    return styles.txt_real_fail;
                // case Verified.PASSED:
                //     return styles.txt_real_pass;
                case Verified.PENDING:
                    return styles.txt_real;
            }
        } else if (isEmptyObject(user_extra)) {
            return styles.txt_real_init;
        }
    }

}

const picker = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.8,
};

const styles = StyleSheet.create({
    item_view: {height: 54, alignItems: 'center', flexDirection: 'row'},
    text_label: {
        color: Colors._333,
        fontSize: Fonts.size.h17,
        marginRight: 27
    },
    text_value: {color: Colors._666, fontSize: Fonts.size.h15, flex: 1},
    line: {height: 1, backgroundColor: '#ECECEE'},
    set_view: {
        height: 51, justifyContent: 'space-between',
        alignItems: 'center', flexDirection: 'row', marginRight: 30, marginLeft: 20
    },
    txt_real_init: {
        fontSize: 15, color: '#F34A4A', marginRight: 20
    },
    txt_real: {
        fontSize: 15, color: '#34BA3C', marginRight: 20
    },
    view_real: {flexDirection: 'row', alignItems: 'center'},
    // txt_real_pass: {
    //     fontSize: 15, color: '#878787', marginRight: 20
    // },
    txt_real_fail: {
        fontSize: 15, color: '#4990E2', marginRight: 20
    }

});