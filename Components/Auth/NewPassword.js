import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, } from 'react-native'


import { InputIcon } from '../../common/InputText'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors'
import BTN from '../../common/BTN'
import { validatePassword, validateTwoPasswords } from '../../common/Validation'
import i18n from '../../locale/i18n'
import { useDispatch } from 'react-redux'
import { ResetPassword } from '../../store/action/AuthAction'
import { Toaster } from '../../common/Toaster'
import Container from '../../common/Container'
import * as Animatable from 'react-native-animatable';
import { InputPassword } from '../../common/InputPassword'
import Loading from '../../common/LoadIng'


function NewPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const { token } = route.params;

    useEffect(() => {
        token

    }, []);



    const dispatch = useDispatch();




    const _validate = () => {

        let passwordErr = validatePassword(password);
        let passConfirmErr = validateTwoPasswords(password, confirmPassword)

        return passwordErr || passConfirmErr;
    };





    const SubmitLoginHandler = () => {
        const isVal = _validate();
        if (!isVal) {
            setSpinner(true)
            dispatch(ResetPassword(password, token, navigation)).then(() => setSpinner(false))

        }
        else {
            setSpinner(false)
            Toaster(_validate());
        }
    }
    return (

        <View style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ marginHorizontal: 20, }}>
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('forgetPss')}</Text>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('enternewPass')}</Text>
                </View>
            </View>

            <InputPassword
                label={i18n.t('password')}
                onChangeText={(e) => setPassword(e)}
                value={password}
                secureTextEntry={!showPass}
                image={require('../../assets/Images/view.png')}
                onPress={() => setShowPass(!showPass)}
                styleCont={{ marginTop: 0 }}
            />
            <InputPassword
                label={i18n.t('confirmPass')}
                onChangeText={(e) => setConfirmPassword(e)}
                value={confirmPassword}
                secureTextEntry={!showPass2}
                image={require('../../assets/Images/view.png')}
                onPress={() => setShowPass2(!showPass2)}
                styleCont={{ marginTop: 0 }}
            />
            <Loading loading={spinner} >
                <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={SubmitLoginHandler} />
            </Loading>
        </View>




    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.bg
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
    wrapCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '8%',
        marginTop: '10%'
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})
export default NewPassword
