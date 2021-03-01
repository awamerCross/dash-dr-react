import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBackground, I18nManager } from 'react-native'

import Colors from '../consts/Colors';
import { useSelector } from 'react-redux';



const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

function Header({ label, navigation, }) {
    const user = useSelector(state => state.auth.user.data);

    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ right: 20, bottom: 15 }}>
                    <ImageBackground source={require('../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', transform: I18nManager.isRTL ? [{ rotateY: '0deg' }] : [{ rotateY: '-180deg' }], }} resizeMode='contain'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>


                            <Image source={require('../assets/Images/arrowwhite.png')} style={{ height: 30, width: 30, marginTop: 45 }} resizeMode='contain' />

                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                    <View style={{ marginTop: 45, marginHorizontal: 20 }}>
                        <Image source={require('../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                        <Image source={{ uri: user.avatar }} style={{ height: 45, width: 45, borderRadius: 50, }} />
                    </View>
                </TouchableOpacity>

            </View>
            <Text style={{ marginHorizontal: 25, fontFamily: 'flatMedium', fontSize: 18, alignSelf: 'flex-start' }}>{label}</Text>
        </>
    )
}


export default Header
