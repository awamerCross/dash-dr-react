import React from "react";
import Toast from "react-native-tiny-toast";
import Colors from "../consts/Colors";
import { Dimensions } from "react-native";


const { width } = Dimensions.get('window')
const Toaster = (message) => {
    return Toast.show(message, {
        position: Toast.position.CENTER,
        containerStyle: {
            backgroundColor: Colors.RedColor,
            paddingHorizontal: width * 0.05,
            borderRadius: 5,
        },
        textColor: Colors.bg,
        textStyle: {
            fontFamily: "flatMedium",
            fontSize: width * 0.04,
        },
        duration: 3000,
    });
};

export { Toaster };
