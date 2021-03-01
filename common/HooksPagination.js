import React, { useState, useEffect } from 'react';

//import all the components we are going to use
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

const PaginationHooks = () => {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [page, setpage] = useState(1);

    useEffect(() => getData(), []);

    const getData = () => {
        console.log('getData');
        setLoading(true);
        //Service to get the data from the server to render
        fetch('http://hnagran.aait-sa.com/api/get-blogs?page='
            + page)
            //Sending the currect offset with get request
            .then((response) => response.json())
            .then((responseJson) => {
                //Successful response
                setpage(page + 1);
                //Increasing the offset for the next API call
                setDataSource([...dataSource, ...responseJson.data]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getData}
                    //On Click of button load more data
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {loading ? (
                        <ActivityIndicator
                            color="white"
                            style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
                {item.price}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        //Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    enableEmptySections={true}
                    renderItem={ItemView}
                    onEndReached={getData}
                    onEndReachedThreshold={0.4}


                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default PaginationHooks;




// export const getAllComplainsList = (statusId, sort) => async (
//     dispatch,
//     getState
// ) => {
//     const {
//         platNumber,
//         dateFrom,
//         dateTo,
//         contractorId,
//         rowsNumber,
//         pageNumber,
//         complainType,
//     } = getState().Complains;
//     const { filterInput } = getState().Dashboard;
//     Reactotron.log('filterInput', filterInput);
//     try {
//         dispatch({ type: GET_COMPLAINS_LIST_SPINNER });
//         const getComplainsListResponse = await Api.get(
//             `Complians?From=${dateFrom}&To=${dateTo}&ComplianId=${null}&plateNumber=${platNumber}&StatusId=${statusId}&ContractorId=${
//             statusId && filterInput ? filterInput : contractorId
//             }&PageIndex=${1}&PageSize=${rowsNumber}&Sort=${sort}`
//         );
//         if (getComplainsListResponse.data.statusCode == 200) {
//             const {
//                 data: { data },
//             } = getComplainsListResponse;

//             /* await saveDataForOffline(data);
//             const base = database.collections.get('complains');
//             const cached = await base.query().fetch();
//             Reactotron.log(cached); */

//             dispatch({
//                 type: GET_COMPLAINS_LIST_SUCCESS,
//                 payload: data ? data : [],
//             });
//         }
//     } catch (error) {
//         console.log('get complains list error', { ...error });
//         dispatch({ type: GET_COMPLAINS_LIST_FAILED });
//     }
// };
// export const LoadPagination = (statusId, sort) => async (
//     dispatch,
//     getState
// ) => {
//     const {
//         platNumber,
//         dateFrom,
//         dateTo,
//         contractorId,
//         rowsNumber,
//         pageNumber,
//         complainType,
//     } = getState().Complains;
//     const { filterInput } = getState().Dashboard;
//     try {
//         dispatch({ type: GET_COMPLAINS_LIST_PAGINATION_SPINNER });
//         const getComplainsListResponse = await Api.get(
//             `Complians?From=${dateFrom}&To=${dateTo}&ComplianId=${null}&ComplianType=${complainType}&plateNumber=${platNumber}&StatusId=${statusId}&ContractorId=${
//             filterInput ? filterInput : contractorId
//             }&PageIndex=${pageNumber + 1}&PageSize=${rowsNumber}&Sort=${sort}`
//         );

//         if (getComplainsListResponse.data.statusCode == 200) {
//             const {
//                 data: { data },
//             } = getComplainsListResponse;
//             dispatch({
//                 type: GET_COMPLAINS_LIST_PAGINATION_SUCCESS,
//                 payload: { data: data ? data : [], pageNumber: pageNumber + 1 },
//             });
//         }
//     } catch (error) {
//         console.log('get complains list error pagination', error);
//         dispatch({ type: GET_COMPLAINS_LIST_PAGINATION_FAILED });
//     }
// };



// import {
//     GET_COMPLAINS_LIST_SPINNER,
//     GET_COMPLAINS_LIST_SUCCESS,
//     GET_COMPLAINS_LIST_FAILED,
//     GET_COMPLAINS_LIST_PAGINATION_SPINNER,
//     GET_COMPLAINS_LIST_PAGINATION_SUCCESS,
//     GET_COMPLAINS_LIST_PAGINATION_FAILED,
//     GET_DASHBOARD_COMPLAINS_SUCCESS,
//     GET_DASHBOARD_COMPLAINS_SPINNER,
//     GET_DASHBOARD_COMPLAINS_FAILED,
//     UNMOUNT_EMPTY,
//     COMPLAIN_NUMBER_CHANGE,
//     COMPLAIN_STATUS_CHANGE,
//     COMPLAIN_TYPE_CHANGE,
//     CONTRUCTOR_ID_CHANGE,
//     START_DATE_CHANGE,
//     END_DATE_CHANGE,
//     SEARCH_SPINNER,
//     SEARCH_SUCCESS,
//     SEARCH_FAILED,
//     SEARCH_PAGINATION_SPINNER,
//     SEARCH_PAGINATION_FAILED,
//     SEARCH_PAGINATION_SUCCESS,
//     PLATE_NUMBER_CHANGE,
//     RESET_ALL_SEARCH_INPUTS,
// } from '../../actions/ComplainsList/complainsListTypes';

// const initialState = {
//     statusId: null,
//     platNumber: null,
//     dateFrom: null,
//     dateTo: null,
//     contractorId: null,
//     rowsNumber: 20,
//     pageNumber: 1,
//     complainsList: [],
//     getComplainsListLoading: false,
//     getComplainsListErorr: false,
//     paginationLoading: false,
//     paginationError: false,
//     ////search
//     search: false,
//     searchLoading: false,
//     searchError: false,
//     complainNumber: null,
//     searchContructorId: null,
//     complainStatus: null,
//     searchPlateNumber: null,
//     complainType: null,
//     startDate: null,
//     endDate: null,
//     complainType: null,
//     searchRowsNumber: 25,
//     searchPageNumber: 1,
//     searchData: [],
//     SearchPaginationLoading: false,
//     SearchPaginationError: false,
// };

// export default (state = initialState, { type, payload }) => {
//     switch (type) {
//         case GET_COMPLAINS_LIST_SPINNER:
//             return {
//                 ...state,
//                 getComplainsListLoading: true,
//                 getComplainsListErorr: false,
//             };
//             break;
//         case GET_COMPLAINS_LIST_SUCCESS:
//             return {
//                 ...state,
//                 getComplainsListLoading: false,
//                 getComplainsListErorr: false,
//                 complainsList: payload,
//             };
//             break;
//         case GET_COMPLAINS_LIST_FAILED:
//             return {
//                 ...state,
//                 getComplainsListLoading: false,
//                 getComplainsListErorr: true,
//             };
//             break;
//         case GET_COMPLAINS_LIST_PAGINATION_SPINNER:
//             return {
//                 ...state,
//                 paginationLoading: true,
//                 paginationError: false,
//                 pageNumber: 1,
//             };
//             break;
//         case GET_COMPLAINS_LIST_PAGINATION_SUCCESS:
//             return {
//                 ...state,
//                 paginationLoading: false,
//                 paginationError: false,
//                 complainsList: [...state.complainsList, ...payload.data],
//                 pageNumber: payload.pageNumber,
//             };
//             break;
//         case GET_COMPLAINS_LIST_PAGINATION_FAILED:
//             return { ...state, paginationLoading: false, paginationError: true };
//             break;
//         case COMPLAIN_NUMBER_CHANGE:
//             return { ...state, complainNumber: payload };
//             break;
//         case COMPLAIN_STATUS_CHANGE:
//             return { ...state, complainStatus: payload };
//             break;
//         case COMPLAIN_TYPE_CHANGE:
//             return { ...state, complainType: payload };
//             break;
//         case CONTRUCTOR_ID_CHANGE:
//             return { ...state, searchContructorId: payload };
//             break;
//         case START_DATE_CHANGE:
//             return { ...state, startDate: payload };
//             break;
//         case END_DATE_CHANGE:
//             return { ...state, endDate: payload };
//             break;
//         case PLATE_NUMBER_CHANGE:
//             return { ...state, searchPlateNumber: payload };
//         case SEARCH_SPINNER:
//             return {
//                 ...state,
//                 search: true,
//                 searchLoading: true,
//                 searchError: false,
//             };
//             break;
//         case SEARCH_SUCCESS:
//             return {
//                 ...state,
//                 search: true,
//                 searchLoading: false,
//                 searchError: false,
//                 complainsList: payload,
//                 searchPageNumber: 1,
//             };
//             break;
//         case SEARCH_FAILED:
//             return {
//                 ...state,
//                 search: true,
//                 searchLoading: false,
//                 searchError: true,
//             };
//             break;

//         case SEARCH_PAGINATION_SPINNER:
//             return {
//                 ...state,
//                 SearchPaginationLoading: true,
//                 SearchPaginationError: false,
//             };
//             break;
//         case SEARCH_PAGINATION_SUCCESS:
//             return {
//                 ...state,
//                 SearchPaginationLoading: false,
//                 SearchPaginationError: false,
//                 complainsList: [...state.complainsList, ...payload.data],
//                 searchPageNumber: payload.pageNumber,
//             };
//             break;
//         case SEARCH_PAGINATION_FAILED:
//             return {
//                 ...state,
//                 SearchPaginationLoading: false,
//                 SearchPaginationError: true,
//             };
//             break;
//         case RESET_ALL_SEARCH_INPUTS:
//             return { ...initialState };
//             break;

//         case UNMOUNT_EMPTY:
//             return { ...initialState };
//             break;
//         default:
//             return state;
//     }
// };


// <FlatList
//                data={notRedundency}
//                extraData={dateSearch}
//                keyExtractor={(item, index) => `${item.Id}`}
//                showsVerticalScrollIndicator={false}
//                scrollEventThrottle={100}
//                maxToRenderPerBatch={30}
//                updateCellsBatchingPeriod={1000}
//                initialNumToRender={10}
//                renderItem={({
//                   item,
//                   item: {
//                      Id,
//                      VehicleId,
//                      DamageType,
//                      CreatedOn,
//                      UpdatedBy,
//                      UpdatedOn,
//                      StatusId,
//                      Comment,
//                      Covered,
//                      StatusNameAr,
//                      PlateNumber,
//                      ContractorId,
//                      ComplianSpareParts,
//                      ComplianImages,
//                      VehicleType,
//                      ContractorName,
//                   },
//                   index,
//                }) => {
//                   return (
//                      <ComplainsItem
//                         complainNumber={Id}
//                         complainDate={moment(
//                            CreatedOn,
//                            'YYYY-MM-DD hh:mm:ss'
//                         ).format('YYYY/MM/DD')}
//                         vehicleCode={VehicleId}
//                         vehicleNumber={PlateNumber}
//                         vehicleType={VehicleType}
//                         contractorNumber={ContractorName}
//                         complainStatus={StatusId}
//                         images={ComplianImages}
//                         spareParts={ComplianSpareParts}
//                         covered={Covered}
//                         indicatorColor={
//                            StatusId == 4
//                               ? INDICATOR_GREEN
//                               : StatusId == 5 || StatusId == 1
//                               ? INDICATOR_RED
//                               : INDICATOR_YELLOW
//                         }
//                         onComplainPressed={data =>
//                            dispatch(onComplainPressed(data, navigation, route))
//                         }
//                         detailsContainerStyle={styles.detaiesContainer}
//                      />
//                   );
//                }}
//                onEndReached={() => {
//                   loadMore ? onEndReached() : null;
//                }}
//                refreshControl={
//                   <RefreshControl
//                      refreshing={refreshing}
//                      onRefresh={handleRefresh}
//                      colors={[MAIN_COLOR]}
//                   />
//                }
//                bounces={false}
//                overScrollMode="never"
//                onEndReachedThreshold={0.5}
//                onScroll={() => setloadMore(true)}
//                ListFooterComponent={renderListFooter}
//                ListEmptyComponent={
//                   <View
//                      style={{
//                         flex: 1,
//                         height: SCREEN_HEIGHT - 70,
//                      }}>
//                      <EmptyList />
//                   </View>
//                }
//             />