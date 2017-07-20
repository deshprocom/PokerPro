import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Colors, Images} from '../../Themes';

class AddrCheck extends Component {
    static propTypes = {
        checkTitle: PropTypes.isString,
        checkData: PropTypes.isArray,
        checkType: PropTypes.func,
        checkList: PropTypes.func
    };

    constructor(props){
        super(props);
        this.state = {
            check: false
        }
    }

    lineView = (checkData) => {
        if(this.props.checkData.length == 0){
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 0}}></View>
            )
        }else if(this.props.checkData.length == 1){
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 72}}></View>
            )
        }else if(this.props.checkData.length == 2){
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 155}}></View>
            )
        }else{
            return(
                <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 239}}></View>
            )
        }
    };

    choiceBtn = (checkData) => {
        return(<View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
            {
                this.props.checkData.map((item,index) => {
                    return(
                        <TouchableOpacity onPress=""
                                          style={styles.btn_style}>
                            <Image source={this.state.check?Images.Group:''}
                                   style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                                <Text key={index}>{item}</Text>
                            </Image>
                        </TouchableOpacity>
                    )
                })
            }
        </View>)
    };

    render(){
        return(<View>
            <Text style={{lineHeight: 21,fontSize: 15,color: Colors._888}}>{this.props.checkTitle}</Text>
            {this.lineView()}
            {this.choiceBtn()}
        </View>)
    }
}

export default AddrCheck;

const styles = StyleSheet.create({
    btn_style: {
        color: Colors._333,
        fontSize: 15,
        width: 72,
        height: 30,
        borderRadius: 2,
        borderColor: Colors._CCC,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginRight: 13
    }
});
