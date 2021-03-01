import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import Container from './Container';


function Pagination() {
    const [loading, setloading] = useState(true)
    const [randomUserData, SetrandomUserData] = useState([])
    const [loadingExtraData, setloadingExtraData] = useState(true)
    const [page, setpage] = useState(1);


    const LoadRandomData = async () => {
        setloading(true);

        await fetch(`http://hnagran.aait-sa.com/api/get-blogs?page=${page}`).
            then(response => response.json()).then(responseJson => {

                setpage(page + 1);
                SetrandomUserData([...randomUserData, ...responseJson.data]);
                setloading(false);

            }).catch(error => {
                console.log('Error selecting random data: ' + error)
            })

    }

    console.log(page);
    useEffect(() => {
        setloadingExtraData(true)
        LoadRandomData().then(() => setloadingExtraData(false))

    }, [])




    const renderCustomItem = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text>{item.id}</Text>
                <Text>{item.title}</Text>
                <Image source={{ uri: item.img }} style={{ width: 200, height: 200 }} />

            </View>

        )
    }

    return (
        <Container loading={loadingExtraData}>
            <View style={{ marginTop: 50, flex: 1 }}>
                <FlatList

                    data={randomUserData}
                    style={{ width: 350, height: 800 }}
                    renderItem={renderCustomItem}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.4}
                    onEndReached={LoadRandomData}
                />
                {
                    loading ? (
                        <ActivityIndicator
                            color="red"
                            style={{ marginLeft: 8 }} size={'large'} />
                    )
                        : null
                }
            </View>
        </Container>

    )
}

export default Pagination
// const Ids = [...new Set(randomUserData.map(item => item.id))]
// const NOT_REDUNDUNT = Ids.map(id => randomUserData.find(item => item.id == id))
// console.log("Page" + page);












// const onEndReach = async () => {



//     setloading(true);

//     await axios({
//         method: 'GET',
//         url: consts.url + 'provider-products',
//         headers: { Authorization: 'Bearer ' + token, },
//         params: { lang, page }

//     }).then(responseJson => {

//         setpage(page + 1);
//         SetrandomUserData([...randomUserData, ...responseJson.data.data]);
//         setTotalPage(responseJson.data.extra.total_pages)
//         setloading(false)

//     }).catch(error => {
//         setloading(false)
//         console.log('Error selecting random data: ' + error)
//     })



// }








// Keystore credentials
// Keystore password: 1d45d603292c47748e253d9083276b1b
// Key alias: QHlhc3NlcmVsYmF0YWwvRGFzaGJvYXJkRHJUYXdzZWw =
//     Key password: 65232aa75e964bb79c3f901e72da1aed

// Path to Keystore: @yasserelbatal__DashboardDrTawsel.bak.jks