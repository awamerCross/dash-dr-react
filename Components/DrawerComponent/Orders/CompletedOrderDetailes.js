import React from 'react'
import OrderDetailes from './OrderDetailes'
import i18n from '../../../locale/i18n'

function CompletedOrderDetailes({ navigation }) {
    return (
        <OrderDetailes
            navigation={navigation}
            onPressDetailes={() => navigation.navigate('ProductDetailes')}
            label={i18n.t('CompletedOrderDetailes')}

        />
    )
}

export default CompletedOrderDetailes
