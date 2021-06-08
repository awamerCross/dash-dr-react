import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import BackBtn from '../../common/BackBtn'
import Colors from '../../consts/Colors';
import i18n from '../../locale/i18n';
import { InputIcon } from '../../common/InputText';
import { validateUserName, validatePhone, validateEmail, validatePassword, validateTwoPasswords } from '../../common/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { width, height } from '../../consts/HeightWidth';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';
import { ValidEmailPhone } from '../../store/action/AuthAction';
import { InputPassword } from '../../common/InputPassword';
import { ToasterNative } from '../../common/ToasterNative';

function Fregister({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRadion, setSelectedRadio] = useState(null)
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);




    const Validation = useSelector(state => state.auth.Validate ? state.auth.Validate.success : false);


    const [data, setData] = useState([


        { id: 1, title: `${i18n.t("yes")}` },
        { id: 0, title: `${i18n.t("no")}` },

    ])






    const _validate = () => {


        let nameA = validateUserName(name)
        let phoneErr = validatePhone(phone);
        let emailErr = validateEmail(email)
        let passwordErr = validatePassword(password);
        let twoPass = validateTwoPasswords(password, confirmPassword)
        let SelectChoice = selectedRadion === null ? i18n.t('owner') : SelectChoice;

        return nameA || phoneErr || emailErr || passwordErr || twoPass || SelectChoice
    };


    const dispatch = useDispatch();


    const NavigateToNext = () => {
        let Val = _validate();
        if (!Val) {
            navigation.navigate('SRegister', { name: name, phone: phone, email: email, isowner: selectedRadion, password: password })
        }
        else {
            ToasterNative(_validate(), 'danger', 'bottom');

        }
    }

    const HandelChange = (e) => {
        setTimeout(() => {
            dispatch(ValidEmailPhone(e))
        }, 1000);
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
                <BackBtn navigation={navigation} />

                <View style={{ flexDirection: 'column', paddingStart: '5%', alignSelf: 'flex-start' }}>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('Activity')}</Text>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={[styles.TextLogin, { paddingVertical: 10, color: Colors.fontNormal }]}>{i18n.t('CompInfo')}</Text>
                </View>

                <InputIcon
                    label={i18n.t('name')}
                    placeholder={i18n.t('name')}
                    onChangeText={(e) => setName(e)}
                    value={name}
                />

                <InputIcon
                    label={i18n.t('phone')}
                    placeholder={i18n.t('phone')}
                    onChangeText={(e) => { HandelChange(e); setPhone(e) }}
                    value={phone}
                    keyboardType='numeric'
                    styleCont={{ marginTop: 20 }}
                />

                <InputIcon
                    label={i18n.t('email')}
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => { HandelChange(e); setemail(e) }}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 20 }}
                />


                <InputPassword
                    label={i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                    secureTextEntry={!showPass}
                    image={require('../../assets/Images/view.png')}
                    onPress={() => setShowPass(!showPass)}
                    styleCont={{ marginTop: 20 }}
                />
                <InputPassword
                    label={i18n.t('confirmPass')}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                    secureTextEntry={!showPass2}
                    image={require('../../assets/Images/view.png')}
                    onPress={() => setShowPass2(!showPass2)}
                    styleCont={{ marginTop: 20 }}
                />

                <View style={styles.Radion}>
                    <View >
                        <Text style={styles.owner}>{i18n.t('owner')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            data.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => { setSelectedRadio(item.id) }} key={index} style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                                        <View style={{
                                            height: 15, width: 15, borderRadius: 12, borderWidth: 2, borderColor: selectedRadion === item.id ? Colors.sky : Colors.fontNormal, alignItems: 'center', justifyContent: 'center', alignSelf: 'center',
                                        }}>
                                            {
                                                selectedRadion === item.id ?
                                                    <View style={{
                                                        height: 6,
                                                        width: 6,
                                                        borderRadius: 6,
                                                        backgroundColor: Colors.sky,
                                                    }} />
                                                    : null
                                            }
                                        </View>
                                        <Text style={[styles.sText, { color: selectedRadion === item.id ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1, fontFamily: 'flatMedium' }]}>{item.title}</Text>

                                    </TouchableOpacity>
                                )
                            })}
                    </View>
                </View>

                <BTN title={i18n.t('continue')} ContainerStyle={styles.LoginBtn} onPress={NavigateToNext} />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    UText: {
        fontFamily: 'flatLight',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal,
        alignSelf: 'flex-start'

    },
    TextLogin: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        alignSelf: 'flex-start'

    },
    LoginBtn: {
        borderRadius: 15,
    },
    Radion: {
        marginHorizontal: '5%',
        borderColor: Colors.InputColor,
        borderWidth: .9,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 20,
        padding: 10
    },
    owner: {
        color: Colors.fontNormal,
        fontFamily: 'flatMedium'
    }
})
export default Fregister
