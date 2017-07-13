/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput, Alert,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {InputView} from '../../components';
import Button from 'react-native-smart-button';
import {fetchPostCertification, fetchPostCardImage} from '../../actions/AccountAction';
import {POST_CERTIFICATION, GET_CERTIFICATION} from '../../actions/ActionTypes';
import ImagePicker from 'react-native-image-crop-picker';
import {
    isEmptyObject, strNotNull, showToast, call,
    getCurrentDate, getDispatchAction
} from '../../utils/ComonHelper';
import {Verified} from '../../configs/Status';
import ActionSheet from 'react-native-actionsheet';
import {umengEvent} from '../../utils/UmengEvent';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 2;
const options = [I18n.t('cancel'), I18n.t('camera'), I18n.t('pictures')];
const title = I18n.t('chose_image');
const picker = {
    width: 500,
    height: 500,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.8,
};

class IDCardView extends Component {

    static propTypes = {
        router: PropTypes.object
    };

    state = {

        editable: true,
        imageName: '',
        choice_id: 'chinese_id',
        chinese: {},
        passport: {}
    };

    componentDidMount() {
        getDispatchAction()[GET_CERTIFICATION]();


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
            cardImage: image.path,
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


    _btnSubmit = () => {
        umengEvent('true_name_submit');
        const {realName, idCard, cardImage, imageName, choice_id, chineseID, passID} = this.state;
        if (strNotNull(realName) && strNotNull(idCard) && !isEmptyObject(cardImage)) {

            if (cardImage.indexOf("http") == -1) {
                let formData = new FormData();
                let file = {uri: cardImage, type: 'multipart/form-data', name: imageName};
                formData.append("image", file);
                this.props._postCardImage(formData);
            }
            // router.log(choice_id);
            const body = {
                real_name: realName,
                cert_no: idCard,
                cert_type: choice_id
            };
            this.props._postCertification(body);


        } else {
            showToast('内容填写不完整')
        }


    }

    _cardImageView = () => {
        let {cardImage} = this.state;

        if (isEmptyObject(cardImage)) {
            return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image
                    source={Images.post_id_image}
                    style={{height:85,width:134}}/>

                {/*<Text style={{fontSize:Fonts.size.h18,color:Colors._AAA,marginTop:31}}>*/}
                {/*{I18n.t('ple_upload_name_id')}</Text>*/}

            </View>)
        } else {
            return (<Image
                style={{height:150,width:250}}
                source={{uri:cardImage}}>

            </Image>)
        }
    };

    render() {

        const {chinese, passport, editable, choice_id} = this.state;
        if(choice_id === '')

        return (<ScrollView
            testID="page_real_name"
            style={ApplicationStyles.bgContainer}>

            <Text style={{paddingLeft: 15, marginTop: 13, color: Colors._333, fontSize: 15}}>请选择上传证件</Text>

            <View style={styles.choice_view}>
                <Button style={[styles.choice_btn, styles.choice_btn_right,
                {backgroundColor:choice_id==='chinese_id'?'#16181D' :Colors.bg_f5}]}
                        textStyle={[styles.choice_text_btn,{color: choice_id==='chinese_id'?Colors.text_choice_btn :Colors.txt_444}]}
                        onPress={() =>{
                    this.setState({
                        choice_id:'chinese_id',
                        realName: '',
                        idCard: '',
                        cardImage: ''
                    })
                }}>
                    身份证</Button>

                <Button style={[styles.choice_btn,{backgroundColor:choice_id==='passport_id'?'#16181D' :Colors.bg_f5}]}
                        textStyle={[styles.choice_text_btn,{color: choice_id==='passport_id'?Colors.text_choice_btn :Colors.txt_444}]}
                        onPress={() => {
                    this.setState({
                        choice_id:'passport_id',
                        realName: '',
                        idCard: '',
                        cardImage: ''
                    })
                }}>
                    护照</Button>
            </View>

            <View
                style={{height:50,alignItems:'center',flexDirection:'row',
                    marginTop:8,backgroundColor:Colors.white}}>

                <Text style={{fontSize:15,color:Colors.txt_666,marginLeft:18}}>{I18n.t('real_name')}:</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text=>{
                                this.setState({
                                    realName:text
                                })
                            }}
                    inputValue={realName}
                    inputView={{height:50, borderBottomColor: Colors.white,
        borderBottomWidth: 1,flex:1}}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder={I18n.t('ple_real_name')}/>


            </View>
            <View
                style={{height:50,alignItems:'center',flexDirection:'row',
                    marginTop:1,backgroundColor:Colors.white,paddingLeft: 18}}>

                <Text style={[styles.text_input,{width: choice_id==='chinese_id'?76 :0}]}>{I18n.t('ID_card')}</Text>
                <Text
                    style={[styles.text_input,{width: choice_id==='passport_id'?66 :0}]}>{I18n.t('password_card')}</Text>
                <InputView
                    testID="input_id_card"
                    editable={editable}
                    stateText={text=>{
                                this.setState({
                                    idCard:text
                                })
                            }}
                    inputView={{height:50, borderBottomColor: Colors.white,
        borderBottomWidth: 1,flex:1}}
                    inputValue={idCard}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder={I18n.t('ple_id_card')}/>


            </View>

            <TouchableOpacity
                disabled={!editable}
                activeOpacity={1}
                testID="btn_picker_image"
                onPress={this.showPickImage}
                style={{height:198,width:Metrics.screenWidth-34,
                alignSelf:'center',backgroundColor:Colors.txt_CCCCCC,
                marginTop:14,alignItems:'center',justifyContent:'center'}}>

                {this._cardImageView()}

            </TouchableOpacity>

            <Text style={{fontSize:Fonts.size.h12,marginTop:84,alignSelf:'center',
            color:Colors._AAA,paddingLeft: 15,paddingRight: 15}}>
                {I18n.t('upload_issue')}</Text>

            {this._hasRealBtn()}

            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={title}
                options={options}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePress}
            />
        </ScrollView>)
    }

    _hasRealBtn = () => {
        const {editable} = this.state;
        if (editable) {
            return ( <Button
                testID="btn_submit"
                activeOpacity={1}
                onPress={this._btnSubmit}
                style={{height:49,width:Metrics.screenWidth-34,
            alignSelf:'center',backgroundColor:'#161718',
            marginTop:25,justifyContent:'center',marginBottom:10}}
                textStyle={{fontSize:Fonts.size.h17,color:Colors.txt_E0C}}>
                {I18n.t('submit')}

            </Button>)
        } else {
            return ( <Button
                testID="btn_contact_customer_service"
                activeOpacity={1}
                onPress={this._btnService}
                style={{height:49,width:Metrics.screenWidth-34,
            alignSelf:'center',backgroundColor:Colors.white,
            marginTop:25,justifyContent:'center',marginBottom:10}}
                textStyle={{fontSize:Fonts.size.h17,color:Colors.txt_666}}>
                {I18n.t('contact_customer_service')}

            </Button>)
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