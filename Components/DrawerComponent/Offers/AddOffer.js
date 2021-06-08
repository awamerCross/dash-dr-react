import React, { useEffect, useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList, TouchableOpacity, Modal, Platform, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';
import { GetBanners, DeleteBanners, AddBanners } from '../../../store/action/OffersAction';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Container from '../../../common/Container';
import HomeHeader from '../../../common/HomeHeader';
import { _renderRows } from '../../../common/LoaderImage';

const { width, height } = Dimensions.get('window')

function Previousoffers({ navigation }) {

    const dispatch = useDispatch();
    const Banners = useSelector(state => state.Banner.Banners ? state.Banner.Banners : [])
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [modalVisible, setModalVisible] = useState(false);
    const [base64, setBase64] = useState(null);
    const [userImage, setUserImage] = useState();
    const [spinner, setSpinner] = useState(false);

    const [Loader, setLoader] = useState(false)
    let loadingAnimated = []

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoader(true)
            dispatch(GetBanners(token, lang)).then(() => setLoader(false))
        });

        return unsubscribe;

    }, [navigation]);


    const DeleteCardBanners = (id) => {
        setLoader(true)
        dispatch(DeleteBanners(token, id, lang)).then(() => dispatch(GetBanners(token, lang)).then(() => setLoader(false)))

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
    const Add_Banner = () => {
        setLoader(true)
        dispatch(AddBanners(token, base64, lang)).then(() => dispatch(GetBanners(token, lang)).then(() => setLoader(false)))
        setUserImage()
        setModalVisible(false)


    }


    return (


        <ScrollView style={{ flex: 1 }}>
            <HomeHeader navigation={navigation} label={i18n.t('offers')} onPress={() => navigation.navigate('MyProfile')} />


            <Card />
            <BTN title={i18n.t('AddOffer')} ContainerStyle={{ marginHorizontal: '5%', width: '90%', borderRadius: 25 }} onPress={() => setModalVisible(true)} />




            {
                Loader ?

                    _renderRows(loadingAnimated, 5, '2rows', width * .9, 130, { flexDirection: 'column', }, { borderRadius: 5, })
                    :
                    !Banners.length ?
                        <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={Banners}
                            extraData={spinner, Loader}
                            keyExtractor={(item) => "_" + item.id}
                            renderItem={({ item, index }) =>


                                (
                                    <View style={styles.Card}>
                                        <View style={{ flexDirection: 'row', height: '100%', }}>
                                            <Image source={{ uri: item.image }} style={{ height: '100%', width: '25%' }} />
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 10, width: '85%' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%' }}>

                                                    <Text style={[styles.CardText, { color: Colors.sky, top: 20, fontSize: 16 }]}>{i18n.t('num')} : {index + 1}</Text>


                                                    <TouchableOpacity onPress={() => DeleteCardBanners(item.id)} style={{ marginTop: 25 }}>
                                                        <Image source={require('../../../assets/Images/Email_delete.png')} style={{ height: 22, width: 22, }} />
                                                    </TouchableOpacity>

                                                </View>
                                                <View style={{ flexDirection: 'row', top: 15 }}>
                                                    <Text style={styles.CardText}>{i18n.t('Dateaddition')} : </Text>
                                                    <Text style={styles.CardText}> {item.date}</Text>
                                                </View>
                                                <BTN title={item.status} ContainerStyle={styles.LoginBtn} onPress={() => { }} TextStyle={{ color: item.type === 'rejected' ? Colors.RedColor : item.type == 'waiting' ? Colors.IconBlack : item.type == 'accepted' ? Colors.GradianGreen : null }} />
                                            </View>
                                        </View>
                                    </View>

                                )} />}

            <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible} >

                    <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.centeredView, { backgroundColor: Colors.bg, opacity: Platform.OS == 'ios' ? .98 : .89 }]}>
                        <View style={styles.modalView}>
                            <View style={{ margin: 20, }}>
                                <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('AddBanner')} </Text>


                                <TouchableOpacity onPress={_pickImage}>
                                    {
                                        userImage ?
                                            <Image source={{ uri: userImage }} style={{ width: 100, height: 100, marginTop: 30, alignSelf: 'center', borderRadius: 15 }} />
                                            :
                                            <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 100, marginTop: 30, alignSelf: 'center', borderRadius: 15 }} />

                                    }
                                </TouchableOpacity>
                                <BTN title={i18n.t('AddBanner')} ContainerStyle={styles.LoginBtn1} onPress={Add_Banner} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </TouchableOpacity>
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
        marginHorizontal: 0,
        width: '80%',
        backgroundColor: '#ECECEC',
        marginBottom: 30

    },
    Card: {
        height: 140,
        shadowColor: Colors.bg,
        marginHorizontal: '5%',
        borderRadius: 5,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        marginTop: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        opacity: Platform.OS ? .98 : .9,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },

    LoginBtn1: {
        borderRadius: 5,

    },
})


export default Previousoffers
