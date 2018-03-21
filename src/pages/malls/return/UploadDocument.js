import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ActionSheet, ImagePicker} from '../../../components';
import {util, isEmptyObject, alertOrder, showToast} from '../../../utils/ComonHelper';


export default class UploadDocument extends PureComponent {
    state = {
        localImg: [false, false, false],
        spliceIndex: 0,
        uploadImg: []
    };


    getImages = () => {
        return this.state.uploadImg;
    };

    handlePress = (i) => {
        let picker = {
            compressImageQuality: 0.3,
            multiple: true,
            maxFiles: 3 - this.state.uploadImg.length,
        };
        switch (i) {
            case 1:
                ImagePicker.openCamera(picker).then(localImg => {

                    this.setState({
                        localImg
                    })
                }).catch(e => {
                    // alert(e.message ? e.message : e);
                });
                break;
            case 2: {
                ImagePicker.openPicker(picker).then(images => {

                    if (images.length <= 0) {
                        return
                    }
                    if (images.length > 3 || (this.state.uploadImg.length + images.length) > 3) {
                        showToast(I18n.t('upload_image'));
                        return
                    }
                    const {localImg, spliceIndex} = this.state;
                    let imgs = [...localImg];
                    imgs.splice(spliceIndex, images.length, ...images);
                    let num = spliceIndex + images.length;

                    this.setState({
                        localImg: imgs,
                        spliceIndex: num,
                        uploadImg: imgs.filter(function (value) {
                            return (value !== false);
                        })
                    });
                }).catch(e => {
                    // alert(e.message ? e.message : e);
                });
            }
        }
    };

    deleteImg = (index) => {
        return (
            alertOrder(I18n.t('confirm_delete'), () => {
                let imgs = [...this.state.localImg];

                imgs.splice(index, 1);
                let img2 = imgs;
                imgs.push(false);
                this.setState({
                    localImg: imgs,
                    uploadImg: img2.filter(function (value) {
                        return (value != false);
                    }),
                    spliceIndex: --this.state.spliceIndex
                })
            })
        )
    };

    render() {

        console.log(this.state.uploadImg)

        return (
            <View style={styles.page}>
                <Text style={styles.amountTxt}>{I18n.t('upload_document')}：</Text>
                <View style={styles.uploadImg}>
                    {this.state.localImg.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`mall_image${index}`}
                                onPress={() => {
                                    this.ActionSheet.show();

                                }}
                                style={styles.btnSelectImg2}>

                                {util.isEmpty(this.state.uploadImg) && index === 0 ?
                                    <View style={{width: 55, alignItems: 'center'}}>
                                        <Image
                                            style={{width: 29, height: 27}}
                                            source={Images.camera}/>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#CCCCCC',
                                                marginTop: 5
                                            }}>{I18n.t('upload_image')}</Text>
                                    </View>
                                    : null}

                                {item.path && <Image
                                    source={{uri: item.path}}
                                    style={{height: 100, width: 100, justifyContent: 'flex-end'}}/>

                                }
                                {item.path && <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        left: 65,
                                        top: 2,
                                        width: 30,
                                        height: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 99,
                                    }}
                                    onPress={() => {
                                        this.deleteImg(index)

                                    }}>
                                    <Image style={{width: 20, height: 20}} source={Images.imgDel}/>
                                </TouchableOpacity>}

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