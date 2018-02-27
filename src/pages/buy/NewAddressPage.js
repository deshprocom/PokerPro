/**
 * Created by lorne on 2017/7/6.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity, View, TextInput, Keyboard,
    StyleSheet, Image, Text, ScrollView, Platform
} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {NavigationBar} from '../../components';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {fetchAddress} from '../../actions/OrderAction';
import {strNotNull, showToast, checkPhone, isEmptyObject} from '../../utils/ComonHelper';
import {postAddress} from '../../services/OrderDao';
import ChinaRegionWheelPicker from '../../components/area-picker';

export default class NewAddress extends Component {

    state = {
        isDefault: false,
        regionVisible: false,
        regionTxt: '',
        addressEdit: {},
        province: '',
        city: '',
        area: ''
    };

    componentDidMount() {
        const {address} = this.props.params;

        this.setState({
            addressEdit: address,
            regionTxt: isEmptyObject(address) ? '' : address.address,
            isDefault: isEmptyObject(address) ? false : address.default,
            province: address.province,
            city: address.city,
            area: address.area
        });
        if (!isEmptyObject(address)) {
            this.receiver = address.consignee;
            this.receiverAdr1 = address.address;
            this.receiverAdr2 = address.address_detail;
            this.phoneNum = address.mobile;

        }
    }

    _getName = () => {
        const {consignee} = this.state.addressEdit;
        return consignee;
    };
    _getPhone = () => {
        const {mobile} = this.state.addressEdit;
        return mobile;
    };

    _getAdrDetail = () => {
        const {address_detail} = this.state.addressEdit;
        return address_detail;
    };

    _getTitle = () => {
        if (isEmptyObject(this.state.addressEdit)) {
            return I18n.t('add_new_adr');
        } else
            return I18n.t('buy_editor_adr');
    };

    render() {
        return (<View style={ApplicationStyles.bgContainer}>
            <NavigationBar
                refreshPage={this.refreshPage}
                toolbarStyle={{backgroundColor: Colors.bg_09}}
                rightBtnPress={this._postAdr}
                title={this._getTitle()}
                rightBtnText={I18n.t('save')}
                leftBtnIcon={Images.sign_return}
                leftImageStyle={{height: 19, width: 11, marginLeft: 20, marginRight: 20}}
                leftBtnPress={() => router.pop()}/>

            <View style={styles.view1}>
                <View style={styles.inputView}>
                    <Text style={styles.lbAdr}>{I18n.t('buy_person')}</Text>
                    <TextInput style={styles.input}
                               defaultValue={this._getName()}
                               onChangeText={txt => {
                                   this.receiver = txt;
                               }}/>
                </View>
                <View style={styles.line}/>
                <View style={styles.inputView}>
                    <Text style={styles.lbAdr}>{I18n.t('line')}: </Text>
                    <TextInput style={styles.input}
                               defaultValue={this._getPhone()}
                               onChangeText={txt => {
                                   this.phoneNum = txt;
                               }}/>
                </View>
                <View style={styles.line}/>
                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                        this.setState({
                            regionVisible: !this.state.regionVisible
                        })
                    }}
                    style={styles.inputView}>
                    <Text style={styles.lbAdr}>{I18n.t('buy_adr')}</Text>
                    <Text style={styles.lbAdr}>{this.state.regionTxt}</Text>
                    <View style={{flex: 1}}/>
                    <Text style={styles.txtSelect}>{I18n.t('buy_ple_choice')}</Text>
                    <Image style={styles.imgRight}
                           source={Images.adr_right}/>

                </TouchableOpacity>
                <View style={styles.line}/>
                <View style={styles.inputAdrView}>
                    <TextInput
                        numberOfLines={2}
                        multiline={true}
                        style={styles.inputAdr}
                        defaultValue={this._getAdrDetail()}
                        placeholder={I18n.t('buy_adr_name')}
                        placeholderTextColor={'#AAAAAA'}
                        onChangeText={txt => {
                            this.receiverAdr2 = txt;
                        }}/>
                </View>

            </View>

            <View style={styles.view2}>
                <Text style={styles.lbDefault}>{I18n.t('buy_set_adr')}</Text>

                <Text style={styles.lbRemark}>{I18n.t('buy_zhu')}</Text>

                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isDefault: !this.state.isDefault
                        })
                    }}
                    style={styles.btnSwitch}>
                    <Image style={styles.imgSwitch}
                           source={this.state.isDefault ? Images.handle : Images.handle2}/>
                </TouchableOpacity>


            </View>

            <ChinaRegionWheelPicker
                transparent
                animationType={'fade'}
                isVisible={this.state.regionVisible} //true展示，false不展示
                onSubmit={(params) => {
                    console.log(params)
                    const {province, city, area} = params;
                    this.receiverAdr1 = province.name + ' ' + city.name + ' ' + area.name;
                    this.setState({
                        regionVisible: false,
                        regionTxt: this.receiverAdr1,
                        province: province.name,
                        city: city.name,
                        area: area.name
                    })
                }}
                onCancel={() => {
                    this.setState({
                        regionVisible: false
                    })
                }}
            />
        </View>)
    }


    _postAdr = () => {
        if (!checkPhone(this.phoneNum)) {
            return;
        }
        if (this.receiver &&
            this.receiverAdr1 && this.receiverAdr2) {
            const body = {
                consignee: this.receiver,
                mobile: this.phoneNum,
                address: this.receiverAdr1,
                address_detail: this.receiverAdr2,
                default: this.state.isDefault,
                province: this.state.province,
                city: this.state.city,
                area: this.state.area

            };


            if (!isEmptyObject(this.state.addressEdit)) {
                const {id} = this.state.addressEdit;
                body['id'] = id
            }


            postAddress(body, data => {
                console.log(data);
                showToast(I18n.t('buy_put_success'));
                this.props.params.getList();
                router.pop();

            }, err => {
                console.log(err)
            })


        } else {
            showToast(I18n.t('fillWhole'))
        }
    }


}


const styles = StyleSheet.create({
    inputView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',

    },
    lbAdr: {
        fontSize: 15,
        color: '#444444',
        marginLeft: 17
    },
    input: {
        height: 50,
        fontSize: 15,
        color: '#444444',
        flex: 1
    },
    line: {
        height: 0.5,
        backgroundColor: Colors.bg_f5
    },
    inputAdr: {
        marginLeft: 17,
        marginTop: 17,
        height: 60,
        fontSize: 15,
        color: '#444444',
        justifyContent: 'flex-start',

    },
    view1: {
        backgroundColor: 'white',
        marginTop: 8,
        marginBottom: 10

    },
    inputAdrView: {
        height: 80,
    },
    view2: {
        height: 90,
        backgroundColor: 'white'
    },
    lbDefault: {
        fontSize: 15,
        color: '#444444',
        marginLeft: 17,
        marginTop: 17
    },
    lbRemark: {
        fontSize: 14,
        color: '#AAAAAA',
        marginLeft: 17,
        marginTop: 21
    },
    btnSwitch: {
        height: 32,
        width: 53,
        position: 'absolute',
        top: 9,
        right: 19
    },
    imgSwitch: {
        height: 32,
        width: 53,
    },
    imgRight: {
        height: 20,
        width: 11,
        marginRight: 17
    },
    txtSelect: {
        fontSize: 14,
        color: '#AAAAAA',
        marginRight: 6
    }
});