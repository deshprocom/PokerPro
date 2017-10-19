import React, {
    PureComponent
} from 'react';
import {
    Text, Image, View, StyleSheet,
    TouchableOpacity
} from 'react-native';
import I18n from 'react-native-i18n';
import {Images} from '../../Themes';
import {connect} from 'react-redux';


class TabIcon extends PureComponent {

    componentDidMount() {
        setTimeout(() => {
            this.forceUpdate()
        }, 300)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.actionType === 'SWITCH_LANGUAGE') {
            this.forceUpdate()
        }
    }

    render() {
        const {tab, focused} = this.props;
        return (
            <View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image style={this._imageStyle(tab)} source={this._imageTab(tab, focused)}/>
                    <Text style={[this._titleStyle(focused), {
                        fontSize: 10,
                        marginTop: 2
                    }]}>{this._title(tab)}</Text>
                </View>

            </View>
        );

    }

    _title = (tab) => {
        switch (tab) {
            case 'home':
                return I18n.t('home');
            case 'news':
                return I18n.t('home_info');
            case 'rank':
                return I18n.t('home_sort');
            case 'me':
                return I18n.t('mine');
        }

    };

    _titleStyle = (focused) => {
        return focused ? styles.textStyle2 : styles.textStyle;
    };

    _imageTab = (tab, focused) => {
        switch (tab) {
            case 'home':
                return focused ? Images.home2 : Images.home;
            case 'news':
                return focused ? Images.information2 : Images.information;
            case 'rank':
                return focused ? Images.rank2 : Images.rank;
            case 'me':
                return focused ? Images.mine2 : Images.mine;
        }
    };

    _imageStyle = (tab) => {
        switch (tab) {
            case 'home':
                return styles.bgHomeStyle;
            case 'news':
                return styles.bgInformationStyle;
            case 'rank':
                return styles.bgRankStyle2;
            case 'me':
                return styles.bgHomeStyle;
        }
    }
};

const styles = StyleSheet.create({

    textStyle: {
        color: '#AAAAAA'
    },
    textStyle2: {
        color: '#161718'
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
    bgInformationStyle: {
        width: 17,
        height: 23
    },
    bgRankStyle2: {
        height: 25,
        width: 25
    }
});

const bindAction = dispatch => ({});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
});

export default connect(mapStateToProps, bindAction)(TabIcon);