import React, { useState, useEffect } from 'react'
import Container from '../../../common/Container'
import { height, width } from '../../../consts/HeightWidth'
import { validateUserName, validateAccountNum, valdiateMoney } from '../../../common/Validation'
import { Toaster } from '../../../common/Toaster'
import { InputIcon } from '../../../common/InputText'
import BTN from '../../../common/BTN'
import { useDispatch, useSelector } from 'react-redux'
import { SendTransferFromACc } from '../../../store/action/CommentsAction'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, Image, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import Colors from '../../../consts/Colors'
import i18n from '../../../locale/i18n'
import Header from '../../../common/Header'
import { ToasterNative } from '../../../common/ToasterNative'
import Loading from '../../../common/LoadIng'

function TransferMony({ navigation, route }) {
    const { AccountId } = route.params;

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(true);
    const [Bankname, setName] = useState('');
    const [accountNAme, setAcoountname] = useState("");
    const [accountnum, setAccountnum] = useState('');
    const [money, setMoney] = useState('');
    const [base64, setBase64] = useState('');
    const [userImage, setUserImage] = useState('');

    const dispatch = useDispatch();

    const _validate = () => {
        let BanknameErr = Bankname == '' ? i18n.t('bankname') : null
        let AccountnameErr = accountNAme == "" ? i18n.t('AccountUser') : null
        let accountnumErr = validateAccountNum(accountnum)
        let moneyErr = valdiateMoney(money);
        let baseErr = base64 == '' ? i18n.t('PickImage') : null;



        return BanknameErr || AccountnameErr || accountnumErr || moneyErr || baseErr
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setName('')
            setAcoountname('')
            setAccountnum('')
            setUserImage('')
            setMoney('')
            setSpinner(false)
        });

        return unsubscribe;
    }, [navigation])

    const SubmitHandler = () => {
        const isVal = _validate();
        if (!isVal) {
            setSpinner(true)
            dispatch(SendTransferFromACc(token, lang, AccountId, base64, Bankname, accountNAme, accountnum, money, navigation)).then(() => setSpinner(false))

        }
        else {
            setSpinner(false)
            ToasterNative(_validate(), 'danger', 'bottom')
        }
    }


    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };
    const _pickImage = async () => {

        askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };


    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : "height"} style={{ backgroundColor: 'white', flex: 1 }}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>

                <Header navigation={navigation} label={i18n.t('Banktransfer')} />

                <View style={{ width, height: 100, marginTop: 30, alignItems: 'center', }}>
                    <TouchableOpacity onPress={_pickImage}>
                        {
                            userImage == '' ?
                                <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 15 }} resizeMode='contain' />
                                :
                                <Image source={{ uri: userImage }} style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 15 }} resizeMode='contain' />

                        }
                    </TouchableOpacity>

                </View>


                <Text style={{ fontSize: 14, color: Colors.IconBlack, fontFamily: 'flatMedium', textAlign: 'center', marginTop: 20 }}> {i18n.t('Bankpicture')}</Text>
                <InputIcon
                    label={i18n.t("bankname")}
                    placeholder={i18n.t("bankname")}
                    value={Bankname}
                    onChangeText={(e) => setName(e)}
                    styleCont={{ marginTop: 20, }}
                    inputStyle={{ borderRadius: 25 }}

                />

                <InputIcon
                    label={i18n.t("AccountUser")}
                    placeholder={i18n.t("AccountUser")}
                    value={accountNAme}
                    onChangeText={(e) => setAcoountname(e)}
                    styleCont={{ marginTop: 20 }}
                    inputStyle={{ borderRadius: 25 }}

                />

                <InputIcon
                    label={i18n.t("Accnum")}
                    placeholder={i18n.t("Accnum")}
                    value={accountnum}
                    onChangeText={(e) => setAccountnum(e)}
                    styleCont={{ marginTop: 20 }}
                    inputStyle={{ borderRadius: 25 }}


                />
                <InputIcon
                    label={i18n.t("moneyPaied")}
                    placeholder={i18n.t("moneyPaied")}
                    value={money}
                    onChangeText={(e) => setMoney(e)}
                    styleCont={{ marginTop: 20 }}
                    inputStyle={{ borderRadius: 25 }}
                    keyboardType='numeric'

                />

                <Loading loading={spinner}>
                    <BTN title={i18n.t("send")} onPress={SubmitHandler} ContainerStyle={{ borderRadius: 10 }} />
                </Loading>

            </ScrollView>
        </KeyboardAvoidingView>


    )
}

export default TransferMony
