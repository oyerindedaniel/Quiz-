import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

// Check if logged In
export async function initialProtect() {
  try {
    const response = await instance.get("/quiz/initialProtect");
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    throw err.response.data;
  }
}

//Sign up API call
export async function signup(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/signup", {
      username: userSubmittedData.username,
      email: userSubmittedData.email,
      password: userSubmittedData.password,
      confirmPassword: userSubmittedData.confirmPassword,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

//Login API call
export async function login(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/login", {
      email: userSubmittedData.email,
      password: userSubmittedData.password,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    throw err.response.data;
  }
}

//Forgot Password API call
export async function forgotPassword(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/forgotPassword", {
      email: userSubmittedData.email,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

//Update Password API call
export async function updatePassword(userSubmittedData) {
  try {
    const response = await instance.patch("/quiz/updateMyPassword", {
      currentPassword: userSubmittedData.currentPassword,
      password: userSubmittedData.password,
      confirmPassword: userSubmittedData.confirmPassword,
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    throw err.response.data;
  }
}

//Update Profile API call
export async function updateProfile(userSubmittedData) {
  try {
    const response = await instance.patch("/quiz/updateMe", {
      username: userSubmittedData.username,
      email: userSubmittedData.email,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    throw err.response.data;
  }
}

// instance.get('/todos')
