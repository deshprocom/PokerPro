/**
 * Created by lorne on 2017/6/5.
 */
import React, {Component, PropTypes} from 'react'
import {
    Text, View, StyleSheet, Dimensions, Button,
    Modal, TouchableOpacity, Animated, ScrollView,
    FlatList
} from 'react-native';
import I18n from 'react-native-i18n';

export default class ActionSide extends Component {

    constructor(props) {
        super(props);
        this.translateY = 268;
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY),
            data: []
        };
    }

    setData = (data) => {
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
                <Text style={styles.overlay} onPress={this._cancel}></Text>
                <Animated.View
                    style={[styles.page ,
                    {height: this.translateY, transform: [{translateY: sheetAnim}]}]}
                >
                    {this._topBar()}

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
        const {name} = item;
        return (<View style={styles.viewItem}>
            <Text style={styles.txtName}>{name}</Text>

        </View>)
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

            <TouchableOpacity style={styles.btn}>
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
        height: 50,
    },
    btnTxt: {
        fontSize: 16,
        color: '#444444'
    },
    btn: {
        height: 50,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewItem: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtName: {
        fontSize: 20,
        color: '#161718',
        fontWeight: 'bold',
    }
});
