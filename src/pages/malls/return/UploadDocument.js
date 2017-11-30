import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ActionSheet, ImagePicker} from '../../../components';
import {strNotNull, isEmptyObject, alertOrder} from '../../../utils/ComonHelper';

const picker = {
    compressImageQuality: 0.5,
    multiple: true
};

export default class UploadDocument extends PureComponent {
    state = {
        localImg: [1, 2, 3],
        spliceIndex: 0,
        uploadImg: []
    };

    handlePress = (i) => {
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(localImg => {

                    this.setState({
                        localImg
                    })
                }).catch(e => {
                    alert(e.message ? e.message : e);
                });
                break;
            case 2: {
                ImagePicker.openPicker(picker).then(images => {

                    if (images.length <= 0) {
                        return
                    }
                    const {localImg, spliceIndex} = this.state;
                    let imgs = [...localImg]
                    imgs.splice(spliceIndex, images.length, ...images);

                    this.setState({
                        localImg: imgs,
                        spliceIndex: images.length,
                        uploadImg: images
                    })
                }).catch(e => {
                    alert(e.message ? e.message : e);
                });
            }
        }
    };

    deleteImg = (index) => {
        return (
            alertOrder('confirm_delete', () => {
                let imgs = this.state.localImg;

                imgs.splice(index,1);
                let img2 = imgs;
                imgs.push("")
                this.setState({
                    localImg: imgs,
                    uploadImg:img2
                })
            })
        )
    }

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.amountTxt}>{I18n.t('upload_document')}：</Text>
                <View style={styles.uploadImg}>
                    {this.state.localImg.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`mall_image${index}`}
                                onPress={() => {
                                    if(this.state.uploadImg.length < 3){
                                        this.ActionSheet.show();
                                    }else if(this.state.uploadImg.length === 3){
                                        this.deleteImg(index);
                                    }

                                }}
                                style={styles.btnSelectImg2}>

                                {isEmptyObject(this.state.uploadImg) && index === 0 ?
                                    <View style={{width:55,alignItems:'center'}}>
                                        <Image
                                            style={{width:27,height:27}}
                                            source={Images.close}/>
                                        <Text
                                            style={{fontSize:12,color:'#CCCCCC',marginTop:5}}>{I18n.t('upload_image')}</Text>
                                    </View>
                                    : null}

                                {item.path && <Image
                                    source={{uri:item.path}}
                                    style={{height: 100,width: 100,justifyContent:'flex-end'}}>
                                    <TouchableOpacity
                                        style={{width:10,height:3,alignItems:'center',justifyContent:'center',zIndex:2}}
                                        onPress={()=>{
                                            this.deleteImg(index)

                                    }}>
                                        <Image style={{width:10,height:3}} source={Images.cut}/>
                                    </TouchableOpacity>
                                </Image>}


                            </TouchableOpacity>
                        )
                    })}

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
        )
    }
}
const styles = StyleSheet.create({
    page: {
        height: 165,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20
    },
    amountTxt: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 17,
        marginTop: 14
    },
    uploadImg: {

        marginRight: 17,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 14,

    },
    btnSelectImg: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderStyle: 'dashed'
    },
    btnSelectImg2: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderStyle: 'dashed',
        marginLeft: 21
    },
    showImg: {
        height: 128,
        width: 206,
        resizeMode: 'contain'

    },
})