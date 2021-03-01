import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import Colors from '../consts/Colors';


const Container = ({ loading, children }) => {

    if (loading) {

        return (
            <View style={{
                flex: 1,
                width: '100%',
                zIndex: 99999,
                backgroundColor: '#ffffff1c',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 50
            }}>
                <ActivityIndicator visible={loading} size="large" color={Colors.sky} style={{ alignSelf: 'center', }} />
            </View>

        );
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                {children}
            </View>
        )
    }



}
export default Container