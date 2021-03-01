import { Get_OrderS, Get_Order_Detailes } from "../action/OrdersAction"

const initialState = { GetmyOrders: [], OrderDetailes: {}, loader: false, }
export default (state = initialState, action) => {
    switch (action.type) {
        case Get_OrderS:
            return { GetmyOrders: action.data, loader: action.data.success }
        case Get_Order_Detailes:
            return { ...state, OrderDetailes: action.data, loader: action.data.success }
        // case Enable_Loader: 
        //     return { loader: true}
        // case Disable_Loader:
        //     return { loader: false }
        default:
            return state;
    }
}