import { Get_sizes } from "../action/SizesAction";

const initialState = { size: [] }
export default (state = initialState, action) => {
    switch (action.type) {

        case Get_sizes:
            return { ...state, size: action.data }
        default:
            return state;
    }
}