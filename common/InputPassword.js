import React, { useState } from "react";
import { View, StyleSheet, TextInput, I18nManager, Image, Dimensions, Text, TouchableOpacity, Platform } from "react-native";
import Colors from "../consts/Colors";



const InputPassword = ({
    KeyboardStyle,
    label,
    value,
    onChangeText,
    LabelStyle,
    inputStyle,
    placeholder,
    image,
    styleCont,
    imageFocused,
    onPress,
    imgStyle,
    editable,
    ...props
}) => {

    const [focused, setFocused] = useState(false);

    return (

        <View style={[styles.containerTableTextOverInput, styleCont]}>
            <Text style={[styles.labelText,
            {
                color: focused || value ? Colors.sky : Colors.fontNormal, paddingHorizontal: 10, fontSize: 13,
                bottom: focused || value ? 45 : null
            }, LabelStyle
            ]}  >
                {label}
            </Text>

            <TextInput
                style={[styles.textInput, { borderColor: focused || value ? Colors.sky : Colors.InputColor }, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
                placeholder={placeholder}
                editable={editable}

            />
            <TouchableOpacity onPress={onPress} style={{ position: 'absolute', alignSelf: 'flex-end', alignItems: 'center', padding: 15 }}>
                <Image source={image} style={[styles.image, imgStyle]} resizeMode='contain' />
            </TouchableOpacity>
        </View>


    );
};
export { InputPassword };

const styles = StyleSheet.create({

    containerTableTextOverInput: {
        position: "relative",
        marginHorizontal: "5%",
        justifyContent: 'center',
        marginTop: 20,

    },
    labelText: {
        left: 10,
        backgroundColor: Colors.bg,
        alignSelf: "flex-start",
        fontSize: 12,
        zIndex: 10,
        position: "absolute",
        fontFamily: 'flatMedium',


    },
    textInput: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        color: Colors.fontNormal,
        textAlign: I18nManager.isRTL ? "right" : "left",
        fontFamily: "flatMedium",
        fontSize: 13,
        padding: 15
    },
    image: {
        width: 25,
        maxWidth: 35,
        height: 25,
        maxHeight: 35,
        resizeMode: "contain",
        alignSelf: 'center'

    },
});