import React, { useState } from 'react'
import { AppStackNavigator, MainStackNav } from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';




function MainRoot() {

    const auth = useSelector(state => state.auth);
    return (
        <NavigationContainer >
            {
                auth.user == null ?
                    <MainStackNav />
                    :
                    <AppStackNavigator />


            }

        </NavigationContainer>





    )
}

export default MainRoot