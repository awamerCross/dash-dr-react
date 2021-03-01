import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Modal, StyleSheet, Image, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { Toast, } from "native-base";

import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN';
import { SText } from '../../../common/SText';
import Header from '../../../common/Header';
import { GetSizes } from '../../../store/action/SizesAction';
import { useSelector, useDispatch } from 'react-redux';
import { Add_Products, GetProducts } from '../../../store/action/ProductAction';
import { MenueInfo } from '../../../store/action/MenueAction';
import { width, height } from '../../../consts/HeightWidth';
import { GetExtraProduct, add_extra_ProductsService, edit_extra_ProductsService, delete_extra_ProductsService, temp_extra_ProductsService } from '../../../store/action/ExtraProductAction';
import Container from '../../../common/Container';
import { validateUserName } from '../../../common/Validation';
import { Toaster } from '../../../common/Toaster';
import { GetHomeProducts } from '../../../store/action/HomeAction';
import { ToasterNative } from '../../../common/ToasterNative';
import Loading from '../../../common/LoadIng';


function AddProduct({ navigation }) {

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Menue = useSelector(state => state.menue.menue.data);
    const ExtraProduct = useSelector(state => state.ExtraProduct.ExtraProduct);
    const [ProductExtra, setProductExtra] = useState([])
    const [loading, setloading] = useState(false);


    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')
    const [Sizes, setSizes] = useState([
        { id: 1, name: `${i18n.t('large')}` },
        { id: 2, name: `${i18n.t('mid')}` },
        { id: 3, name: `${i18n.t('small')}` }
    ])
    const [ProductnameExtraAR, setProductnameExtraAR] = useState('');
    const [ProductnameExtraEn, setProductnameExtraEn] = useState('')
    const [priceProductExtra, setPricePrdouctExtra] = useState('');
    const [ExProdId, setExProdId] = useState(0);


    const [price, setPrice] = useState('');
    const [small_price, setsmall_price] = useState('');
    const [mid_price, setmid_price] = useState('');
    const [large_price, setlarge_price] = useState('');
    const [selectedRadion, setSelectedRadio] = useState(1)
    const [spinner, setSpinner] = useState(true);




    const [SizePriceId, SetSizePriceId] = useState([{
        size_id: 1,
        price: small_price,
    },
    {
        size_id: 2,
        price: mid_price,
    },
    {
        size_id: 3,
        price: large_price,
    }
    ]);




    const [availableKilos, setavailableKilos] = useState('');
    const [Discount, setDiscount] = useState('');
    const [quantity, setQuantity] = useState('')
    const [detailesAr, setDetailesAr] = useState('')
    const [detailesEn, setDetailesEn] = useState('')
    const [MenueId, setMenue] = useState('')
    const [available, setavailable] = useState(1);

    const [base64, setBase64] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [EditMaodVisible, setEditMaodVisible] = useState(false);



    let MenueData = Menue.map(menue => ({ label: menue.name, value: menue.id }))
    let MenueName = Menue.map(menue => ({ label: menue.name, }));

    const [data, setData] = useState([
        { id: 1, title: `${i18n.t("yes")}` },
        { id: 0, title: `${i18n.t("no")}` },

    ])




    const dispatch = useDispatch();


    const _validate = () => {

        let nameErr = validateUserName(nameAR)
        let nameEnErr = validateUserName(nameEN)
        let SelectChoice = available === null ? i18n.t('SelectYN') : SelectChoice;
        let piceErr = large_price == '' ? i18n.t('EnterPrice') : null;
        let baseErr = base64 == null ? i18n.t('PickImage') : null;
        let quantityErr = quantity == '' ? i18n.t('EnterQuatity') : null;
        let DetErr = detailesAr == '' ? i18n.t('enterDetaliesAr') : null;
        let Det = detailesEn == '' ? i18n.t('EnterDetailesEn') : null;
        let MenueIdErr = MenueId == '' ? i18n.t('SelectMenue') : null;


        return nameErr || nameEnErr || SelectChoice || piceErr || baseErr || quantityErr || DetErr || Det || MenueIdErr
    }

    const Add_Product = () => {
        let val = _validate();
        if (!val) {
            setloading(true)
            dispatch(Add_Products(token, lang, nameAR, nameEN, detailesAr, detailesEn, available, availableKilos, Discount, quantity, small_price, mid_price, large_price, MenueId, base64, navigation, ExtraProduct)).then(() => setloading(false)).catch((err) => {
                setloading(false)
                ToasterNative(err, 'danger', 'bottom');

            })

        }

        else {
            setloading(false)
            ToasterNative(_validate(), 'danger', 'bottom');


        }
    }





    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            setNameAr('');
            setNameEN('');
            setsmall_price('');
            setmid_price('');
            setlarge_price('');
            setDiscount('');
            setPrice('');
            setavailableKilos('');
            setQuantity('');
            setDetailesAr('');
            setDetailesEn('');
            setProductExtra([])
            GetExtraProduct()
            dispatch(temp_extra_ProductsService())
            dispatch(MenueInfo(lang, token)).then(() => setSpinner(false))


        });


        return unsubscribe;

    }, [navigation]);






    const _pickImage = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
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






    const handaleChange = (e, IdSelect) => {
        let array = SizePriceId;
        let ID = array.findIndex(id => id.size_id === IdSelect);
        array[ID].price = e

        SetSizePriceId(array)

    }




    const validateExtraProduce = () => {

        let nameErr = validateUserName(ProductnameExtraAR)
        let nameEnErr = validateUserName(ProductnameExtraEn)
        let piceErr = priceProductExtra == '' ? i18n.t('EnterPrice') : null;

        return nameErr || nameEnErr || piceErr
    }


    const submitData = () => {
        let val = validateExtraProduce()

        if (!val) {

            if (ProductnameExtraAR && ProductnameExtraEn && !ExProdId) {
                const newEmployee = {
                    id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
                    name_ar: ProductnameExtraAR,
                    name_en: ProductnameExtraEn,
                    price: priceProductExtra
                };
                dispatch(add_extra_ProductsService(newEmployee))

            } else if (ProductnameExtraAR && ProductnameExtraEn && ExProdId) {
                const updatedDetails = {
                    id: ExProdId,
                    name_ar: ProductnameExtraAR,
                    name_en: ProductnameExtraEn,
                    price: priceProductExtra
                };
                dispatch(add_extra_ProductsService(updatedDetails));

            } else {
                Alert.alert('Enter Extra Data.');
            }
            setEditMaodVisible(false)
            setPricePrdouctExtra('');
            setProductnameExtraAR('');
            setProductnameExtraEn('');

            clearData();

        }
        else {
            ToasterNative(validateExtraProduce(), 'danger', 'top');


        }

    }



    const deleteExtraProduct = (id) => {
        clearData();
        dispatch(delete_extra_ProductsService(id));
        // setProductExtra([ExtraProduct])
    }



    const clearData = () => {
        setExProdId('');
        setPricePrdouctExtra('')
        setProductnameExtraAR('')
        setProductnameExtraEn('')
    }

    const handaleChangeDiscount = (e) => {
        if (e >= 100) {
            setDiscount('')
            ToasterNative(i18n.t('discountAvg'), 'danger', 'bottom')


        }
    }

    return (

        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : 'height'} style={{ backgroundColor: 'white', flex: 1 }}>

            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
                <Header navigation={navigation} label={i18n.t('AddPro')} />
                <Container loading={spinner}>

                    <InputIcon

                        label={i18n.t('prodnameAr')}
                        placeholder={i18n.t('prodnameAr')}
                        onChangeText={(e) => setNameAr(e)}
                        value={nameAR}

                    />
                    <InputIcon

                        label={i18n.t('prodnameEn')}
                        placeholder={i18n.t('prodnameEn')}
                        onChangeText={(e) => setNameEN(e)}
                        value={nameEN}
                        styleCont={{ marginTop: 0 }}


                    />

                    <Text style={{ marginStart: 20, fontFamily: 'flatMedium', fontSize: 16, alignSelf: 'flex-start' }}>{i18n.t('addSize')}</Text>
                    <View style={{ alignItems: 'center', marginTop: 10, borderWidth: 1, height: 50, marginHorizontal: "5%", borderColor: '#E0E0E0', borderRadius: 5, flexDirection: 'row' }}>

                        {
                            Sizes.map((size, index) => {
                                return (

                                    <View key={index.toString()} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 25, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => { setSelectedRadio(size.id) }} style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <View style={{
                                                height: 15,
                                                width: 15,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: selectedRadion === size.id ? Colors.sky : Colors.fontNormal,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center',

                                            }}>
                                                {
                                                    selectedRadion === size.id ?
                                                        <View style={{
                                                            height: 6,
                                                            width: 6,
                                                            borderRadius: 6,
                                                            backgroundColor: Colors.sky,
                                                        }} />
                                                        : null
                                                }
                                            </View>
                                            <Text style={[styles.sText, { color: selectedRadion === size.id ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{size.name}</Text>

                                        </TouchableOpacity>


                                    </View>
                                )
                            })

                        }

                    </View>

                    {
                        selectedRadion === 1 ?
                            <InputIcon
                                styleCont={{ marginTop: 20 }}
                                label={i18n.t('price')}
                                placeholder={i18n.t('price')}

                                onChangeText={(e) => { setlarge_price(e); handaleChange(e, 1) }}
                                keyboardType='numeric'
                                value={large_price}
                            />
                            :
                            selectedRadion === 2 ?
                                <InputIcon
                                    styleCont={{ marginTop: 20 }}
                                    placeholder={`${i18n.t('MidlePrice')} (${i18n.t('optional')})`}
                                    label={`${i18n.t('MidlePrice')} (${i18n.t('optional')})`}
                                    onChangeText={(e) => { setmid_price(e); handaleChange(e, 3) }}
                                    value={mid_price}
                                    keyboardType='numeric'

                                />
                                :
                                selectedRadion === 3 ?
                                    <InputIcon
                                        styleCont={{ marginTop: 20 }}
                                        label={`${i18n.t('SmallPrice')} (${i18n.t('optional')})`}
                                        placeholder={`${i18n.t('SmallPrice')} (${i18n.t('optional')})`}

                                        onChangeText={(e) => { setsmall_price(e); handaleChange(e, 2) }}
                                        value={small_price}
                                        keyboardType='numeric'
                                    />
                                    : null

                    }




                    <InputIcon
                        styleCont={{ marginTop: 0 }}
                        label={i18n.t('discount')}
                        placeholder={i18n.t('discount')}

                        keyboardType='numeric'
                        onChangeText={(e) => { setDiscount(e); handaleChangeDiscount(e) }}
                        value={Discount}
                    />



                    <InputIcon
                        styleCont={{ marginTop: 0 }}
                        label={i18n.t('Availablekilos')}
                        placeholder={i18n.t('Availablekilos')}
                        keyboardType='numeric'
                        onChangeText={(e) => setavailableKilos(e)}
                        value={availableKilos}


                    />

                    <InputIcon
                        styleCont={{ marginTop: 0 }}
                        label={i18n.t('quantity')}
                        placeholder={i18n.t('quantity')}
                        keyboardType='numeric'
                        onChangeText={(e) => setQuantity(e)}
                        value={quantity}

                    />

                    <View style={{ height: width * .14, marginHorizontal: '4%', borderColor: Colors.InputColor, borderWidth: .9, borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <View style={{}}>
                            <Text style={{ color: Colors.fontNormal, fontFamily: 'flatMedium', }}>{i18n.t('available')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            {
                                data.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => { setavailable(item.id) }} key={index.toString()} style={{ flexDirection: 'row', justifyContent: 'center', padding: 5, }}>
                                            <View style={{
                                                height: 15,
                                                width: 15,
                                                borderRadius: 12,
                                                borderWidth: 2,
                                                borderColor: available === item.id ? Colors.sky : Colors.fontNormal,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignSelf: 'center',

                                            }}>
                                                {
                                                    available === item.id ?
                                                        <View style={{
                                                            height: 6,
                                                            width: 6,
                                                            borderRadius: 6,
                                                            backgroundColor: Colors.sky,
                                                        }} />
                                                        : null
                                                }
                                            </View>
                                            <Text style={[styles.sText, { color: available === item.id ? Colors.sky : Colors.fontNormal, left: 6, bottom: 1 }]}>{item.title}</Text>

                                        </TouchableOpacity>



                                    )
                                })
                            }
                        </View>
                    </View>



                    <TouchableOpacity onPress={_pickImage} style={{ height: width * .14, flexDirection: 'row', overflow: 'hidden', marginHorizontal: "4%", borderWidth: 1, borderColor: Colors.InputColor, borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', paddingEnd: 20, marginTop: 15, }}>
                        {
                            userImage ?
                                <Text style={{ color: Colors.InputColor, fontFamily: 'flatMedium', fontSize: 12, marginStart: 10 }} numberOfLines={1}>{userImage}</Text>
                                :
                                <Text style={{ color: Colors.fontNormal, fontFamily: 'flatMedium', fontSize: 12, marginStart: 10, }}>{i18n.t('ProdPice')}</Text>


                        }
                        <Image source={require('../../../assets/Images/camera_gray.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
                    </TouchableOpacity>



                    <View style={{ borderWidth: 1, borderRadius: 5, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .15, marginTop: 15, borderColor: Colors.InputColor, marginHorizontal: '4%' }}>
                        <Dropdown
                            placeholder={i18n.t('menue')}
                            data={MenueData}
                            pickerStyle={{ marginTop: 75, margin: 5, flex: 1 }}

                            fontSize={16}
                            itemTextStyle={{ fontFamily: 'flatMedium' }}
                            lineWidth={0}
                            containerStyle={{ width: '95%', paddingHorizontal: 5, bottom: 10, }}
                            animationDuration={0}
                            onChangeText={val => setMenue(val)}

                            value={MenueName.label}
                        />
                    </View>
                    <InputIcon


                        placeholder={i18n.t('prodDetAr')}
                        styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 20 }}
                        label={i18n.t('prodDetAr')}
                        placeholder={i18n.t('prodDetAr')}
                        multiline={true}
                        numberOfLines={10}
                        inputStyle={{ paddingTop: Platform.OS === 'ios' ? 20 : 0, }}
                        onChangeText={(e) => setDetailesAr(e)}
                        value={detailesAr}
                        LabelStyle={{ bottom: width * .32 }}
                    />


                    <InputIcon
                        styleCont={{ height: width * .35, marginHorizontal: '5%', marginTop: 0 }}
                        label={i18n.t('prodDetEn')}
                        placeholder={i18n.t('prodDetEn')}
                        multiline={true}
                        numberOfLines={10}
                        inputStyle={{ paddingTop: Platform.OS === 'ios' ? 25 : 0, }}

                        onChangeText={(e) => setDetailesEn(e)}
                        value={detailesEn}
                        LabelStyle={{ fontSize: 14, bottom: width * .32, }}
                    />


                    {
                        ExtraProduct.map((proExtra, index) =>
                            (
                                < View key={index.toString()}>
                                    <View style={{ backgroundColor: '#F7F7F7', width: '90%', justifyContent: 'space-between', alignItems: 'center', height: 50, marginHorizontal: '5%', flexDirection: 'row' }} >
                                        <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                                            <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.name_ar.length > 15 ? (proExtra.name_ar).substr(0, 15) + '...' : proExtra.name_ar} - </Text>
                                            <Text style={{ paddingHorizontal: 10, fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.name_en.length > 15 ? (proExtra.name_en).substr(0, 15) + '...' : proExtra.name_en}</Text>
                                            <Text style={{ fontFamily: 'flatMedium', color: Colors.inputTextMainColor }}>{proExtra.price} {i18n.t('Rial')}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.Delete, { alignItems: 'flex-end' }]} onPress={() => deleteExtraProduct(proExtra.id)}>
                                            <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width, height: 1, backgroundColor: Colors.bg }}></View>
                                </View>
                            )
                        )

                    }

                    <SText title={`+ ${i18n.t('AddSpecialProduct')}`} onPress={() => setEditMaodVisible(true)} style={{ color: Colors.sky, fontSize: 15, marginVertical: 20, marginTop: 0, textAlign: 'left', marginHorizontal: '5%' }} />

                    <Loading loading={loading} stylecont={{ marginTop: -10 }}>
                        <BTN title={`+ ${i18n.t('Add')}`} ContainerStyle={styles.LoginBtn} onPress={Add_Product} />
                    </Loading>

                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            style={{ backgroundColor: Colors.bg, }}
                            visible={EditMaodVisible} >

                            <TouchableOpacity onPress={() => setEditMaodVisible(false)} style={styles.centeredView}>
                                <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ backgroundColor: 'white', }}>

                                    <View style={styles.modalView}>
                                        <ScrollView style={{ backgroundColor: Colors.bg, flex: 1, marginTop: 10 }} showsVerticalScrollIndicator={false}>
                                            <InputIcon
                                                styleCont={{ marginTop: 30 }}
                                                label={i18n.t('ExtraProductAr')}
                                                placeholder={i18n.t('ExtraProductAr')}

                                                onChangeText={(e) => setProductnameExtraAR(e)}
                                                value={ProductnameExtraAR}

                                            />
                                            <InputIcon

                                                styleCont={{ marginTop: 0 }}
                                                label={i18n.t('ExtarPrdoctEn')}
                                                placeholder={i18n.t('ExtarPrdoctEn')}
                                                onChangeText={(e) => setProductnameExtraEn(e)}
                                                value={ProductnameExtraEn}

                                            />

                                            <InputIcon
                                                styleCont={{ marginTop: 0 }}
                                                label={i18n.t('price')}
                                                placeholder={i18n.t('price')}
                                                keyboardType='numeric'

                                                onChangeText={(e) => setPricePrdouctExtra(e)}
                                                value={priceProductExtra}
                                            />
                                            <Container loading={loading}>
                                                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={submitData} />
                                            </Container>

                                        </ScrollView>
                                    </View>
                                </KeyboardAvoidingView>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                </Container>

            </ScrollView>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    sText: {
        fontFamily: 'flatMedium',
        color: Colors.fontBold,
        fontSize: width * .036,
        left: 20
    },
    Text: {
        fontFamily: 'flatMedium',
        color: Colors.IconBlack,
        fontSize: width * .04,
    },
    DrbContain: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: "5%"
    },
    LoginBtn: {
        borderRadius: 5,
        marginTop: 0,
        marginHorizontal: '5%',
        width: '90%',
        marginVertical: 5,
        marginBottom: 5

    },
    Img: {
        height: 50,
        width: 20,
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(255,255,255,.6)',

        // backgroundColor: '#737373',
        // opacity: 1,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .49,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Delete: {
        backgroundColor: Colors.RedColor,
        justifyContent: 'flex-end', width: 30,
        alignSelf: 'flex-end'
    },
})
export default AddProduct
