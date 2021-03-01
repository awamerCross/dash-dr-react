import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native'
import Colors from '../consts/Colors'
const { width } = Dimensions.get('window')
import * as Animatable from 'react-native-animatable';
function BTN({
    title,
    onPress,
    TextStyle,
    ContainerStyle,
    disabled
}) {
    return (

        <TouchableOpacity style={[styles.container, ContainerStyle]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.sText, TextStyle]}>
                {title}
            </Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.sky,
        width: '85%',
        marginHorizontal: 30,
        height: 55,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    sText: {
        fontFamily: 'flatMedium',
        color: Colors.bg,
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
    }
})
export default BTN
