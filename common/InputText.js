import React, { useState } from "react";
import { View, StyleSheet, TextInput, I18nManager, Image, Dimensions, Text, TouchableOpacity, Platform } from "react-native";
import Colors from "../consts/Colors";


const { width } = Dimensions.get('window')

const InputIcon = ({
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
    editable,
    imgStyle,

    ...props
}) => {

    const [focused, setFocused] = useState(false);

    return (

        <View style={[styles.containerTableTextOverInput, styleCont]}>

            <Text style={[styles.labelText, {
                paddingHorizontal: focused ? 10 : 0, color: focused ? Colors.sky : Colors.fontNormal, fontSize: 13
            }, LabelStyle]}  >
                {focused ? label : null}
            </Text>

            <TextInput
                style={[styles.textInput, inputStyle, { borderColor: focused ? Colors.sky : Colors.InputColor, }]}
                placeholder={focused ? null : placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={value ? () => setFocused(true) : () => setFocused(false)}
                editable={editable}

                {...props}
            />
            <TouchableOpacity onPress={onPress} style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: 20, right: 20 }}>
                <Image source={image} style={[styles.image, imgStyle]} />

            </TouchableOpacity>
        </View>


    );
};
export { InputIcon };

const styles = StyleSheet.create({

    containerTableTextOverInput: {
        position: "relative",
        marginHorizontal: "5%",
        marginTop: 20,

    },
    labelText: {
        left: 20,
        top: -8,
        backgroundColor: Colors.bg,
        alignSelf: "flex-start",
        fontSize: 12,
        zIndex: 10,
        position: "absolute",
        fontFamily: 'flatMedium',
        color: Colors.fontNormal,



    },
    textInput: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 25,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        color: Colors.fontNormal,
        paddingRight: 20,
        paddingLeft: 20,
        textAlign: I18nManager.isRTL ? "right" : "left",
        fontFamily: "flatMedium",
        fontSize: 13,
        padding: 15

        // paddingTop: Platform.OS == 'ios' ? 15 : 0
    },
    image: {
        width: 20,
        maxWidth: 30,
        height: 25,
        maxHeight: 35,
        resizeMode: "contain",

    },
});
