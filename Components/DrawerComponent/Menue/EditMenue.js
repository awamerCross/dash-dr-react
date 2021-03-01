import React, { useState } from 'react'
import { View, Modal, Text, StyleSheet } from 'react-native'
import { InputIcon } from '../../../common/InputText'
import BTN from '../../../common/BTN'
import { width, height } from '../../../consts/HeightWidth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import i18n from '../../../locale/i18n'

function EditMenue(navigation, route) {
    const [EditMaodVisible, setEditMaodVisible] = useState(false);
    // const { MenueData } = route.params;
    // console.log(MenueData);

    const [nameAREdit, setNameArEdit] = useState();
    const [nameENEdit, setNameENEdit] = useState();

    const [nameARStatusEdit, setnameARStatusEdit] = useState(0);
    const [nameENStatusEdit, setNameENStatusEdit] = useState(0)


    function activeInput(type) {


        if (type === 'nameAREdit' || nameAREdit !== '') setnameARStatusEdit(1);
        if (type === 'nameENEdit' || nameENEdit !== '') setNameENStatusEdit(1);

    }
    function unActiveInput(type) {


        if (type === 'nameAREdit' && nameAREdit == '') setnameARStatusEdit(0);
        if (type === 'nameENEdit' && nameENEdit == '') setNameENStatusEdit(0);
    }
    return (
        <View>
            <Text>{'Hello'}</Text>
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
export default EditMenue
