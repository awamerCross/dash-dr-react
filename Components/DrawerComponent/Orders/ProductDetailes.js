import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager } from 'react-native'

import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'

function ProductDetailes({ navigation }) {
    const [click1, setClick1] = useState(true)
    const [click2, setClick2] = useState(true)


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
                <Text style={styles.num}>{i18n.t('num')}#1</Text>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ margin: 20, marginTop: 0 }}>
                        <TouchableOpacity onPress={() => setClick1(!click1)}>
                            <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, marginTop: 0 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                                    {
                                        click1 ?

                                            <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                            :
                                            <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            click1 ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                                    <View style={{ flexDirection: 'column', paddingHorizontal: 20 }}>
                                        <Text style={styles.name}>{i18n.t('menue')} </Text>
                                        <Text style={[styles.name, {}]}>{i18n.t('Prod')}</Text>
                                        <Text style={[styles.name, {}]}>{i18n.t('quatity')} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 20 }}>
                                        <Text>:</Text>
                                        <Text >:</Text>
                                        <Text style={{}}>:</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 5 }}>
                                        <Text style={styles.sname}>متاجر</Text>
                                        <Text style={[styles.sname, {}]}>منتج ملابس</Text>
                                        <Text style={[styles.sname, { color: Colors.sky, }]}> 4</Text>
                                    </View>
                                </View>
                                : null
                        }
                    </View>

                    <View style={{ margin: 20, marginTop: 0 }}>
                        <TouchableOpacity onPress={() => setClick2(!click2)}>
                            <View style={{ width: '90%', margin: 20, backgroundColor: Colors.InputColor, height: 40, marginTop: 0 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                    <Text style={styles.nMenu}>{i18n.t('Additions')}</Text>
                                    {
                                        click2 ?

                                            <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, top: 5 }} />
                                            :
                                            <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, top: 5 }} />

                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        {
                            click2 ?
                                <View style={{ flexDirection: 'column', marginHorizontal: 40 }}>

                                    <Text style={styles.name}> -   كولا </Text>
                                    <Text style={styles.name}>-    بيبسي </Text>
                                </View>

                                : null
                        }
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
        marginHorizontal: 15,
        textAlign: 'center'
    },
    num: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.sky,
        margin: 20
    },
    EditImg: {
        width: 20,
        height: 20
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontBold,
        marginHorizontal: 20
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
        bottom: 50
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
    }
})
export default ProductDetailes
