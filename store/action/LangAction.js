import { I18nManager, AsyncStorage } from "react-native";
import * as Updates from 'expo-updates';
import i18n from '../../locale/i18n'

export const chooseLang = "choose_Lang";

export const changeLanguage = (lang, direction,) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.setItem("lang", lang, () =>
                AsyncStorage.setItem("direction", direction)
            );

            await AsyncStorage.getItem("direction", (err, res) => {
                if (res === "RTL") {
                    I18nManager.forceRTL(true);
                } else {
                    I18nManager.forceRTL(false);

                }
            });

            i18n.locale = lang;

            dispatch({
                type: chooseLang,
                lang,
            }).then(await Updates.reloadAsync());
        } catch (e) {
            console.log("chang lang err", e);
        }
    };
};
