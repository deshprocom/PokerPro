import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {SecurityText} from '../../components';

export default class ItemVerified extends Component {

    render() {
        return (<View style={[styles.itemAlign, {backgroundColor: 'white'}]}>
            <Image style={styles.icSelect}
                   source={Images.verified_select}/>
            <View style={styles.margin}>
                <View style={styles.itemAlign}>
                    <Text style={styles.txtName}>李安3</Text>
                    <Text style={styles.txtStatus}>未通过</Text>
                </View>

                <View style={[styles.itemAlign, {marginTop: 7}]}>
                    <Text style={styles.txtName}>身份证号: </Text>
                    <SecurityText
                        style={styles.txtName}
                        securityOptions={{
                            isSecurity: true,
                            startIndex: 3,
                            endIndex: 15,
                        }}>
                        431126199703040980
                    </SecurityText>
                </View>
            </View>


            <View style={{flex: 1}}/>

            <Image style={styles.icEdit}
                   source={Images.verified_edit}/>
        </View>)
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
    txtStatus: {
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