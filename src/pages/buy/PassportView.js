/**
 * Created by lorne on 2017/2/21.
 */
import React, {Component,PropTypes}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import Button from 'react-native-smart-button';

import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

import {POST_CERTIFICATION, GET_CERTIFICATION} from '../../actions/ActionTypes';
import {
    isEmptyObject,getDispatchAction,strNotNull,getCurrentDate
    ,showToast
} from '../../utils/ComonHelper';
import {postPasswordImage} from '../../services/NewsDao';
import {umengEvent} from '../../utils/UmengEvent';

import {InputView} from "../../components";

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
export default class PassportView extends Component {
    static propTypes = {
        router:PropTypes.object
    };

    state = {
        editable: true,
        realName: '',
        passwordCard:'',
        cardImage:'',
        imageName:''
    }

    componentDidMount() {
        postPasswordImage( data => {
            router.log(1111)
            router.log(data);
            router.log(1111)
        },err => {

        })
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

    _cardImageView = () => {
        let {cardImage} = this.state;
        if(isEmptyObject(cardImage)){
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image
                        source={Images.name_id}
                        style={{height:35,width:49}}/>

                    <Text style={{fontSize:Fonts.size.h18,color:Colors._AAA,marginTop:31}}>
                        {I18n.t('ple_upload_name_id')}
                    </Text>
                </View>
            )
        }else{
            return (<Image
                style={{height:150,width:250}}
                source={{uri:cardImage}}>

            </Image>)
        }
    }

    submitBtn = () => {
        umengEvent('true_password_submit');
        const {realName, passwordCard, cardImage, imageName} = this.state;
        if (strNotNull(realName) && strNotNull(passwordCard) && !isEmptyObject(cardImage)) {

            if (cardImage.indexOf("http") == -1) {
                let formData = new FormData();
                let file = {uri: cardImage, type: 'multipart/form-data', name: imageName};
                formData.append("image", file);
                // this.props._postCardImage(formData);
                this.state.cardImage = formData;
            }

            const body = {
                real_name: realName,
                cert_no: passwordCard
            };
            // this.props._postCertification(body);
            this.componentDidMount()

        } else {
            showToast('内容填写不完整')
        }
    }

    render() {
        const {editable,realName,passwordCard}=this.state;
        router.log(this.state);
        return (<View
            testID="page_real_name"
            style={ApplicationStyles.bgContainer}>

            <View
                style={{height:50,alignItems:'center',flexDirection:'row',marginTop:8,
                backgroundColor:Colors.white}}>
                <Text style={{marginLeft:18}}>{I18n.t('real_name')}:</Text>
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
                style={{height:50,alignItems:'center',flexDirection:'row',marginTop:8,
                backgroundColor:Colors.white}}>
                <Text style={{marginLeft:18}}>{I18n.t('password_card')}</Text>
                <InputView
                    editable={editable}
                    testID="input_real_name"
                    stateText={text=>{
                                this.setState({
                                    passwordCard:text
                                })
                            }}
                    inputValue={passwordCard}
                    inputView={{height:50,borderBottomColor:Colors.white,
                        borderBottomWidth:1,flex:1}}
                    inputText={{height:50,fontSize:15,marginLeft:15}}
                    placeholder={I18n.t('ple_password_card')}/>
            </View>
            <TouchableOpacity
                disabled={!editable}
                activeOpacity={1}
                onPress={this.showPickImage}
                style={{height:198,width:Metrics.screenWidth-34,
                alignSelf:'center',backgroundColor:Colors.txt_CCCCCC,
                marginTop:14,alignItems:'center',justifyContent:'center'}}>
                {this._cardImageView()}
            </TouchableOpacity>
            <Text
                style={{fontSize:Fonts.size.h12,marginTop:114,alignSelf:'center',color:Colors._AAA}}>
                {I18n.t('upload_issue')}
            </Text>
            <Button activeOpacity={1}
                onPress={this.submitBtn}
                style={{height:49,width:Metrics.screenWidth-34,
                alignSelf:'center',backgroundColor:'#161718',
                marginTop:25,justifyContent:'center'}}
                textStyle={{fontSize:Fonts.size.h17,color:Colors.txt_E0C}}>
                {I18n.t('submit')}
            </Button>

            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={title}
                options={options}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePress}
            />

        </View>)
    }

}
