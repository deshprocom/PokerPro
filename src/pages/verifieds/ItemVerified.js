import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {SecurityText} from '../../components';
import I18n from 'react-native-i18n';
import {idCardStatus, Verified} from '../../configs/Status';
import {defaultVerified} from '../../services/AccountDao';

export default class ItemVerified extends Component {

    render() {

        const {index, item} = this.props.verified;
        const {cert_no, real_name, status, id, cert_type} = item;
        return (<TouchableOpacity
            disabled={!this.props.selectable}
            onPress={() => {
                this.props.setDefault(item)
            }}
            activeOpacity={0.5}
            style={[styles.itemAlign, {backgroundColor: 'white'}]}>

            <Image style={styles.icSelect}
                   source={item.default ? Images.verified_selected : Images.verified_select}/>

            <View style={styles.margin}>
                <View style={styles.itemAlign}>
                    <Text style={styles.txtName}>{real_name}</Text>
                    <Text style={this.statusStyle(status)}>{idCardStatus(status)}</Text>
                </View>

                <View style={[styles.itemAlign, {marginTop: 7}]}>
                    <Text
                        style={styles.txtName}>{cert_type === 'passport_id' ? I18n.t('password_card') : I18n.t("ID_card")} </Text>
                    <SecurityText
                        style={styles.txtName}
                        securityOptions={{
                            isSecurity: true,
                            startIndex: 3,
                            endIndex: 15,
                        }}>
                        {cert_no}
                    </SecurityText>
                </View>
            </View>


            <View style={{flex: 1}}/>
            <TouchableOpacity
                onPress={() => {
                    this.verifiedEditOrLook(item)
                }}
                style={[styles.itemAlign, {height: '100%'}]}>
                {this.renderEdit(item)}
            </TouchableOpacity>

        </TouchableOpacity>)
    }

    verifiedEditOrLook = (item) => {
        const {refresh} = this.props;

        router.toAddVerified(item.cert_type, refresh, item)
    };


    renderEdit = (item) => {
        if (item.status === Verified.PASSED)
            return <Image
                opacity={0.5}
                style={styles.icAvatar}
                source={Images.verified_avatar}/>;
        else
            return (
                <Image style={styles.icEdit}
                       source={Images.verified_edit}/>)

    };


    statusStyle = (status) => {
        switch (status) {
            case Verified.PENDING:
                return styles.pendingStatus;
            case Verified.PASSED:
                return styles.passedStatus;
            case Verified.FAILED:
                return styles.failedStatus;
        }
    }
}

const styles = StyleSheet.create({
    icSelect: {
        height: 20,
        width: 20,
        marginLeft: 17,
        marginRight: 16
    },
    itemAlign: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtName: {
        fontSize: 15,
        color: Colors._666
    },
    failedStatus: {
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#F34A4A',
        color: '#F34A4A',
        borderRadius: 2,
        textAlign: 'center',
        marginLeft: 13
    },
    passedStatus: {
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#34BA3C',
        color: '#34BA3C',
        borderRadius: 2,
        textAlign: 'center',
        marginLeft: 13
    },
    pendingStatus: {
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#6DB0FF',
        color: '#6DB0FF',
        borderRadius: 2,
        textAlign: 'center',
        marginLeft: 13
    },
    icEdit: {
        height: 22,
        width: 22,
        marginRight: 34
    },
    icAvatar: {
        height: 37,
        width: 37,
        marginRight: 28
    },
    margin: {
        marginTop: 14,
        marginBottom: 14
    }
});