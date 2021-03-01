

import consts from '../../consts';
import axios from 'axios';


export const Get_stue_notify = 'Get_stue_notify';

export const GetNotifyStatue = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'post',
            url: `${consts.url}allow-notifications`,
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }
        }).then((response) => {
            console.log("djjdjd" + response.data);
            dispatch({ type: Get_stue_notify, data: response.data });

        }).catch(() => {
            ToasterNative('NetWork Error', 'danger', 'bottom')

        })
    }
};
