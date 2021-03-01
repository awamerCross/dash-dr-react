import React, { useEffect } from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'
import { useSelector, useDispatch } from 'react-redux';
import { GetOrders } from '../../../store/action/OrdersAction';

function Rejectedrequests({ navigation, route }) {
    const { CANCELED } = route.params;



    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();
    const OrderRequest = useSelector(state => state.Orders.GetmyOrders);

    useEffect(() => {
        dispatch(GetOrders(token, CANCELED, lang))

    }, [])

    return (
        <AllOrders
            navigation={navigation}
            onPress={() => navigation.navigate('RejectedOrderDetailes')}
            label={i18n.t('Rejectedrequests')}
            statues={CANCELED}


        />
    )
}

export default Rejectedrequests
