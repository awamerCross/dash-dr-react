import { GetMenue, Add_menue, Update_Menue, Search_menue } from "../action/MenueAction";

const initialState = { menue: [] }
export default (state = initialState, action) => {
    switch (action.type) {
        case GetMenue:
            return { ...state, menue: action.data }

        case Search_menue:
            return { ...state, menue: action.data }
        default:
            return state;
    }
}