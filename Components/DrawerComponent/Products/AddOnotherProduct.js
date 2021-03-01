import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import { InputIcon } from '../../../common/InputText'
import Colors from '../../../consts/Colors'
import { SText } from '../../../common/SText'
import BTN from '../../../common/BTN'

function AddOnotherProduct({ navigation }) {

    const [nameAR, setNameAr] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [price, setPrice] = useState('');




    return (
        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Header navigation={navigation} label={i18n.t('AddTProd')} />
            <ScrollView style={{ flex: 1 }}>
                <InputIcon
                    label={i18n.t('AddAR')}
                    placeholder={i18n.t('AddAR')}
                    inputStyle={{ borderColor: Colors.sky }}
                    onChangeText={(e) => setNameAr(e)}
                    value={nameAR}
                    LabelStyle={{ paddingHorizontal: 10, color: Colors.sky, fontSize: 14 }}

                />
                <InputIcon
                    placeholder={i18n.t('AddEn')}
                    onChangeText={(e) => setNameEN(e)}
                    value={nameEN}
                    styleCont={{ marginTop: 0 }}
                />
                <InputIcon
                    placeholder={i18n.t('price')}
                    styleCont={{ marginTop: 0 }}
                />

                <SText title={`+ ${i18n.t('AnotherAdd')}`} onPress={() => { }} style={{ color: Colors.sky, fontSize: 15, marginVertical: 20, marginTop: 0, textAlign: 'left', marginHorizontal: '5%' }} />
                <BTN title={i18n.t('send')} ContainerStyle={styles.LoginBtn} onPress={() => navigation.navigate('AddProduct')} />

            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    LoginBtn: {
        borderRadius: 5,
        marginTop: 0,
        marginHorizontal: '5%',
        width: '90%',
        marginVertical: 5

    },
})
export default AddOnotherProduct
