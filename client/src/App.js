import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./routes/login";
import SignUp from "./routes/signup";
import Home from "./routes/home";
import NotFound from "./routes/notfound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
