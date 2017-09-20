import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {SecurityText} from '../../components';
import I18n from 'react-native-i18n';
import {idCardStatus, Verified} from '../../configs/Status'

export default class ItemVerified extends Component {

    render() {
        console.log(this.props)
        const {index, item} = this.props.verified;
        const {cert_no, real_name, status} = item;
        return (<View style={[styles.itemAlign, {backgroundColor: 'white'}]}>
            <Image style={styles.icSelect}
                   source={Images.verified_select}/>
            <View style={styles.margin}>
                <View style={styles.itemAlign}>
                    <Text style={styles.txtName}>{real_name}</Text>
                    <Text style={this.statusStyle(status)}>{idCardStatus(status)}</Text>
                </View>

                <View style={[styles.itemAlign, {marginTop: 7}]}>
                    <Text style={styles.txtName}>{I18n.t("ID_card")} </Text>
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

            <Image style={styles.icEdit}
                   source={Images.verified_edit}/>
        </View>)
    }

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
        width: 37
    },
    margin: {
        marginTop: 14,
        marginBottom: 14
    }
});