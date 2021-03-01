import React, { useEffect, useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, FlatList, TouchableOpacity, Modal, Platform, ScrollView } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import BTN from '../../../common/BTN';
import Card from '../../../common/Card';
import { GetBanners, DeleteBanners, AddBanners } from '../../../store/action/OffersAction';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window')

function Previousoffers({ navigation }) {

    const dispatch = useDispatch();
    const Banners = useSelector(state => state.Banner.Banners.data)
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language.data);
    const [modalVisible, setModalVisible] = useState(false);
    const [base64, setBase64] = useState('');
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {

        dispatch(GetBanners(token, lang))

    }, [])


    const DeleteCardBanners = async (id) => {
        await dispatch(DeleteBanners(token, id))
        await dispatch(GetBanners(token, lang))
        setTimeout(() => {
            dispatch(GetBanners(token, lang));
        }, 1000);

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

    const Add_menue = async () => {
        await dispatch(AddBanners(token, base64, lang))
        dispatch(GetBanners(token, lang))

        setTimeout(() => {
            dispatch(GetBanners(token, lang));

        }, 1000);
        setModalVisible(false)


    }


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('Previousoffers')} />
            <Card />
            <BTN title={i18n.t('AddBanner')} ContainerStyle={{ marginHorizontal: '5%', width: '90%', borderRadius: 15 }} onPress={() => setModalVisible(true)} />




            <ScrollView style={{ flex: 1 }}>
                {
                    Banners.length > 0 ?
                        Banners.map((item, index) => (



                            <View style={styles.Card}>
                                <View style={{ flexDirection: 'row', height: '100%', }}>
                                    <Image source={{ uri: item.image }} style={{ height: '100%', width: '25%' }} />
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 10, width: '85%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%' }}>

                                            <Text style={[styles.CardText, { color: Colors.sky }]}>{i18n.t('num')}:{index + 1}</Text>


                                            <TouchableOpacity onPress={() => DeleteCardBanners(item.id)} >
                                                <Image source={require('../../../assets/Images/Email_delete.png')} style={{ height: 15, width: 15, }} />
                                            </TouchableOpacity>

                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={styles.CardText}>{i18n.t('Dateaddition')} : </Text>
                                            <Text style={styles.CardText}>{item.date}</Text>
                                        </View>
                                        <BTN title={item.status} ContainerStyle={styles.LoginBtn} onPress={() => { }} TextStyle={{ color: item.type === 'rejected' ? Colors.RedColor : item.type == 'waiting' ? Colors.IconBlack : item.type == 'accepted' ? Colors.GradianGreen : null }} />
                                    </View>
                                </View>
                            </View>

                        )) : null
                }

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible} >

                        <View style={[styles.centeredView, { backgroundColor: Colors.bg, opacity: Platform.OS == 'ios' ? .98 : .89 }]}>
                            <View style={styles.modalView}>
                                <View style={{ margin: 20, }}>
                                    <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('AddBanner')} </Text>


                                    <TouchableOpacity onPress={_pickImage}>
                                        <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 100, marginTop: 30, alignSelf: 'center', borderRadius: 15 }} />
                                    </TouchableOpacity>
                                    <BTN title={i18n.t('AddBanner')} ContainerStyle={styles.LoginBtn1} onPress={Add_menue} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>





        </View>
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
        backgroundColor: Colors.InputColor

    },
    Card: {
        height: 140,
        shadowColor: Colors.bg,
        marginHorizontal: '5%',
        borderRadius: 10,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        marginTop: 5
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
        marginVertical: 15,
        borderRadius: 5,
        marginHorizontal: 15,
        width: '91%',
    },
})


export default Previousoffers
