import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ImageBackground, I18nManager, ActivityIndicator } from 'react-native'
import Colors from '../../consts/Colors'
import i18n from '../../locale/i18n'
import { useSelector, useDispatch } from 'react-redux'
import { GetProfile } from '../../store/action/ProfileAction'
import * as Animatable from 'react-native-animatable';

function myProfil({ navigation }) {
    const [spinner, setSpinner] = useState(true);

    const token = useSelector(state => state.auth.user.data.token)
    const user = useSelector(state => state.auth.user.data)
    const lang = useSelector(state => state.lang.language);
    // const myProf = useSelector(state => state.profile.user.data);


    const dispatch = useDispatch();



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(true)
            dispatch(GetProfile(token, lang)).then(() => setSpinner(false))
        });

        return unsubscribe;
    }, [navigation])


    function renderLoader() {
        if (spinner) {
            return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: '#23232387',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}>
                    <ActivityIndicator size="large" color={Colors.sky} style={{ alignSelf: 'center', }} />
                </View>
            );
        }
    }

    return (



        <View style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Animatable.View animation="pulse" easing="ease-out" delay={500} style={{ flex: 1 }} >
                {renderLoader()}
                <Image source={{ uri: user.avatar }} style={styles.ImgBackGround} />
                <ImageBackground source={require('../../assets/Images/bluBack.png')} style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: -20, marginLeft: -20, transform: I18nManager.isRTL ? [{ rotateY: '0deg' }] : [{ rotateY: '-180deg' }], }} resizeMode='contain'>
                    <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>

                        <Image source={require('../../assets/Images/arrowwhite.png')} style={{ height: 25, width: 25, marginTop: 45, padding: 15 }} resizeMode='contain' />

                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.ScrolContainer}>

                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ alignItems: 'center', alignSelf: "flex-end", marginHorizontal: 20, padding: 15, bottom: 25, backgroundColor: Colors.sky, borderRadius: 30 }}>
                        <Image source={require('../../assets/Images/EditRename.png')} style={{ width: 30, height: 30, }} resizeMode='contain' />
                    </TouchableOpacity>

                    <Text style={styles.MainText}>{i18n.t('myProfile')}</Text>

                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                        <View style={{ margin: 20, marginTop: 0 }}>

                            <View style={styles.Wrab}>
                                <Text style={styles.Value}>{i18n.t('name')} : </Text>
                                <Text style={styles.user}>{user.name}</Text>
                            </View>

                            <View style={styles.Line}></View>

                            <View style={styles.Wrab}>
                                <Text style={styles.Value}>{i18n.t('phone')} : </Text>
                                <Text style={styles.user}>{user.phone}</Text>
                            </View>

                            <View style={styles.Line}></View>

                            <View style={styles.Wrab}>
                                <Text style={styles.Value}>{i18n.t('city')} : </Text>
                                <Text style={styles.user}>{user.provider.city}</Text>
                            </View>

                            <View style={styles.Line}></View>

                            <View style={styles.Wrab}>
                                <Text style={styles.Value}>{i18n.t('email')} : </Text>
                                <Text style={styles.user}>{user.email}</Text>
                            </View>

                            <View style={styles.Line}></View>
                        </View>
                    </ScrollView>
                </View>
            </Animatable.View>
        </View>

    )
}
const styles = StyleSheet.create({
    MainText: {
        fontFamily: 'flatMedium',
        fontSize: 18,
        alignSelf: 'flex-start',
        marginStart: 10
    },
    user: {
        fontFamily: 'flatMedium',
        fontSize: 16,
        color: Colors.fontNormal,
        marginStart: 10
    },
    Value: {
        fontFamily: 'flatLight',
        fontSize: 16,
        color: Colors.fontBold

    },
    EditImg: {
        width: 20,
        height: 20
    },
    Wrab: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    ImgBackGround: {
        width: '100%',
        height: '60%',
    },
    Line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.fontNormal,
        opacity: .2,
        marginVertical: 15
    },
    ScrolContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: Colors.bg,
        bottom: 0,
        height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
})
export default myProfil
