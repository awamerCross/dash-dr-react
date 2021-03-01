import { Update_provider } from "../action/ProviderAction";

const initial_state = { user: null }
export default (state = initial_state, action) => {
    switch (action.type) {

        case Update_provider:
            return { ...state, user: action.data }

        default:
            return state;
    }
}