import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Button from 'react-native-smart-button';
import I18n from 'react-native-i18n';
import {RANK_CHECK_TYPE} from '../../actions/ActionTypes';
import {connect} from 'react-redux';
import {getRankPlayer} from '../../actions/RankAction';

import {Metrics, Colors, Images} from '../../Themes';

import RankCheck from './RankCheck';

export default class FiltePage extends Component {
    static propTypes = {
        cancelDrawer: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            adrSelected: 1,
            adrValue: 'global',
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

            <View style={{flexDirection: 'row', paddingLeft: 36, position: 'absolute', bottom: 36}}>
                <TouchableOpacity
                    onPress={() => this._cancelSelect()}
                    style={[{borderColor: Colors._161817, borderRadius: 2, borderWidth: 1}, styles.side_btn]}>
                    <Text style={{fontSize: 15, color: Colors._333}}
                    >{I18n.t('rank_filte_clear')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._sureSendType}
                    style={[{backgroundColor: Colors._161817, marginLeft: 48}, styles.side_btn]}>
                    <Text style={{fontSize: 15, color: Colors.text_choice_btn}}
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
                <TouchableOpacity key="1" style={{marginBottom: 16, marginRight: 13}}
                                  onPress={() => {
                                      this.setState({
                                          adrSelected: 1,
                                          adrValue: 'global'
                                      });
                                  }}>
                    <Image source={adrSelected == 1 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>{I18n.t('rank_filte_global')}</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="2" style={{marginBottom: 16}}
                                  onPress={() => {
                                      this.setState({
                                          adrSelected: 2,
                                          adrValue: 'domestic'
                                      })
                                  }}>
                    <Image source={adrSelected == 2 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>{I18n.t('rank_filte_country')}</Text>
                    </Image>
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
                <TouchableOpacity key="1" style={{marginBottom: 16, marginRight: 13}}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 0,
                                          scoreValue: 'all'
                                      });
                                  }}>
                    <Image source={scoreSelected === 0 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>{I18n.t('all')}</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="2" style={{marginBottom: 16, marginRight: 13}}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 1,
                                          scoreValue: '1-100'
                                      })
                                  }}>
                    <Image source={scoreSelected === 1 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>1-100</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="3" style={{marginBottom: 16}}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 2,
                                          scoreValue: '100-200'
                                      })
                                  }}>
                    <Image source={scoreSelected === 2 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>100-200</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="4" style={{marginBottom: 16, marginRight: 13}}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 3,
                                          scoreValue: '200-300'
                                      })
                                  }}>
                    <Image source={scoreSelected === 3 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>200-300</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="5" style={{marginBottom: 16, marginRight: 13}}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 4,
                                          scoreValue: '300-600'
                                      })
                                  }}>
                    <Image source={scoreSelected === 4 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>300-600</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="6" style={{marginBottom: 16}}
                                  onPress={() => {
                                      this.setState({
                                          scoreSelected: 7,
                                          scoreValue: '600以上'
                                      })
                                  }}>
                    <Image source={scoreSelected == 7 ? Images.Group : Images.Group_em}
                           style={{width: 72, height: 30, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                        <Text>600以上</Text>
                    </Image>
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
    }
});
