import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, I18nManager, Platform } from 'react-native'
import { width, height } from '../consts/HeightWidth'
import Colors from '../consts/Colors'

function BackBtn({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Images/bluBack.png')} style={[styles.BGImage, { transform: I18nManager.isRTL ? [{ rotateY: '0deg' }] : [{ rotateY: '-180deg' }], }]} resizeMode='contain' />
            <TouchableOpacity style={styles.Btn} onPress={() => navigation.goBack()}>
                {
                    I18nManager.isRTL ?
                        <Image source={require('../assets/Images/arrowwhite.png')} style={styles.arrow} resizeMode='contain' />

                        :
                        <Image source={require('../assets/Images/left.png')} style={styles.arrow} resizeMode='contain' />


                }
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bg,
        top: -25,
        overflow: 'hidden'
    },
    BGImage: {
        width: 100,
        height: 140,
    },
    Btn: {
        position: 'absolute',
        marginTop: 70,
    },
    arrow: {
        width: 30,
        height: 30,
        padding: 10,
        marginHorizontal: 20
    }

})
export default BackBtn
