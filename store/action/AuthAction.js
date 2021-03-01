import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base'
import CONST from '../../consts';
import consts from '../../consts';
import { ToasterNative } from '../../common/ToasterNative';
import i18n from '../../locale/i18n';

export const Sign_In = 'Sign_In';
export const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING';
export const login_success = 'login_success'
export const login_failed = 'login_failed';
export const temp_auth = 'temp_auth'
export const Sign_up = 'Sign_up';
export const Activate_Code = 'Activate_Code'
export const logout = 'logout'



export const tempAuth = () => {
    return (dispatch) => {
        dispatch({ type: temp_auth });
    };
};

export const SignIn = (phone, password, device_id, lang, navigation) => {

    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: CONST.url + 'sign-in',
            data: { phone, password, device_id, user_type: 4 },
            params: { lang }
        }).then(res => {

            handelLogin(dispatch, res.data, navigation)

        }).catch(error => console.warn(error));

        dispatch({ type: Sign_In })

    }
}

const handelLogin = (dispatch, data, navigation) => {
    if (!data.success) {
        loginFailed(dispatch, data, navigation)
    } else {
        loginSuccess(dispatch, data, navigation)
    }


};



const loginSuccess = (dispatch, data, navigation) => {
    console.log(data.data.active);

    if (data.data.user_type !== 4) {
        ToasterNative(i18n.t('usertype'), 'danger', 'bottom')

    }
    else if (data.data.active) {


        AsyncStorage.setItem('token', JSON.stringify(data.data.token))
            .then(() => dispatch({ type: login_success, data }));


    }
    else {
        navigation.navigate('ActivateCode', { token: data.data.token, })

    }

};

const loginFailed = (dispatch, error, navigation) => {
    if (!(error.success)) {
        //     navigation.navigate('ActivateCode', {
        //         token: error.data.token,

        //     });
        // }
        dispatch({ type: login_failed, error });
        ToasterNative(error.message, "danger", 'bottom')



    }
};



export const SignUp = (data, navigation) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(async deviceId => {
            await axios({
                url: consts.url + 'sign-up',

                method: 'POST',
                data: {
                    name: data.name,
                    restaurant_name_ar: data.nameAR,
                    restaurant_name_en: data.nameEN,
                    password: data.password,
                    phone: data.phone,
                    email: data.email,
                    commercial_register: data.CommercialRegister,
                    city_id: data.city,
                    category_id: data.department,
                    is_owner: data.isowner,
                    num_of_branches: data.BranchNum,
                    address: data.MyLocation,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    website_url: data.WebUrl,
                    authorization_commercial: data.selecCommerical,
                    available_delivery: data.SelectDelivery,
                    preparing_time_to: data.to,
                    preparing_time_from: data.from,
                    device_id: deviceId,

                    user_type: 4,

                }
                , params: {
                    lang: data.lang,
                }
            }).then(res => {

                if (res.data.success) {

                    dispatch({ type: Sign_up, payload: res.data })
                    navigation.navigate('ActivateCode', { token: res.data.data.token })
                }

                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            })


        })
    }

}

export const ActivationCode = (code, token, lang, navigation) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: consts.url + 'activate',
            data: { code },
            params: { lang },
            headers: {
                Authorization: 'Bearer ' + token,

            }

        }
        ).then(res => {
            if (res.data.success) {
                dispatch({ type: Activate_Code, data: res.data })

            }
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        }
        )


    }

}

export const CheckPhone = (lang, phone, navigation) => {
    return async dispatch => {
        await axios({
            method: 'post',
            url: consts.url + 'forget-password',
            data: { lang, phone }
        }).then(res => {
            if (res.data.success) {

                navigation.navigate('AccConfrm', { token: res.data.data.token })
                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
            else {
                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
        })

    }
}

export const ResendCode = (token, navigation, lang) => {
    return async dispatch => {
        await axios({
            method: 'GET',
            url: consts.url + 'resend-code',
            headers: {
                Authorization: 'Bearer ' + token,
                lang, lang
            }

        }).then(res => {
            if (res.data.success) {

                navigation.navigate('NewPass', { token: token })
                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
            else
                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')


        })
    }
}

export const ResetPassword = (password, token, navigation) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: consts.url + 'reset-password',
            data: { password },
            headers: {
                Authorization: 'Bearer ' + token,

            }
        }).then(res => {
            if (res.data.success) {
                navigation.navigate('Login')
                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
            else {
                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
        })
    }
}

export const Logout = (token) => {


    return async dispatch => {
        await AsyncStorage.getItem('deviceID').then(async deviceId => {

            await axios({
                method: 'POST',
                url: consts.url + 'logout',
                data: { device_id: deviceId },
                headers: {
                    Authorization: 'Bearer ' + token,

                }
            }).then(res => {
                dispatch({ type: logout })


            })
        })

    }
}

export const ValidEmailPhone = (key) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: consts.url + 'check-key-available',
            data: { key },

        }).then(res => {

            dispatch({ type: 'ValidEmailPhone', data: res.data })

            !res.data.success ?
                ToasterNative(res.data.message, "danger", 'bottom')


                : null
        }
        )
    }
}