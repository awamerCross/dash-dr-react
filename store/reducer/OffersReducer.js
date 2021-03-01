import { Get_banners, Add_banners, Delete_Banners, } from "../action/OffersAction";

const initialState = { Banners: [] }
export default (state = initialState, action) => {
    switch (action.type) {
        case Get_banners:
            return { ...state, Banners: action.data.data }
        // case Add_banners:
        //     return { ...state, Banners: action.data }

        case Delete_Banners:
            return { Banners: action.data }
        default:
            return state;
    }
}