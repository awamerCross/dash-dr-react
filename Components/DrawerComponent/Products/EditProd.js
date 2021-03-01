import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, I18nManager, ImageBackground } from 'react-native'
import Container from '../../../common/Container'
import { useSelector, useDispatch } from 'react-redux'
import { ProductDetailes } from '../../../store/action/ProductAction';
import { InputIcon } from '../../../common/InputText';
import Colors from '../../../consts/Colors'

import i18n from '../../../locale/i18n'


function EditProd({ navigation, route }) {


    const { ProductsId } = route.params;
    console.log(ProductsId);
    const dispatch = useDispatch();

    const [spinner, setspinner] = useState(true)
    const ProductDetA = useSelector(state => state.product.product);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const user = useSelector(state => state.auth.user.data);
    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('')

    console.log(ProductDetA);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setspinner(true)

            dispatch(ProductDetailes(token, lang, ProductsId)).then(() => setspinner(false))
        });
        setNameEN(ProductDetA.name_en)
        setNameAr(ProductDetA.name_ar)
        return unsubscribe;
    }, [navigation, route, spinner]);





    return (
        <Container loading={spinner}>
            <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ right: 20, bottom: 15 }}>
                        <ImageBackground source={require('../../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center' }} resizeMode='contain'>
                            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
                                {
                                    I18nManager.isRTL ?
                                        <Image source={require('../../../assets/Images/arrowwhite.png')} style={{ height: 30, width: 30, marginTop: 45 }} resizeMode='contain' />
                                        :
                                        <Image source={require('../../../assets/Images/left.png')} style={{ height: 30, width: 30, marginTop: 45 }} resizeMode='contain' />

                                }
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
                        <View style={{ marginTop: 45, marginHorizontal: 20 }}>
                            <Image source={require('../../../assets/Images/circlegreen.png')} style={{ height: 10, width: 10, position: 'absolute', alignSelf: 'flex-end', }} />
                            <Image source={{ uri: user.avatar }} style={{ height: 45, width: 45, borderRadius: 50, }} />
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style={{ marginHorizontal: 25, fontFamily: 'flatMedium', fontSize: 18, }}>{i18n.t('edit')}</Text>
                {/* <Header navigation={navigation} label={i18n.t('AddPro')} /> */}

                <InputIcon
                    value={nameAR}
                    label={i18n.t('prodnameAr')}
                    placeholder={i18n.t('prodnameAr')}
                    onChangeText={(e) => setNameAr(e)}

                />
                <InputIcon

                    label={i18n.t('prodnameEn')}
                    placeholder={i18n.t('prodnameEn')}
                    value={nameEN}
                    onChangeText={(e) => setNameEN(e)}
                    styleCont={{ marginTop: 0 }}

                />
            </ScrollView>
        </Container>

    )
}

export default EditProd
