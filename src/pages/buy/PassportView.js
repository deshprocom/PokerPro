/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

import ActionSheet from '../../components/sheet';
import ImagePicker from 'react-native-image-crop-picker';

import {POST_CERTIFICATION, GET_CERTIFICATION} from '../../actions/ActionTypes';
import {
    isEmptyObject, strNotNull, getCurrentDate
    , showToast, call
} from '../../utils/ComonHelper';
import {Verified} from '../../configs/Status';
import {fetchPostCertification, fetchPostPasswordImage} from '../../actions/AccountAction';
import {postPasswordImage} from '../../services/NewsDao';
import {umengEvent} from '../../utils/UmengEvent';

import {InputView, BtnLong} from "../../components";


const picker = {
    width: 500,
    height: 500,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.8,
};

class PassportView extends Component {


    state = {
        editable: true,
        realName: '',
        passwordCard: '',
        passImage: '',
        imageName: '',
        passport_id: ''
    }


    componentWillReceiveProps(newProps) {
        if (newProps.actionType === POST_CERTIFICATION &&
            newProps.hasData) {
            router.pop();
        } else if (newProps.actionType === GET_CERTIFICATION &&
            newProps.hasData) {
            if (!isEmptyObject(user_extra) && user_extra.cert_type === 'passport_id') {
                let editable = true;
                if (user_extra.status === Verified.PASSED) {
                    editable = false;
                }
                this.setState({
                    passImage: user_extra.image,
                    realName: user_extra.real_name,
                    passwordCard: user_extra.cert_no,
                    editable: editable
                })
            }
        }

    }

    showPickImage = () => {
        this.ActionSheet.show()
    }

    _setImage = (image) => {
        this.setState({
            passImage: image.path,
            imageName: this._fileName(image.fileName)
        });
    }

    handlePress = (i) => {
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(image => {
                    this._setImage(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
                break
            case 2: {
                ImagePicker.openPicker(picker).then(image => {
                    this._setImage(image)
                }).catch(e => {
                    // Alert.alert(e.message ? e.message : e);
                });
            }
        }
    }

    _fileName = (filename) => {
        if (strNotNull(filename)) {
            return filename;
        } else {
            return getCurrentDate() + '.jpg'
        }
    }

    _cardImageView = () => {
        let {passImage} = this.state;
        if (isEmptyObject(passImage)) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={Images.name_id}
                        style={{height: 35, width: 49}}/>

                    <Text style={{fontSize: Fonts.size.h18, color: Colors._AAA, marginTop: 31}}>
                        {I18n.t('ple_upload_pass_id')}
                    </Text>
                </View>
            )
        } else {
            return (<Image
                style={{height: 150, width: 250}}
                source={{uri: passImage}}>

            </Image>)
        }
    }

    _btnSubmit = () => {
        umengEvent('true_name_submit');
        const {realName, passwordCard, passImage, imageName, passport_id} = this.state;
        if (strNotNull(realName) && strNotNull(passwordCard) && !isEmptyObject(passImage)) {

            if (passImage.indexOf("http") == -1) {
                let formData = new FormData();
                let file = {uri: passImage, type: 'multipart/form-data', name: imageName};
                formData.append("image", file);
                this.props._postPasswordImage(formData);
            }

            const body = {
                real_name: realName,
                cert_no: passwordCard,
                cert_type: 'passport_id'
            };
            this.props._postCertification(body);


        } else {
            showToast(I18n.t('fillWhole'))
        }


    }

    // submitBtn = () => {
    //     umengEvent('true_password_submit');
    //     const {realName, passwordCard, cardImage, imageName} = this.state;
    //     if (strNotNull(realName) && strNotNull(passwordCard) && !isEmptyObject(cardImage)) {
    //
    //         if (cardImage.indexOf("http") == -1) {
    //             let formData = new FormData();
    //             let file = {uri: cardImage, type: 'multipart/form-data', name: imageName};
    //             formData.append("image", file);
    //             this.state.cardImage = formData;
    //         }
    //         console.log(22222)
    //         console.log(cardImage);
    //         console.log(22222)
    //         const body = {
    //             password_img:cardImage,
    //             real_name: realName,
    //             cert_no: passwordCard
    //         };
    //         postPasswordImage(body, data => {
    //             console.log(1111)
    //             console.log(data);
    //             console.log(1111)
    //         },err => {
    //
    //         })
    //
    //     } else {
    //         showToast('内容填写不完整')
    //     }
    // }

    render() {
        const {editable, realName, passwordCard} = this.state;
        console.log(this.state);
        return (<ScrollView
            testID="page_real_name"
            style={ApplicationStyles.bgContainer}>

            <View
                style={{
                    height: 50, alignItems: 'center', flexDirection: 'row', marginTop: 8,
                    backgroundColor: Colors.white
                }}>
                <Text style={{marginLeft: 18}}>{I18n.t('real_name')}:</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text => {
                        this.setState({
                            realName: text
                        })
                    }}
                    inputValue={realName}
                    inputView={{
                        height: 50, borderBottomColor: Colors.white,
                        borderBottomWidth: 1, flex: 1
                    }}
                    inputText={{height: 50, fontSize: 15, marginLeft: 15}}
                    placeholder={I18n.t('ple_real_name')}/>
            </View>
            <View
                style={{
                    height: 50, alignItems: 'center', flexDirection: 'row', marginTop: 8,
                    backgroundColor: Colors.white
                }}>
                <Text style={{marginLeft: 18}}>{I18n.t('password_card')}</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text => {
                        this.setState({
                            passwordCard: text
                        })
                    }}
                    inputValue={passwordCard}
                    inputView={{
                        height: 50, borderBottomColor: Colors.white,
                        borderBottomWidth: 1, flex: 1
                    }}
                    inputText={{height: 50, fontSize: 15, marginLeft: 15}}
                    placeholder={I18n.t('ple_password_card')}/>
            </View>
            <TouchableOpacity
                disabled={!editable}
                activeOpacity={1}
                onPress={this.showPickImage}
                style={{
                    height: 198, width: Metrics.screenWidth - 34,
                    alignSelf: 'center', backgroundColor: Colors.txt_CCCCCC,
                    marginTop: 14, alignItems: 'center', justifyContent: 'center'
                }}>
                {this._cardImageView()}
            </TouchableOpacity>
            <Text
                style={{fontSize: Fonts.size.h12, marginTop: 114, alignSelf: 'center', color: Colors._AAA}}>
                {I18n.t('upload_issue')}
            </Text>

            {this._hasRealBtn()}

            {/*<Button activeOpacity={1}*/}
            {/*onPress={this.submitBtn}*/}
            {/*style={{height:49,width:Metrics.screenWidth-34,*/}
            {/*alignSelf:'center',backgroundColor:'#161718',*/}
            {/*marginTop:25,justifyContent:'center'}}*/}
            {/*textStyle={{fontSize:Fonts.size.h17,color:Colors.txt_E0C}}>*/}
            {/*{I18n.t('submit')}*/}
            {/*</Button>*/}

            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={I18n.t('chose_image')}
                options={[I18n.t('cancel'), I18n.t('camera'), I18n.t('pictures')]}
                cancelButtonIndex={0}
                destructiveButtonIndex={2}
                onPress={this.handlePress}
            />

        </ScrollView>)
    }

    _hasRealBtn = () => {
        const {editable} = this.state;
        if (editable) {
            return ( <BtnLong
                name={I18n.t('submit')}
                testID="btn_submit"
                activeOpacity={1}
                onPress={this._btnSubmit}
                style={{
                    height: 49, width: Metrics.screenWidth - 34,
                    alignSelf: 'center', backgroundColor: '#161718',
                    marginTop: 25, justifyContent: 'center', marginBottom: 10
                }}
                textStyle={{fontSize: Fonts.size.h17, color: Colors.txt_E0C}}/>)
        } else {
            return ( <BtnLong
                name={I18n.t('contact_customer_service')}
                testID="btn_contact_customer_service"
                activeOpacity={1}
                onPress={this._btnService}
                style={{
                    height: 49, width: Metrics.screenWidth - 34,
                    alignSelf: 'center', backgroundColor: Colors.white,
                    marginTop: 25, justifyContent: 'center', marginBottom: 10
                }}
                textStyle={{fontSize: Fonts.size.h17, color: Colors.txt_666}}/>)
        }
    }

    _btnService = () => {
        Alert.alert(I18n.t('hot_line'), I18n.t('hot_phone') + '\n' + I18n.t('work_time'),
            [{
                text: I18n.t('cancel'), onPress: () => {
                }
            },
                {
                    text: I18n.t('call'), onPress: () => {
                    call(I18n.t('hot_phone'), false)
                }
                }])

    }

}

const bindAction = dispatch => ({
    _postCertification: (body) => dispatch(fetchPostCertification(body)),
    _postPasswordImage: (body) => dispatch(fetchPostPasswordImage(body))
});

const mapStateToProps = state => ({
    loading: state.TicketOrderState.loading,
    error: state.TicketOrderState.error,
    hasData: state.TicketOrderState.hasData,
    actionType: state.TicketOrderState.actionType

});

export default connect(mapStateToProps, bindAction)(PassportView);
