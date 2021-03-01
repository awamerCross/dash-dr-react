import React from 'react'
import AllOrders from '../../../common/AllOrders'
import i18n from '../../../locale/i18n'

function ActiveRequests({ navigation, route }) {
    const { RUNNING } = route.params;

    return (
        <AllOrders
            navigation={navigation}
            label={i18n.t('ActiveRequests')}
            onPress={() => navigation.navigate('ActiveOrderDetailes')}
            statues={RUNNING}
        />
    )
}

export default ActiveRequests
