import { useDispatch, useSelector } from "react-redux";
import { signOutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
