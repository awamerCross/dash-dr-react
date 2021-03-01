import consts from "../../consts";
import axios from 'axios';
import { ToasterNative } from "../../common/ToasterNative";


export const Get_RePorts = 'Get_RePorts';
export const Get_Extra_Reborts = 'Get_Extra_Reborts'

export const GetQuickReborts = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'quick-reports',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_RePorts, data: res.data })
        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))


    }
}


export const GetHomeProducts = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'provider-home',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_Extra_Reborts, data: res.data })
        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))


    }
}



export const NotificationCount = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'notification-count',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: 'NotificationCount', data: res.data })
        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))


    }
}



