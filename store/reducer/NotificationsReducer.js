import { Get_Notify, Delete_Notification } from "../action/NotificationsAction";


const initialstate = { notify: [] }
export default (state = initialstate, action) => {
    switch (action.type) {
        case Get_Notify:
            return { notify: action.data }
        case Delete_Notification:
            return { notify: action.data }
        default:
            return state;
    }
}
