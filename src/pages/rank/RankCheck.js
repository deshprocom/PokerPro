import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import I18n from 'react-native-i18n';

import {Colors, Images} from '../../Themes';

class RankCheck extends Component {


    constructor(props) {
        super(props);
        this.state = {
            check: false,
            itemArr: [],
            name: '',
            allSelect: true
        }
    }

    componentWillMount(checkData) {
        let length = this.props.checkData.length;
        let arr = [];
        for (let i = 0; i < length; i++) {
            let data = this.props.checkData[i];
            let item = {index: i, infoData: data, select: false, info: ''};
            arr.push(item);
        }

        this.setState({
            itemArr: arr,
        });
    }

    selectedBtn = (key) => {
        const {allSelect} = this.state;
        if (allSelect) {
            this.allSelected();
        }
        let arr = this.state.itemArr;

        if (arr[key].index == key) {
            arr[key].select = !arr[key].select;
            this.setState({
                itemArr: arr
            });
        }

        let selectArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].select) {
                selectArr.push(i)
            }
        }
        let selectLength = selectArr.length;
        let selectNum = selectArr[1] - selectArr[0];
        if (selectLength == 2 && selectNum > 1) {
            let start = selectArr[0] + 1;
            let end = selectArr[1];
            for (let i = start; i < end; i++) {
                arr[i].select = !arr[i].select;
                this.setState({
                    itemArr: arr
                })
            }
        }

        if (selectLength > 2) {
            for (let i = 0; i < selectLength; i++) {
                if (selectArr[i] == key) {
                    // arr[key].select = true;
                } else {
                    arr[selectArr[i]].select = false;
                }
            }
            arr[key].select = true;
            this.setState({
                itemArr: arr
            })
        }


    };

    cancelBtn = () => {
        let arr = this.state.itemArr;
        let arrClear = [];
        for (let i = 0; i < arr.length; i++) {
            let infoData = this.props.checkData[i];
            let item = {index: i, infoData: infoData, select: false, info: ''};
            arrClear.push(item);
        }

        this.setState({
            itemArr: arrClear,
            allSelect: true
        });
    };

    sureBtn = () => {
        let arr = this.state.itemArr;
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].info) {
                newArr.push(arr[i].info);
            }
        }
        ;
        return newArr;
    };

    allSelected = () => {
        const {allSelect} = this.state;
        this.setState({
            allSelect: !allSelect
        });
        let arr = this.state.itemArr;
        for (let i = 0; i < arr.length; i++) {
            arr[i].select = false
        }
        this.setState({
            itemArr: arr
        })
    };

    lineView = (checkData) => {
        if (this.props.checkData.length == 0) {
            return (
                <View
                    style={{height: 1, backgroundColor: Colors.bg_f5, marginTop: 5, marginBottom: 20, width: 0}}/>
            )
        } else if (this.props.checkData.length == 1) {
            return (
                <View style={{
                    height: 1,
                    backgroundColor: Colors.bg_f5,
                    marginTop: 5,
                    marginBottom: 20,
                    width: 72
                }}/>
            )
        } else if (this.props.checkData.length == 2) {
            return (
                <View style={{
                    height: 1,
                    backgroundColor: Colors.bg_f5,
                    marginTop: 5,
                    marginBottom: 20,
                    width: 155
                }}/>
            )
        } else {
            return (
                <View style={{
                    height: 1,
                    backgroundColor: Colors.bg_f5,
                    marginTop: 5,
                    marginBottom: 20,
                    width: 239
                }}/>
            )
        }
    };

    choiceBtn = (checkData) => {
        let arr = this.state.itemArr;
        const {allSelect} = this.state;
        return (<View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            <TouchableOpacity onPress={() => {
                this.allSelected()
            }}
                              style={styles.btn_style}>
                <Image source={allSelect ? Images.Group : Images.Group_em}
                       style={{
                           width: 72,
                           height: 30
                       }}/>

                <Text style={styles.txt_select}>{I18n.t('all')}</Text>
            </TouchableOpacity>
            {
                this.props.checkData.map((item, key) => {
                    let is_select = null;
                    if (arr[key].index == key) {
                        is_select = arr[key].select;
                    }
                    if (arr[key].select) {
                        arr[key].info = arr[key].infoData;
                    } else {
                        arr[key].info = '';
                    }

                    return (
                        <TouchableOpacity key={key} onPress={() => {
                            {
                                this.selectedBtn(key);
                            }
                        }}
                                          style={styles.btn_style}>
                            <Image source={is_select ? Images.Group : Images.Group_em}
                                   style={{
                                       width: 72,
                                       height: 30,
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                       backgroundColor: 'transparent'
                                   }}/>

                            <Text style={styles.txt_select}>{item}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>);

    };

    render() {
        return (<View>
            <Text style={{lineHeight: 21, fontSize: 15, color: Colors._888}}
                  onPress={() => this.sureBtn()}>{this.props.checkTitle}</Text>
            {this.lineView()}
            {this.choiceBtn()}
        </View>)
    }
}

export default RankCheck;

const styles = StyleSheet.create({
    btn_style: {
        width: 72,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginRight: 13
    },
    txt_select: {
        position: 'absolute'
    }
});
