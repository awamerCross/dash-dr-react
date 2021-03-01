import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text, Image, ScrollView } from 'react-native';

import Header from '../../../common/Header'
import i18n from '../../../locale/i18n'
import { width } from '../../../consts/HeightWidth'
import Card from '../../../common/Card';
import Colors from '../../../consts/Colors'
import Container from '../../../common/Container';
import { useDispatch, useSelector } from 'react-redux';
import { GetRatings } from '../../../store/action/CommentsAction';
import StarRating from 'react-native-star-rating';
import HomeHeader from '../../../common/HomeHeader';
import * as Animatable from 'react-native-animatable';

function Comments({ navigation }) {

    const [spinner, setSpinner] = useState(true);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.user.data.token)
    const lang = useSelector(state => state.lang.language);
    const Comments = useSelector(state => state.Comments.comments ? state.Comments.comments.data : [])
    const extra = useSelector(state => state.Comments.extra ? state.Comments.extra : [])




    useEffect(() => {
        setSpinner(true)
        dispatch(GetRatings(token, lang)).then(() => setSpinner(false))
    }, [])




    return (


        <ScrollView style={{ flex: 1, }}>
            <HomeHeader navigation={navigation} label={i18n.t('comments')} onPress={() => navigation.navigate('MyProfile')} />

            <Container loading={spinner}>

                <Card />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ backgroundColor: '#F6F6F6', height: 70, width: '95%', margin: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                        <Image source={require('../../../assets/Images/big_star_yellow.png')} style={{ width: '20%', height: '50%' }} resizeMode='contain' />


                        <Text style={[styles.Text, { color: Colors.IconBlack, fontSize: 16 }]}>{i18n.t('RateNum')} : ({extra.count})</Text>


                    </View>
                </View>

                {Comments && Comments.length ?
                    Comments.map(comm => (
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>

                            <View style={styles.Card} key={comm.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20, }}>
                                    <Image source={{ uri: comm.user.avatar }} style={{ height: 50, width: 50, borderRadius: 50, }} />
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={[styles.CardText]}>{comm.user.name}</Text>
                                            <Text style={[styles.CardText, { color: Colors.fontNormal, fontSize: 10, }]}>{comm.date}</Text>
                                        </View>
                                        <View style={{ alignSelf: 'flex-start', alignItems: 'center' }}>
                                            <StarRating
                                                maxStars={5}
                                                rating={comm.rate}
                                                fullStarColor={'yellow'}
                                                starSize={20}

                                            />
                                        </View>

                                        <Text style={[styles.CardText, { color: Colors.fontNormal, fontSize: 10, }]}>
                                            {comm.comment}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Animatable.View>
                    )) : <Image source={require('../../../assets/Images/empty.png')} style={{ height: 150, width: 150, alignSelf: 'center' }} />

                }



            </Container>

        </ScrollView>
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
        width: width * .3,
        flex: 1

    },
    Text: {
        fontFamily: 'flatMedium',
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center'
    },
    Card: {
        shadowColor: '#F6F6F6',
        margin: '2%',
        borderRadius: 10,
        backgroundColor: Colors.bg,
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        flex: 1
    },
    CardText: {
        fontFamily: 'flatMedium',
        fontSize: 13,
        color: Colors.IconBlack,
        marginVertical: 5
    },
})
export default Comments
