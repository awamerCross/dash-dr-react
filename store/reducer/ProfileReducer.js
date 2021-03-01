import { profile_data, Update_Profile, logout } from "../action/ProfileAction";
import { Update_provider } from "../action/ProviderAction";

const initial_state = { user: null }
export default (state = initial_state, action) => {
    switch (action.type) {
        case profile_data:
            return { ...state, user: action.data }
        case Update_Profile:
            return { ...state, user: action.data }

        case Update_provider:
            return { ...state, user: action.data }
        case logout:
            return { user: null }
        default:
            return state;
    }
}