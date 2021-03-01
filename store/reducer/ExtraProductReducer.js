import { Get_Extra_Product, Add_Extra_Product, Edit_Extra_Product, Delete_Extra_Product } from "../action/ExtraProductAction";

const initialstate = {
    ExtraProduct: [
        { id: '', name_ar: '', name_en: " ", price: '' },
    ]
};

export default (state = initialstate, action) => {
    switch (action.type) {
        case Get_Extra_Product:
            return { ...state, ExtraProduct: [...state.ExtraProduct] };
        case Add_Extra_Product:
            return {
                ...state,
                ExtraProduct: state.ExtraProduct.concat(action.payload)
            };
        case Edit_Extra_Product:
            return {
                ...state,
                ExtraProduct: state.ExtraProduct.map(
                    (content, i) => content.id === action.payload.id ? { ...content, name_ar: action.payload.ProductnameExtraAR, name_en: action.payload.ProductnameExtraEn, price: action.payload.priceProductExtra }
                        : content)
            };
        case Delete_Extra_Product:
            return {
                ...state,
                ExtraProduct: state.ExtraProduct.filter(item => item.id !== action.payload)
            };
        case 'temp_array':
            return {
                ...state,
                ExtraProduct: []
            };
        default:
            return state;
    }
};

