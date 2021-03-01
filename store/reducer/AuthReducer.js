import { Sign_In, LOGIN_IS_LOADING, login_success, login_failed, Sign_up, Activate_Code, logout } from "../action/AuthAction";
import { Update_Profile, profile_data } from "../action/ProfileAction";
import { Update_provider } from "../action/ProviderAction";

const initial_State = { user: null, loading: false, message: '', success: false, Validate: false }


export default (state = initial_State, action) => {
    switch (action.type) {
        case Sign_In:
            return { ...state };
        case LOGIN_IS_LOADING:
            return { ...state, loading: action.isLoading, };
        case login_success:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success }
        case login_failed:
            return { ...state, message: action.error.message, success: action.error.success }
        case Sign_up:
            return { ...state, message: action.payload.message, }
        case Activate_Code:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success };
        case 'ValidEmailPhone':
            return { Validate: action.data };

        case profile_data:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success };

        case Update_Profile:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success };

        case Update_provider:
            return { ...state, user: action.data, }
        case logout:
            return { user: null }

        default:
            return state;
    }


}
