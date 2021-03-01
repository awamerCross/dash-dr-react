import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'


function ProductSpecialOrderDetailes({ navigation }) {



    return (
        <View style={{ flex: 1 }}>

            <Image source={require('../../../assets/Images/imagetwo.png')} style={styles.ImgBackGround} />

            <ImageBackground source={require('../../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20 }} resizeMode='contain'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    {
                        I18nManager.isRTL ?
                            <Image source={require('../../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />
                            :
                            <Image source={require('../../../assets/Images/left.png')} style={{ height: 25, width: 25, marginTop: 45 }} resizeMode='contain' />

                    }
                </TouchableOpacity>
            </ImageBackground>

            <View style={styles.ScrolContainer}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ margin: 20, }}>
                        <Text style={styles.num}>{i18n.t('num')}#1</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 100, marginTop: 0 }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={styles.name}>{i18n.t('menue')} </Text>
                                <Text style={[styles.name, { marginVertical: 5, }]}>{i18n.t('Prod')}</Text>
                                <Text style={styles.name}>{i18n.t('Pricebeforediscount')} </Text>
                                <Text style={[styles.name, { marginVertical: 5, }]}>{i18n.t('Thepriceafterdiscount')} </Text>
                                <Text style={[styles.name, { marginVertical: 5, }]}>{i18n.t('Deliveryprice')} </Text>
                                <Text style={[styles.name, { marginVertical: 5, }]}>{i18n.t('OrderType')} </Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>
                                <Text style={{ marginVertical: 5 }}>:</Text>



                            </View>
                            <View style={{ flexDirection: 'column', marginVertical: 3 }}>
                                <Text style={styles.sname}>متاجر</Text>
                                <Text style={[styles.sname,]}>منتج ملابس</Text>
                                <Text style={[styles.sname, { color: Colors.sky }]}> 122 {i18n.t('Rial')}</Text>
                                <Text style={[styles.sname,]}>140 {i18n.t('Rial')}</Text>
                                <Text style={[styles.sname,]}>40 {i18n.t('Rial')}</Text>
                                <Text style={[styles.sname, { color: Colors.RedColor }]}> {i18n.t('Rejected')}</Text>



                            </View>
                        </View>

                    </View>
                    <View style={{ margin: 10, marginTop: 0 }}>
                        <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>

                        <Text style={{ textAlign: 'center' }}>
                            هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                            هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                            هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                            هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه
                            هذا النص هو مثال لنص يمكن ان يستبدل ف نفس المساحه

                        </Text>
                    </View>
                    <View style={styles.Container}>
                        <Text style={[styles.nMenu, { color: Colors.RedColor }]}>{i18n.t('totaly')}  :</Text>
                        <Text style={[styles.sname, { color: Colors.RedColor }]}> 200 {i18n.t('Rial')}</Text>

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        margin: 20
    },
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        margin: 5
    },
    num: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.sky,
    },
    EditImg: {
        width: 20,
        height: 20
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal,
        marginVertical: 5
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontBold,
        marginHorizontal: 20,
        marginVertical: 5
    },
    Wrab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '100%',
        height: '60%',
        bottom: 100,
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
        bottom: 0, height: '60%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
})
export default ProductSpecialOrderDetailes
