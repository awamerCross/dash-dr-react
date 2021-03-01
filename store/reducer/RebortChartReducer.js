import { Get_Chart_data, Create_reborts } from "../action/RebortChartAction";

const initial_state = { chart: null }
export default (state = initial_state, action) => {
    switch (action.type) {

        case Get_Chart_data:
            return { ...state, chart: action.data }
        case Create_reborts:
            return { ...state, chart: action.data }
        default:
            return state;
    }
}