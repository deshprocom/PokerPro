import React from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    Picker,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import BaseComponent from './BaseComponent';
import {PROVINCE_LIST, CITY_LIST, AREA_LIST} from './regionJson';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import I18n from 'react-native-i18n';

const isIos = Platform.OS === 'ios';

export default class ChinaRegionWheelPicker extends BaseComponent {

    constructor(props) {
        super(props);
        this._bind(
            'open',
            'close',
            '_handleProvinceChange',
            '_handleCityChange',
            '_handleAreaChange',
            '_handleSubmit',
            '_handleCancel',
        );
        this.state = {
            isVisible: this.props.isVisible,
            provinces: [],
            citys: [],
            areas: [],
            selectedProvince: this.props.selectedProvince,
            selectedCity: this.props.selectedCity,
            selectedArea: this.props.selectedArea,
            transparent: true,
            provinceObj: {},
            cityObj: {},
            areaObj: {}
        };
    }

    _filterAllProvinces() {
        return PROVINCE_LIST;
    }

    _filterCitys(province) {

        return CITY_LIST.filter(item => item.province_id === province);
    }

    _filterAreas(city) {

        return AREA_LIST.filter(item => item.city_id === city);
    }

    componentDidMount() {
        const {selectedProvince, selectedCity, selectedArea} = this.state;
        const provinces = PROVINCE_LIST;
        const obj = PROVINCE_LIST.filter(item => item.province_id === selectedProvince);
        const cityObj = CITY_LIST.filter(item => item.city_id === selectedCity);
        const areaObj = AREA_LIST.filter(item => item.area_id === selectedArea);

        const citys = this._filterCitys(this.state.selectedProvince);

        const areas = this._filterAreas(this.state.selectedCity);


        this.setState({
            provinces,
            citys,
            areas,
            provinceObj: obj[0],
            cityObj: cityObj[0],
            areaObj: areaObj[0]
        });
    }

    componentWillReceiveProps(props) {
        if (props.isVisible !== this.props.isVisible) {
            if (props.isVisible) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    close() {
        this.setState({isVisible: false});
    }

    open() {
        console.log('openopen');
        this.setState({isVisible: true});
    }

    _handleProvinceChange(province) {
        const obj = PROVINCE_LIST.filter(item => item.province_id === province);
        const citys = this._filterCitys(province);
        const areas = this._filterAreas(citys[0].city_id);
        this.setState({
            selectedProvince: province,
            selectedCity: citys[0].city_id,
            selectedArea: areas[0].area_id,
            citys,
            areas,
            provinceObj: obj[0],
            cityObj: citys[0],
            areaObj: areas[0]
        });
    }

    _handleCityChange(city) {

        const cityObj = CITY_LIST.filter(item => item.city_id === city);
        const areas = this._filterAreas(city);
        this.setState({
            selectedCity: city,
            selectedArea: areas[0].city_id,
            areas,
            cityObj: cityObj[0],
            areaObj: areas[0]
        });
    }

    _handleAreaChange(area) {
        const areaObj = AREA_LIST.filter(item => item.area_id === area);
        this.setState({
            selectedArea: area,
            areaObj: areaObj[0]
        });
    }

    _handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.close();
    }

    _handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                province: this.state.provinceObj,
                city: this.state.cityObj,
                area: this.state.areaObj
            });
        }
        this.close();
    }


    renderPicker() {
        const {navBtnColor} = this.props;
        return (
            <View style={styles.overlayStyle}>
                <View
                    style={[styles.pickerContainer, isIos ? {} : {marginTop: windowHeight - 80 - this.props.androidPickerHeight}]}>
                    <View style={styles.navWrap}>
                        <TouchableOpacity
                            style={styles.navBtn}
                            activeOpacity={0.85}
                            onPress={this._handleCancel}
                        >
                            <Text style={styles.text}>{I18n.t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.navBtn}
                            activeOpacity={0.85}
                            onPress={this._handleSubmit}
                        >
                            <Text style={styles.text}>{I18n.t('alert_sure')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pickerWrap}>

                        <Picker
                            style={styles.pickerItem}
                            onValueChange={this._handleProvinceChange}
                            selectedValue={this.state.selectedProvince}
                        >
                            {this.state.provinces.map((province, index) => {
                                return (
                                    <Picker.Item value={province.province_id} label={province.name} key={index}/>
                                );
                            })}
                        </Picker>

                        <Picker
                            style={styles.pickerItem}
                            onValueChange={this._handleCityChange}
                            selectedValue={this.state.selectedCity}
                        >
                            {this.state.citys.map((city, index) => {
                                return (
                                    <Picker.Item value={city.city_id} label={city.name} key={index}/>
                                );
                            })}
                        </Picker>

                        {
                            this.props.isShowArea &&

                            <Picker
                                style={styles.pickerItem}
                                onValueChange={this._handleAreaChange}
                                selectedValue={this.state.selectedArea}
                            >
                                {this.state.areas.map((area, index) => {
                                    return (
                                        <Picker.Item value={area.area_id} label={area.name} key={index}/>
                                    );
                                })}
                            </Picker>
                        }

                    </View>
                </View>
            </View>
        );
    }

    render() {
        const modal = (
            <Modal
                transparent={this.state.transparent}
                visible={this.state.isVisible}
                onRequestClose={this.close}
                animationType={this.props.animationType}
            >
                {this.renderPicker()}
            </Modal>
        );

        return (
            <View>
                {modal}
                <TouchableOpacity onPress={this.open}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}
ChinaRegionWheelPicker.propTypes = {
    isVisible: PropTypes.bool,
    isShowArea: PropTypes.bool,
    selectedProvince: PropTypes.string,
    selectedCity: PropTypes.string,
    selectedArea: PropTypes.string,
    navBtnColor: PropTypes.string,
    animationType: PropTypes.string,
    transparent: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    androidPickerHeight: PropTypes.number,
};

ChinaRegionWheelPicker.defaultProps = {
    isVisible: false,
    isShowArea: true,
    selectedProvince: '440000',
    selectedCity: '440300',
    selectedArea: '440304',
    navBtnColor: 'blue',
    animationType: 'slide',
    transparent: true,
    onSubmit: () => {
    },
    onCancel: () => {
    },
    androidPickerHeight: 50
};

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        left: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    pickerContainer: {
        flex: 1,
        marginTop: windowHeight * 3 / 5,
        backgroundColor: '#FFF'
    },
    navWrap: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#ccc'
    },
    navBtn: {
        paddingVertical: 5,
        paddingHorizontal: 20,

    },
    text: {
        fontSize: 18,
    },
    pickerWrap: {
        flexDirection: 'row'
    },
    pickerItem: {
        flex: 1
    }
});
