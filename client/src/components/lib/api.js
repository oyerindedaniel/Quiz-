import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

//Sign up API call
export async function signup(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/signup", {
      username: userSubmittedData.username,
      email: userSubmittedData.email,
      password: userSubmittedData.password,
      confirmPassword: userSubmittedData.confirmPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

//Login API call
export async function login(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/login", {
      email: userSubmittedData.email,
      password: userSubmittedData.password,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

// instance.get('/todos')
