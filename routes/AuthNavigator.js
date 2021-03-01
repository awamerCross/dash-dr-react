import * as React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';





import Slider from '../Components/Start/SwipeBegin';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import AccountConfirm from '../Components/Auth/AccountConfirm';
import ForgetPass from '../Components/Auth/ForgetPass';
import NewPassword from '../Components/Auth/NewPassword';
import HomePage from '../Components/Home/HomePage';
import CustomDrawerMenue from '../Components/Home/CustomDrawerMenue';
import Colors from '../consts/Colors';
import { Dimensions } from 'react-native';
import Settings from '../Components/DrawerComponent/Settings/Settings';
import Lang from '../Components/DrawerComponent/Settings/Lang';
import myProfil from '../Components/Home/myProfil';
import EditProfile from '../Components/Home/EditProfile';
import Menue from '../Components/DrawerComponent/Menue/Menue';
import Products from '../Components/DrawerComponent/Products/Products';
import Orders from '../Components/DrawerComponent/Orders/Order';
import SpecialOrders from '../Components/DrawerComponent/SpecialOrders/SpecialOrders';
import IncomingRequests from '../Components/DrawerComponent/Orders/IncomingRequests';
import ActiveRequests from '../Components/DrawerComponent/Orders/ActiveRequests';
import Completedrequests from '../Components/DrawerComponent/Orders/Completedrequests';
import Rejectedrequests from '../Components/DrawerComponent/Orders/Rejectedrequests';
import OrderDetailes from '../Components/DrawerComponent/Orders/OrderDetailes';
import IncomingOrderDetailes from '../Components/DrawerComponent/Orders/IncomingOrderDetailes';
import ActiveOrderDetailes from '../Components/DrawerComponent/Orders/ActiveOrderDetailes';
import CompletedOrderDetailes from '../Components/DrawerComponent/Orders/CompletedOrderDetailes';
import ProductDetailes from '../Components/DrawerComponent/Orders/ProductDetailes';
import RejectedOrderDetailes from '../Components/DrawerComponent/Orders/RejectedOrderDetailes';
import IncomingSpecialOrder from '../Components/DrawerComponent/SpecialOrders/IncomingSpecialOrder';
import IcomingSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/IcomingSpecialOrderDetailes';
import ActiveSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/ActiveSpecialOrderDetailes';
import RejectedSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/RejectedSpecialOrderDetailes';
import ProductSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/ProductSpecialOrderDetailes';
import CompletedSpecialOrderDetailes from '../Components/DrawerComponent/SpecialOrders/CompletedSpecialOrderDetailes';
import AddProduct from '../Components/DrawerComponent/Products/AddProduct';
import SuccessAddition from '../Components/DrawerComponent/Products/SuccessAddition';
import ProductDet from '../Components/DrawerComponent/Products/ProductDet';
import AddOnotherProduct from '../Components/DrawerComponent/Products/AddOnotherProduct';
import AddOffer from '../Components/DrawerComponent/Offers/AddOffer';
import AddPices from '../Components/DrawerComponent/Offers/AddPices';
import Previousoffers from '../Components/DrawerComponent/Offers/Previousoffers';
import ChangePassword from '../Components/DrawerComponent/Settings/ChangePassword';
import RestaurantInfo from '../Components/DrawerComponent/Settings/RestaurantInfo';
import Comments from '../Components/DrawerComponent/Comment/Comments';
import Notifications from '../Components/DrawerComponent/notifications/Notifications';
import Wallet from '../Components/DrawerComponent/Wallet/Wallet';
import ContactUs from '../Components/DrawerComponent/Contact/ContactUs';
import Banktransfer from '../Components/DrawerComponent/Wallet/Banktransfer';
import ManageAccount from '../Components/DrawerComponent/ManageAccount/ManageAccount';
import OrderDetMangeAcc from '../Components/DrawerComponent/ManageAccount/OrderDetMangeAcc';
import OrderDetAdjust from '../Components/DrawerComponent/ManageAccount/OrderDetAdjust';
import Report from '../Components/DrawerComponent/report/Report';
import PhoneCheck from '../Components/Auth/PhoneCheck';
import ActivateCode from '../Components/Auth/ActivationCode';
import EditMenue from '../Components/DrawerComponent/Menue/EditMenue';
import EditProduct from '../Components/DrawerComponent/Products/EditProduct';
import Fregister from '../Components/Auth/Fregister';
import SRegister from '../Components/Auth/SRegister';
import TRegister from '../Components/Auth/TRegister';
import AllOrders from '../common/AllOrders';
import TransferMony from '../Components/DrawerComponent/Wallet/TransferMony';
import OrderManageAccDetailes from '../Components/DrawerComponent/ManageAccount/OrderManageAccDetailes';
import EditProd from '../Components/DrawerComponent/Products/EditProd';
import ChooseLang from '../Components/Start/ChooseLang';
import InitScreen from '../Components/Start/Initial';
import PaginationHooks from '../common/HooksPagination';
import Pagination from '../common/Pagination';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export const MainStackNav = () => {

    return (
        <Stack.Navigator initialRouteName="ChooseLang" headerMode='none'>
            <Stack.Screen name="InitScreen" component={InitScreen} />
            <Stack.Screen name="ChooseLang" component={ChooseLang} />
            <Stack.Screen name="Home" component={Slider} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="AccConfrm" component={AccountConfirm} />
            <Stack.Screen name="PhoneCheck" component={PhoneCheck} />
            <Stack.Screen name="ActivateCode" component={ActivateCode} />
            <Stack.Screen name="Fregister" component={Fregister} />
            <Stack.Screen name="SRegister" component={SRegister} />
            <Stack.Screen name="TRegister" component={TRegister} />

            <Stack.Screen name="ForgetPass" component={ForgetPass} />
            <Stack.Screen name="NewPass" component={NewPassword} />

        </Stack.Navigator>

    )
}
const { width } = Dimensions.get('screen');

const DrawerStack = createStackNavigator();

export const AppStackNavigator = () => {

    return (

        <DrawerStack.Navigator headerMode='none' initialRouteName='drawerScreen'>
            <DrawerStack.Screen name="drawerScreen" component={drawerScreen} />

            <DrawerStack.Screen name="Lang" component={Lang} />
            <DrawerStack.Screen name="MyProfile" component={myProfil} />
            <DrawerStack.Screen name="EditProfile" component={EditProfile} />
            <DrawerStack.Screen name="OrderManageAccDetailes" component={OrderManageAccDetailes} />

            <DrawerStack.Screen name="Menue" component={Menue} />
            <DrawerStack.Screen name="EditMenue" component={EditMenue} />
            <DrawerStack.Screen name="AllOrders" component={AllOrders} />

            <DrawerStack.Screen name="EditProd" component={EditProd} />


            <DrawerStack.Screen name="ProductDet" component={ProductDet} />
            <DrawerStack.Screen name="EditProducts" component={EditProduct} />
            {/* <DrawerStack.Screen name="Products" component={Products} /> */}

            <DrawerStack.Screen name="SpecialOrders" component={SpecialOrders} />
            <DrawerStack.Screen name="IncomingRequests" component={IncomingRequests} />
            <DrawerStack.Screen name="ActiveRequests" component={ActiveRequests} />
            <DrawerStack.Screen name="Completedrequests" component={Completedrequests} />
            <DrawerStack.Screen name="Rejectedrequests" component={Rejectedrequests} />
            <DrawerStack.Screen name="OrderDetailes" component={OrderDetailes} />
            <DrawerStack.Screen name="IncomingOrderDetailes" component={IncomingOrderDetailes} />
            <DrawerStack.Screen name="ActiveOrderDetailes" component={ActiveOrderDetailes} />
            <DrawerStack.Screen name="CompletedOrderDetailes" component={CompletedOrderDetailes} />
            <DrawerStack.Screen name="ProductDetailes" component={ProductDetailes} />
            <DrawerStack.Screen name="RejectedOrderDetailes" component={RejectedOrderDetailes} />
            <DrawerStack.Screen name="IncomingSpecialOrder" component={IncomingSpecialOrder} />
            <DrawerStack.Screen name="IcomingSpecialOrderDetailes" component={IcomingSpecialOrderDetailes} />
            <DrawerStack.Screen name="ActiveSpecialOrderDetailes" component={ActiveSpecialOrderDetailes} />
            <DrawerStack.Screen name="RejectedSpecialOrderDetailes" component={RejectedSpecialOrderDetailes} />
            <DrawerStack.Screen name="ProductSpecialOrderDetailes" component={ProductSpecialOrderDetailes} />
            <DrawerStack.Screen name="CompletedSpecialOrderDetailes" component={CompletedSpecialOrderDetailes} />
            <DrawerStack.Screen name="AddProduct" component={AddProduct} />
            <DrawerStack.Screen name="SuccessAddition" component={SuccessAddition} />
            <DrawerStack.Screen name="AddOnotherProduct" component={AddOnotherProduct} />
            <DrawerStack.Screen name="AddOffer" component={AddOffer} />
            <DrawerStack.Screen name="AddPices" component={AddPices} />
            <DrawerStack.Screen name="Previousoffers" component={Previousoffers} />
            <DrawerStack.Screen name="ChangePassword" component={ChangePassword} />
            <DrawerStack.Screen name="RestaurantInfo" component={RestaurantInfo} />
            <DrawerStack.Screen name="Comments" component={Comments} />
            <DrawerStack.Screen name="Notifications" component={Notifications} />
            {/* <DrawerStack.Screen name="Wallet" component={Wallet} /> */}
            <DrawerStack.Screen name="ContactUs" component={ContactUs} />
            <DrawerStack.Screen name="Banktransfer" component={Banktransfer} />
            <DrawerStack.Screen name="TransferMony" component={TransferMony} />
            <DrawerStack.Screen name="ManageAccount" component={ManageAccount} />
            <DrawerStack.Screen name="OrderDetMangeAcc" component={OrderDetMangeAcc} />
            <DrawerStack.Screen name="OrderDetAdjust" component={OrderDetAdjust} />
            <DrawerStack.Screen name="Report" component={Report} />
        </DrawerStack.Navigator>
    )
}

const drawerScreen = () => {
    return (
        <Drawer.Navigator headerMode='none' screenOptions={{ headerShown: false }} initialRouteName="HomePage" drawerStyle={{ backgroundColor: Colors.bg, width }}
            drawerContent={(props) => <CustomDrawerMenue {...props} />}>
            <Drawer.Screen name="HomePage" component={HomePage} headerShow={false} />
            <Drawer.Screen name="Menue" component={Menue} />
            <Drawer.Screen name="Products" component={Products} />
            <Drawer.Screen name="EditProducts" component={EditProduct} />
            <Drawer.Screen name="Orders" component={Orders} />
            <Drawer.Screen name="AddOffer" component={AddOffer} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Comments" component={Comments} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="Wallet" component={Wallet} />
            <Drawer.Screen name="ContactUs" component={ContactUs} />
            <Drawer.Screen name="ManageAccount" component={ManageAccount} />
            <Drawer.Screen name="Report" component={Report} />
            <DrawerStack.Screen name="EditProd" component={EditProd} />
            <DrawerStack.Screen name="PaginationHooks" component={PaginationHooks} />
            <DrawerStack.Screen name="Pagination" component={Pagination} />



        </Drawer.Navigator>

    );
}
