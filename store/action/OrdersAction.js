import consts from "../../consts";
import axios from 'axios';
import { Toast } from "native-base";
import i18n from '../../locale/i18n'
import { ToasterNative } from "../../common/ToasterNative";



export const Get_OrderS = 'Get_OrderS';
export const Get_Order_Detailes = 'Get_Order_Detailes'
export const Enable_Loader = 'Enable_Loader'
export const Disable_Loader = 'Disable_Loader'


export const GetOrders = (token, status, lang, text) => {
    return async (dispatch) => {
        dispatch({ type: Enable_Loader })
        await axios({
            method: 'POST',
            url: consts.url + 'provider-orders',
            data: { status, text },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_OrderS, data: res.data })
            dispatch({ type: Disable_Loader })
        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))
    }
}



export const Order_Detailes = (token, id, lang) => {
    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: consts.url + 'provider-orders-details',
            data: { id },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_Order_Detailes, data: res.data.data })

        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))


    }
}


export const CancelOrders = (token, id,) => {
    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: consts.url + 'cancel-order',
            data: { id },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(res => {

            Toast.show({
                text: res.data.message,
                type: res.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    textAlign: 'center'
                }
            });

        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))


    }
}


export const ConfirmOrders = (token, id,) => {
    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: consts.url + 'provider-update-order',
            data: { id, },
            headers: { Authorization: 'Bearer ' + token, },


        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))

    }
}