import React from 'react'
import i18n from '../../../locale/i18n'
import OrderDetailes from '../Orders/OrderDetailes'

function OrderDetMangeAcc({ navigation }) {
    return (
        <OrderDetailes
            labelBtn1={i18n.t('confirm')}
            navigation={navigation}
            onPress1={() => navigation.navigate('ManageAccount')}
        />
    )
}

export default OrderDetMangeAcc
