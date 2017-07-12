/**
 * Created by lorne on 2017/3/8.
 */
import React, {PropTypes, Component}from 'react';
import {
    TouchableOpacity, View, TextInput,
    StyleSheet, Image, Text
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import {Button} from '../../components'

export default class NoNetWorkView extends Component {
    static propTypes = {
        onPress: PropTypes.func
    }

    render() {
        return (<View
            testID="view_net_work"
            style={ApplicationStyles.bgContainer}>

            <View style={{alignItems:'center',justifyContent:'center',
            marginTop:139}}>
                <Image style={{height:70,width:70}}
                       source={Images.load_wifi}/>

                <Text style={[Fonts.H18,{color:Colors._AAA,
                marginTop:11}]}>{I18n.t('load_no_net')}</Text>
                <Button
                    testID="btn_retry"
                    onPress={()=>{
                    if(this.props.onPress !== undefined)
                        this.props.onPress();
                }}
                    style={{backgroundColor:Colors._161,
                height:40,width:172,marginTop:37,justifyContent:'center'}}
                    textStyle={[Fonts.H17,{color:Colors.txt_E4D}]}>
                    {I18n.t('retry')}
                </Button>
            </View>


        </View>)
    }
}