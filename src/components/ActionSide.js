/**
 * Created by lorne on 2017/6/5.
 */
import React, {Component} from 'react'
import {
    Text, View, StyleSheet, Dimensions, Image,
    Modal, TouchableOpacity, Animated, ScrollView,
    FlatList
} from 'react-native';
import I18n from 'react-native-i18n';
import {Colors, Fonts, Images, ApplicationStyles, Metrics} from '../Themes';

export default class ActionSide extends Component {

    constructor(props) {
        super(props);
        this.translateY = 268;
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY),
            data: [],
            selectData: {}
        };
    }

    setData = (data) => {
        data.map(function (x) {
            x['select'] = false;
        });
        this.setState({
            data: data
        })
    };

    show() {
        this.setState({visible: true});
        this._showSheet();
    };

    _showSheet() {
        Animated.timing(this.state.sheetAnim, {
            toValue: 0,
            duration: 250
        }).start()
    };


    render() {
        const {visible, sheetAnim, data} = this.state;

        return (<Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={this._cancel}>
            <View style={styles.wrapper}>
                <Text style={styles.overlay}
                      onPress={this._cancel}></Text>
                <Animated.View
                    style={[styles.page ,
                    {height: this.translateY, transform: [{translateY: sheetAnim}]}]}
                >
                    {this._topBar()}
                    <View style={styles.line}/>
                    <FlatList
                        data={data}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />


                </Animated.View>

            </View>
        </Modal>)
    }


    _keyExtractor = (item) => {
        return item.race_id;
    };
    _renderItem = ({item}) => {
        const {name, select} = item;

        return (<TouchableOpacity
            onPress={()=>this._pressItem(item)}
            style={styles.viewItem}>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={1}
                    style={styles.txtName}>{name}</Text>

                <Image
                    source={select?Images.side_selected:Images.side_select}
                    style={styles.imgSelect}/>

            </View>

            <View style={styles.line}/>
        </TouchableOpacity>)
    };

    _pressItem = (item) => {

        this.setState((state) => {
            const newData = [...state.data];
            newData.map(function (x) {
                if (item.race_id === x.race_id) {
                    x.select = !item.select;
                } else
                    x.select = false;
                return x;
            });

            return {
                data: newData,
                selectData: item
            }
        })
    };

    _topBar = () => {
        return ( <View style={styles.topBar}>
            <TouchableOpacity
                onPress={this._cancel}
                style={styles.btn}>
                <Text style={styles.btnTxt}
                >{I18n.t('cancel')}</Text>
            </TouchableOpacity>


            <View style={{flex:1}}/>

            <TouchableOpacity
                onPress={()=>{
                    this._cancel();
                    if(this.props.getSubTicket){
                        this.props.getSubTicket(this.state.selectData)
                    }
                }}
                style={styles.btn}>
                <Text style={styles.btnTxt}
                >{I18n.t('certain')}</Text>
            </TouchableOpacity>

        </View>)
    };

    _cancel = () => {
        this._hideSheet(
            () => {
                this.setState({visible: false});
            }
        );

    };

    _hideSheet(callback) {
        Animated.timing(this.state.sheetAnim, {
            toValue: this.translateY,
            duration: 150
        }).start(callback || function () {
            })
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    page: {
        backgroundColor: 'white',
    },
    overlay: {
        flex: 1
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,

    },
    btnTxt: {
        fontSize: 16,
        color: '#444444'
    },
    btn: {
        height: 56,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewItem: {
        height: 48,
    },
    txtName: {
        fontSize: 16,
        color: '#444444',
        fontWeight: 'bold',
        alignContent: 'center'
    },
    line: {
        height: 0.5,
        backgroundColor: '#EEEEEE',
        marginLeft: 22,
        marginRight: 18
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 22,
        marginRight: 18,
        justifyContent: 'space-between'
    },
    imgSelect: {
        width: 17,
        height: 17
    }
});
