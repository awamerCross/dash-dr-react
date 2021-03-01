import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'


import { height, width } from '../../../consts/HeightWidth'
import Colors from '../../../consts/Colors'
import BTN from '../../../common/BTN'
import i18n from '../../../locale/i18n'

function SuccessAddition({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/Images/vector_succes_add.png')} style={{ width: width * .5, height: height * .4 }} resizeMode='contain' />

            <BTN title={i18n.t('backHome')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('HomePage')} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        color: Colors.fontNormal,
        textAlign: 'center'
    },
    LoginBtn: {
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 0,
        width: '95%',
        paddingHorizontal: '5%'
        // height: width * .1,

    },
})
export default SuccessAddition
