import axios from "axios";

export async function signup(userSubmittedData) {
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000",
    data: {
      username: userSubmittedData.username,
      email: userSubmittedData.email,
      password: userSubmittedData.password,
      confirmPassword: userSubmittedData.confirmPassword,
    },
  });
  try {
    const response = await instance.post("/quiz/signup");
    console.log(response.data);
  } catch (err) {
    console.log(err.response.data);
  }
}

// instance.get('/todos')

// const signUpData = await axios({
//   url: "http://localhost:3000/quiz/signup",
//   method: "post",
//   data: {
//     username: userSubmittedData.username,
//     email: userSubmittedData.email,
//     password: userSubmittedData.password,
//     confirmPassword: userSubmittedData.confirmPassword,
//   },
//   withCredentials: true,
// });
