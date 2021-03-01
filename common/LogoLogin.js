import React from 'react'
import { ImageBackground, Image, StyleSheet, Dimensions, View } from 'react-native'

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


function LogoLogin() {
    return (
        <View >
            <ImageBackground source={require('../../assets/images/LoginBackGround.png')} style={styles.container} resizeMode='cover'>
                <Image source={require('../../assets/images/DrTawsell.png')} style={styles.images} resizeMode='contain' />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width + 50,
        height: height * .35,
        marginTop: -20,
        alignItems: 'center',
        alignSelf: 'center'

    },
    images: {
        width: '50%',
        height: '50%',
        marginVertical: width * .12,

    },
})
export default LogoLogin
