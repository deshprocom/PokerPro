import React, {Component} from 'react';
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {NavigationBar, ActionSheet, ImagePicker} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {addVerified, delVerified} from '../../services/AccountDao';
import {strNotNull, showToast, isEmptyObject, getFileName} from '../../utils/ComonHelper';
import {idCardStatus, Verified} from '../../configs/Status';

export const picker = {
    width: 500,
    height: 500,
    cropping: false,
    cropperCircleOverlay: true,
    compressImageMaxWidth: 800,
    compressImageMaxHeight: 600,
    compressImageQuality: 0.5,
};

export default class AddVerified extends Component {
    state = {
        name: '',
        num: '',
        localImg: {},
        showImg: '',
        editable: true,
        option: {}
    };


    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: '#161718'}}
                title={this._title()}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
                {...this.state.option}

            />

            <ScrollView>
                {this.renderFail()}
                {this.renderInput()}
                {this._verifiedPass()}
            </ScrollView>


            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={I18n.t('chose_image')}
                options={[I18n.t('cancel'), I18n.t('camera'), I18n.t('pictures')]}
                cancelButtonIndex={0}
                destructiveButtonIndex={2}
                onPress={this.handlePress}
            />
        </View>)
    }


    renderFail = () => {
        const {verified} = this.props.params;
        if (isEmptyObject(verified))
            return;
        if (verified.status === Verified.FAILED)
            return <View style={styles.viewFail}>
                <Text style={styles.txtFail}>{I18n.t('verified_mono')}:{verified.memo}</Text>
            </View>
    };

    _delVerified = () => {
        const {verified, verified_refresh} = this.props.params;

        Alert.alert(`${I18n.t('verified_del')}`, `${I18n.t('verified_del_desc')}`, [{
            text: `${I18n.t('cancel')}`, onPress: () => {
            }
        }, {
            text: `${I18n.t('alert_sure')}`, onPress: () => {
                if (!isEmptyObject(verified)) {
                    delVerified({extra_id: verified.id}, data => {
                        verified_refresh();
                        router.pop();
                    }, err => {

                    })
                }
            }
        }]);

    };

    _verifiedPass = () => {
        if (this.state.editable) {
            return <View>

                {this.renderImage()}
                {this.renderSubmit()}
            </View>
        } else {
            return <Image style={styles.passImg}
                          source={{uri: this._certImage()}}/>
        }
    };

    componentDidMount() {
        const {verified} = this.props.params;
        if (!isEmptyObject(verified)) {
            this.setState({
                name: verified.real_name,
                num: verified.cert_no,
                editable: verified.status !== Verified.PASSED,
                option: {
                    rightBtnText: I18n.t('buy_del'),
                    rightBtnPress: this._delVerified
                }
            });
        }

    }


    _title = () => {
        const {verified} = this.props.params;

        return isEmptyObject(verified) ? I18n.t('verified_new') : idCardStatus(verified.status)
    };

    _certImage = () => {
        const {verified} = this.props.params;

        return isEmptyObject(verified) ? '' : verified.image;
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

    _submit = () => {
        const {name, num, localImg, showImg} = this.state;
        const {cert_type, verified_refresh, verified} = this.props.params;


        if (strNotNull(name) && strNotNull(num)) {
            let formData = new FormData();
            if (!isEmptyObject(localImg)) {
                let file = {uri: localImg.path, type: 'multipart/form-data', name: getFileName(localImg.path)};
                formData.append("image", file);
            }
            if (!isEmptyObject(verified)) {
                formData.append('extra_id', verified.id)
            }
            formData.append("version", 'v20');
            formData.append("real_name", name);
            formData.append("cert_no", num);
            formData.append("cert_type", cert_type);

            addVerified(formData, data => {
                verified_refresh();
                router.pop();
            }, err => {

            })


        } else {
            showToast(I18n.t('cert_content'))
        }


    };


    renderSubmit = () => {
        return <TouchableOpacity
            onPress={this._submit}
            style={styles.btnSubmit}>
            <Text style={styles.txtSubmit}>{I18n.t('submit')}</Text>
        </TouchableOpacity>
    };

    getCertType = () => {
        const {cert_type, verified_refresh, verified} = this.props.params;
        return cert_type ? cert_type === 'passport_id' : verified.cert_type === 'passport_id';
    };

    renderImage = () => {

        return <View>
            <Text
                style={styles.lbImage1}>{this.getCertType() ? I18n.t('verified_image_lb_pass') : I18n.t('verified_image_lb')}</Text>
            <TouchableOpacity
                onPress={() => {
                    this.ActionSheet.show();
                }}
                style={styles.btnSelectImg}>
                {this.verifiedImage()}

            </TouchableOpacity>

            <Text style={styles.lbImage2}>{I18n.t('verified_example')}:</Text>

            <Image style={styles.img2}
                   source={this.getCertType() ? Images.verifed_passport : Images.verified_exmple}/>


            <Text style={styles.lbImage3}>*{I18n.t('verified_desc')}</Text>


        </View>
    };


    verifiedImage = () => {
        if (strNotNull(this.state.showImg)) {
            return <Image style={styles.showImg}
                          source={{uri: this.state.showImg}}/>
        } else if (strNotNull(this._certImage())) {
            return <Image style={styles.showImg}
                          source={{uri: this._certImage()}}/>
        } else
            return <Image style={styles.img1}
                          source={Images.verified_card}/>


    };

    renderInput = () => {
        const {cert_type} = this.props.params;

        return <View style={{backgroundColor: 'white', marginTop: 8}}>
            <View style={styles.rowAlign}>
                <Text style={styles.lbName}>{I18n.t('real_name')}: </Text>
                <TextInput style={styles.inName}
                           underlineColorAndroid='transparent'
                           clearButtonMode='while-editing'
                           onChangeText={name => this.setState({name})}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
                           value={this.state.name}
                           editable={this.state.editable}
                           placeholder={I18n.t('ple_real_name')}/>


            </View>
            <View style={{backgroundColor: Colors.bg_ec, height: 1}}/>
            <View style={styles.rowAlign}>
                <Text
                    style={styles.lbName}>{this.getCertType() ? I18n.t('password_card') : I18n.t('ID_card')}</Text>
                <TextInput style={styles.inName}
                           underlineColorAndroid='transparent'
                           clearButtonMode='while-editing'
                           onChangeText={num => this.setState({num})}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
                           value={this.state.num}
                           editable={this.state.editable}
                           placeholder={I18n.t('ple_id_card')}/>


            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    lbName: {
        fontSize: 15, color: Colors._333, fontWeight: 'bold', marginLeft: 17

    },
    inName: {
        height: 48, fontSize: 15, color: Colors._666, flex: 1, marginLeft: 10
    },
    rowAlign: {
        flexDirection: 'row', alignItems: 'center'
    },
    lbImage1: {
        fontSize: 14,
        color: Colors._AAA,
        marginLeft: 17,
        marginTop: 28,
        marginBottom: 18
    },
    img1: {
        height: 66,
        width: 98,
    },
    showImg: {
        height: 128,
        width: 206,
        resizeMode: 'contain'

    },
    btnSelectImg: {
        alignSelf: 'center',
        height: 128,
        width: 206,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BBBBBB'
    },
    lbImage2: {
        fontSize: 14,
        color: Colors._AAA,
        marginLeft: 17,
        marginTop: 10
    },
    img2: {
        height: 128,
        width: 206,
        alignSelf: 'center',
        resizeMode:'cover'
    },
    lbImage3: {
        fontSize: 11,
        color: Colors._AAA,
        marginLeft: 17,
        marginTop: 25
    },
    txtSubmit: {
        fontSize: 17,
        color: Colors._F4E
    },
    btnSubmit: {
        height: 44,
        marginLeft: 17,
        marginRight: 17,
        backgroundColor: Colors._161,
        borderRadius: 2,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    passImg: {
        height: 128,
        width: 206,
        alignSelf: 'center',
        marginTop: 60
    },
    viewFail: {
        height: 30,
        width: '100%',
        backgroundColor: Colors._DF1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtFail: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 17
    }

});