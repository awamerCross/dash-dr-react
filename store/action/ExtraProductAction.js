
export const Get_Extra_Product = 'Get_Extra_Product';
export const Add_Extra_Product = 'Add_Extra_Product';
export const Edit_Extra_Product = 'Edit_Extra_Product';
export const Delete_Extra_Product = 'Delete_Extra_Product';


export const AddExtraPrdoduc = (token, lang, name_ar, name_en, price) => {

}


export const GetExtraProduct = () => {
    return dispatch => {
        return dispatch({
            type: Get_Extra_Product
        });
    }
};


export const add_extra_ProductsService = (data) => {
    return dispatch => {
        return dispatch({
            type: Add_Extra_Product,
            payload: data
        });
    }
};


export const temp_extra_ProductsService = () => {
    return dispatch => {
        return dispatch({ type: 'temp_array', });
    }
};



export const edit_extra_ProductsService = (data) => {
    return dispatch => {
        return dispatch({
            type: Edit_Extra_Product,
            payload: data
        });
    }
};

export const delete_extra_ProductsService = (ProductId) => {
    return dispatch => {
        return dispatch({
            type: Delete_Extra_Product,
            payload: ProductId
        });
    }
}; 