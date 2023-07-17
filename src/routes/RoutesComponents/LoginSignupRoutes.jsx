import { React } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import Login from "../../pages/login signup/login/login";
import Logoutall from "../../pages/login signup/logoutall/logoutall";
import Two_Factor from "../../pages/login signup/login/two_factor_auth";
import Signup from "../../pages/login signup/sign up/sign-up";
function LoginSignupRoutes() {
  const routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/logoutall",
      element: <Logoutall />,
    },
    {
      path: "2fa",
      element: <Two_Factor />,
    },
  ]);
  return (
    <>
      {/* <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/2fa" element={<Two_Factor />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/logoutall" element={<Logoutall />}></Route>
      </Routes> */}
      {routes}
    </>
  );
}

export default LoginSignupRoutes;
