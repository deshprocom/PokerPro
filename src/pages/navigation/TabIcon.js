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
                return I18n.t('hot');
            case 'rank':
                return I18n.t('crowdfunding');
            case 'me':
                return I18n.t('mine');
            case 'mall':
                return I18n.t('discover');
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
            case 'mall':
                return focused ? Images.nav_malled : Images.nav_mall
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
            case 'mall':
                return styles.discover;
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
    discover: {
        height: 24,
        width: 22
    },
    bgInformationStyle: {
        width: 21,
        height: 24
    },
    bgRankStyle2: {
        height: 23,
        width: 26
    },
    bgHomeStyle: {
        height: 24,
        width: 24
    },
});

const bindAction = dispatch => ({});

const mapStateToProps = state => ({

    actionType: state.AccountState.actionType,
});

export default connect(mapStateToProps, bindAction)(TabIcon);