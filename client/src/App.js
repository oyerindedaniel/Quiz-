import { useContext } from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./routes/login";
import SignUp from "./routes/signup";
import Home from "./routes/home";
import UserAccountSettings from "./routes/useraccountsettings";
import QuizCbt from "./routes/quizcbt";
import NotFound from "./routes/notfound";
import ForgotPassword from "./routes/forgotpassword";
import MyProfile from "./routes/myprofile";

import AuthGuard from "./components/authguard/authguard";
import NewAuth from "./components/authguard/newauth";

function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/" element={<Navigate replace to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="account/settings" element={<UserAccountSettings />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="quiz/:quizName" element={<QuizCbt />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<NewAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
