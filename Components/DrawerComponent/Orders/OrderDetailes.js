import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView, TouchableWithoutFeedback, Modal, Linking, Alert, Platform } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import { width, height } from '../../../consts/HeightWidth'
import { useSelector, useDispatch } from 'react-redux'
import { Order_Detailes, CancelOrders, ConfirmOrders } from '../../../store/action/OrdersAction';
import Container from '../../../common/Container'
import * as Animatable from 'react-native-animatable';




function OrderDetailes({ navigation, route, onPressDetailes }) {

    const [click, setClick] = useState(true)
    const [click1, setClick1] = useState(true)
    const [click3, setClick3] = useState(true)
    const [click4, setClick4] = useState(true)
    const [ModalVisible, setModalVisible] = useState(false)
    const [Detailes, setDetailes] = useState([])
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const dispatch = useDispatch();
    const OrderDet = useSelector(state => state.Orders.OrderDetailes);
    const { OrderId } = route.params
    const [spinner, setSpinner] = useState(true);

    console.log(token);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(Order_Detailes(token, OrderId, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])

    const CancelIncomingOrders = () => {
        dispatch(CancelOrders(token, OrderId, navigation)).then(() => navigation.navigate('AllOrders', { statues: 'CANCELED', label: i18n.t('Rejectedrequests') }))

    }


    const ConfirmIncomingOrders = () => {
        setSpinner(true)
        dispatch(ConfirmOrders(token, OrderId,)).then(() => navigation.navigate('AllOrders', { statues: 'RUNNING', label: i18n.t('ActiveRequests') })).then(() => setSpinner(false))

    }



    const OrderProcceed = () => {
        setSpinner(true)
        dispatch(ConfirmOrders(token, OrderId)).then(() => dispatch(Order_Detailes(token, OrderId, lang))).then(() => setSpinner(false))

    }
    const OrderDelivered = () => {
        setSpinner(true)
        dispatch(ConfirmOrders(token, OrderId)).then(() => setSpinner(false))
        navigation.navigate('HomePage')
    }



    return (
        <Container loading={spinner}>
            {!OrderDet ? null :
                <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }}>

                    <Header navigation={navigation} label={i18n.t('orderDetailes') + "  " + `${OrderDet.order_id}`} />
                    <Container loading={spinner}>
                        <Animatable.View animation="fadeIn" easing="ease-out" delay={500}>

                            <TouchableOpacity onPress={() => setClick(!click)}>
                                <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', height: 50, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center', }}>
                                        <Text style={styles.nMenu}>{i18n.t('ClientInfo')}</Text>
                                        {
                                            click ?

                                                <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                                :
                                                <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {
                                click ?

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '7%', justifyContent: 'space-between', width: '70%' }}>
                                        <View style={{ flexDirection: 'column', }}>
                                            <Text style={styles.name}>{i18n.t('rebresentativename')} : </Text>
                                            <Text style={[styles.name, { marginVertical: 15 }]}>{i18n.t('phone')} : </Text>
                                        </View>

                                        {
                                            !OrderDet.user ? null :

                                                <View style={{ flexDirection: 'column', }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                                                        <Text style={styles.sname}>{OrderDet.user.name}</Text>
                                                        <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${OrderDet.user.phone}`)}>
                                                            <Image source={require('../../../assets/Images/whatsapp.png')} style={{ width: 20, height: 20, }} resizeMode='contain' />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={[styles.sname, { marginVertical: 15 }]}>{OrderDet.user.phone}</Text>
                                                </View>

                                        }

                                    </View>
                                    : null
                            }

                            <TouchableOpacity onPress={() => setClick1(!click1)}>
                                <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', height: 50, marginTop: 0, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                                        <Text style={styles.nMenu}>{i18n.t('orderDetailes')}</Text>
                                        {
                                            click1 ?

                                                <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                                :
                                                <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {
                                click1 ?
                                    !OrderDet.products ?
                                        null
                                        :
                                        OrderDet.products.map(item => (

                                            <View key={`${item.id}` + '_'} style={{ flexDirection: 'row', overflow: 'hidden', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, margin: 20, backgroundColor: Colors.bg, width: '90%', height: 40, borderWidth: 1, borderColor: Colors.InputColor, marginTop: 0 }}>
                                                <Text style={styles.name}>{item.name.length > 15 ? (item.name).substr(0, 15) + '...' : item.name}</Text>
                                                <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                                <Text style={styles.name}>{i18n.t('quantity')} : {item.quantity}</Text>
                                                <View style={{ height: 50, width: 1, backgroundColor: Colors.InputColor }}></View>
                                                <TouchableWithoutFeedback onPress={() => { setModalVisible(true); setDetailes(item.extras) }}>
                                                    <Text style={[styles.name, { color: Colors.sky, fontSize: 14, }]}>{i18n.t('detailes')}</Text>
                                                </TouchableWithoutFeedback>

                                            </View>



                                        ))




                                    : null
                            }

                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    style={{ backgroundColor: Colors.bg, }}
                                    visible={ModalVisible} >

                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <View style={{ margin: 20, }}>
                                                {
                                                    Detailes.length === 0 ?
                                                        <Text style={{ fontFamily: 'flatMedium', marginVertical: 20 }}>لا يوجد تفاصيل للمنتج بعد</Text>
                                                        :
                                                        Detailes.map((ex, index) => {
                                                            return (
                                                                <View key={index + '_'} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                                                    <Text style={{ fontFamily: 'flatMedium', }}>_{ex.name}</Text>
                                                                    <Text style={{ fontFamily: 'flatMedium', paddingHorizontal: 20, color: Colors.sky }}>{ex.price} {i18n.t('Rial')}</Text>

                                                                </View>
                                                            )
                                                        })
                                                }

                                                <BTN title={i18n.t('close')} ContainerStyle={styles.LoginBtn} onPress={() => setModalVisible(false)} />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>

                            <TouchableOpacity onPress={() => setClick3(!click3)}>
                                <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', justifyContent: 'center', height: 50, marginTop: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                                        <Text style={styles.nMenu}>{i18n.t('Paymentmethod')}</Text>
                                        {
                                            click3 ?

                                                <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                                :
                                                <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {
                                click3 ?
                                    <Text style={[styles.name, { marginHorizontal: 40, marginTop: -10, alignSelf: 'flex-start' }]}>{OrderDet.payment_text}</Text>
                                    :
                                    null

                            }

                            <TouchableOpacity onPress={() => setClick4(!click4)}>
                                <View style={{ width: '90%', margin: 20, backgroundColor: '#F8F8F8', justifyContent: 'center', height: 50, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, alignItems: 'center' }}>
                                        <Text style={styles.nMenu}>{i18n.t('prices')}</Text>
                                        {
                                            click4 ?

                                                <Image source={require('../../../assets/Images/noun_down_blue.png')} style={{ width: 12, height: 10, }} />
                                                :
                                                <Image source={require('../../../assets/Images/noun_down_gray.png')} style={{ width: 12, height: 10, }} />

                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {
                                click4 ?
                                    <View style={{ flexDirection: 'row', marginStart: '5%', alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'flex-start' }}>
                                            <Text style={styles.name}>{i18n.t('productPricess')} : </Text>
                                            <Text style={[styles.name, {}]}>{i18n.t('Deliveryprice')} : </Text>
                                            {/* <Text style={[styles.name,]}>{i18n.t('Valueaddedtax')}  :</Text> */}
                                            <Text style={[styles.name, { color: Colors.fontBold, fontSize: 14 }]}>{i18n.t('total')} : </Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginStart: 20 }}>
                                            <Text style={styles.sname}>{OrderDet.sum}  {i18n.t('Rial')}</Text>
                                            <Text style={[styles.sname,]}>{OrderDet.shipping} {i18n.t('Rial')}</Text>
                                            {/* <Text style={[styles.sname,]}>{OrderDet.added_value} {i18n.t('Rial')}</Text> */}

                                            <Text style={[styles.sname, { color: Colors.RedColor, }]}>  {OrderDet.total} {i18n.t('Rial')}</Text>
                                        </View>
                                    </View>
                                    : null
                            }
                            {
                                OrderDet &&
                                    OrderDet.status === 'WAITING' ?
                                    <>
                                        < BTN title={i18n.t('confirm')} ContainerStyle={styles.LoginBtn} onPress={ConfirmIncomingOrders} />
                                        <BTN title={i18n.t('refuse')} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.InputColor }]} onPress={CancelIncomingOrders} />
                                    </>
                                    : OrderDet.status === 'PROGRESS' ?
                                        < BTN title={i18n.t('AcceptOrders')} ContainerStyle={styles.LoginBtn} onPress={OrderProcceed} />
                                        : OrderDet.status === 'READY' ?

                                            < BTN title={i18n.t('findDelegate')} ContainerStyle={[styles.LoginBtn, { backgroundColor: Colors.InputColor }]} disabled={true} onPress={() => { }} />

                                            :
                                            null
                            }



                        </Animatable.View>

                    </Container>


                </ScrollView>
            }
        </Container>

    )
}
const styles = StyleSheet.create({
    nMenu: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        textAlign: 'center',
        color: Colors.IconBlack
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.fontNormal,
        lineHeight: 28
    },
    sname: {
        fontFamily: 'flatMedium',
        fontSize: 14,
        color: Colors.IconBlack,
        alignSelf: 'flex-start',
        lineHeight: 28

    },
    LoginBtn: {
        borderRadius: 5,
        marginTop: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: Platform.OS == 'ios' ? .95 : .9,

    },
    modalView: {
        backgroundColor: "white",

        width: '90%',
        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default OrderDetailes
