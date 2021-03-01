import { Get_Ratings, Get_Wallet, Get_MyBankes, Get_Manage_account } from '../action/CommentsAction';

const initialState = { comments: {}, wallet: {}, extra: {}, Banks: [], Macoount: [] }

export default (state = initialState, action) => {
    switch (action.type) {

        case Get_Ratings:
            return { comments: action.data, extra: action.data.extra }

        case Get_Wallet:
            return { wallet: action.data }

        case Get_MyBankes:
            return { ...state, Banks: action.data.data }
        case Get_Manage_account:
            return { Macoount: action.data }
        default:
            return state;
    }
}