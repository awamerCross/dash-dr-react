import React, { useState } from "react";
import { View, StyleSheet, TextInput, I18nManager, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import Colors from "../consts/Colors";


const { width } = Dimensions.get('window')

const InputImage = ({
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

    ...props
}) => {

    const [focused, setFocused] = useState(false);

    return (

        <View style={[styles.containerTableTextOverInput, styleCont]}>

            <Text style={[styles.labelText, {
                paddingHorizontal: focused ? 10 : 0, color: focused ? Colors.sky : Colors.InputColor, fontSize: 16
            }, LabelStyle]}  >
                {focused ? label : null}
            </Text>
            <TouchableOpacity style={{ height: 80, backgroundColor: Colors.sky, overflow: 'hidden' }} onPress={onPress}>

                <TextInput
                    style={[styles.textInput, inputStyle, { borderColor: focused ? Colors.sky : Colors.InputColor, }]}
                    placeholder={focused ? null : placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}


                    {...props}
                />


                <Image source={image} style={[styles.image, imgStyle]} />
            </TouchableOpacity>

        </View>


    );
};
export { InputImage };

const styles = StyleSheet.create({

    containerTableTextOverInput: {
        height: width * .2,
        position: "relative",
        marginHorizontal: "5%",
        marginTop: 30,
        overflow: 'hidden',
        height: 80

    },
    labelText: {
        left: 20,
        backgroundColor: Colors.bg,
        alignSelf: "flex-start",
        fontSize: width * .03,
        zIndex: 10,
        position: "absolute",
        bottom: width * .175,
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
        fontSize: 12,
    },
    image: {
        width: width * 0.04,
        maxWidth: width * 0.12,
        height: width * 0.06,
        maxHeight: width * 0.12,
        resizeMode: "contain",
        bottom: 40,
        paddingEnd: 10,
        paddingStart: 20,
        alignSelf: 'flex-end'

    },
});
