import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, I18nManager, FlatList, ScrollView } from 'react-native';
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors';
import Card from '../../../common/Card';
import BTN from '../../../common/BTN';

const { width } = Dimensions.get('window')

function AddPices({ navigation }) {

    const ImageData = [{
        id: 'K0',
        SImage: require('../../../assets/Images/Email_delete.png'),
        BImage: require('../../../assets/Images/noun_Image.png'),
    },
    {
        id: 'K1',
        SImage: require('../../../assets/Images/Email_delete.png'),
        BImage: require('../../../assets/Images/noun_Image.png'),
    },
    {
        id: 'K2',
        SImage: require('../../../assets/Images/Email_delete.png'),
        BImage: require('../../../assets/Images/noun_Image.png'),
    },
    {
        id: 'K3',
        SImage: require('../../../assets/Images/Email_delete.png'),
        BImage: require('../../../assets/Images/noun_Image.png'),
    }
    ]

    const Orderdata = [{
        id: 'K0',
        title: `${i18n.t('IncomingRequests')}`,
        number: `100 ${i18n.t('order')}`,
        color: [Colors.GradianYellow, Colors.GradianYellow2]
    },
    {
        id: 'K1',
        title: `${i18n.t('ActiveRequests')}`,
        number: `100 ${i18n.t('order')}`,
        color: [Colors.GradianGreen, Colors.GradianGreen2]
    },
    {
        id: 'K2',
        title: `${i18n.t('Completedrequests')}`,
        number: `100 ${i18n.t('order')}`,
        color: [Colors.GradianRed, Colors.GradianRed2]
    }


        ,
    ]





    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} label={i18n.t('AddPices')} />
            <Card />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <TouchableOpacity >
                    <Image source={require('../../../assets/Images/add_photo.png')} style={{ width: 100, height: 100, marginTop: 30 }} />
                </TouchableOpacity>
            </View>
            <FlatList
                numColumns={2}
                data={ImageData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={(item) => (
                    <View style={{ height: width * .4, width: width * .4, backgroundColor: Colors.InputColor, borderRadius: 5, margin: 20, alignItems: 'center', marginHorizontal: '5%' }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 10 }}>
                            <Image source={item.item.SImage} style={{ height: 18, width: 18, }} />
                        </TouchableOpacity>
                        <Image source={item.item.BImage} style={{ height: '25%', width: '30%', alignSelf: 'center', top: 15 }} resizeMode='contain' />
                    </View>
                )}
            />
            <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('Previousoffers')} />

        </View>
    )
}
const styles = StyleSheet.create({
    Linear: {
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        marginStart: 5,
        marginTop: 10,
        marginEnd: 5,
        height: 110,
        width: width * .26,
        flex: 1

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    LoginBtn: {
        marginVertical: 10,
        borderRadius: 5,
        marginHorizontal: '5%',
        marginTop: 10,
        width: '90%'

    },

})
export default AddPices
