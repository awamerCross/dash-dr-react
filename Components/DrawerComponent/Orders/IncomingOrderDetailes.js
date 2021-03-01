import React from 'react'
import OrderDetailes from './OrderDetailes'
import i18n from '../../../locale/i18n'

function IncomingOrderDetailes({ navigation }) {
    return (
        <OrderDetailes
            labelBtn1={i18n.t('confirm')}
            labelBtn2={i18n.t('refuse')}
            navigation={navigation}
            onPress1={() => navigation.navigate('ActiveRequests')}
            onPress2={() => navigation.navigate('Rejectedrequests')} />
    )
}

export default IncomingOrderDetailes
