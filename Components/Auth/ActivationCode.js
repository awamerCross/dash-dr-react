import React, { useState, useEffect } from 'react'
import {
    View, StyleSheet, Text, Toast, ActivityIndicator, Alert, ScrollView
} from 'react-native'
import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import i18n from '../../locale/i18n'
import { useDispatch, useSelector } from 'react-redux'
import { ActivationCode } from '../../store/action/AuthAction'
import {
    validateCode, ValdiateActivationCode,
} from "../../common/Validation";
import { Toaster } from '../../common/Toaster';
import Container from '../../common/Container'
import * as Animatable from 'react-native-animatable';
import { ToasterNative } from '../../common/ToasterNative'
import Loading from '../../common/LoadIng'


function ActivateCode({ navigation, route }) {
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');

    const [spinner, setSpinner] = useState(false);

    const lang = useSelector(state => state.lang.language);
    const { token } = route.params;
    const MyactivateCode = 1122;
    const dispatch = useDispatch()




    const _validate = () => {
        let codeErr = ValdiateActivationCode(code)
        return codeErr
    }

    const ActivateCode = () => {

        const val = _validate();
        if (!val) {
            setSpinner(true)
            dispatch(ActivationCode(code, token, lang, navigation)).then(() => setSpinner(false))
        }
        else {
            ToasterNative(_validate(), "danger", 'bottom');
            setSpinner(false)
        }
    }



    return (
        <ScrollView style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ margin: 20, }}>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                    <Text animation='flipInX' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('confirmAcc')}</Text>
                    <Text animation='flipInY' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('enterCod')}</Text>
                </View>
            </View>

            <InputIcon
                label={i18n.t('code')}
                placeholder={i18n.t('code')}
                onChangeText={(code) => setCode(code)}
                value={code}
                styleCont={{ marginTop: 10, }}
                keyboardType='numeric'


            />



            <Loading loading={spinner}>
                < BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={ActivateCode} />
            </Loading>

        </ScrollView>



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
        borderRadius: 5,
    }
})

export default ActivateCode
