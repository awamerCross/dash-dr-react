import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';


import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import HomeHeader from '../../../common/HomeHeader';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window')

function Orders({ navigation }) {
    return (

        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <HomeHeader navigation={navigation} label={i18n.t('orders')} onPress={() => navigation.navigate('MyProfile')} />
            <Animatable.View animation="lightSpeedIn" easing="ease-out" delay={500} style={{ justifyContent: 'center', alignItems: 'center' }}>

                <View style={styles.wrap}>

                    <TouchableOpacity onPress={() => navigation.navigate('AllOrders', { statues: 'WAITING', label: i18n.t('IncomingRequests') })}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('IncomingRequests')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>

                    <TouchableOpacity onPress={() => navigation.navigate('AllOrders', { statues: 'RUNNING', label: i18n.t('ActiveRequests') })}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('ActiveRequests')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>

                    <TouchableOpacity onPress={() => navigation.navigate('AllOrders', { statues: 'DELIVERED', label: i18n.t('Completedrequests') })}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('Completedrequests')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>

                    <TouchableOpacity onPress={() => navigation.navigate('AllOrders', { statues: 'CANCELED', label: i18n.t('Rejectedrequests') })}>
                        <View style={styles.Container}>
                            <Text style={styles.text}>{i18n.t('Rejectedrequests')}</Text>
                            {
                                I18nManager.isRTL ?
                                    <Image source={require('../../../assets/Images/opengrayarrow.png')} style={styles.Img} resizeMode='contain' />
                                    :
                                    <Image source={require('../../../assets/Images/opengrayarrow_left.png')} style={styles.Img} resizeMode='contain' />

                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.Line}></View>


                </View>
            </Animatable.View>


        </View>

    )
}
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'column',
        marginTop: 50,
        backgroundColor: Colors.bgGray,
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    Img: {
        height: 20,
        width: 20,
    },
    BImg: {
        height: 50,
        width: 50,
    },
    Line: {
        width,
        height: 1,
        backgroundColor: Colors.fontBold,
        opacity: .2
    },
    text: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.inputTextMainColor
    }
})
export default Orders
