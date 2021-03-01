
import React, { useState, useEffect } from 'react'
import { View, Modal, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { CheckBox } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { MenueInfo, AddMenue, DeleteMenue, UpdateMenue } from '../../../store/action/MenueAction';
import { width, height } from '../../../consts/HeightWidth';
import Colors from '../../../consts/Colors';
import i18n from '../../../locale/i18n'
import { Toaster } from '../../..//common/Toaster';
import { validateUserName } from '../../../common/Validation';
import { InputIcon } from '../../../common/InputText';
import BTN from '../../../common/BTN';

const MenuCard = ({ item, index }) => {
    const [modal, setModal] = useState(false)
    const [EditMaodVisible, setEditMaodVisible] = useState(false);
    const [id, setData] = useState(`${item.id}`)
    const [isSelected2, setSelection2] = useState(false);


    const [nameAREdit, setNameArEdit] = useState(item.name);
    const [nameENEdit, setNameENEdit] = useState(item.name);
    const Menue = useSelector(state => state.menue.menue);

    const [nameARStatusEdit, setnameARStatusEdit] = useState(0);
    const [nameENStatusEdit, setNameENStatusEdit] = useState(0)
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);

    function activeInput(type) {


        if (type === 'nameAREdit' || nameAREdit !== '') setnameARStatusEdit(1);
        if (type === 'nameENEdit' || nameENEdit !== '') setNameENStatusEdit(1);

    }
    function unActiveInput(type) {


        if (type === 'nameAREdit' && nameAREdit == '') setnameARStatusEdit(0);
        if (type === 'nameENEdit' && nameENEdit == '') setNameENStatusEdit(0);
    }
    const edit = () => {
        setEditMaodVisible(true)
    }

    const DeleteMeueIteM = (id) => {
        dispatch(DeleteMenue(token, id))
        dispatch(MenueInfo(lang, token))

    }
    const EditMEnue = () => {
        dispatch(UpdateMenue(token, lang, nameAREdit, nameENEdit, id))
        dispatch(MenueInfo(lang, token))
        setEditMaodVisible(false)
    }

    useEffect(() => {
        dispatch(MenueInfo(lang, token))
        Menue

    }, [dispatch]);
    return (
        <>
            <View style={styles.Card}>
                <View style={styles.FWrab}>
                    <CheckBox checked={isSelected2} color={isSelected2 ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected2 ? Colors.sky : Colors.bg, width: 20, height: 20, }} onPress={() => setSelection2(!isSelected2)} />
                    <Text style={styles.nText}>{i18n.t('num')} # {index + 1}</Text>
                    <View style={{ flexDirection: 'row', marginStart: 5, alignItems: 'center' }}>
                        <Text style={styles.nMenu}>{i18n.t('name')} :   </Text>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                </View>
                <View style={styles.SWarb}>
                    <TouchableOpacity style={styles.Edit} onPress={edit}>
                        <Image source={require('../../../assets/Images/Icon_edit.png')} style={styles.Img} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Delete} onPress={() => DeleteMeueIteM(item.id)}>
                        <Image source={require('../../../assets/Images/trash_white.png')} style={styles.Img} resizeMode='contain' />
                    </TouchableOpacity>

                </View>

            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    style={{ backgroundColor: Colors.bg, }}
                    visible={EditMaodVisible} >

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ margin: 20, backgroundColor: Colors.bg }}>
                                <Text style={{ fontFamily: 'flatMedium', fontSize: 14, }}>{i18n.t('edit')} </Text>

                                <InputIcon

                                    label={nameARStatusEdit === 1 ? i18n.t('menueAr') : null}
                                    placeholder={nameARStatusEdit === 1 ? null : i18n.t('menueAr')}
                                    onBlur={() => unActiveInput('nameAREdit')}
                                    onFocus={() => activeInput('nameAREdit')}
                                    inputStyle={{ borderColor: nameARStatusEdit === 1 ? Colors.sky : Colors.InputColor, textAlign: 'center', }}
                                    onChangeText={(e) => setNameArEdit(e)}
                                    value={nameAREdit}
                                    LabelStyle={{ paddingHorizontal: nameARStatusEdit === 1 ? 10 : 0, color: nameARStatusEdit === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                                />

                                <InputIcon
                                    label={nameENStatusEdit === 1 ? i18n.t('menueEn') : null}
                                    placeholder={nameENStatusEdit === 1 ? null : i18n.t('menueEn')}
                                    onBlur={() => unActiveInput('nameENEdit')}
                                    onFocus={() => activeInput('nameENEdit')}
                                    inputStyle={{ borderColor: nameENStatusEdit === 1 ? Colors.sky : Colors.InputColor, textAlign: 'center', }}
                                    onChangeText={(e) => setNameENEdit(e)}
                                    value={nameENEdit}
                                    styleCont={{ marginTop: -5 }}
                                    LabelStyle={{ paddingHorizontal: nameENStatusEdit === 1 ? 10 : 0, color: nameENStatusEdit === 1 ? Colors.sky : Colors.InputColor, fontSize: 14 }}
                                />

                                <BTN title={i18n.t('edit')} ContainerStyle={styles.LoginBtn} onPress={EditMEnue} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    wrab: {
        overflow: 'hidden',
    },
    Linear: {
        height: width * .32,
        justifyContent: 'center',
        borderTopStartRadius: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
        width: width * .27,

        marginHorizontal: 5

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    LoginBtn: {
        marginVertical: 15,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 0,
        width: '91%',
    },
    Card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        width: '90%',
        marginStart: 20,
        marginVertical: 5,
        shadowColor: Colors.bg,
        marginTop: 0,
        backgroundColor: Colors.bg,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        overflow: 'hidden',
    },
    FWrab: {
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        flex: .75
    },
    nText: {
        color: Colors.sky,
        marginStart: 10,
        marginVertical: 5
    },
    nMenue: {
        fontFamily: 'flatMedium',
        fontSize: 12,
    },
    name: {
        fontFamily: 'flatMedium',
        fontSize: 10,
        color: Colors.fontNormal
    },
    SWarb: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: .25,
    },
    Edit: {
        backgroundColor: '#E3E3E3',
        height: '50%',
        justifyContent: 'center',
        width: 30
    },
    Delete: {
        backgroundColor: Colors.RedColor,
        height: '50%',
        justifyContent: 'center', width: 30
    },
    Img: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
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
        height: height * .4,
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

export { MenuCard }
