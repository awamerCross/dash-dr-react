import React from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'

function Completedrequests({ navigation, route }) {
    const { DELIVERED } = route.params;

    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('Completedrequests')}
            onPress={() => navigation.navigate('CompletedOrderDetailes')}
            statues={DELIVERED}

        />
    )
}

export default Completedrequests
