import consts from "../../consts";
import { Toast } from "native-base";
import axios from 'axios';

export const Get_sizes = 'Get_sizes';


export const GetSizes = (token, lang) => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: consts.url + 'sizes',
            headers: { Authorization: 'Bearer ' + token },
            params: lang
        }).then(res => {

            dispatch({ type: Get_sizes, data: res.data })


        }).catch(err => {
            console.log('err', err);
        });


    }
}
