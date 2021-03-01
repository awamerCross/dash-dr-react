import { chooseLang } from "../action/LangAction";

const initalstate = {
    language: null,
};
export default (state = initalstate, action) => {

    switch (action.type) {
        case chooseLang:
            return { ...state, language: action.lang };

        default:
            return state;
    }
};

