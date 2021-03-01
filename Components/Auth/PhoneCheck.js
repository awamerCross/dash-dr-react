import React, { useState, useEffect } from 'react'
import {
    View, StyleSheet, Text, Keyboard,
} from 'react-native'
import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import i18n from '../../locale/i18n'
import { useDispatch, useSelector } from 'react-redux'
import {
    validatePhone,
} from "../../common/Validation";
import { CheckPhone } from '../../store/action/AuthAction'
import Loading from '../../common/LoadIng'
import { ToasterNative } from '../../common/ToasterNative'

function PhoneCheck({ navigation }) {
    const [Phone, setPhone] = useState('');
    const [PhoneStatues, setPhoneStatues] = useState(0)
    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();




    const _validate = () => {
        let PhoenErr = validatePhone(Phone);

        return PhoenErr
    }


    const ConFirmPhone = () => {
        let Val = _validate();
        if (!Val) {
            Keyboard.dismiss()
            setSpinner(true)
            dispatch(CheckPhone(lang, Phone, navigation)).then(() => setSpinner(false))

        }
        else {
            setSpinner(false)
            ToasterNative(_validate(), 'danger', 'bottom')
        }
    }
    return (
        <View style={{ backgroundColor: Colors.bg, flex: 1 }}>
            <BackBtn navigation={navigation} />

            <View style={{ margin: 20, }}>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                    <Text animation='slideInLeft' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('confirmAcc')}</Text>
                    <Text animation='slideInRight' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('enterPhone')}</Text>
                </View>
            </View>

            <InputIcon
                label={i18n.t('phone')}
                placeholder={i18n.t('phone')}
                keyboardType='numeric'
                styleCont={{ marginTop: 20 }}
                onChangeText={(e) => setPhone(e)}
                value={Phone}

            />
            <Loading loading={spinner} >
                < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ConFirmPhone} />

            </Loading>

        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg
    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        alignSelf: 'flex-start'

    },
    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal,
        alignSelf: 'flex-start'

    },

    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})

export default PhoneCheck
