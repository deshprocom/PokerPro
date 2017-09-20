import React, {Component} from 'react';
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationBar, ActionSheet, ImagePicker} from '../../components';
import {Colors, Images, ApplicationStyles} from '../../Themes';
import I18n from 'react-native-i18n';
import {listVerified} from '../../services/AccountDao';
import {picker, strNotNull} from '../../utils/ComonHelper';

export default class AddVerified extends Component {
    state = {
        name: '',
        num: '',
        localImg: {},
        showImg: ''
    };

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                toolbarStyle={{backgroundColor: '#161718'}}
                title={I18n.t('verified_new')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}
            />

            {this.renderInput()}
            {this.renderImage()}
            {this.renderSubmit()}
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
        const {name, num, localImg} = this.state;
        console.log(this.state)


    };


    renderSubmit = () => {
        return <TouchableOpacity
            onPress={this._submit}
            style={styles.btnSubmit}>
            <Text style={styles.txtSubmit}>{I18n.t('submit')}</Text>
        </TouchableOpacity>
    };

    renderImage = () => {
        return <View>
            <Text style={styles.lbImage1}>{I18n.t('verified_image_lb')}</Text>
            <TouchableOpacity
                onPress={() => {
                    this.ActionSheet.show();
                }}
                style={styles.btnSelectImg}>
                {strNotNull(this.state.showImg) ? <Image style={styles.showImg}
                                                         source={{uri: this.state.showImg}}/> :
                    <Image style={styles.img1}
                           source={Images.verified_card}/>}

            </TouchableOpacity>

            <Text style={styles.lbImage2}>{I18n.t('verified_example')}:</Text>

            <Image style={styles.img2}
                   source={Images.verified_exmple}/>


            <Text style={styles.lbImage3}>*{I18n.t('verified_desc')}</Text>


        </View>
    };

    renderInput = () => {

        return <View style={{backgroundColor: 'white', marginTop: 8}}>
            <View style={styles.rowAlign}>
                <Text style={styles.lbName}>{I18n.t('real_name')}: </Text>
                <TextInput style={styles.inName}
                           underlineColorAndroid='transparent'
                           clearButtonMode='while-editing'
                           onChangeText={name => this.setState({name})}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
                           placeholder={I18n.t('ple_real_name')}/>


            </View>
            <View style={{backgroundColor: Colors.bg_ec, height: 1}}/>
            <View style={styles.rowAlign}>
                <Text style={styles.lbName}>{I18n.t('ID_card')}</Text>
                <TextInput style={styles.inName}
                           underlineColorAndroid='transparent'
                           clearButtonMode='while-editing'
                           onChangeText={num => this.setState({num})}
                           maxLength={50}
                           placeholderTextColor="#CCCCCC"
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
        alignSelf: 'center'
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
        justifyContent: 'center'
    }
});