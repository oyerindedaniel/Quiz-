import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/auth-context";

import AuthSignup from "../components/auth/authsignup/authsignup";

const SignUp = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.isLoggedState) navigate("/");
  }, [ctx.isLoggedState, navigate]);

  return <AuthSignup />;
};

export default SignUp;
