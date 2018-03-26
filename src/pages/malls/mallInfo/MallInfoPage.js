import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../../../Themes';
import I18n from 'react-native-i18n';
import {BaseComponent} from '../../../components';
import MallInfoPageTopBar from './MallInfoPageTopBar';
import ProductSpecification from './ProductSpecification';
import ShipAddress from './ShipAddress';
import MallIntroduction from './MallIntroduction';
import MallInfoBottom from './MallInfoBottom';
import ProductSpecificationInfo from './ProductSpecificationInfo';
import {getProductDetail} from '../../../services/MallDao';
import {util,uShareMallInfo} from '../../../utils/ComonHelper';


export default class MallInfoPage extends Component {
    state = {
        specShow: false,
        opacity: 0,
        product: {},
        selectProduct: {},
    };

    componentDidMount() {
        this.container.open();
        const {id} = this.props.params;
        getProductDetail({id: id}, data => {

            this.setState({
                product: data.product
            })
        }, err => {

        })

    }

    topBar = () => {
        return (<View style={[styleM.topBar, {backgroundColor: 'rgba(255,255,255,' + this.state.opacity + ')'}]}>
            <TouchableOpacity
                testID="btn_bar_left"
                style={styleM.popBtn}
                onPress={() => router.pop()}>
                <Image style={styleM.backImg}
                       source={Images.mall_return}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                testID="btn_bar_right"
                style={styleM.popBtn}
                onPress={() => {
                    const{title,icon,description,id} = this.state.product;
                    uShareMallInfo(title, description, icon,id)
                }}>
                <Image style={styleM.imgShare}
                       source={Images.mall_share}/>
            </TouchableOpacity>


        </View>)
    };


    render() {
        const {specShow, product, selectProduct} = this.state;
        return (
            <View style={{flex:1}}>
                <BaseComponent
                    ref={ref => this.container = ref}>

                    <ScrollView
                        onScroll={this._onScroll}
                        scrollEventThrottle={16}>

                        <MallInfoPageTopBar
                            product={product}/>

                        <ProductSpecification
                            selectProduct={selectProduct}
                            showSpecInfo={this.showSpecInfo}
                        />
                        {/*<ShipAddress/>*/}
                        <MallIntroduction
                            product={product}/>
                        <View style={{height: 50}}/>
                    </ScrollView>

                </BaseComponent>
                {this.topBar()}
                <MallInfoBottom
                    showSpecInfo={this.showSpecInfo}/>

                {specShow ? <ProductSpecificationInfo
                        selectProduct={selectProduct}
                        product={product}
                        showSpecInfo={this.showSpecInfo}/> : null}

            </View>

        );
    }

    _onScroll = (event) => {
        let offsetY = Math.abs(event.nativeEvent.contentOffset.y);
        const offsetHeight = 360;

        if (offsetY >= offsetHeight) {
            this.setState({
                opacity: 1
            })
        } else {
            let opacity = offsetY / offsetHeight;
            this.setState({opacity})
        }
    };

    showSpecInfo = (temp) => {

        if (util.isEmpty(temp)) {
            this.setState({
                specShow: !this.state.specShow
            })
        } else
            this.setState({
                specShow: !this.state.specShow,
                selectProduct: temp
            })
    }
}

const styleM = StyleSheet.create({
    topView: {
        backgroundColor: 'rgba(255,255,255,0.98)'
    },
    topBar: {
        height: Metrics.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex:999
    },
    popBtn: {
        height: 44,
        width: 50,
        justifyContent: 'center'
    },
    backImg: {
        width: 23,
        height: 23,
        marginLeft: 15
    },
    imgShare: {
        height: 22,
        width: 23,
        marginRight: 24.8
    },
})