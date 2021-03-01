import React from 'react'
import { View, ActivityIndicator, Image } from 'react-native';
import Colors from '../consts/Colors';


const Loading = ({ loading, children, stylecont }) => {

    if (loading) {

        return (
            <View style={[{
                flex: 1,
                width: '100%',
                zIndex: 99999,
                backgroundColor: 'rgba(255,255,255,.4)',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 50
            }, stylecont]}>
                <Image source={require('../assets/Images/loader.gif')} style={{ width: 50, height: 50 }} />
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
export default Loading