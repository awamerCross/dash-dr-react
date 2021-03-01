import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { InputIcon } from '../../common/InputText'
import { validateUserName, validateEmail, ValdiateCITyId, validatePhone } from '../../common/Validation'
import { Dropdown } from 'react-native-material-dropdown';
import BTN from '../../common/BTN'
import { width } from '../../consts/HeightWidth'
import { useSelector, useDispatch } from 'react-redux'
import { getCititis } from '../../store/action/CitiesAction'
import { UpdateProfile, GetProfile } from '../../store/action/ProfileAction'
import { Toaster } from '../../common/Toaster'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ProductDetailes } from '../../store/action/ProductAction'
import Container from '../../common/Container'
import { ToasterNative } from '../../common/ToasterNative'

function EditProfile({ navigation }) {
    const user = useSelector(state => state.auth.user.data)

    const [nameEN, setNameEN] = useState(user.name)
    const [email, setemail] = useState(user.email)
    const [city, setCity] = useState(user.provider.city)
    const [phone, setPhone] = useState(user.phone)
    const [base64, setBase64] = useState(null);
    const [userImage, setUserImage] = useState(user.avatar);

    const [spinner, setSpinner] = useState(true);

    const cities = useSelector(state => state.cities.cities)
    const lang = useSelector(state => state.lang.language);
    const token = useSelector(state => state.auth.user.data.token);
    const myProf = useSelector(state => state.profile.user.data);


    let image = userImage;


    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    // let CityID = cities.map(city => ({ label: city.name, }));

    const dispatch = useDispatch();

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,

                base64: true,
                aspect: [4, 3],
                quality: .5,
            });

            if (!result.cancelled) {
                setUserImage(result.uri);
                setBase64(result.base64);
            }

        }
        else {
            ToasterNative(i18n.t('CammeraErr'), "danger", 'top')

        }
    };

    const _validate = () => {
        let nameErr = validateUserName(nameEN)
        let CityID = ValdiateCITyId(city)
        let emailErr = validateEmail(email)
        let PhoenErr = validatePhone(phone);


        return nameErr || CityID || emailErr || PhoenErr
    };



    function renderLoader() {
        if (spinner) {
            return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: '#23232387',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center', }} />
                </View>
            );
        }
    }





    const UpdateData = () => {
        let val = _validate();

        if (!val) {
            setSpinner(true)
            dispatch(UpdateProfile(token, lang, nameEN, phone, email, base64, navigation)).then(() => setSpinner(false))

        }
        else {
            setSpinner(false)
            Toaster(_validate());

        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getCititis(lang));
            dispatch(GetProfile(token, lang)).then(() => setSpinner(false))
        })

        return unsubscribe;

    }, [navigation])


    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : "height"} style={{ backgroundColor: 'white', flex: 1 }}>


            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {renderLoader()}
                <Image source={image != null ? { uri: image } : { uri: userImage }} style={styles.ImgBackGround} />
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', top: 150 }} onPress={_pickImage}>
                    <Image source={require('../../assets/Images/add_photo_white.png')} style={{ width: 80, height: 80, }} />
                </TouchableOpacity>



                <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', transform: I18nManager.isRTL ? [{ rotateY: '0deg' }] : [{ rotateY: '-180deg' }], right: 0, left: 0, alignSelf: 'flex-end', marginLeft: -10 }} resizeMode='contain'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, padding: 15, top: 15 }} resizeMode='contain' />
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.ScrolContainer}>

                    <Text style={styles.MainText}>{i18n.t('edit') + " " + i18n.t('myProfile')}</Text>


                    <View style={{ margin: 20, marginTop: 0, }}>

                        <InputIcon
                            label={i18n.t('name')}
                            placeholder={i18n.t('name')}
                            onChangeText={(e) => setNameEN(e)}
                            value={nameEN}
                            styleCont={{ marginTop: 0 }}
                            inputStyle={{ paddingTop: Platform.OS == 'ios' ? 20 : 0 }}
                            multiline={true}
                            numberOfLines={1}

                        />


                        <InputIcon
                            label={i18n.t('email')}
                            placeholder={i18n.t('email')}
                            onChangeText={(e) => setemail(e)}
                            value={email}
                            multiline={true}
                            inputStyle={{ paddingTop: Platform.OS == 'ios' ? 20 : 0 }}
                            numberOfLines={1}
                            keyboardType='email-address'
                            styleCont={{ marginTop: 0 }}
                        />

                        <InputIcon
                            label={i18n.t('phone')}
                            placeholder={i18n.t('phone')}
                            onChangeText={(e) => setPhone(e)}
                            value={phone}
                            multiline={true}
                            numberOfLines={1}
                            inputStyle={{ paddingTop: Platform.OS == 'ios' ? 20 : 0 }}
                            keyboardType='numeric'
                            styleCont={{ marginTop: 0 }}
                        />



                        <BTN title={i18n.t('save')} ContainerStyle={styles.LoginBtn} onPress={UpdateData} />



                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        margin: 20,
        paddingStart: 15,
        alignSelf: 'flex-start'
    },
    user: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal
    },
    EditImg: {
        width: 20,
        height: 20
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '100%',
        height: 400,
        opacity: .7
    },

    ScrolContainer: {
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0, height: 350,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '90%',
        borderRadius: 5,
        marginHorizontal: "5%"
    },
    LoginBtn: {
        borderRadius: 15,
        marginHorizontal: 20,
        width: '90%',
        marginTop: 0

    }
})
export default EditProfile
