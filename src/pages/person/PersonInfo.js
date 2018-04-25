/**
 * Created by lorne on 2017/1/6.
 */
import React, {Component} from 'react';
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
import {ActionSheet, DatePicker} from '../../components';
import JMessage from "jmessage-react-plugin";


export default class PersonInfo extends Component {



    _getGender(gender) {
        switch (gender) {
            case 0:
                return I18n.t('male');
            case 1:
                return I18n.t('female');
            default:
                return '';
        }
    }

    componentWillUnmount() {
        Picker.hide();
    }

    _showSexPicker = () => {

        Picker.init({
            pickerConfirmBtnText: I18n.t('confirm'),
            pickerCancelBtnText: I18n.t('cancel'),
            pickerTitleText: '',
            pickerData: [I18n.t('male'), I18n.t('female')],
            pickerConfirmBtnColor: [224, 187, 117, 1],
            pickerCancelBtnColor: [102, 102, 102, 1],
            pickerTitleColor: [20, 20, 20, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarFontSize: 17,
            pickerFontSize: 21,
            pickerFontColor: [34, 34, 34, 1],
            onPickerConfirm: (pickedValue, pickedIndex) => {

                const {profile} = this.props;
                if (pickedValue == I18n.t('male'))
                    profile.gender = 0;
                else if (pickedValue == I18n.t('female'))
                    profile.gender = 1;


                this.setState({
                    profile: profile
                });
            },
            onPickerCancel: (pickedValue, pickedIndex) => {


            },
            onPickerSelect: (pickedValue, pickedIndex) => {

            }
        });
        Picker.show();
    };

    _showDatePicker = () => {
        this.datePicker.onPressDate()
    };

    selectPhotoTapped = () => {
        this.ActionSheet.show()
    };

    _update = (image) => {
        const {postAvatar} = this.props;
        let formData = new FormData();
        let file = {
            uri: image.path,
            type: 'multipart/form-data',
            name: this._fileName(image.fileName)
        };
        formData.append("avatar", file);
        postAvatar(formData);
        JMessage.updateMyAvatar({ imgPath: image.path },
            () => {
                // success do something.

            }, (error) => {
            })
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

                        <View style={{ height: 86, width: 86,alignItems: 'center', justifyContent: 'center',
                            marginRight: '10%'}}>

                            <Image style={{
                            height: 86, width: 86

                        }}
                                   source={Images.mask}/>
                            <Image style={{
                                height: 70, width: 70,
                                borderRadius: 35,  position:'absolute'
                            }}
                                   source={strNotNull(profile.avatar) ? {uri: profile.avatar} : Images.home_avatar}
                            />
                        </View>


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

                <View style={{backgroundColor: 'white'}}>
                    {this._addrView()}
                    <View style={[styles.line, {marginLeft: 18}]}/>
                    {this.renderVerified()}
                </View>



                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={I18n.t('chose_image')}
                    options={[I18n.t('cancel'), I18n.t('camera'), I18n.t('pictures')]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this.handlePress}
                />

                <DatePicker
                    ref={ref => this.datePicker = ref}
                    date={profile.birthday}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText={I18n.t('confirm')}
                    cancelBtnText={I18n.t('cancel')}
                    onDateChange={(date) => {
                        const {profile: edit} = this.props;
                        edit.birthday = date;
                        this.setState({
                            profile: edit
                        });
                    }}
                />

            </View>
        )
    }

    renderVerified = () => {
        return <TouchableOpacity
            testID="btn_real_name"
            onPress={this._toRealName}
            activeOpacity={1}
            style={styles.set_view}>
            <Text style={styles.text_label}>{I18n.t('real_name_manager')}</Text>

            <View style={styles.view_real}>
                <Text style={styles.txt_real_init}>{this._txtRealStatus()}</Text>
                <Image style={{height: 20, width: 11, marginLeft: 5}}
                       source={Images.set_more}/>
            </View>

        </TouchableOpacity>
    };

    _addrView = () => {
        return ( <TouchableOpacity
            onPress={() => {
                router.toAdrListPage()
            }}
            style={styles.set_view}>
            <Text style={styles.text_label}>{I18n.t('addr_manager')}</Text>
            <Image style={{height: 20, width: 11}}
                   source={Images.set_more}/>
        </TouchableOpacity>)
    };


    handlePress = (i) => {
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(image => {
                    this._update(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
                break;
            case 2: {
                ImagePicker.openPicker(picker).then(image => {
                    this._update(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
            }
        }
    };

    _toRealName = () => {
        router.toVerifiedPage();
    };

    _txtRealStatus = () => {

        if (isEmptyObject(global.verifies)) {
            return I18n.t('init');
        }

        const {chinese_ids, passport_ids} = global.verifies;
        if (isEmptyObject(chinese_ids) && isEmptyObject(passport_ids)) {
            return I18n.t('init');
        }
    };

}

const picker = {
    width: 500,
    height: 500,
    cropping: true,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
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
        fontSize: 15, color: '#4990E2', marginRight: 20
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