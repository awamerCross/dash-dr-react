import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { useDispatch } from "react-redux";

import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { changeLanguage } from '../../../store/action/LangAction'



const { width } = Dimensions.get('window')
function Lang({ navigation }) {

    const [lan, setLang] = useState('')

    const dispatch = useDispatch();

    const changeLang = async (lang, direction) => {
        await dispatch(changeLanguage(lang, direction));

    };

    AsyncStorage.getItem("lang").then((value) => {
        setLang(value);
    })
    console.log('lan', lan);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('language')} />


            <TouchableOpacity onPress={() => changeLang("ar", "RTL")}>
                <View style={[styles.Container, { marginTop: 25 }]}>
                    <Text style={[styles.text, { color: lan === 'ar' ? Colors.sky : Colors.IconBlack, alignSelf: 'flex-start' }]}>{i18n.t('Arab')}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.Line}></View>

            <TouchableOpacity onPress={() => changeLang("en", "LTR")}>
                <View style={styles.Container}>
                    <Text style={[styles.text, { color: lan === 'en' ? Colors.sky : Colors.IconBlack, alignSelf: 'flex-start' }]}>{i18n.t('English')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    Container: {
        padding: 10,
        backgroundColor: '#E3E3E3',
        width,

    },


    Line: {
        width,
        height: 1,
        backgroundColor: Colors.fontBold,
        opacity: .2
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal,
        paddingStart: 25
    }
})

export default Lang
