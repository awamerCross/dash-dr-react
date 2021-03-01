import axios from 'axios';
import { Toast, } from 'native-base'
import CONST from '../../consts';

export const Get_Notify = 'Get_Notify';
export const Delete_Notification = 'Delete_Notification';


export const GetNotifications = (token, lang) => {

    return async (dispatch) => {

        await axios({
            method: 'GET',
            url: CONST.url + 'notifications',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }
        }).then(res => {
            dispatch({ type: Get_Notify, data: res.data.data })
        }).catch(error => console.warn(error));


    }
}


export const DeleteNotifications = (token, id) => {

    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: CONST.url + 'delete-notification',
            headers: { Authorization: 'Bearer ' + token, },
            data: { id },
        }).then(res => {
            dispatch({ type: Delete_Notification, data: res.data })
        }).catch(error => console.warn(error));


    }
}