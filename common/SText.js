import React from "react";
import { Text, StyleSheet, I18nManager, TouchableOpacity } from "react-native";
import Colors from "../consts/Colors";
import * as Animatable from 'react-native-animatable';

const SText = ({ title, style, onPress, ...rest }) => (
    <TouchableOpacity onPress={onPress} >
        <Animatable.Text animation='bounceIn' easing="ease-out" delay={500} {...rest} style={[styles.text, style]}>
            {title}
        </Animatable.Text>
    </TouchableOpacity>
);
export { SText };

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: Colors.fontBold,
        fontFamily: "flatMedium",
        textAlign: 'center',
        paddingTop: 25,

    },
});
