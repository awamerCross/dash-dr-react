import axios from 'axios';
import consts from '../../consts';
import { Toast, } from "native-base";
import { ToasterNative } from '../../common/ToasterNative';

export const GetMenue = 'Get_menue';
export const Add_menue = 'Add_menue';
export const Update_Menue = 'Update_Menue';
export const Delete_menue = 'Delete_menue'
export const Search_menue = 'Search_menue';



export const MenueInfo = (lang, token) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'menus',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: GetMenue, data: res.data })
            }
        }).catch(err => console.warn(err))

    }
}

export const AddMenue = (token, lang, nameAr, nameEn,) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: consts.url + 'add-menu',
            data: { name_ar: nameAr, name_en: nameEn },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang, }

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Add_menue, data: res.data })
            }
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')


        }).catch(err => console.warn(err))

    }

}

export const UpdateMenue = (token, lang, nameAr, nameEn, id) => {
    return async (dispatch) => {
        await axios({
            method: 'PUT',
            url: consts.url + 'update-menu',
            data: { name_ar: nameAr, name_en: nameEn, id },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang, }

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Update_Menue, data: res.data })
            }
            ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

        }).catch(err => console.warn(err))

    }
}

export const DeleteMenue = (token, id, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: consts.url + 'delete-menu',
            data: { id },
            params: { lang, },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(res => {
            if (res.data.success) {

                ToasterNative(res.data.message, res.data.success ? "success" : "danger", 'bottom')

            }
        }).catch(err => console.warn(err))



    }
}

export const SearchMenue = (token, word, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: consts.url + 'search-menu',
            data: { word },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Search_menue, data: res.data })
        }).catch(err => console.warn(err))

    }
}