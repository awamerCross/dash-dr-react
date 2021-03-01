import React from 'react'
import OrderDetailes from './OrderDetailes'
import i18n from '../../../locale/i18n'

function ActiveOrderDetailes({ navigation }) {
    return (
        <OrderDetailes
            labelBtn1={i18n.t('orderProceedSuccess')}
            navigation={navigation}
            onPress1={() => navigation.navigate('HomePage')}
        />
    )
}

export default ActiveOrderDetailes
