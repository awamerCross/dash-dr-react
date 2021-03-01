import React from 'react'
import OrderDetailes from './OrderDetailes'

function RejectedOrderDetailes({ navigation }) {
    return (
        <OrderDetailes
            navigation={navigation}
            onPressDetailes={() => navigation.navigate('ProductDetailes')}

        />
    )
}

export default RejectedOrderDetailes
