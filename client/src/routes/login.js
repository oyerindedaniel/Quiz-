import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import AuthLogin from "../components/auth/authlogin/authlogin";

const Login = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.isLoggedState) navigate("/");
  }, [ctx.isLoggedState, navigate]);
  return <AuthLogin />;
};

export default Login;
