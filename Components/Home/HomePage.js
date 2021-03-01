import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import HomeHeader from '../../common/HomeHeader'
import Colors from '../../consts/Colors';
import { width, height } from '../../consts/HeightWidth';
import i18n from '../../locale/i18n'
import Card from '../../common/Card'
import { useSelector, useDispatch } from 'react-redux';
import { GetHomeProducts, GetQuickReborts } from '../../store/action/HomeAction';
import Container from '../../common/Container';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications'
import { Logout } from '../../store/action/AuthAction';
import { _renderRows } from '../../common/LoaderImage';
import NetInfo from "@react-native-community/netinfo";
import { ToasterNative } from '../../common/ToasterNative';



function HomePage({ navigation }) {

    const user = useSelector(state => state.auth.user.data);
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);

    const HomeProduct = useSelector(state => state.home.product);
    const QuickRebort = useSelector(state => state.home.extra);


    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(true);


    const QuickReborts = [
        {
            id: 1,
            image: require('../../assets/Images/nounproducticon.png'),
            name: i18n.t('products'),
            title: i18n.t('haveProduct'),
            price: QuickRebort && QuickRebort.reports && QuickRebort.reports.products,
        },
        {
            id: 2,
            image: require('../../assets/Images/comment.png'),
            name: i18n.t('comments'),
            title: i18n.t('Storecomments'),
            price: QuickRebort && QuickRebort.reports && QuickRebort.reports.comments,

        },
        {
            id: 3,
            image: require('../../assets/Images/star_home.png'),
            name: i18n.t('rateing'),
            title: i18n.t('Yourfeedbacks'),
            price: QuickRebort && QuickRebort.reports && QuickRebort.reports.rates,

        }
    ]
    let loadingAnimated = []

    useEffect(() => {


        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                ToasterNative('Network Error', 'danger', 'bottom')
            }

        });

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(GetHomeProducts(token, lang)).then(() => dispatch(GetQuickReborts(token, lang))).then(() => setSpinner(false))

        });

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            let type = notification.request.content.data.type;
            let OrderId = notification.request.content.data.order_id;

            if (type === 'block') {
                dispatch(Logout(token))

            }
            else if (type === 'admin') {
                navigation.navigate('Notifications')
            }
            else if (type === 'wallet') {
                navigation.navigate('Wallet')

            }
            else if (type === 'order' && OrderId) {
                navigation.navigate('OrderDetailes', { OrderId: notification.request.content.data.order_id })

            }

        });

        const subscriptions = Notifications.addNotificationResponseReceivedListener(response => {
            const type = response.notification.request.content.data.type;
            if (type === 'block') {

                dispatch(Logout(token))
            }
        });
        return () => { subscription.remove(), unsubscribe, subscriptions };
    }, [])


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(GetHomeProducts(token, lang)).then(() => dispatch(GetQuickReborts(token, lang))).then(() => setRefreshing(false))

    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }}
            refreshControl={< RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

            <HomeHeader navigation={navigation} image={user.avatar} label={i18n.t('Hello') + user.name + '!'} title={i18n.t('Dash')} onPress={() => navigation.navigate('MyProfile')} />

            <Container loading={spinner} >

                <Card />

                <Text style={[styles.MainText, { marginBottom: 5 }]}>{i18n.t('newProduct')}</Text>
                <ScrollView horizontal={true} style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>

                    {
                        spinner ?
                            _renderRows(loadingAnimated, HomeProduct && HomeProduct.length, '2rows', width * .45, 120, { flexDirection: 'row', }, { borderRadius: 20, borderTopStartRadius: 0, })
                            :
                            HomeProduct && HomeProduct.length ?
                                HomeProduct.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.Card} key={item.id} onPress={() => navigation.navigate('ProductDet', { ProductsId: item.id, index: index })} key={index.toString()}>
                                            <View style={{ flexDirection: 'column', }}>
                                                <Image source={{ uri: item.image }} style={{ width: '100%', height: 120 }} />
                                                <View style={[styles.imgOverLay]} />

                                                <View style={{ flexDirection: 'column', margin: 10, }}>
                                                    <Text style={[styles.prod, { fontWeight: '900', alignSelf: 'flex-start', }]}>{item.name.length > 50 ? (item.name).substr(0, 40) + '...' : item.name}</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingVertical: 5, }}>
                                                        <Text style={styles.nText}>{item.price - (item.price * (item.discount / 100))} {i18n.t('Rial')}</Text>

                                                        {
                                                            item.discount == 0 ? null :
                                                                <Text style={[styles.nText, { color: 'red', textDecorationLine: 'line-through', textDecorationColor: Colors.RedColor, textDecorationStyle: 'solid', marginTop: 10, marginStart: 5, fontSize: 10 }]}>{item.price} {i18n.t('Rial')}</Text>
                                                        }

                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableOpacity>

                                    )

                                })

                                :
                                <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', flex: 1, width }}>
                                    < Image source={require('../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                                    <Text style={[styles.prod, { color: 'red' }]}>{i18n.t('notaddpr')}</Text>
                                </View>

                    }
                </ScrollView>





                <Text style={styles.MainText}>{i18n.t('Quickreports')}</Text>


                {
                    spinner ?
                        _renderRows(loadingAnimated, QuickReborts && QuickReborts.length, '2rows', width, height * .15, { flexDirection: 'column', }, { borderRadius: 0, })
                        :
                        QuickReborts && QuickReborts.map((quick, index) => {
                            return (
                                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} key={quick.id.toString()}>

                                    <View style={styles.SCard}>
                                        <View style={{ flexDirection: 'row', height: '100%', }}>
                                            <View style={styles.ImgWrab}>
                                                <Image source={quick.image} style={styles.SImg} resizeMode='contain' />
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <View style={styles.WrabText}>
                                                    <Text style={styles.ProdText}>{quick.name}</Text>
                                                    <Text style={[styles.ProdText, { color: Colors.fontNormal }]}>{quick.title}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.num}>{quick.price}</Text>
                                        </View>
                                    </View>

                                </Animatable.View>
                            )
                        })
                }



            </Container>
        </ScrollView>




    )
}
const styles = StyleSheet.create({
    wrab: {
        width: 100,
        alignSelf: 'center',
        overflow: 'hidden',
        marginEnd: 15,
        marginStart: 10,

        flex: 1
    },
    Linear: {
        flex: 1,
    },
    num: {
        alignSelf: 'center',
        color: Colors.sky,
        marginEnd: 10,
        fontSize: 30,
        fontFamily: 'flatMedium',
    },
    SCard: {
        height: height * .15,
        width: '90%',
        margin: 20,
        shadowColor: Colors.bg,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
        marginTop: -5

    },
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 20,
        marginVertical: 20,
        alignSelf: 'flex-start',
        marginStart: 10,

    },
    ImgWrab: {
        height: '100%',
        width: 90,
        backgroundColor: '#AAEFFC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: width * .03,
        color: Colors.bg,
        textAlign: 'center'
    },

    ProdText: {
        fontFamily: 'flatMedium',
        fontSize: 15,
        color: Colors.IconBlack,
        alignSelf: 'flex-start',
        paddingVertical: 5
    },
    prod: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.IconBlack
    },
    imgOverLay: {
        backgroundColor: "rgba(0, 0, 0, 0.16)",
        position: 'absolute',
        height: 120,
        width: '100%',
        zIndex: 1,
    },
    nText: {
        color: Colors.sky,
        fontFamily: 'flatMedium',
        alignSelf: 'flex-start',
        fontSize: 14,
        paddingTop: 5,

    },
    Card: {
        margin: 10,
        borderRadius: 20,
        width: width * .45,
        backgroundColor: Colors.bg,
        borderTopStartRadius: 0,
        overflow: 'hidden',
        flex: 1
    },
    WrabText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginStart: 15
    },
    SImg: {
        height: '50%',
        width: '50%',
        alignSelf: 'center'
    }
})
export default HomePage
