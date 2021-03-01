import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Colors from '../consts/Colors';



const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

function TextImg({ image, label, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.Touchable}>
            <Image source={image} style={styles.Img} resizeMode='contain' />
            <Text style={styles.TextStyle}>{label}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    Touchable: {
        flexDirection: "row",
        paddingStart: width * 0.05,
        marginTop: width * 0.05,


    },
    Img: {
        width: width * 0.05,
        height: width * 0.05,
        marginRight: width * .06,
    },
    TextStyle: {
        color: Colors.fontNormal,
        fontSize: width * 0.037,
        fontFamily: "flatMedium",
    },
});
export default TextImg
