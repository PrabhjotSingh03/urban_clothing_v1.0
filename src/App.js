import React from "react";
import "./App.css";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectLoggedInUser } from "./features/auth/authSlice";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrders from "./features/user/components/UserOrders";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import UserOrdersPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/productdetail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/ordersuccess/:id",
    element: <Protected><OrderSuccess></OrderSuccess></Protected>,
  },
  {
    path: "/orders",
    element: <Protected><UserOrdersPage></UserOrdersPage></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  },[dispatch, user]);


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;