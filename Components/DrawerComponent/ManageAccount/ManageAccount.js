import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'


import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import BTN from '../../../common/BTN';
import Container from '../../../common/Container';
import { useDispatch, useSelector } from 'react-redux';
import { ManageAcoounts } from '../../../store/action/CommentsAction';
import HomeHeader from '../../../common/HomeHeader';

const { width } = Dimensions.get('window')
function ManageAccount({ navigation }) {



    const [spinner, setSpinner] = useState(true);
    const dispatch = useDispatch();
    const lang = useSelector(state => state.lang.language);
    const token = useSelector(state => state.auth.user.data.token)
    const ManAcc = useSelector(state => state.Comments.Macoount)



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(ManageAcoounts(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;


    }, [navigation]);




    return (
        <ScrollView style={{ flex: 1 }}>
            <HomeHeader navigation={navigation} label={i18n.t('ManageAcc')} onPress={() => navigation.navigate('MyProfile')} />

            <Container loading={spinner}>

                {
                    !ManAcc || !ManAcc.length ?
                        <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />


                        :
                        ManAcc.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('OrderManageAccDetailes', { OrderId: item.order_id })}>
                                    <View style={styles.card}>
                                        <View style={{ margin: 10 }}>
                                            <Text style={styles.Text}>{i18n.t('num')} #{index + 1}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 120, marginTop: 0 }}>
                                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                    <Text style={styles.sText}>{i18n.t('total')}  </Text>
                                                    <Text style={styles.sText}>{i18n.t('OrderPrice')}</Text>
                                                    <Text style={styles.sText}>{i18n.t('Commission')}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                    <Text style={{ marginVertical: 5 }}>:</Text>
                                                    <Text style={{ marginVertical: 5 }}>:</Text>
                                                    <Text style={{ marginVertical: 5 }}>:</Text>
                                                </View>
                                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                    <Text style={styles.sText}>{item.price + item.commission.toFixed(2)} {i18n.t('Rial')}</Text>
                                                    <Text style={styles.sText}>{item.price}  {i18n.t('Rial')}</Text>
                                                    <Text style={styles.sText}>{item.commission.toFixed(2)}  {i18n.t('Rial')}</Text>
                                                </View>
                                            </View>


                                        </View>
                                    </View>
                                </TouchableOpacity>

                            )
                        })
                }

            </Container>
        </ScrollView>


    )
}
const styles = StyleSheet.create({

    tab: {
        backgroundColor: '#F8F8F8',
        borderRadius: 50,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    TabLine: {
        backgroundColor: Colors.sky,
        height: '75%',
        width: '45%',
        marginVertical: 5,
        marginTop: 5,
        borderRadius: 20,
        marginHorizontal: 5
    },
    Text: {
        fontFamily: 'flatMedium',
        color: Colors.sky,
        fontSize: width * .04,
        marginHorizontal: 10

    },
    tabContainer: {
        backgroundColor: "white",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: "20%",
        alignItems: "center",
        marginTop: 10,
        height: 40
    },
    card: {
        shadowColor: Colors.bg,
        backgroundColor: Colors.bg,
        margin: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginVertical: 5,
        paddingTop: 10,
        paddingStart: 10,
        overflow: 'hidden',
        borderRadius: 5,
        padding: 10

    },


    sText: {
        fontFamily: 'flatMedium',
        color: Colors.fontNormal,
        fontSize: width * .03,
        marginVertical: 5,
        marginHorizontal: 10
    },

    yText: {
        fontFamily: 'flatLight',
        color: Colors.IconBlack,
        fontSize: width * .026,
        marginTop: width * .02,
    },
})
export default ManageAccount
