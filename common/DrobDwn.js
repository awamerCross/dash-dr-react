import React, { useState } from 'react'
import { View, Text, } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from "native-base";
import i18n from '../locale/i18n'
import { width, height } from '../consts/HeightWidth';
import Colors from '../consts/Colors';

function DrobDwn() {

    const [isSelected, setSelection] = useState();
    const data = [{
        value: i18n.t('delete'),
    }, {
        value: i18n.t('edit'),
    },];
    const data2 = [{
        value: i18n.t('latest'),
    }, {
        value: i18n.t('oldest'),
    },];

    return (
        <View style={{ height: 60, width: '90%', margin: 20, flexDirection: 'row', alignItems: 'center', zIndex: 10, backgroundColor: Colors.InputColor, }}>
            <CheckBox checked={isSelected} color={isSelected ? Colors.sky : '#DBDBDB'} style={{ backgroundColor: isSelected ? Colors.sky : Colors.bg, width: width * .05, height: height * .03, }} onPress={() => setSelection(!isSelected)} />
            <Text style={{ marginStart: 12, fontFamily: 'flatMedium', fontSize: width * .025, paddingHorizontal: 2 }}>{i18n.t('Select')}</Text>
            <View style={{ borderWidth: .4, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', height: width * .09, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                <Dropdown
                    placeholder={i18n.t('select')}
                    data={data}
                    fontSize={12}
                    itemTextStyle={{ fontFamily: 'flatMedium' }}
                    lineWidth={0}
                    containerStyle={{ width: width * .22, paddingHorizontal: 5, bottom: 10 }}
                    animationDuration={0}
                />
            </View>



            <Text style={{ fontFamily: 'flatMedium', fontSize: width * .025, paddingHorizontal: 2 }}>{i18n.t('filter')}</Text>
            <View style={{ borderWidth: .4, alignItems: 'center', justifyContent: 'center', height: width * .09, backgroundColor: Colors.bg, borderColor: Colors.InputColor, marginHorizontal: 5 }}>
                <Dropdown
                    placeholder={i18n.t('select')}
                    data={data2}
                    fontSize={12}
                    itemTextStyle={{ fontFamily: 'flatMedium' }}
                    lineWidth={0}
                    containerStyle={{ width: width * .22, paddingHorizontal: 5, bottom: 10 }}
                />
            </View>

        </View>
    )
}

export default DrobDwn
