import React, { useState, useEffect } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import Colors from '../../../consts/Colors'
import { height, width } from '../../../consts/HeightWidth'
import { validateUserName, validateAccountNum, valdiateMoney } from '../../../common/Validation'
import { Toaster } from '../../../common/Toaster'
import { InputIcon } from '../../../common/InputText'
import BTN from '../../../common/BTN'
import { GetAccountBanks } from '../../../store/action/CommentsAction'
import { useSelector, useDispatch } from 'react-redux'
import Container from '../../../common/Container'
import * as Animatable from 'react-native-animatable';
import { _renderRows } from '../../../common/LoaderImage'

function Banktransfer({ navigation }) {


    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const MyAcoount = useSelector(state => state.Comments.Banks === undefined ? [] : state.Comments.Banks)

    let loadingAnimated = []
    const [spinner, setSpinner] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetAccountBanks(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])




    return (

        <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} label={i18n.t('Banktransfer')} />


            {
                spinner ?
                    _renderRows(loadingAnimated, 10, '2rows', width * .9, 150, { flexDirection: 'column', }, { borderRadius: 0, })
                    :
                    MyAcoount.map(acc => (

                        <TouchableOpacity onPress={() => navigation.navigate('TransferMony', { AccountId: acc.id })} key={acc.id.toString()} >
                            <View style={{ marginHorizontal: '5%', backgroundColor: '#F8F8F8', borderRadius: 10, padding: 10, overflow: 'hidden', marginTop: 5 }} key={acc.id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Image source={{ uri: acc.image }} style={{ width: 100, height: 100, borderRadius: 5 }} />

                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', marginStart: 20, flexWrap: 'wrap' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                                            <Text style={{ fontSize: 14, color: Colors.fontNormal, fontFamily: 'flatMedium', alignSelf: 'flex-start' }}>{i18n.t('bankname')} : </Text>
                                            <Text style={{ fontSize: 12, color: Colors.RedColor, fontFamily: 'flatMedium', marginStart: 10 }}>{acc.bank_name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, alignSelf: 'flex-start' }}>
                                            <Text style={{ fontSize: 14, color: Colors.fontNormal, fontFamily: 'flatMedium' }}>{i18n.t('Accname')} : </Text>
                                            <Text style={{ fontSize: 12, color: Colors.IconBlack, fontFamily: 'flatMedium', marginStart: 10 }}>{acc.account_name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                                            <Text style={{ fontSize: 14, color: Colors.fontNormal, fontFamily: 'flatMedium' }}>{i18n.t('Accnum')} :  </Text>
                                            <Text style={{ fontSize: 12, color: Colors.IconBlack, fontFamily: 'flatMedium', marginStart: 10 }}>{acc.account_number}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, alignSelf: 'flex-start' }}>
                                            <Text style={{ fontSize: 14, color: Colors.fontNormal, fontFamily: 'flatMedium', alignSelf: 'flex-start' }}>{i18n.t('Iban')} :  </Text>
                                            <Text style={{ fontSize: 12, color: Colors.IconBlack, fontFamily: 'flatMedium', alignSelf: 'flex-end', marginStart: 10 }}>  {acc.iban_number}  </Text>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    ))

            }



        </ScrollView>
    )
}

export default Banktransfer
