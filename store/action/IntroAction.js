import axios from 'axios';
import { Toast } from 'native-base'
import consts from '../../consts';
import { AsyncStorage } from 'react-native';


export const Get_intro = 'Get_intro'

export const IntroService = (lang) => {
    return async dispatch => {
        await axios({
            method: 'GET',
            url: consts.url + 'intros',
            params: { lang }
        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Get_intro, data: res.data })
            }


        })
    }
}