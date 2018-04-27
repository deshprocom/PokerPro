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
import {InputView, BtnLong} from '../../components';
import {fetchPostCertification, fetchPostCardImage} from '../../actions/AccountAction';
import {POST_CERTIFICATION, GET_CERTIFICATION} from '../../actions/ActionTypes';
import ImagePicker from 'react-native-image-crop-picker';
import {
    isEmptyObject, strNotNull, showToast, call,
    getCurrentDate
} from '../../utils/ComonHelper';
import {Verified} from '../../configs/Status';
import ActionSheet from '../../components/sheet';
import {umengEvent} from '../../utils/UmengEvent';


const picker = {
    width: 500,
    height: 500,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
};

class IDCardView extends Component {


    state = {

        editable: true,
        imageName: '',
        choice_id: 'passport_id',
        chinese: {},
        passport: {},

    };

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        if (newProps.actionType === POST_CERTIFICATION &&
            newProps.hasData) {
            router.pop();
        } else if (newProps.actionType === GET_CERTIFICATION &&
            newProps.hasData) {
            if (isEmptyObject(user_extra))
                return;

            let editable = true;
            if (user_extra.status === Verified.PASSED) {
                editable = false;
            }
            if (user_extra.cert_type === 'chinese_id') {

                this.setState({
                    chinese: user_extra,
                    editable: editable
                })
            } else {
                this.setState({
                    passport: user_extra,
                    editable: editable,
                    choice_id: 'passport_id'
                })
            }
        }

    }


    showPickImage = () => {
        this.ActionSheet.show()
    }

    _setImage = (image) => {
        const {chinese, passport, editable, choice_id} = this.state;
        if (choice_id === 'chinese_id') {
            chinese.image = image.path;
            this.setState({
                chinese: chinese,
                imageName: this._fileName(image.fileName)
            })
        } else {
            passport.image = image.path;
            this.setState({
                passport: passport,
                imageName: this._fileName(image.fileName)
            })
        }


    };

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


    _btnSubmit = () => {
        umengEvent('true_name_submit');
        const {imageName, choice_id, chinese, passport} = this.state;
        let body = {};
        if (choice_id === 'chinese_id')
            body = chinese;
        else
            body = passport;
        const {cert_no, cert_type, image, real_name, status} = body;

        if (strNotNull(real_name) && strNotNull(cert_no) && !isEmptyObject(image)) {

            if (image.indexOf("http") == -1) {
                let formData = new FormData();
                let file = {uri: image, type: 'multipart/form-data', name: imageName};
                formData.append("image", file);
                this.props._postCardImage(formData);
            }
            // console.log(choice_id);
            const body = {
                real_name: real_name.trim(),
                cert_no: cert_no.trim(),
                cert_type: choice_id
            };
            this.props._postCertification(body);


        } else {
            showToast(`${I18n.t('ple_write_all')}`)
        }


    };

    _cardImageView = (image) => {

        if (!strNotNull(image)) {
            return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={Images.post_id_image}
                    style={{height: 85, width: 134}}/>

            </View>)
        } else {
            return (<Image
                style={{height: 150, width: 250}}
                source={{uri: image}}>

            </Image>)
        }
    };

    render() {

        const {chinese, passport, editable, choice_id} = this.state;
        let body = {};
        if (choice_id === 'chinese_id')
            body = chinese;
        else
            body = passport;
        const {cert_no, cert_type, image, real_name, status} = body;

        return (<ScrollView
            testID="page_real_name"
            style={ApplicationStyles.bgContainer}>

            <View
                style={{
                    height: 50, alignItems: 'center', flexDirection: 'row',
                    marginTop: 8, backgroundColor: Colors.white
                }}>

                <Text style={{fontSize: 15, color: Colors.txt_666, marginLeft: 18}}>{I18n.t('real_name')}:</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text => {
                        if (choice_id === 'chinese_id') {
                            chinese.real_name = text;
                            this.setState({
                                chinese: chinese
                            })
                        } else {
                            passport.real_name = text;
                            this.setState({
                                passport: passport
                            })
                        }


                    }}
                    inputValue={real_name}
                    inputView={{
                        height: 50, borderBottomColor: Colors.white,
                        borderBottomWidth: 1, flex: 1
                    }}
                    inputText={{height: 50, fontSize: 15, marginLeft: 15}}
                    placeholder={I18n.t('ple_real_name')}/>


            </View>
            <View
                style={{
                    height: 50, alignItems: 'center', flexDirection: 'row',
                    marginTop: 1, backgroundColor: Colors.white, paddingLeft: 18
                }}>

                <Text
                    style={[styles.text_input, {width: choice_id === 'chinese_id' ? 66 : 0}]}>{I18n.t('ID_card')}</Text>
                <Text
                    style={[styles.text_input, {width: choice_id === 'passport_id' ? 66 : 0}]}>{I18n.t('password_card')}</Text>
                <InputView
                    testID="input_id_card"
                    editable={editable}
                    stateText={text => {
                        if (choice_id === 'chinese_id') {
                            chinese.cert_no = text;
                            this.setState({
                                chinese: chinese
                            })
                        } else {
                            passport.cert_no = text;
                            this.setState({
                                passport: passport
                            })
                        }
                    }}
                    inputView={{
                        height: 50, borderBottomColor: Colors.white,
                        borderBottomWidth: 1, flex: 1
                    }}
                    inputValue={cert_no}
                    inputText={{height: 50, fontSize: 15, marginLeft: 15}}
                    placeholder={I18n.t('ple_id_card')}/>


            </View>

            <TouchableOpacity
                disabled={!editable}
                activeOpacity={1}
                testID="btn_picker_image"
                onPress={this.showPickImage}
                style={{
                    height: 198, width: Metrics.screenWidth - 34,
                    alignSelf: 'center', backgroundColor: Colors.txt_CCCCCC,
                    marginTop: 14, alignItems: 'center', justifyContent: 'center'
                }}>

                {this._cardImageView(image)}

            </TouchableOpacity>

            <Text style={{
                fontSize: Fonts.size.h12, marginTop: 84, alignSelf: 'center',
                color: Colors._AAA, paddingLeft: 15, paddingRight: 15
            }}>
                {I18n.t('upload_issue')}</Text>

            {this._hasRealBtn()}

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
            return (<BtnLong
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
            return (<BtnLong
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
    _postCardImage: (body) => dispatch(fetchPostCardImage(body))
});

const mapStateToProps = state => ({
    loading: state.TicketOrderState.loading,
    error: state.TicketOrderState.error,
    hasData: state.TicketOrderState.hasData,
    actionType: state.TicketOrderState.actionType

});

export default connect(mapStateToProps, bindAction)(IDCardView);

const styles = StyleSheet.create({
    choice_view: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 18,
        backgroundColor: Colors.white
    },
    choice_btn: {
        width: 160,
        height: 36,
        flex: 1,
        alignItems: 'center',
        paddingTop: 8,
        backgroundColor: '#16181D',
        borderRadius: 2
    },
    choice_btn_right: {
        marginRight: 22
    },
    choice_text_btn: {
        fontSize: 15,
        color: Colors.txt_444
    },
    text_input: {
        // backgroundColor: 'red',
        fontSize: 15,
        color: Colors.txt_666
    }
})