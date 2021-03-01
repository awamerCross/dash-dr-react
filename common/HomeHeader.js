import React from 'react'
import Colors from '../consts/Colors'
import { View, TouchableOpacity, Image, ImageBackground, Text, I18nManager } from 'react-native'
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';

function HomeHeader({ label, title, navigation, onPress, }) {
    const user = useSelector(state => state.auth.user.data);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ marginHorizontal: -30, marginVertical: -10 }}>
                    <ImageBackground source={require('../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', transform: I18nManager.isRTL ? [{ rotateY: '0deg' }] : [{ rotateY: '-180deg' }], }} resizeMode='contain'>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ top: 20 }}>
                            <Image source={require('../assets/Images/menu.png')} style={{ height: 25, width: 25, }} resizeMode='contain' />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <TouchableOpacity onPress={onPress} style={{ margin: 20, top: 25 }}>
                    <View style={{}}>
                        <Image source={require('../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                        <Image source={{ uri: user.avatar }} style={{ height: 45, width: 45, borderRadius: 50, }} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'column', margin: 5, marginBottom: 0, marginTop: 25, marginStart: 10 }}>
                <Text style={{ fontFamily: 'flatMedium', fontSize: 20, alignSelf: 'flex-start' }}>{label}</Text>
                <Text style={{ fontFamily: 'flatMedium', fontSize: 12, color: Colors.fontNormal, alignSelf: 'flex-start', paddingVertical: 5 }}>{title}</Text>
            </View>
        </View>
    )
}

export default HomeHeader
