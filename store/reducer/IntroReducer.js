import { Get_intro } from "../action/IntroAction";

const initalstate = {
    intro: [],
};
export default (state = initalstate, action) => {

    switch (action.type) {
        case Get_intro:
            return {
                intro: action.data.data
            };

        default:
            return state;
    }
};
