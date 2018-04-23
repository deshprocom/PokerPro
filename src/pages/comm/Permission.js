import Permissions from 'react-native-permissions';
import {showToast} from "../../utils/ComonHelper";
import I18n from "react-native-i18n";

export function checkPermission(permissionType, callBack) {
    Permissions.check(permissionType).then(response => {

        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

        if (response === "denied") {
            let message;
            if (permissionType === "photo") {
                message = I18n.t("library_root");
            }
            if (permissionType === "camera") {
                message = I18n.t("camera_root");
            }
            if (permissionType === "microphone") {
                message = I18n.t("microphone_root");
            }
            if (permissionType === "location") {
                message = I18n.t("location_root");
            }
            showToast(message);
        }else{
            callBack(true);
        }

    })
}