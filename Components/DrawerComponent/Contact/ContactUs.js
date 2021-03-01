import React, { useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Card from '../../../common/Card';
import BTN from '../../../common/BTN';
import { InputIcon } from '../../../common/InputText';
import { validateUserName, validateEmail } from '../../../common/Validation';
import Container from '../../../common/Container';
import { SendComplaiment } from '../../../store/action/CommentsAction';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from '../../../common/Toaster';
import HomeHeader from '../../../common/HomeHeader';

const { width } = Dimensions.get('window')


function ContactUs({ navigation }) {
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [Message, setMessage] = useState('');
    const token = useSelector(state => state.auth.user.data.token)
    const [spinner, setSpinner] = useState(false);
    const lang = useSelector(state => state.lang.language);

    const dispatch = useDispatch();

    const _validate = () => {


        let nameA = validateUserName(name)
        let emailErr = validateEmail(email);
        let MessageErr = Message == '' ? `${i18n.t('EnterDetailes')}` : null
        return nameA || emailErr || MessageErr
    }

    const SendComplaimentation = () => {
        let val = _validate()
        if (!val) {
            setSpinner(true)
            dispatch(SendComplaiment(token, name, email, Message, lang))
            setName('')
            setMessage('')
            setemail('')
            setSpinner(false)
        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
            <HomeHeader navigation={navigation} label={i18n.t('contactus')} onPress={() => navigation.navigate('MyProfile')} />

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Card />
                <InputIcon
                    label={i18n.t('username')}
                    placeholder={i18n.t('username')}
                    onChangeText={(e) => setName(e)}
                    value={name}
                    styleCont={{ marginTop: 60 }}
                    inputStyle={{ paddingTop: Platform.OS = 'ios' ? 5 : 0, }}

                />
                <InputIcon
                    label={i18n.t('email')}
                    placeholder={i18n.t('email')}
                    onChangeText={(e) => setemail(e)}
                    value={email}
                    keyboardType='email-address'
                    styleCont={{ marginTop: 0 }}
                    inputStyle={{ paddingTop: Platform.OS = 'ios' ? 10 : 0, }}

                />


                <InputIcon


                    placeholder={i18n.t('message')}
                    styleCont={{ height: 160, marginTop: 20, width: '90%' }}
                    inputStyle={{ paddingHorizontal: 0, paddingStart: 10 }}
                    LabelStyle={{ bottom: width * .9, }}
                    placeholder={i18n.t('message')}
                    onChangeText={(e) => setMessage(e)}
                    value={Message}
                    inputStyle={{ paddingTop: Platform.OS = 'ios' ? 15 : 0, }}

                    multiline={true}
                    numberOfLines={10} />

                <Container loading={spinner}>

                    <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={SendComplaimentation} />
                </Container>

            </KeyboardAvoidingView>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginTop: 10,
        marginEnd: 5,
        height: 110,
        width: width * .3,
        flex: 1

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    CardText: {
        fontFamily: 'flatMedium',
        fontSize: 13,
        color: Colors.IconBlack,
        marginVertical: 5
    },
    LoginBtn: {
        marginVertical: 10,
        borderRadius: 5,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 0

    },
    Card: {
        height: 140,
        shadowColor: Colors.bg,
        margin: 10,
        borderRadius: 10,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
    },

})

export default ContactUs
