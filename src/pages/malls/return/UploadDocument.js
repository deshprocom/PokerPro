import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, ListView} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {NavigationBar, ActionSheet, ImagePicker} from '../../../components';
import {strNotNull, isEmptyObject} from '../../../utils/ComonHelper';

const picker = {
    compressImageQuality: 0.5,
    multiple: true
};

export default class UploadDocument extends PureComponent {
    state = {
        localImg: [1, 2, 3],
        spliceIndex: 0
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
                        spliceIndex: images.length
                    })
                }).catch(e => {
                    alert(e.message ? e.message : e);
                });
            }
        }
    };


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
                            this.ActionSheet.show();

                        }}
                                style={styles.btnSelectImg2}>



                                {item.path && <Image
                                    source={{uri:item.path}}
                                    style={{  height: 100,width: 100}}/>}


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
        marginLeft: 17,
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