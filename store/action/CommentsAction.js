import consts from '../../consts';
import axios from 'axios';
import { Toast } from "native-base";

export const Get_Ratings = 'Get_Ratings';
export const Get_Wallet = 'Get_Wallet';
export const Get_MyBankes = 'Get_MyBankes';
export const Send_Transfer = 'Send_Transfer'
export const Get_Manage_account = 'Get_Manage_account';

export const GetRatings = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}provider-comments`,
            headers: { Authorization: 'Bearer ' + token },
            params: { lang }
        }).then((response) => {

            dispatch({ type: Get_Ratings, data: response.data });

        }).catch(err => {
            console.log('err', err);
        });
    }
}


export const GetWallet = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: `${consts.url}wallet`,
            headers: { Authorization: 'Bearer ' + token },
            params: { lang }
        }).then((response) => {

            dispatch({ type: Get_Wallet, data: response.data.data });

        }).catch(err => {
            console.log('err', err);
        });
    }
}

export const GetAccountBanks = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: `${consts.url}banks`,
            headers: { Authorization: 'Bearer ' + token },
            params: { lang }
        }).then((response) => {
            dispatch({ type: Get_MyBankes, data: response.data });
        }).catch(err => {
            console.log('err', err);
        });
    }
}

export const SendTransferFromACc = (token, lang, AccountId, base64, Bankname, accountNAme, accountnum, money, navigation) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}send-transfer`,
            headers: { Authorization: 'Bearer ' + token },
            data: { image: base64, bank_name: Bankname, account_name: accountNAme, account_number: accountnum, total: money, bank_id: AccountId },
            params: { lang }
        }).then((response) => {
            if (response.data.success) {
                navigation.navigate('Wallet')
                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }
                });
            }
            else {
                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }
                });
            }
        }).catch(err => {
            console.log('err', err);
        });
    }
}

export const Withdrawwallet = (token, account_number, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}withdraw-wallet`,
            headers: { Authorization: 'Bearer ' + token },
            data: { account_number },
            params: { lang }
        }).then((response) => {

            Toast.show({
                text: response.data.message,
                type: response.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    textAlign: 'center'
                }


            });

            if (response.data.success) {
                navigation.navigate('Wallet')
                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    position: 'top',
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }


                });
            }
            else {
                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }


                });
            }


        }).catch(err => {
            console.log('err', err);
        });
    }
}


export const SendComplaiment = (token, name, email, message, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}contact-us`,
            headers: { Authorization: 'Bearer ' + token },
            data: { name, email, message, },
            params: { lang }

        }).then((response) => {
            if (response.data.success) {
                Toast.show({
                    text: response.data.message,
                    type: "success",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }
                });
            }
            else {
                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }
                });
            }
        }).catch(err => {
            console.log('err', err);
        });
    }
}

export const ManageAcoounts = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}settlement`,
            headers: { Authorization: 'Bearer ' + token },
            params: { lang }
        }).then((response) => dispatch({ type: Get_Manage_account, data: response.data.data })
        ).catch(err => {
            console.log('err', err);
        });
    }
}