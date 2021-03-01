import axios from 'axios';
import consts from '../../consts';
import { Toast } from "native-base";
import { ToasterNative } from '../../common/ToasterNative';


export const Update_provider = 'Update_provider'



export const EditProvider = (token, lang, restaurant_name_ar, restaurant_name_en, latitude, longitude, address, website_url, commercial_register, is_owner, authorization_commercial, available_delivery, num_of_branches, preparing_time_from, preparing_time_to, cover, available, city_id, navigation) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: consts.url + 'update-provider',
            data: { restaurant_name_ar, restaurant_name_en, latitude, longitude, address, website_url, commercial_register, is_owner, authorization_commercial, available_delivery, num_of_branches, preparing_time_from, preparing_time_to, cover, available, city_id },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang },

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('Settings')

                dispatch({ type: Update_provider, data: res.data })

            }
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))

    }

}

