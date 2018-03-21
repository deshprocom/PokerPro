import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import I18n from 'react-native-i18n';

import {Metrics, Colors, Images} from '../../Themes';

import RankCheck from './RankCheck';

export default class FiltePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            adrSelected: language === 'zh' ? 2 : 1,
            adrValue: language === 'zh' ? 'domestic' : 'global',
            scoreSelected: 0,
            scoreValue: 'all'
        }
    }


    _cancelSelect = () => {
        this.setState({
            adrSelected: 1,
            scoreSelected: 0,
        });
        this.checkDay.cancelBtn();
    };


    _sureSendType = () => {
        const {adrValue, scoreSelected} = this.state;
        let time = this.checkDay.sureBtn();
        let begin_year = '';
        let end_year = '';
        if (time && time.length) {
            begin_year = time[0];
            end_year = time[time.length - 1]

        }

        let body = {
            region: adrValue,
            end_year: end_year,
            begin_year: begin_year,
            page_size: 100,
            page_index: scoreSelected === 0 ? 0 : scoreSelected - 1
        };

        this.props.cancelDrawer(body);


    };

    render() {
        return (<View style={styles.view_bg}>
            <ScrollView style={{marginTop: 41, paddingRight: 20, paddingLeft: 36}}>
                {this.adrCheck()}
                <RankCheck ref={ref => this.checkDay = ref}
                           checkTitle={I18n.t('rank_filte_year')} checkData={['2014', '2015', '2016', '2017']}/>
                {this.scoreCheck()}
            </ScrollView>

            <View style={{flexDirection: 'row', paddingLeft: 36, position: 'absolute', bottom: 70}}>
                <TouchableOpacity
                    onPress={() => this._cancelSelect()}
                    style={[{borderColor: Colors._161817, borderRadius: 2, borderWidth: 1}, styles.side_btn]}>
                    <Text style={{fontSize: 15, color: Colors._333}}
                    >{I18n.t('rank_filte_clear')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._sureSendType}
                    style={[{backgroundColor: Colors._161817, marginLeft: 48, borderRadius: 2}, styles.side_btn]}>
                    <Text style={{fontSize: 15, color: Colors._FFE}}
                    >{I18n.t('alert_sure')}</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }

    adrCheck = () => {
        const {adrSelected, adrValue} = this.state;
        return (<View>
            <Text style={{lineHeight: 21, fontSize: 15, color: Colors._888}}>{I18n.t('rank_filte_adr')}</Text>
            <View style={{height: 1, backgroundColor: Colors.bg_f5, marginTop: 5, marginBottom: 20, width: 155}}></View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                <TouchableOpacity key="1" style={[styles.btn_select, {marginBottom: 16, marginRight: 13}]}
                                  onPress={() => {
                                      this.setState({
                                          adrSelected: 1,
                                          adrValue: 'global'
                                      });
                                  }}>
                    <Image source={adrSelected == 1 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>{I18n.t('rank_filte_global')}</Text>
                </TouchableOpacity>
                <TouchableOpacity key="2" style={[styles.btn_select, {marginBottom: 16}]}
                                  onPress={() => {
                                      this.setState({
                                          adrSelected: 2,
                                          adrValue: 'domestic'
                                      })
                                  }}>
                    <Image source={adrSelected == 2 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>{I18n.t('rank_filte_country')}</Text>
                </TouchableOpacity>
            </View>
        </View>)
    };

    scoreCheck = () => {
        const {scoreSelected, scoreValue} = this.state;
        return (<View>
            <Text style={{lineHeight: 21, fontSize: 15, color: Colors._888}}>{I18n.t('rank_filte_rank')}</Text>
            <View style={{height: 1, backgroundColor: Colors.bg_f5, marginTop: 5, marginBottom: 20, width: 239}}></View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                <TouchableOpacity key="1" style={[styles.btn_select, {marginBottom: 16, marginRight: 13}]}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 0,
                                          scoreValue: 'all'
                                      });
                                  }}>
                    <Image source={scoreSelected === 0 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>{I18n.t('all')}</Text>
                </TouchableOpacity>
                <TouchableOpacity key="2"
                                  style={[styles.btn_select, {marginBottom: 16, marginRight: 13}]}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 1,
                                          scoreValue: '1-100'
                                      })
                                  }}>
                    <Image source={scoreSelected === 1 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>1-100</Text>
                </TouchableOpacity>
                <TouchableOpacity key="3"
                                  style={[styles.btn_select, {marginBottom: 16}]}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 2,
                                          scoreValue: '100-200'
                                      })
                                  }}>
                    <Image source={scoreSelected === 2 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>100-200</Text>
                </TouchableOpacity>
                <TouchableOpacity key="4"
                                  style={[styles.btn_select, {marginBottom: 16, marginRight: 13}]}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 3,
                                          scoreValue: '200-300'
                                      })
                                  }}>
                    <Image source={scoreSelected === 3 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>
                    <Text style={styles.txt_select}>200-300</Text>
                </TouchableOpacity>
                <TouchableOpacity key="5"
                                  style={[styles.btn_select, {marginBottom: 16, marginRight: 13}]}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 4,
                                          scoreValue: '300-600'
                                      })
                                  }}>
                    <Image source={scoreSelected === 4 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>300-600</Text>
                </TouchableOpacity>
                <TouchableOpacity key="6"
                                  style={[styles.btn_select, {marginBottom: 16}]}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 7,
                                          scoreValue: '600以上'
                                      })
                                  }}>
                    <Image source={scoreSelected == 7 ? Images.Group : Images.Group_em}
                           style={styles.img_select}/>

                    <Text style={styles.txt_select}>600以上</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }
}


const styles = StyleSheet.create({
    view_bg: {
        backgroundColor: Colors.white,
        height: Metrics.screenHeight,
    },
    side_btn: {
        height: 30,
        width: 96,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_select: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_select: {
        width: 72,
        height: 30,
    },
    txt_select: {
        position: 'absolute'
    }
});
