import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native'
import i18n from '../../locale/i18n'
import Colors from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../store/action/LangAction';
import * as Animatable from 'react-native-animatable';

function ChooseLang({ navigation }) {

    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();

    const changeLang = async (lang, direction) => {
        await dispatch(changeLanguage(lang, direction,));

    };

    useEffect(() => {

        AsyncStorage.getItem("lang").then((lang) => {
            if (lang) {
                navigation.navigate("Home");
            }
        })

    }, [])

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUpBig" easing="ease-out" direction="alternate" delay={500}  >

                <Image source={require('../../assets/Images/Dr.png')} style={styles.logoImg} />
                <Text style={styles.chhoseLang}>{i18n.t('chooseLange')} : </Text>

                <TouchableOpacity onPress={() => { changeLang("ar", "RTL") }} style={[styles.card, { borderColor: lang == 'ar' ? Colors.sky : '#F7F7F7', }]}>
                    <Image source={require('../../assets/Images/saudi_arabia.png')} style={styles.flag} resizeMode='contain' />
                    <Text style={styles.lang}>{i18n.t('Arabic')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { changeLang("en", "LTR") }} style={[styles.card, { borderColor: lang == 'en' ? Colors.sky : '#F7F7F7' }]}>
                    <Image source={require('../../assets/Images/english_language.png')} style={styles.flag} resizeMode='contain' />
                    <Text style={styles.lang}>{i18n.t('English')}</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.bg
    },
    logoImg: {
        height: 200,
        width: 200
    },
    card: {
        borderWidth: 1,

        backgroundColor: '#F7F7F7',
        width: 200,
        height: 150,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'column'
    },
    flag: {
        height: 100,
        width: 100
    },
    lang: {
        fontFamily: 'flatLight',
        fontSize: 18
    },
    chhoseLang: {
        fontFamily: 'flatRegular',
        fontSize: 20,
        alignSelf: 'center'
    }
})

export default ChooseLang
