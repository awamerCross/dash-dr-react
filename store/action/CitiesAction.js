
import consts from '../../consts';
import axios from 'axios';
import { ToasterNative } from '../../common/ToasterNative';


export const Get_Cities = 'Get_Cities';

export const Get_Debartmets = 'Get_Departments';


export const getCititis = (lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: `${consts.url}cities`,
            params: { lang }
        }).then((response) => {

            dispatch({ type: Get_Cities, payload: response.data });

        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))
    }
};

export const GetDepartment = (lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: `${consts.url}categories`,
            params: { lang }
        }).then((response) => {

            dispatch({ type: Get_Debartmets, payload: response.data });

        }).catch(err => ToasterNative(err.message, 'danger', 'bottom'))
    }
};