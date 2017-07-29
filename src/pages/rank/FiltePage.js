import React,{Component, PropTypes} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Button from 'react-native-smart-button';
import I18n from 'react-native-i18n';
import {RANK_CHECK_TYPE} from '../../actions/ActionTypes';
import {connect} from 'react-redux';
import {getRankPlayer} from '../../actions/RankAction';

import {Metrics, Colors, Images} from '../../Themes';

import RankCheck from './RankCheck';

class FiltePage extends Component {
    static propTypes = {
        cancelDrawer: PropTypes.func
    };

    constructor(props){
        super(props);
        this.state = {
            adrSelected: 0,
            adrValue: 'global',
            scoreSelected: 0,
            scoreValue: 'all',
            typeData: []
        }
    }

    componentWillReceiveProps(newProps){
        const {actionType, typeData, loading, hasData, error} = newProps;

        if(actionType === RANK_CHECK_TYPE
            && loading != this.props.loading
            && hasData){
            const {} = typeData;

        }
    }

    _cancelSelect = () => {
        this.setState({
            adrSelected: 0,
            scoreSelected: 0
        });
        this.checkDay.cancelBtn();
    };

    _sureSendType =() => {
        const {adrValue, scoreValue, typeData} = this.state;
        let adr = this.state.adrValue;
        let time = this.checkDay.sureBtn();
        let score = this.state.scoreValue;
        // let typeArr = [adr,time,score];
        // router.log(typeArr);
        let body = {
            region: adr,
            year: time
        };
        this.props.cancelDrawer();
        this.props._getRankPlayer(body);

    };

    render(){
        // console.log('receive',this.props)
        return(<View style={styles.view_bg}>
            <ScrollView style={{marginTop: 41,paddingRight: 20, paddingLeft: 36}}>
                {this.adrCheck()}
                <RankCheck ref={ref => this.checkDay = ref}
                           checkTitle={I18n.t('rank_filte_year')} checkData={['2014','2015','2016','2017']}/>
                {this.scoreCheck()}
            </ScrollView>

            <View style={{flexDirection: 'row',paddingLeft: 36,position: 'absolute', bottom: 36}}>
                <TouchableOpacity style={[{borderColor: Colors._161817,borderRadius: 2,borderWidth: 1},styles.side_btn]}>
                    <Text style={{fontSize: 15,color: Colors._333}}
                        onPress={() => this._cancelSelect()}>{I18n.t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{backgroundColor: Colors._161817,marginLeft: 48},styles.side_btn]}>
                    <Text style={{fontSize: 15,color: Colors.text_choice_btn}}
                          onPress={() => this._sureSendType()}>{I18n.t('alert_sure')}</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }

    adrCheck = () => {
        const {adrSelected, adrValue} = this.state;
        return(<View>
            <Text style={{lineHeight: 21,fontSize: 15,color: Colors._888}}>{I18n.t('rank_filte_adr')}</Text>
            <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 155}}></View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
                <TouchableOpacity key="1" style={{marginBottom: 16,marginRight: 13}}
                    onPress={() => {
                        this.setState({
                            adrSelected: 1,
                            adrValue: 'global'
                        });
                    }}>
                    <Image source={adrSelected==1 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
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
                    <Image source={adrSelected==2 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>{I18n.t('rank_filte_country')}</Text>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>)
    };

    scoreCheck = () => {
        const {scoreSelected, scoreValue} = this.state;
        return(<View>
            <Text style={{lineHeight: 21,fontSize: 15,color: Colors._888}}>{I18n.t('rank_filte_adr')}</Text>
            <View style={{height:1,backgroundColor: Colors.bg_f5,marginTop: 5,marginBottom: 20,width: 239}}></View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'flex-start'}}>
                <TouchableOpacity key="1" style={{marginBottom: 16,marginRight: 13}}
                                  onPress={() => {
                        this.setState({
                            scoreSelected: 1,
                            scoreValue: 'all'
                        });
                    }}>
                    <Image source={scoreSelected==1 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>{I18n.t('all')}</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="2" style={{marginBottom: 16,marginRight: 13}}
                                  onPress={() => {
                        this.setState({
                            scoreSelected: 2,
                            scoreValue: '1-100'
                        })
                    }}>
                    <Image source={scoreSelected==2 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>1-100</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="3" style={{marginBottom: 16}}
                                  onPress={() => {
                        this.setState({
                            scoreSelected: 3,
                            scoreValue: '100-200'
                        })
                    }}>
                    <Image source={scoreSelected==3 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>100-200</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="4" style={{marginBottom: 16,marginRight: 13}}
                                  onPress={() => {
                        this.setState({
                            scoreSelected: 4,
                            scoreValue: '200-300'
                        })
                    }}>
                    <Image source={scoreSelected==4 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>200-300</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="5" style={{marginBottom: 16,marginRight: 13}}
                                  onPress={() => {
                        this.setState({
                            scoreSelected: 5,
                            scoreValue: '300-600'
                        })
                    }}>
                    <Image source={scoreSelected==5 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>300-600</Text>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity key="6" style={{marginBottom: 16}}
                                  onPress={() => {
                        this.setState({
                            scoreSelected: 6,
                            scoreValue: '600以上'
                        })
                    }}>
                    <Image source={scoreSelected==6 ? Images.Group : Images.Group_em}
                           style={{width: 72,height: 30,alignItems: 'center',justifyContent: 'center'}}>
                        <Text>600以上</Text>
                    </Image>
                </TouchableOpacity>
            </View>
        </View>)
    }
}

const bindAction = dispatch => ({
    _getRankPlayer: (body) => dispatch(getRankPlayer(body))
});

const mapStateToProps = state => ({
    loading: state.RankState.loading,
    hasData: state.RankState.hasData,
    error: state.RankState.error,
    typeData: state.RankState.typeData
});

export default connect(mapStateToProps, bindAction)(FiltePage);

const styles = StyleSheet.create({
    view_bg: {
        backgroundColor: Colors.white,
        height: Metrics.screenHeight,
    },
    side_btn: {
        height:30,
        width: 96,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
