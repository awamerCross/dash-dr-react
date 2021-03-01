import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native'
import BackBtn from '../../common/BackBtn'
import { InputIcon } from '../../common/InputText'
import Colors from '../../consts/Colors';
import { CheckBox } from 'native-base';
import { validateUserName, validatePhone, validatePassword, validateEmail, validateCode, validateTwoPasswords, ValditeCommercialRegister, ValdiateCITyId, ValdiateDebId } from '../../common/Validation';
import BTN from '../../common/BTN';
import i18n from '../../locale/i18n';
import { Toaster } from '../../common/Toaster';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from '../../store/action/AuthAction';
import { getCititis, GetDepartment } from '../../store/action/CitiesAction';
import { width } from '../../consts/HeightWidth';

import { Dropdown } from 'react-native-material-dropdown';


function Register({ navigation }) {
    const [name, setName] = useState('');

    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState("");
    const [email, setemail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [CommercialRegister, setCommercialRegister] = useState('');
    const [spinner, setSpinner] = useState(false);



    const dispatch = useDispatch();

    const lang = useSelector(state => state.lang.language);
    const Depatrmens = useSelector(state => state.cities.deparment)
    const cities = useSelector(state => state.cities.cities)


    const [select, setSelect] = useState(false);
    const [department, setDepartment] = useState(null)
    const [city, setCity] = useState(null)


    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    let CityID = cities.map(city => ({ label: city.name, }));

    let DebName = Depatrmens.map(deb => ({ label: deb.name, value: deb.id }))
    let DebId = Depatrmens.map(deb => ({ label: deb.name }))





    const [phoneStatus, setPhoneStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [nameARStatus, setnameARStatus] = useState(0);
    const [nameENStatus, setNameENStatus] = useState(0)
    const [nameStatus, setNameStatus] = useState(0)

    const [enpasswordStatus, setenPasswordStatus] = useState(0);
    const [emailStatues, setemailStatues] = useState(0)
    const [CommercialRegisterStatues, setCommercialRegisterstatues] = useState(0)








    useEffect(() => {
        dispatch(getCititis(lang));
        dispatch(GetDepartment(lang))
    }, [dispatch])

    function activeInput(type) {
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
        if (type === 'password' || password !== '') setPasswordStatus(1);
        if (type === 'nameAR' || nameAR !== '') setnameARStatus(1);
        if (type === 'name' || name !== '') setNameStatus(1);

        if (type === 'nameEN' || nameEN !== '') setNameENStatus(1);
        if (type === 'email' || email !== '') setemailStatues(1);
        if (type === 'confirmPassword' || confirmPassword !== '') setenPasswordStatus(1);
        if (type === 'CommercialRegister' || CommercialRegister !== '') setCommercialRegisterstatues(1);

    }

    function unActiveInput(type) {
        if (type === 'phone' && phone === '') setPhoneStatus(0);
        if (type === 'password' && password === '') setPasswordStatus(0);
        if (type === 'nameAR' && nameAR !== '') setnameARStatus(0);
        if (type === 'nameEN' && nameEN !== '') setNameENStatus(0);
        if (type === 'name' && name == '') setNameStatus(1);

        if (type === 'email' && email !== '') setemailStatues(0);
        if (type === 'confirmPassword' && confirmPassword !== '') setenPasswordStatus(0);
        if (type === 'CommercialRegister' && CommercialRegister !== '') setCommercialRegisterstatues(0);

    }


    const _validate = () => {


        let nameErr = validateUserName(nameAR)
        let nameA = validateUserName(name)

        let nameEnErr = validateUserName(nameEN)
        let phoneErr = validatePhone(phone);
        let passwordErr = validatePassword(password);
        let emailErr = validateEmail(email)
        let CityID = ValdiateCITyId(city)
        let DebId = ValdiateDebId(department)
        let ValditeCommercialRegisterErr = ValditeCommercialRegister(CommercialRegister)
        let twoPass = validateTwoPasswords(password, confirmPassword)
        return nameA || nameErr || nameEnErr || phoneErr || passwordErr || emailErr || ValditeCommercialRegisterErr || twoPass || CityID || DebId
    };





    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);




    const SubmitRegister = () => {
        const val = _validate();
        if (!val) {
            setSpinner(true)
            const data = { name, nameAR, nameEN, password, phone, email, CommercialRegister, city, department, lang };
            dispatch(SignUp(data, navigation))

        }
        else {
            setSpinner(false);
            Toaster(_validate());

        }
    }

    return (

        <View style={styles.container}>

            <BackBtn navigation={navigation} />
            <View style={{ margin: 20, bottom: 30 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text style={styles.UText}>{i18n.t('Activity')}</Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1, bottom: 30 }} showsVerticalScrollIndicator={false} >
                <InputIcon
                    label={nameStatus === 1 ? i18n.t('name') : null}
                    placeholder={nameStatus === 1 ? null : i18n.t('name')}
                    onBlur={() => unActiveInput('name')}
                    onFocus={() => activeInput('name')}
                    inputStyle={{ borderColor: nameStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setName(e)}
                    value={name}
                    LabelStyle={{ paddingHorizontal: nameStatus === 1 ? 10 : 0, color: nameStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                />
                <InputIcon
                    label={nameARStatus === 1 ? i18n.t('username') : null}
                    placeholder={nameARStatus === 1 ? null : i18n.t('username')}
                    onBlur={() => unActiveInput('nameAR')}
                    onFocus={() => activeInput('nameAR')}
                    inputStyle={{ borderColor: nameARStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    styleCont={{ marginTop: 0 }}
                    LabelStyle={{ paddingHorizontal: nameARStatus === 1 ? 10 : 0, color: nameARStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                />
                <InputIcon
                    label={nameENStatus === 1 ? i18n.t('usernamen') : null}
                    placeholder={nameENStatus === 1 ? null : i18n.t('usernamen')}
                    onBlur={() => unActiveInput('nameEN')}
                    onFocus={() => activeInput('nameEN')}
                    inputStyle={{ borderColor: nameENStatus === 1 ? Colors.sky : Colors.InputColor }}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}
                    LabelStyle={{ paddingHorizontal: nameENStatus === 1 ? 10 : 0, color: nameENStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

                />
                <InputIcon
                    label={phoneStatus === 1 ? i18n.t('phone') : null}
                    placeholder={phoneStatus === 1 ? null : i18n.t('phone')}
                    onChangeText={(e) => setPhone(e)}
                    value={phone}
                    onBlur={() => unActiveInput('phone')}
                    onFocus={() => activeInput('phone')}
                    inputStyle={{ borderColor: phoneStatus === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: phoneStatus === 1 ? 10 : 0, color: phoneStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}

                    keyboardType='numeric'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    label={emailStatues === 1 ? i18n.t('email') : null}
                    placeholder={emailStatues === 1 ? null : i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    inputStyle={{ borderColor: emailStatues === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: emailStatues === 1 ? 10 : 0, color: emailStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('email')}
                    onFocus={() => activeInput('email')}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    label={CommercialRegisterStatues === 1 ? i18n.t('CommercialRegister') : null}
                    placeholder={CommercialRegisterStatues === 1 ? null : i18n.t('CommercialRegister')}
                    value={CommercialRegister}
                    onChangeText={(e) => setCommercialRegister(e)}
                    inputStyle={{ borderColor: CommercialRegisterStatues === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: CommercialRegisterStatues === 1 ? 10 : 0, color: CommercialRegisterStatues === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('CommercialRegister')}
                    onFocus={() => activeInput('CommercialRegister')}
                    keyboardType='numeric'

                    styleCont={{ marginTop: 0 }}
                />




                <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', marginTop: 10 }}>
                    <Dropdown
                        placeholder={i18n.t('city')}
                        data={cityName}
                        fontSize={12}
                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                        animationDuration={0}
                        onChangeText={val => setCity(val)}

                        value={CityID.label}
                    />
                </View>



                <View style={{ borderWidth: .6, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .14, borderColor: Colors.InputColor, marginHorizontal: '5%', marginTop: 10 }}>
                    <Dropdown
                        placeholder={i18n.t('dep')}
                        data={DebName}
                        fontSize={12}
                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ width: '90%', paddingHorizontal: 5, bottom: 10 }}
                        animationDuration={0}
                        onChangeText={val => setDepartment(val)}
                        value={DebId.label}
                    />
                </View>

                <InputIcon
                    label={passwordStatus === 1 ? i18n.t('password') : null}
                    placeholder={passwordStatus === 1 ? null : i18n.t('password')}
                    onChangeText={(e) => setPassword(e)}
                    value={password}

                    secureTextEntry
                    styleCont={{ marginTop: 15 }}

                    inputStyle={{ borderColor: passwordStatus === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: passwordStatus === 1 ? 10 : 0, color: passwordStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    onBlur={() => unActiveInput('password')}
                    onFocus={() => activeInput('password')}
                    keyboardType='numeric'



                />
                <InputIcon
                    label={enpasswordStatus === 1 ? i18n.t('confirmPass') : null}
                    placeholder={enpasswordStatus === 1 ? null : i18n.t('confirmPass')}
                    onChangeText={(e) => setConfirmPassword(e)}
                    value={confirmPassword}
                    secureTextEntry
                    keyboardType='numeric'
                    onBlur={() => unActiveInput('confirmPassword')}
                    onFocus={() => activeInput('confirmPassword')}
                    inputStyle={{ borderColor: enpasswordStatus === 1 ? Colors.sky : Colors.InputColor }}
                    LabelStyle={{ paddingHorizontal: enpasswordStatus === 1 ? 10 : 0, color: enpasswordStatus === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                    styleCont={{ marginTop: 0 }}
                />

                <View style={styles.wrapCheck}>
                    <CheckBox checked={select} color={select ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: select ? Colors.sky : '#DBDBDB', width: 18, height: 18, }} onPress={() => setSelect(!select)} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={styles.Policy}>{i18n.t('agreeTo')}</Text>
                        <Text style={styles.Prill}>{i18n.t('term')}</Text>
                    </View>
                </View>
                {
                    spinner ?
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 99999,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}>
                            <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center' }} />
                        </View>
                        :
                        <BTN title={i18n.t('register')} ContainerStyle={styles.LoginBtn} onPress={SubmitRegister} disabled={!select} />
                }
            </ScrollView>
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
    },
    Prill: {
        color: Colors.sky,
        marginHorizontal: 20,
        fontSize: 14,
        fontFamily: 'flatMedium'
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
        marginHorizontal: "5%"
    },

    UText: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        marginVertical: 10,
        color: Colors.fontNormal
    },
    wrapCheck: {
        flexDirection: 'row',
        marginHorizontal: '3%',
    },
    Policy: {
        marginHorizontal: 20,
        fontSize: 12,
        fontFamily: 'flatMedium'

    }
    ,
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 5,
        marginHorizontal: 20,
        width: '90%',
    }
})
export default Register
