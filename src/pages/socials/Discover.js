import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity, Platform,
} from 'react-native';
import {Colors, Images, Metrics} from "../../Themes";
import {NavigationBar} from '../../components';
import I18n from "react-native-i18n";

const styles = StyleSheet.create({
    circle: {
        height: Metrics.reallySize(25),
        width: Metrics.reallySize(25)
    },
    location: {
        height: Metrics.reallySize(22),
        width: Metrics.reallySize(18)
    },
    mall: {
        height: Metrics.reallySize(22),
        width: Metrics.reallySize(22)
    },
    crowd: {
        height: Metrics.reallySize(22),
        width: Metrics.reallySize(24)
    }
})

export default class Discover extends PureComponent {

    state = {
        lists: [
            {
                title: I18n.t('social.circle'),
                icon: Images.social.mine_moment,
                ic_style: styles.circle,
                marginTop: 6,
                onPress: () => global.router.toSquare()
            },
            {
                title: I18n.t('social.location_friend'),
                icon: Images.social.address,
                ic_style: styles.location,
                marginTop: 14
            },
            {
                title: I18n.t('mall'),
                icon: Images.social.mall,
                ic_style: styles.mall,
                marginTop: 14,
                onPress: () => global.router.toMallPage()
            },
            {
                title: I18n.t('crowdfunding'),
                icon: Images.social.crowd,
                ic_style: styles.crowd,
                marginTop: 1,
                onPress: () => global.router.toCrowdfunding()

            }
        ]


    }

    render() {
        return <View>
            <NavigationBar
                toolbarStyle={{backgroundColor: Colors._161}}
                title={I18n.t('discover')}
                titleStyle={{color: Colors._FFE}}
            />
            <ScrollView>
                {this.state.lists.map(item => {
                    return this.renderItem(item)
                })}
            </ScrollView>


        </View>
    }

    renderItem = (item) => {
        return <TouchableOpacity
            onPress={() => {
                item.onPress && item.onPress()
            }}
            style={{
                height: Metrics.reallySize(54),
                width: '100%', backgroundColor: 'white',
                flexDirection: 'row', alignItems: 'center',
                marginTop: item.marginTop
            }}>
            <Image
                source={item.icon}
                style={[item.ic_style, {left: 17, position: 'absolute'}]}
            />

            <Text style={{
                fontSize: 16,
                color: Colors.txt_444,
                marginLeft: 58
            }}>{item.title}</Text>

            <View style={{flex: 1}}/>

            <Image
                source={Images.social.right}
                style={{
                    height: Metrics.reallySize(16),
                    width: Metrics.reallySize(10),
                    marginRight: 17
                }}/>


        </TouchableOpacity>
    }
}