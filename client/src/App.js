import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./routes/login";
import SignUp from "./routes/signup";
import Home from "./routes/home";
import QuizCbt from "./routes/quizcbt";
import NotFound from "./routes/notfound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="quiz/:quizName" element={<QuizCbt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
