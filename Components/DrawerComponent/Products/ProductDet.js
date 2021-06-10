import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../common/Container';
import { ProductDetailes } from '../../../store/action/ProductAction';
import * as Animatable from 'react-native-animatable';
import { width, height } from '../../../consts/HeightWidth';


const ProductDet = ({ navigation, route }) => {

    const { ProductsId } = route.params;

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(true);
    const ProductDetA = useSelector(state => state.product.product);

    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(ProductDetailes(token, lang, ProductsId)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])




    const [click1, setClick1] = useState(true)
    const [click2, setClick2] = useState(true)
    const [Select, setSelect] = useState(true)



    function renderLoader() {
        if (spinner) {
            return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: 'white',
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

    return (


        <Animatable.View animation="pulse" easing="ease-out" delay={500} style={{ flex: 1 }}>
            {renderLoader()}

            {
                !ProductDetA ? null :

                    <View style={{ flex: 1, }}>
                        <Image source={{ uri: ProductDetA.image }} style={styles.ImgBackGround} resizeMode='stretch' />

                        <ImageBackground source={require('../../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20, transform: I18nManager.isRTL ? [{ rotateY: '0deg' }] : [{ rotateY: '-180deg' }], }} resizeMode='contain'>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image source={require('../../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </ImageBackground>

                        <View style={styles.ScrolContainer}>
                            <ScrollView style={{ flex: 1, marginTop: 0 }} showsVerticalScrollIndicator={false}>
                                <View style={{ margin: 20, flexDirection: 'column', justifyContent: 'center' }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={styles.num}> {i18n.t('num')} :  </Text>
                                        <Text style={styles.Val} > {ProductDetA.id} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <Text style={styles.num}> {i18n.t('ProName')} :  </Text>
                                        <Text style={styles.Val} > {ProductDetA.name} </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <Text style={styles.num}> {i18n.t('available')}</Text>
                                        <View >
                                            <Text style={styles.Val} > {ProductDetA.available == 0 ? i18n.t('noAvailable') : i18n.t('Available')} </Text>

                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <Text style={styles.num}> {i18n.t('menue')} :  </Text>
                                        <Text style={styles.Val} > {ProductDetA.menu} </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <Text style={styles.num}> {i18n.t('price')} :  </Text>
                                        <Text style={styles.Val} > {ProductDetA.price - (ProductDetA.price * (ProductDetA.discount / 100))} {i18n.t('Rial')}</Text>
                                        {
                                            ProductDetA.discount == 0 ? null :
                                                <Text style={[styles.num, { textDecorationLine: 'line-through', textDecorationColor: Colors.RedColor, textDecorationStyle: 'solid', color: Colors.RedColor, paddingHorizontal: 15, fontSize: 16 }]}>{ProductDetA.price} {i18n.t('Rial')}</Text>
                                        }
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                                        <Text style={styles.num}> {i18n.t('Availablekilos')} :  </Text>
                                        <Text style={styles.Val} > {ProductDetA.available_kilos} </Text>
                                    </View>


                                    <TouchableOpacity onPress={() => setClick1(!click1)} style={{ marginTop: 25 }}>
                                        <View style={{ backgroundColor: '#F6F6F6', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, }}>
                                            <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                                            <Image source={click1 ? require('../../../assets/Images/noun_down_blue.png') : require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        click1 ?
                                            <Text style={{ marginVertical: 15, fontFamily: 'flatLight', fontSize: 14, color: Colors.fontNormal, alignSelf: 'flex-start', paddingHorizontal: 10 }}>
                                                {ProductDetA.details}


                                            </Text>
                                            :
                                            null
                                    }
                                    <TouchableOpacity onPress={() => setClick2(!click2)}>
                                        <View style={{ backgroundColor: '#F6F6F6', height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                                            <Text style={styles.nMenu}>{i18n.t('Additions')}</Text>
                                            {
                                                click2 ?

                                                    <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                                    :
                                                    <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                            }
                                        </View>
                                    </TouchableOpacity>
                                    {
                                        click2 ?

                                            ProductDetA.extras && ProductDetA.extras.length ?
                                                ProductDetA.extras.map((size, index) => (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }} key={index + 1}>
                                                        <Text style={styles.name} key={size.id}> {size.name} :</Text>
                                                        <Text style={[styles.num, { marginBottom: 0, paddingHorizontal: 15, alignSelf: 'flex-start', color: Colors.sky, fontFamily: 'flatMedium', }]}>{size.price} {i18n.t('Rial')}</Text>

                                                    </View>




                                                ))
                                                :
                                                <Text style={styles.name}>{i18n.t('nothing')}</Text>

                                            : null
                                    }

                                </View>


                            </ScrollView>
                        </View>
                    </View>
            }

        </Animatable.View>



    )
}


const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        margin: 20
    },
    BImg: {
        height: 40,
        width: 40,
        marginStart: 20,
    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        color: Colors.IconBlack

    },
    Val: { color: Colors.IconBlack, alignSelf: 'flex-start', fontFamily: 'flatMedium', fontSize: 16, marginStart: 5 },
    num:
        { color: Colors.IconBlack, alignSelf: 'flex-start', fontFamily: 'flatLight', fontSize: 16 }

    ,
    EditImg: {
        width: 20,
        height: 20
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.fontNormal,
        alignSelf: 'flex-start'
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.IconBlack
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontBold,
        marginHorizontal: 20,
        marginVertical: 5
    },

    ImgBackGround: {
        width: width,
        height: '45%',
    },
    Line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.fontNormal,
        opacity: .2,
        marginVertical: 15
    },
    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0,
        height: '58%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    Container: {
        width: '88%',
        margin: 20,
        backgroundColor: Colors.InputColor,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
export default ProductDet




