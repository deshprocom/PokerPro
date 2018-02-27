/**
 * Created by lorne on 2017/3/8.
 */
import React, {Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';

export default class NoDataView extends Component {


    render() {
        const {pageStyle, btnPress} = this.props;
        return (<TouchableOpacity
            onPress={()=>{
                if(btnPress)
                    btnPress();
            }}
            activeOpacity={1}
            testID="view_no_data"
            style={[styles.page,pageStyle]}>

            <View style={{alignItems:'center',justifyContent:'center',
            marginTop:126}}>
                <Image style={{height:75,width:72}}
                       source={Images.load_no_data}/>

                <Text style={[Fonts.H18,{color:Colors._AAA,
                marginTop:22}]}>{I18n.t('load_no_data')}</Text>
            </View>
        </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: Colors.bg_f5
    }
});