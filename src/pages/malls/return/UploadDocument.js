import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ActionSheet, ImagePicker} from '../../../components';
import {strNotNull, isEmptyObject} from '../../../utils/ComonHelper';

const picker = {
    width: 100,
    height: 100,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 800,
    compressImageQuality: 0.5,
    cropperCircleOverlay: true,
    cropping: false,
    multiple: true
};

export default class UploadDocument extends PureComponent {
    state={
        localImg: {},
        showImg: ''
    };

    handlePress = (i) => {
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(localImg => {
                    this.setState({localImg, showImg: localImg.path})
                }).catch(e => {
                    alert(e.message ? e.message : e);
                });
                break;
            case 2: {
                ImagePicker.openPicker(picker).then(localImg => {
                    this.setState({localImg, showImg: localImg.path})
                }).catch(e => {
                    alert(e.message ? e.message : e);
                });
            }
        }
    };


    render(){
        return(
            <View style={styles.page}>
                <Text style={styles.amountTxt}>{I18n.t('upload_document')}：</Text>
                <View style={styles.uploadImg}>
                    <TouchableOpacity
                        onPress={() => {
                            this.ActionSheet.show();
                        }}
                        style={styles.btnSelectImg}>

                    </TouchableOpacity>
                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={I18n.t('chose_image')}
                    options={[I18n.t('cancel'), I18n.t('camera'), I18n.t('pictures')]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this.handlePress}
                />
            </View>
        )}
}
const styles = StyleSheet.create({
    page:{
        height:165,
        backgroundColor:'#FFFFFF',
        marginTop:10,
        flexDirection:'column',
        alignItems:'center',
        paddingBottom:20
    },
    amountTxt:{
        fontSize: 14,
        color:'#333333',
        marginLeft:17,
        marginTop:14
    },
    uploadImg:{
        marginLeft:17,
        flexDirection:'row',
        alignItems:"center",
        marginTop:14
    },
    btnSelectImg: {
        alignSelf: 'center',
        height: 128,
        width: 206,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BBBBBB'
    },
    showImg: {
        height: 128,
        width: 206,
        resizeMode: 'contain'

    },
})