import React, { useEffect } from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'



function IncomingRequests({ navigation, route }) {

    const { WAITING } = route.params;


    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('IncomingRequests')}
            onPress={() => navigation.navigate('IncomingOrderDetailes')}
            statues={WAITING}

        />
    )
}

export default IncomingRequests
