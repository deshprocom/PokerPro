import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import {reallySize} from "./Header";
import {Images} from "../../Themes";
import I18n from "react-native-i18n";

export default class ImageView extends Component {
    static props = {
        insertImage: null,//插入图片
        insertTakePhoto: null,//拍照
        insertText: null,//插入文字
        edit: null,//编辑
        editState: false,//编辑状态
        visitLocation: null,//选择位置
        address: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.subView, {justifyContent: "space-between"}]}>
                    <View style={{flexDirection: "row"}}>

                        <TouchableOpacity onPress={() => {
                            if (this.props.insertText === null) return;
                            this.props.insertText();
                        }}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{I18n.t('socials_content')}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (this.props.insertImage === null) return;
                            this.props.insertImage();
                        }}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{I18n.t('socials_picture')}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (this.props.insertTakePhoto === null) return;
                            this.props.insertTakePhoto();
                        }}>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{I18n.t('socials_takephoto')}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <TouchableOpacity onPress={() => {
                        if (this.props.edit === null) return;
                        this.props.edit();
                    }}>
                        <View style={[styles.textView, {marginRight: reallySize(18)}]}>
                            {!this.props.editState ? <Text style={styles.text}>{I18n.t('socials_edit')}</Text> :
                                <Text style={styles.text}>{I18n.t('socials_finsh')}</Text>}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subView}>
                    <TouchableOpacity onPress={() => {
                        if (this.props.visitLocation === null) return;
                        this.props.visitLocation();
                    }}>
                        <View style={[{flexDirection: "row", alignItems: 'center'}]}>
                            <Image source={Images.social.address} style={[{width: 19}, {height: 22}]}/>
                            <Text
                                style={[{color: "#AAAAAA"}, {fontSize: 14}, {marginLeft: 5}, {marginRight: 17}]}>{this.props.address}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: reallySize(100),

    },
    subView: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        width: reallySize(375),
        paddingLeft: reallySize(18),
    },
    textView: {
        backgroundColor: "#4A90E2",
        height: reallySize(28),
        borderRadius: reallySize(14),
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    text: {
        color: "white",
        paddingLeft: reallySize(10),
        paddingRight: reallySize(10),
    }
});