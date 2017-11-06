import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../Themes';
import * as Animatable from 'react-native-animatable';

export default class ProductSpecificationInfo extends PureComponent {
    state = {
        text: "1"
    }

    componentDidMount() {
        console.log(Number(this.state.text))
    }

    tabBlank = () => {
        let tabs = ['2cm', '5cm', '5cm-6cm', '5cm-6cm', '5cm', '2cm'];
        return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 17, marginTop: 16}}>
            {tabs.map(function (item, index) {
                return <TouchableOpacity key={`tab${index}`} style={styleP.tabSearch}>
                    <Text style={styleP.txtTab}>{item}</Text>
                </TouchableOpacity>
            })}
        </View>
    };
    classification = () => {
        let tabs = ['2cm', '5cm', '5cm-6cm', '5cm-6cm', '5cm', '2cm'];
        return <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 17, marginTop: 16}}>
            {tabs.map(function (item, index) {
                return <TouchableOpacity key={`tab${index}`} style={styleP.tabSearch}>
                    <Text style={styleP.txtTab}>{item}</Text>
                </TouchableOpacity>
            })}
        </View>
    };
    buyQuantity = () => {
        const styleCutDisable = {
            backgroundColor: '#FBFAFA'
        };
        const styleCut = {
            backgroundColor: '#F6F5F5'
        };
        return (
            <View style={{marginRight: 29, flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
                <TouchableOpacity
                    style={[styleP.buyTouch, Number(this.state.text) === "1" ? styleCutDisable : styleCut]}
                    onPress={() => {
                        let number = Number(this.state.text)
                        if (number >= 1) {
                            this.setState({
                                text: number - 1
                            })
                        }

                    }}>
                    <Image style={styleP.buyImgCut} source={Images.cut}/>
                </TouchableOpacity>

                <View style={styleP.buyInput}>
                    <Text>1</Text>
                </View>

                <TouchableOpacity
                    style={styleP.buyTouch}
                    onPress={() => {
                        let number = Number(this.state.text)
                        this.setState({
                            text: number + 1
                        })
                    }}>
                    <Image style={styleP.buyImgAdd} source={Images.add}/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {


        return (
            <Animatable.View
                animation={'fadeInUp'}
                style={styleP.page}>
                <View style={styleP.specificationInfo}>

                    <View style={styleP.specificationInfoTop}>
                        <Image style={styleP.specificationInfoTopImg} source={Images.home_bg}/>
                        <View style={styleP.specificationInfoTopM}>
                            <Text style={styleP.specificationInfoTopP}>
                                239.4
                            </Text>
                            <Text style={styleP.specificationInfoTopS}>
                                库存34件
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styleP.closeView}
                        onPress={() => {
                            this.props.showSpecInfo()
                        }}>
                        <Image style={styleP.closeImg} source={Images.close}/>
                    </TouchableOpacity>
                    <View style={styleP.size}>
                        <Text style={[styleP.sizeTxt1, {marginTop: 11}]}>尺寸</Text>
                        {this.tabBlank()}
                    </View>

                    <View style={styleP.colorClass}>
                        <Text style={[styleP.sizeTxt1, {marginTop: 16}]}>颜色分类</Text>
                        {this.classification()}
                    </View>
                    <View style={styleP.buyQuantity}>
                        <Text style={[styleP.sizeTxt1, {marginTop: 20}]}>购买数量</Text>
                        <View style={{flex: 1}}/>
                        {this.buyQuantity()}
                    </View>

                    <View style={styleP.confirmView}>
                        <TouchableOpacity style={styleP.confirm}>
                            <Text style={styleP.confirmTxt}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animatable.View>

        );
    }
}
const styleP = StyleSheet.create({
    page: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100
    },
    specificationInfo: {
        height: '100%',
        marginTop: 160,
        backgroundColor: '#EEEEEE'
    },
    specificationInfoTop: {
        height: 87,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    specificationInfoTopImg: {
        width: 124,
        height: 120,
        marginLeft: 17,
        position: 'absolute',
        top: -49,
        zIndex: 999
    },
    specificationInfoTopM: {
        flexDirection: 'column',
        marginLeft: 158,
        marginTop: 21
    },
    specificationInfoTopP: {
        fontSize: 18,
        color: '#F34A4A'
    },
    specificationInfoTopS: {
        fontSize: 14,
        color: '#333333'
    },
    closeView: {
        width: 25,
        height: 25,
        position: 'absolute',
        top: 10,
        right: 16
    },
    closeImg: {
        width: 18,
        height: 18
    },
    size: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 16
    },
    sizeTxt1: {
        fontSize: 15,
        color: '#444444',
        marginLeft: 17,

    },
    tabSearch: {
        borderRadius: 14,
        height: 28,
        paddingLeft: 17,
        paddingRight: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F5F5',
        marginBottom: 16,
        marginRight: 12
    },
    txtTab: {
        fontSize: 14,
        color: Colors.txt_444
    },
    colorClass: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 20
    },
    buyQuantity: {
        backgroundColor: '#FFFFFF',
        marginTop: 1,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buyTouch: {
        width: 33,
        height: 30,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyImgCut: {
        width: 12,
        height: 2
    },
    buyImgAdd: {
        width: 12,
        height: 12,
    },
    buyInput: {
        width: 38,
        height: 30,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#F6F5F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buyTextInput: {
        fontSize: 15,
        color: '#444444',
    },
    confirmView: {
        marginTop: 1,
        backgroundColor: '#FFFFFF',
    },
    confirm: {
        height: 40,
        marginLeft: 17,
        marginRight: 16,
        backgroundColor: '#F34A4A',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 5
    },
    confirmTxt: {
        fontSize: 18,
        color: '#FFFFFF'
    }
})