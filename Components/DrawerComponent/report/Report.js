import React, { useState, useEffect } from 'react'
import { View, Dimensions, ScrollView, StyleSheet, Modal, Text } from 'react-native'
import { WebView } from 'react-native-webview';

import Header from '../../../common/Header';
import i18n from '../../../locale/i18n'
import { width, height } from '../../../consts/HeightWidth';
import Colors from '../../../consts/Colors';
import BTN from '../../../common/BTN';
import { useSelector, useDispatch } from 'react-redux';
import { GetRebortsCharts, CreateRebortChart } from '../../../store/action/RebortChartAction';
import Container from '../../../common/Container';
import HomeHeader from '../../../common/HomeHeader';


function Report({ navigation }) {

    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const [spinner, setSpinner] = useState(true);
    const RebortChart = useSelector(state => state.reborts.chart)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user.data);


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetRebortsCharts(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation]);





    const [modalVisible, setModalVisible] = useState(false);

    const CreateReborts = () => {
        setSpinner(true)
        dispatch(CreateRebortChart(token, lang, navigation)).then(() => setSpinner(false))
        setModalVisible(false)
    }

    return (

        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <HomeHeader navigation={navigation} label={i18n.t('reports')} onPress={() => navigation.navigate('MyProfile')} />

            <Container loading={spinner}>

                <ScrollView style={{ flex: 1 }}>

                    <WebView
                        source={{ uri: `https://drtawsel.aait-sa.com/pie/${user.id}` }}
                        style={{ marginTop: 20, height: 420 }}
                    />

                    <BTN title={i18n.t('Createreport')} ContainerStyle={{
                        marginVertical: 10, borderRadius: 5, marginHorizontal: '5%', marginTop: 10, width: '90%'
                    }} onPress={() => setModalVisible(true)} />

                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible} >

                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ margin: 20, marginTop: 50 }}>
                                        <Text style={{ fontFamily: 'flatMedium', fontSize: 14, textAlign: 'center', }}>{i18n.t('DoneReb')} </Text>

                                        <BTN title={i18n.t('backHome')} ContainerStyle={{ borderRadius: 5 }} onPress={CreateReborts} />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </Container>

        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#737373',
        opacity: .9,

    },
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        height: height * .25,
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
export default Report
