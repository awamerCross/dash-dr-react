import { Get_stue_notify } from "../action/AllowNotifyAction";

const initialState = { notify: false, }

export default (state = initialState, action) => {
    switch (action.type) {

        case Get_stue_notify:
            return { notify: action.data, }



        default:
            return state;
    }
}
