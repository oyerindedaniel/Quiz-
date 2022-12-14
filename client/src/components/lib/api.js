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
    const response = await instance.post("/quiz/signup", userSubmittedData);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

//Login API call
export async function login(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/login", userSubmittedData);
    return response.data;
  } catch (err) {
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
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

//Update Profile API call
export async function createQuiz(userSubmittedData) {
  try {
    const response = await instance.post("/quiz/createQuiz", userSubmittedData);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function getAllQuizById() {
  try {
    const response = await instance.get("/quiz/getAllQuizById");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function getAllQuizHistoryById() {
  try {
    const response = await instance.get("/quiz/getAllQuizHistoryById");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function createQuizScore(userSubmittedData) {
  try {
    const response = await instance.post(
      "/quiz/createQuizScore",
      userSubmittedData
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function getQuizData(userSubmittedData) {
  try {
    const response = await instance.post(
      "/quiz/getQuizData",
      userSubmittedData
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

//Login API call
export async function setTimeDuration(userSubmittedData) {
  try {
    const response = await instance.patch(
      "/quiz/setTimeDuration",
      userSubmittedData
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}
