import React, { useEffect, useState, useRef } from 'react'
import { View, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, Modal, Image, Button, Alert, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import Colors from '../../consts/Colors';
import BackBtn from '../../common/BackBtn';
import i18n from '../../locale/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { GetDepartment, getCititis } from '../../store/action/CitiesAction';
import { width, height } from '../../consts/HeightWidth';
import { InputIcon } from '../../common/InputText';
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { validateUserName, ValdiateDebId, ValdiateCITyId, ValditeCommercialRegister, ValdiateBranch } from '../../common/Validation';
import BTN from '../../common/BTN';
import { Toaster } from '../../common/Toaster';
import Container from '../../common/Container';
import * as Animatable from 'react-native-animatable';
import { InputImage } from '../../common/InputIcon';
import { ToasterNative } from '../../common/ToasterNative';

const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;


function SRegister({ navigation, route }) {
    const dispatch = useDispatch()


    const Depatrmens = useSelector(state => state.cities.deparment);
    const lang = useSelector(state => state.lang.language);
    const cities = useSelector(state => state.cities.cities)
    const [initMap, setInitMap] = useState(true);

    let DebName = Depatrmens.map(deb => ({ label: deb.name, value: deb.id }));
    let DebId = Depatrmens.map(deb => ({ label: deb.name }));
    let cityName = cities.map(city => ({ label: city.name, value: city.id }));
    let CityID = cities.map(city => ({ label: city.name, }));

    const [city, setCity] = useState(null);
    // const [MyLocation, setLocation] = useState('');
    const [spinner, setSpinner] = useState(true);
    const [LOcation, setLOcation] = useState()
    const [department, setDepartment] = useState(null)
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [BranchNum, setBranchNum] = useState('');
    const [CommercialRegister, setCommercialRegister] = useState('');
    const [isopened, setisopened] = useState(false)
    const [mapRegion, setMapRegion] = useState({
        latitude: '24.774265',
        longitude: '46.738586',
        latitudeDelta,
        longitudeDelta
    });
    let mapRef = useRef(null);

    const FetchDataError = () => {
        fetchData();

    }
    const _validate = () => {

        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        let CityID = city === null ? i18n.t('CityId') : null
        let DebId = department === null ? i18n.t('DepId') : null

        let ValditeCommercialRegisterErr = ValditeCommercialRegister(CommercialRegister)
        let BranchErr = ValdiateBranch(BranchNum);
        let MapRegeionEroor = mapRegion.latitude == null ? FetchDataError() : null
        return nameErr || nameEnErr || CityID || DebId || ValditeCommercialRegisterErr || BranchErr || MapRegeionEroor
    }
    useEffect(() => {
    }, [LOcation, mapRegion]);



    const _handleMapRegionChange = async (mapCoordinate) => {

        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';


        try {
            const { data } = await axios.get(getCity);
            setLOcation(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {

        // const { status, } = await Permissions.askAsync(Permissions.LOCATION);

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {

            Alert.alert(
                //title
                'مرحبا',
                //body
                'صلاحيات تحديد موقعك الحالي ملغاه ?',
                [
                    // {
                    //     text: 'Yes',
                    //     onPress: () => console.log('Yes Pressed')
                    // },
                    {
                        text: 'ok',
                        onPress: () => console.log('No Pressed'), style: 'cancel'
                    },
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
            );

        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});


            userLocation = { latitude, longitude, latitudeDelta, longitudeDelta };

            setMapRegion(userLocation);

        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += userLocation.latitude + ',' + userLocation.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
            setLOcation(data.results[0].formatted_address)

        } catch (e) {
            console.log(e);
        }
        const { data } = await axios.get(getCity);
        setLOcation(data.results[0].formatted_address)
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            setSpinner(true)

            fetchData();
            dispatch(getCititis(lang)).then(() =>
                dispatch(GetDepartment(lang)))
                .then(() => setSpinner(false)).catch((e) => { setSpinner(false); console.warn(e); })
        });

        return unsubscribe;
    }, [navigation])




    const NavigateToNextLocation = () => {
        let val = _validate()
        if (!val) {
            mapRegion.latitude == null ?
                fetchData() :
                navigation.navigate('TRegister', {
                    name: route.params.name,
                    phone: route.params.phone,
                    email: route.params.email,
                    isowner: route.params.isowner,
                    password: route.params.password,
                    department: department,
                    nameAR: nameAR,
                    nameEN: nameEN,
                    city: city,
                    BranchNum: BranchNum,
                    CommercialRegister: CommercialRegister,
                    MyLocation: LOcation,
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude
                })
        }
        else {
            ToasterNative(_validate(), 'danger', 'bottom');

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>

                <BackBtn navigation={navigation} />

                <View style={{ flexDirection: 'column', paddingStart: '5%', alignSelf: 'flex-start' }}>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={styles.TextLogin}>{i18n.t('createAcc')}</Text>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={styles.UText}>{i18n.t('Activity')}</Text>
                    <Text animation='bounceIn' easing="ease-out" delay={500} style={[styles.TextLogin, { paddingVertical: 10, }]}>{i18n.t('storeInfo')}</Text>
                </View>

                <Container loading={spinner}>

                    <Dropdown
                        placeholder={i18n.t('dep')}
                        data={DebName}
                        fontSize={16}
                        pickerStyle={{ marginTop: 70, margin: 5, flex: 1 }}
                        labelFontSize={16}
                        itemTextStyle={{ fontFamily: 'flatMedium' }}
                        itemTextStyle={{ fontSize: 18, fontFamily: 'flatMedium' }}
                        lineWidth={0}
                        containerStyle={{ justifyContent: 'center', marginHorizontal: '5%', borderWidth: 1, borderColor: '#E0E0E0', paddingHorizontal: 10, height: 60, borderRadius: 5, paddingBottom: 15, marginTop: 20 }}
                        animationDuration={0}
                        onChangeText={val => setDepartment(val)}
                        value={DebId.label}
                    />

                    <InputIcon
                        label={i18n.t('ResNameAr')}
                        placeholder={i18n.t('ResNameAr')}
                        onChangeText={(e) => setNameAr(e)}
                        value={nameAR}
                        styleCont={{ marginTop: 20 }}
                    />

                    <InputIcon
                        label={i18n.t('ResNameEn')}
                        placeholder={i18n.t('ResNameEn')}
                        onChangeText={(e) => setNameEN(e)}
                        value={nameEN}
                        styleCont={{ marginTop: 20 }}

                    />


                    <TouchableOpacity onPress={() => mapRegion.latitude == null ? fetchData() : setisopened(true)} style={styles.WrapLocation}>
                        {
                            mapRegion.latitude == null ?
                                <Text style={styles.location} numberOfLines={1}>{i18n.t('Location')}</Text>
                                :
                                <Text style={styles.location}>{LOcation}</Text>

                        }
                        <Image source={require('../../assets/Images/location_gray.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
                    </TouchableOpacity>




                    {

                        isopened ?
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isopened}   >

                                <View style={{ flex: 1, }}>
                                    <MapView
                                        userInterfaceStyle={'dark'}
                                        style={{ flex: 1, }}
                                        onRegionChangeComplete={(e) => _handleMapRegionChange(e)}
                                        customMapStyle={mapStyle}
                                        initialRegion={mapRegion}
                                        showsUserLocation={true}
                                        zoomControlEnabled={true}
                                        showsTraffic={true}
                                    />

                                    <View style={styles.markerFixed}>
                                        <Image style={styles.marker} source={require('../../assets/Images/map_pin.png')} resizeMode='contain' />
                                    </View>
                                    <SafeAreaView style={styles.footer}>
                                        <TouchableOpacity onPress={() => setisopened(false)} style={styles.wrbLocations}>
                                            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'flatMedium', alignSelf: 'center' }}>{i18n.t('save')}</Text>
                                        </TouchableOpacity>
                                    </SafeAreaView>
                                </View>

                            </Modal>
                            :
                            (<View />)
                    }

                    <Dropdown
                        placeholder={i18n.t('city')}
                        data={cityName}
                        fontSize={16}
                        labelFontSize={16}
                        itemTextStyle={{ fontFamily: 'flatMedium', fontSize: 16 }}
                        lineWidth={0}
                        containerStyle={{ justifyContent: 'center', marginHorizontal: '5%', borderWidth: 1, borderColor: '#E0E0E0', paddingHorizontal: 10, height: 60, borderRadius: 5, paddingBottom: 15, marginTop: 20 }}
                        animationDuration={0}
                        onChangeText={val => setCity(val)}
                        pickerStyle={{ marginTop: 70, margin: 5, flex: 1 }}

                        value={CityID.label}
                    />

                    <InputIcon
                        label={i18n.t('branchNum')}
                        placeholder={i18n.t('branchNum')}
                        keyboardType='numeric'
                        onChangeText={(e) => setBranchNum(e)}
                        value={BranchNum}
                        styleCont={{ marginTop: 20 }}

                    />
                    <InputIcon
                        label={i18n.t('CommercialRegister')}
                        placeholder={i18n.t('CommercialRegister')}
                        keyboardType='numeric'
                        onChangeText={(e) => setCommercialRegister(e)}
                        value={CommercialRegister}
                        styleCont={{ marginTop: 20 }}

                    />
                    <BTN title={i18n.t('continue')} ContainerStyle={styles.LoginBtn} onPress={NavigateToNextLocation} />
                </Container>

            </ScrollView>
        </KeyboardAvoidingView >


    )
}

const styles = StyleSheet.create({
    UText: {
        fontFamily: 'flatMedium',
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: Platform.OS === 'ios' ? .98 : .9,

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 5,
        width: '100%',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden'
    },
    LoginBtn: {
        borderRadius: 15,
        marginHorizontal: '5%',
    },

    location: {
        color: Colors.InputColor,
        fontFamily: 'flatMedium',
        fontSize: 12, marginStart: 5
    },
    DrbDown: {
        borderWidth: .6,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: Colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        height: width * .14,
        borderColor: Colors.fontNormal,
        marginHorizontal: '5%',
    },
    FDrbDown: {
        borderWidth: .5,

        borderRadius: 5,
        backgroundColor: Colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        height: width * .14,
        borderColor: Colors.fontNormal,
        marginHorizontal: '5%',
        marginTop: 10
    },
    WrapLocation: {
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: "5%",
        borderWidth: .4,
        borderColor: Colors.fontNormal,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingEnd: 20,
        paddingStart: 10,
        marginTop: 20,
        padding: 20
    },
    wrbLocations: {
        backgroundColor: Colors.sky,
        width: '100%',
        padding: 15,
        alignItems: 'center'
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    }

})

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: '#CDCDCD'
            }
        ]
    },
    {
        elementType: "flatMedium",
        stylers: [
            {
                color: Colors.IconBlack
            }
        ]
    },
    {
        featureType: "water",
        elementType: "flatMedium",
        stylers: [
            {
                color: Colors.bg
            }
        ]
    },
    {
        featureType: "water",
        elementType: "flatMedium",
        stylers: [
            {
                color: "#E8E8E8"
            }
        ]
    }
];
export default SRegister
